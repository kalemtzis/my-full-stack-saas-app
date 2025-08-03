'use client'
import { PricingTable } from "@clerk/nextjs";
import { redirect } from "next/navigation";

const SubscriptionPage = () => {
  return (
    <div className="p-10 min-h-screen flex flex-col justify-center itemes-center gap-10 bg-gradient-to-br from-gray-500 to-gray-300">
      <div className="flex flex-row">
        <PricingTable />
      </div>
      <div className="">
        <button className="bg-red-600 rounded-2xl hover:opacity-50 p-2 cursor-pointer text-white" onClick={() => redirect('/dashboard')}>
          Go Back
        </button>
      </div>
    </div>
  );
};

export default SubscriptionPage;
