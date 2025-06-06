  "use client";
  import React, { useState, useEffect } from "react";
  import { ApexOptions } from "apexcharts";
  import axios from "axios";
  import dynamic from "next/dynamic";

  // Load chart secara dinamis (client-side only)
  const ReactApexChart = dynamic(() => import("react-apexcharts"), {
    ssr: false,
  });

  export default function MonthSales() {
    const [monthlyRevenue, setMonthlyRevenue] = useState<number[]>([]);
    const [categories, setCategories] = useState<string[]>([]);
    const [options, setOptions] = useState<ApexOptions>({

      colors: ["#465fff"],
      chart: {
        fontFamily: "Outfit, sans-serif",
        type: "bar",
        height: 180,
        toolbar: {
          show: false,
        },
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "39%",
          borderRadius: 5,
          borderRadiusApplication: "end",
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        width: 4,
        colors: ["transparent"],
      },
      xaxis: {
        categories: [], 
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
      },
      legend: {
        show: true,
        position: "top",
        horizontalAlign: "left",
        fontFamily: "Outfit",
      },
      yaxis: {
        title: {
          text: undefined,
        },
      },
      grid: {
        yaxis: {
          lines: {
            show: true,
          },
        },
      },
      fill: {
        opacity: 1,
      },
      tooltip: {
        x: {
          show: false,
        },
        y: {
          formatter: (val: number) =>
            `Rp ${val.toLocaleString("id-ID", { maximumFractionDigits: 0 })}`,
        },
      },
    });

    const fetchMonthlyRevenue = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/orders/montlyrevenue`,
          { withCredentials: true }
        );

        const rawData = response.data.data;

        const labels: string[] = [];
        const values: number[] = [];

        rawData.forEach((item: { month: string; totalrevenue: number }) => {
          const [year, month] = item.month.split("-");
          const monthIndex = parseInt(month, 10) - 1;

          const label = new Date(parseInt(year), monthIndex).toLocaleString(
            "en-US",
            {
              month: "short",
              year: "numeric",
            }
          ); // Contoh: "May 2025"

          labels.push(label);
          values.push(item.totalrevenue);
        });

        setCategories(labels);
        setMonthlyRevenue(values);

        // Update options chart
        setOptions((prev) => ({
          ...prev,
          xaxis: {
            ...prev.xaxis,
            categories: labels,
          },
        }));
      } catch (error) {
        console.error("Failed to fetch monthly revenue", error);
      }
    };

    useEffect(() => {
      fetchMonthlyRevenue();
    }, []);

    const series = [
      {
        name: "Sales",
        data: monthlyRevenue,
      },
    ];

    return (
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-5 pt-5 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6 sm:pt-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            Monthly Sales
          </h3>
        </div>

        <div className="max-w-full overflow-x-auto custom-scrollbar">
          <div className="-ml-5 min-w-[650px] xl:min-w-full pl-2">
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
