import { leadAnalysis } from '@/app/workers/lead-analysis'
import { Queue, Worker} from 'bullmq'
import IORedis from 'ioredis'
import prisma from './prisma';


const connection = new IORedis({ maxRetriesPerRequest: null });
type LeadInput = {
    leadId:string,
    question:string,
    workspaceId:string
}
const myQueue = new Queue('lead', {connection})
export async function addJobs(leadInput: LeadInput) {
    const existingJob = await myQueue.getJob(leadInput.leadId)
    if(existingJob){
        const state = await existingJob.getState()
        if(['waiting', 'active','delayed','completed'].includes(state)){
            return {job:existingJob, isNew:false}
        }
        if(state === 'failed'){
            existingJob.retry()
            return {job:existingJob, isNew:false}
        }

    }
    const job = await myQueue.add('lead', leadInput,{jobId:leadInput.leadId, attempts:3, backoff:{type:'exponential', delay:5000}}) 
    const newJob = await myQueue.getJob(leadInput.leadId)
            await prisma.workspace.update({
                    where:{id:leadInput.workspaceId},
                    data:{
                        usedTokens:{
                            increment:1
                        }
                    }
        })
    return {job, isNew:true}   
    
}

const worker = new Worker(
    'lead',
    async job=>{   
        const lead = await prisma.lead.findUnique({
            where:{id:job.id}
        })
        if(!lead){
            throw new Error('Lead not found')

        }
        if(lead.classification !== null && lead.score !== null && lead.reason.length === 0){
            return lead
        }
        const res = await leadAnalysis(job.data)
        if(!res){
            throw new Error('AI analysis failed')
        }
        const result = await prisma.lead.update({where:{id:job.id}, data:{score:res.score,status:'RECEIVED', reason:res.reason, classification:res.classification}})

        console.log('this is the result')
        return true
    },
    {
        connection
    }
)
worker.on('completed', job=>{
    console.log(`${job.id} has completed`)
    
})
worker.on('failed', async(job, err)=>{    
    console.log(`${job?.id} has failed with ${err.message}`)
})