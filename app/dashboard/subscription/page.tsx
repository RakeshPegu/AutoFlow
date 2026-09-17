import { PricingTable } from "@clerk/nextjs"

export default function SubscriptionPage() {
    return (
        <div className="flex flex-col gap-50 lg:gap-20">
            <div className="flex flex-col">
            <h1 className="text-2xl font-bold ">
                Subscription
            </h1>            
            <p>Manage your subscription here.</p>
             </div>
            <div className="h-[60vh] flex items-center ">
                <PricingTable for="organization"/>
            </div>          
        </div>
    );
}