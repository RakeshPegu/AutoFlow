export default function About(){
    return(
        <section className="h-screen bg-foreground/20 " id="about">
        <div className="max-w-80 pt-10 ml-30 flex flex-col gap-4">
        <span className="text-lg">About</span>
        <h2 className="md:text-5xl">
            Turn Every Lead Into an Opportunity
        </h2>
        </div>

        <div className="flex ml-30 pt-30">
            <p className="max-w-100 text-2xl">
            Capture every potential customer, let AI analyze their intent,
            and focus your team on the leads most likely to convert.
           </p>
         </div>

        <div className="flex justify-end text-2xl">
            <p className="max-w-100">
            From the first interaction to lead scoring, our platform helps
            businesses understand their prospects, prioritize opportunities,
            and make faster, data-driven decisions.
            </p>
        </div>
        </section>
    )
}