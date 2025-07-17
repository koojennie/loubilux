import axios from "axios";
import { useState } from "react";
import * as XLSX from "xlsx-js-style";

interface ModalReportProps {
    setIsOpen: (isOpen: boolean) => void;
    isOpen: boolean;
}

export default function ModalReport({ isOpen, setIsOpen }: ModalReportProps) {

    const [filterType, setFilterType] = useState("all");
    const currentDate = new Date();
    const [month, setMonth] = useState(String(currentDate.getMonth() + 1).padStart(2, "0"));
    const [year, setYear] = useState(String(currentDate.getFullYear()));
    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");
    
    const handleGenerate = async () => {
    let query = "";
    let monthName = "";
    let namefile = "";

    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    const dateGenerated = new Date().toISOString().split("T")[0];

    if (filterType === "month") {
        query = `?month=${month}&year=${year}`;
        monthName = monthNames[parseInt(month, 10) - 1];
        namefile = `order-report-${monthName}-${year}-${dateGenerated}.xlsx`;
    } else if (filterType === "year") {
        query = `?year=${year}`;
        namefile = `order-report-${year}-${dateGenerated}.xlsx`;
    } else if (filterType === "range") {
        query = `?from=${fromDate}&to=${toDate}`;
        namefile = `order-report-${fromDate}-${toDate}.xlsx`;
    } else if (filterType === 'all') {
        namefile = `order-report-All-${dateGenerated}.xlsx`;
    }

    const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/orders/report${query}`;
    const response = await axios.get(url, { withCredentials: true });
    const data = response.data.data;

    if (!data || data.length === 0) {
        alert("Tidak ada data untuk diekspor.");
        return;
    }

    const headerMap: Record<string, string> = {
        orderId: "Order ID",
        user: "Customer Name",
        email: "Email Address",
        totalPrice: "Total Price",
        statusOrder: "Order Status",
        paymentMethod: "Payment Method",
        orderDate: "Order Date",
    };

    const transformedData = data.map((item: any) => {
        const newItem: any = {};
        for (const key in headerMap) {
            newItem[headerMap[key]] = item[key];
        }
        return newItem;
    });

    const worksheet = XLSX.utils.json_to_sheet(transformedData);

    // Ambil nama kolom
    const headers = Object.keys(data[0]);

    // ======== AUTO WIDTH =========
    const colWidths = headers.map((key) => {
        const maxLen = Math.max(
            key.length,
            ...data.map((row: any) => String(row[key] ?? "").length)
        );
        return { wch: maxLen + 2 }; // +2 untuk padding
    });
    worksheet["!cols"] = colWidths;

    // ======== STYLE ALL CELLS =========
    const range = XLSX.utils.decode_range(worksheet["!ref"]!);

    for (let R = range.s.r; R <= range.e.r; ++R) {
        for (let C = range.s.c; C <= range.e.c; ++C) {
            const cellAddress = XLSX.utils.encode_cell({ r: R, c: C });
            const cell = worksheet[cellAddress];

            if (!cell) continue;

            const isHeader = R === 0;

             cell.s = {
            // hanya baris pertama yang diwarnai coklat
            fill: isHeader
                ? { fgColor: { rgb: "493628" } } // coklat gelap
                : undefined,
            font: {
                bold: isHeader,
                color: { rgb: isHeader ? "FFFFFF" : "000000" },
            },
            alignment: {
                horizontal: "center",
                vertical: "center",
                wrapText: true,
            },
            border: {
                top: { style: "thin", color: { rgb: "000000" } },
                bottom: { style: "thin", color: { rgb: "000000" } },
                left: { style: "thin", color: { rgb: "000000" } },
                right: { style: "thin", color: { rgb: "000000" } },
            },
        };

        }
    }

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Report");

    XLSX.writeFile(workbook, namefile);
    setIsOpen(false);
    };


    return (
        <>
            {isOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-lg w-full max-w-md">
                        <h2 className="text-xl font-semibold mb-4">Pilih Filter Laporan</h2>

                        <select
                            className="w-full mb-4 p-2 border rounded"
                            value={filterType}
                            onChange={(e) => setFilterType(e.target.value)}
                        >
                            <option value="all">All</option>
                            <option value="month">Per Bulan</option>
                            <option value="year">Per Tahun</option>
                            <option value="range">Rentang Tanggal</option>
                        </select>

                        {filterType === "all" && (
                            <div className="flex gap-2 mb-4">
                            </div>
                        )}

                        {filterType === "month" && (
                            <div className="flex gap-2 mb-4">
                                <input
                                    type="month"
                                    className="w-full p-2 border rounded"
                                    onChange={(e) => {
                                        const [yr, mo] = e.target.value.split("-");
                                        setMonth(mo);
                                        setYear(yr);
                                    }}
                                />
                            </div>
                        )}

                        {filterType === "year" && (
                            <input
                                type="number"
                                placeholder="Tahun"
                                className="w-full p-2 border rounded mb-4"
                                value={year}
                                onChange={(e) => setYear(e.target.value)}
                            />
                        )}

                        {filterType === "range" && (
                            <div className="flex flex-col gap-2 mb-4">
                                <input
                                    type="date"
                                    className="p-2 border rounded"
                                    value={fromDate}
                                    onChange={(e) => setFromDate(e.target.value)}
                                />
                                <input
                                    type="date"
                                    className="p-2 border rounded"
                                    value={toDate}
                                    onChange={(e) => setToDate(e.target.value)}
                                />
                            </div>
                        )}

                        <div className="flex justify-end gap-2">
                            <button
                                className="px-4 py-2 rounded font-medium bg-gray-300"
                                onClick={() => setIsOpen(false)}
                            >
                                Cancel
                            </button>
                            <button
                                className="px-4 py-2 rounded bg-[#493628] font-medium text-white"
                                onClick={handleGenerate}
                            >
                                Generate
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
