'use client'
import Image from 'next/image'

interface TableProps<T> {
  data: T[];
  columns: { key: keyof T; label: string }[];
  toPageEdit: () => void;
  onDelete: () => void;
  tableType:"product"|"user",
}

const Table = <T extends { id: any }>({ data, columns, onDelete, toPageEdit, tableType}: TableProps<T>) => {
  return (
    <div className="relative flex flex-col w-full h-[500px] overflow-y-auto overflow-scroll text-gray-700 bg-white shadow-md rounded-lg bg-clip-border">
      <table className="w-full text-center table-auto min-w-max">
        <thead className="sticky top-0 bg-slate-50 shadow">
          <tr className="bg-slate-50">
            {columns.map((col) => (
              <th key={col.key as string} className="pl-12 transition-colors cursor-pointer border-b border-slate-300 bg-slate-100 hover:bg-slate-200">
                <div
                  className="flex items-center justify-between gap-2 text-sm font-semibold leading-none text-slate-800">
                  {col.label}
                  <a href="#"><svg className="w-3 h-3 ms-1.5 text-gray-700" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
    <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z"/>
  </svg></a>
                  {/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                        stroke="currentColor" aria-hidden="true" className="w-4 h-4">
                        <path stroke-linecap="round" stroke-linejoin="round"
                        d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"></path>
                    </svg> */}
                </div>
              </th>
            ))}
            <th className="pl-12 pt-3 transition-colors cursor-pointer border-b border-slate-300 bg-slate-100 hover:bg-slate-200">
              <p className="flex items-center justify-between gap-2 text-sm font-semibold leading-none text-slate-800">Action</p>
            </th>
          </tr>
        </thead>

        {/* Table Body */}
        <tbody>
      {data?.map((row, index) => (
        <tr key={index} className="hover:bg-slate-200 border border-transparent hover:border-slate-200">
          {/* {columns.map((col) => {
            let content;

            // Gunakan if untuk menentukan jenis tabel dulu
            if (tableType === "product") {
              content = col.key === "price" ? (
                <p className="font-normal mt-2 text-sm text-slate-800">
                  {new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(Number(row[col.key]))}
                </p>
              ) : col.key === "image" ? (
                <div className="flex justify-center">
                  <Image src={row[col.key] as string} width={50} height={50} alt="Product Image" className="rounded-md" />
                </div>
              ) : (
                <p className="font-normal mt-2 text-sm text-slate-800">{String(row[col.key])}</p>
              );
            } else if (tableType === "user") {
              content = col.key === "profilePicture" ? (
                <div className="flex justify-center">
                  <Image src={row[col.key] as string} width={40} height={40} alt="User Profile" className="rounded-full" />
                </div>
              ) : (
                <p className="font-normal mt-2 text-sm text-slate-800">{String(row[col.key])}</p>
              );
            } else if (tableType === "transaction") {
              content = col.key === "amount" ? (
                <p className="font-normal mt-2 text-sm text-green-600">
                  {new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(Number(row[col.key]))}
                </p>
              ) : col.key === "status" ? (
                <span
                  className={`px-3 py-1 rounded-md text-xs font-semibold ${
                    row[col.key] === "Completed"
                      ? "bg-green-200 text-green-800"
                      : "bg-red-200 text-red-800"
                  }`}
                >
                  {String(row[col.key])}
                </span>
              ) : (
                <p className="font-normal mt-2 text-sm text-slate-800">{String(row[col.key])}</p>
              );
            } else {
              
              content = <p className="font-normal mt-2 text-sm text-slate-800">{String(row[col.key])}</p>;
            }

            return (
              <td key={col.key as string} className="py-2 border-b border-slate-200">
                {content}
              </td>
            );
          })}
          <td className="border-b border-slate-200 overflow-hidden">
        <button
          type="button"
          className="text-white bg-cyan-500 font-light text-xs !rounded-lg p-2.5 m-1 text-center inline-flex items-center shadow-md shadow-gray-300 hover:scale-[1.09] transition-transform"
          onClick={onDelete}
        >
          Info
        </button>
        <button
          type="button"
          className="text-white bg-yellow-500 font-light text-xs !rounded-lg p-2.5 m-1 text-center inline-flex items-center shadow-md shadow-gray-300 hover:scale-[1.09] transition-transform"
          onClick={toPageEdit}
        >
          Edit
        </button>
        <button
          type="button"
          className="text-white bg-red-500 font-light text-xs !rounded-lg p-2.5 mr-2 mb-2 text-center inline-flex items-center shadow-md shadow-gray-300 hover:scale-[1.09] transition-transform"
          onClick={onDelete}
        >
          Delete
        </button>
      </td> */}
        </tr>
      ))}
    </tbody>
      </table>
      <div className="flex justify-between items-center px-4 py-3">
        <div className="text-sm text-slate-500">
          Showing <b>1-5</b> of 45
        </div>
        <div className="flex space-x-1">
          <button className="px-3 py-1 min-w-9 min-h-9 text-sm font-normal text-slate-500 bg-white border border-slate-200 rounded hover:bg-slate-50 hover:border-slate-400 transition duration-200 ease">
            Prev
          </button>
          <button className="px-3 py-1 min-w-9 min-h-9 text-sm font-normal text-white bg-slate-800 border border-slate-800 rounded hover:bg-slate-600 hover:border-slate-600 transition duration-200 ease">
            1
          </button>
          <button className="px-3 py-1 min-w-9 min-h-9 text-sm font-normal text-slate-500 bg-white border border-slate-200 rounded hover:bg-slate-50 hover:border-slate-400 transition duration-200 ease">
            2
          </button>
          <button className="px-3 py-1 min-w-9 min-h-9 text-sm font-normal text-slate-500 bg-white border border-slate-200 rounded hover:bg-slate-50 hover:border-slate-400 transition duration-200 ease">
            3
          </button>
          <button className="px-3 py-1 min-w-9 min-h-9 text-sm font-normal text-slate-500 bg-white border border-slate-200 rounded hover:bg-slate-50 hover:border-slate-400 transition duration-200 ease">
            Next
          </button>
        </div>
      </div>
    </div>
  )

}
export default Table;