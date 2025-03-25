'use client';
import { renderCellContent, TableType, Column } from './RenderCellComponent';

interface TableProps<T> {
  data: T[];
  columns: Column<T>[];
  tableType: TableType;
  page: number;
  limit: number;
  totalItems: number;
  onPageChange: (newPage: number) => void;
  onInfo?: (id: string | number) => void;
  onEdit?: (id: string | number) => void;
  onDelete?: (id: string | number) => void;
}

const TableComponents = <T extends { id: string | number }>({
  data,
  columns,
  tableType,
  page,
  limit,
  totalItems,
  onPageChange,
  onInfo,
  onEdit,
  onDelete,
}: TableProps<T>) => {

  const totalPages = Math.ceil(totalItems / limit);


  const generatePagination = () => {
  const totalPagesNum = Number(totalPages) || 1;
  if (totalPagesNum <= 5) {
    return Array.from({ length: totalPagesNum }, (_, i) => i + 1);
  }

  if (page <= 3) {
    return [1, 2, 3, 4, 5, "...", totalPagesNum];
  } else if (page >= totalPagesNum - 2) {
    return [1, "...", totalPagesNum - 4, totalPagesNum - 3, totalPagesNum - 2, totalPagesNum - 1, totalPagesNum];
  } else {
    return [1, "...", page - 1, page, page + 1, "...", totalPagesNum];
  }
};

const paginationButtons = generatePagination();
{paginationButtons.map((p, i) => (
  <button
    key={i}
    onClick={() => typeof p === "number" && onPageChange(p)}
    disabled={p === "..."}
    className={`px-3 py-1 min-w-9 min-h-9 text-sm font-normal rounded ${
      page === p
        ? "text-white bg-slate-400 border border-slate-200 hover:bg-slate-500 transition duration-200"
        : "text-slate-600 bg-white border border-slate-200 hover:bg-slate-50"
    }`}
  >
    {p}
  </button>
))}

  return (
    <div className="relative flex flex-col w-full h-full overflow-y-auto text-gray-700 bg-white shadow-md rounded-lg">
      <table className="w-full text-center table-auto min-w-max">
        <thead className="sticky top-0 bg-slate-50 shadow">
          <tr className="bg-slate-50">
            {columns.map((col) => (
              <th key={col.key as string} className="transition-colors cursor-pointer border-b border-slate-300 bg-slate-100 hover:bg-slate-200">
                <div className="flex justify-center text-sm font-semibold leading-none text-slate-800">
                  {col.label}
                </div>
              </th>
            ))}
            <th className="pt-3 transition-colors cursor-pointer border-b border-slate-300 bg-slate-100 hover:bg-slate-200">
              <p className="flex justify-center  text-sm font-semibold leading-none text-slate-800">Action</p>
            </th>
          </tr>
        </thead>

        <tbody>
          {data?.map((row) => (
            <tr key={row.id} className="hover:bg-slate-50 border border-transparent hover:border-slate-200">
              {columns.map((col) => (
                <td key={col.key as string} className="py-2 border-b border-slate-200">
                  {renderCellContent(row, col, tableType, { id: row.id, onInfo, onEdit, onDelete })}
                </td>
              ))}
              <td className="py-2 border-b border-slate-200">
                {renderCellContent(row, { key: 'actions', label: 'Actions' }, tableType, { id: row.id, onInfo, onEdit, onDelete })}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-between items-center px-4 py-3">
        <div className="text-sm text-slate-500">
          {/* Showing <b>1-5</b> of 45 */}
          Showing <b>{(page - 1) * limit + 1}-{Math.min(page * limit, totalItems)}</b> of {totalItems}
        </div>
        <div className="flex space-x-1">
          <button className="px-3 py-1 min-w-9 min-h-9 text-sm font-normal text-slate-500 bg-white border border-slate-200 rounded hover:bg-slate-50 hover:border-slate-400 transition duration-200 ease"
          onClick={() => onPageChange(page - 1)}
          disabled={page === 1}
          >
            Prev
          </button>

          {/* {Array.from({ length: Number(totalPages) || 1 }).map((_, i) => (
            <button
              key={i}
              onClick={() => onPageChange(i + 1)}
              className={`px-3 py-1 min-w-9 min-h-9 text-sm font-normal rounded ${
                page === i + 1
                  ? 'text-white bg-slate-400 hover border border-slate-200 rounded hover:bg-slate-500 hover:border-slate-400 transition duration-200'
                  : 'text-slate-600 bg-white border border-slate-200 hover:bg-slate-50'
              }`}
            >
              {i + 1}
            </button>
          ))} */}

        {paginationButtons.map((p, i) => (
              <button
                key={i}
                onClick={() => typeof p === "number" && onPageChange(p)}
                disabled={p === "..."}
                className={`px-3 py-1 min-w-9 min-h-9 text-sm font-normal rounded ${
                  page === p
                    ? "text-white bg-slate-400 border border-slate-200 hover:bg-slate-500 transition duration-200"
                    : "text-slate-600 bg-white border border-slate-200 hover:bg-slate-50"
                }`}
              >
                {p}
              </button>
            ))}

          <button className="px-3 py-1 min-w-9 min-h-9 text-sm font-normal text-slate-500 bg-white border border-slate-200 rounded hover:bg-slate-50 hover:border-slate-400 transition duration-200 ease"
          onClick={() => onPageChange(page + 1)}
          disabled={page === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default TableComponents;
