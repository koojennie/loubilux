"use client";

import SimpleCharts from "@/components/organisms/Charts/simpleCharts";
import CardDashboard from "@/components/organisms/Charts/CardDashboard";
import MonthSales from "@/components/organisms/Charts/MonthSales";
import RecentOrders from "@/components/organisms/Charts/RecentOrder";
import StatisticsChart from "@/components/organisms/Charts/StatisticChart";
import CategoryRevenueChart from "@/components/organisms/Charts/CategoryRevenue";

export default function dashboard() {
  return (
    <div className="top-16 pl-4 pr-4 py-2">
      <div className="grid grid-cols-1 gap-4 md:gap-3">
        <div className="col-span-12 space-y-6 xl:col-span-7">
          <CardDashboard />
          <div className="pb-2"></div>
          <CategoryRevenueChart />
          <div className="pb-2"></div>
          <RecentOrders />
        </div>
      </div>
    </div>
  )
}