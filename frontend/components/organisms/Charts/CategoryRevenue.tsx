"use client";

import React, { useState, useEffect } from "react";
import { ApexOptions } from "apexcharts";
import axios from "axios";
import dynamic from "next/dynamic";

// Load chart secara dinamis (client-side only)
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

export default function CategoryRevenueChart() {
  const [revenues, setRevenues] = useState<number[]>([]);
  const [categories, setCategories] = useState<string[]>([]);

  const [options, setOptions] = useState<ApexOptions>({
    colors: ["#00b894"],
    chart: {
      fontFamily: "Outfit, sans-serif",
      type: "bar",
      height: 180,
      toolbar: { show: false },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "20%",
        borderRadius: 5,
        borderRadiusApplication: "end",
      },
    },
    dataLabels: { enabled: false },
    stroke: {
      show: true,
      width: 4,
      colors: ["transparent"],
    },
    xaxis: {
      categories: [],
      axisBorder: { show: false },
      axisTicks: { show: false },
    },
    legend: {
      show: true,
      position: "top",
      horizontalAlign: "left",
      fontFamily: "Outfit",
    },
    yaxis: {
      title: {text: "Revenue"},
      labels: {
        formatter: (val: number) =>
          `Rp ${val.toLocaleString("id-ID", { maximumFractionDigits: 0 })}`,
      },
    },
    grid: {
      yaxis: { lines: { show: true } },
    },
    fill: { opacity: 1 },
    tooltip: {
      x: { show: false },
      y: {
        formatter: (val: number) =>
          `Rp ${val.toLocaleString("id-ID", { maximumFractionDigits: 0 })}`,
      },
    },
  });



  const fetchRevenueByCategory = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/orders/revenuepercategory`,
        { withCredentials: true }
      );

      const rawData = response.data.data;

      const labels: string[] = [];
      const values: number[] = [];

      rawData.forEach((item: { categoryName: string; totalRevenue: string }) => {
        labels.push(item.categoryName);
        values.push(Number(item.totalRevenue));
      });

      setCategories(labels);
      setRevenues(values);

      setOptions((prev) => ({
        ...prev,
        xaxis: { ...prev.xaxis, categories: labels },
      }));
    } catch (error) {
      console.error("Failed to fetch revenue by category", error);
    }
  };

  useEffect(() => {
    fetchRevenueByCategory();
  }, []);

  const series = [
    {
      name: "Revenue",
      data: revenues,
    },
  ];

  return (
    <div className="overflow-hidden rounded-2xl bg-white p-4 sm:px-6 sm:pt-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-[#493628]">
          Revenue by Category
        </h3>
      </div>

      <div className="max-w-full overflow-x-auto custom-scrollbar">
        <div className="min-w-[650px] xl:min-w-full">
          <ReactApexChart
            options={options}
            series={series}
            type="bar"
            height={180}
          />
        </div>
      </div>
    </div>
  );
}
