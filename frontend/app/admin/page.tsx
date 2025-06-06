"use client";

import SimpleCharts from "@/components/organisms/Charts/simpleCharts";
import CardDashboard from "@/components/organisms/Charts/CardDashboard";
import MonthSales from "@/components/organisms/Charts/MonthSales";
import RecentOrders from "@/components/organisms/Charts/RecentOrder";
import StatisticsChart from "@/components/organisms/Charts/StatisticChart";

export default function dashboard() {
  return (
    <div className="top-16 pl-10">
      {/* <div className="grid grid-cols-12 gap-4 md:gap-6"> */}
      <div className="grid grid-cols-1 gap-4 md:gap-3">
        <div className="col-span-12 space-y-6 xl:col-span-7">
          <CardDashboard />
          <div className="pb-2"></div>
          <MonthSales />
        </div>
        {/* <div className="col-span-12 xl:col-span-5">
        </div> */}
        <div className="col-span-12">
          <RecentOrders />
          {/* <StatisticsChart /> */}
        </div>
      </div>
    </div>
  )
}