import Image from 'next/image';

export type TableType = 'product' | 'user' | 'transaction';

export interface Column<T> {
  key: keyof T;
  label: string;
}

interface ActionProps {
  id: string | number;
  onInfo?: (id: string | number) => void;
  onEdit?: (id: string | number) => void;
  onDelete?: (id: string | number) => void;
}

/**
 * Fungsi untuk merender isi sel tabel berdasarkan tipe tabel dan jenis data.
 */
export const renderCellContent = <T extends { [key: string]: any }>(
  row: T,
  col: Column<T>,
  tableType: TableType,
  actions?: ActionProps
) => {
  const value = row[col.key];

  if (tableType === 'product') {
    return col.key === 'price' ? (
      <p className="font-normal text-sm text-slate-800">
        {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(Number(value))}
      </p>
    ) : col.key === 'image' ? (
      <div className="flex justify-center">
        <Image src={value as string} width={50} height={50} alt="Product Image" className="rounded-md" />
      </div>
    ) : (
      <p className="font-normal text-sm text-slate-800">{String(value)}</p>
    );
  }

  if (tableType === 'user') {
    return col.key === 'profilePicture' ? (
      <div className="flex justify-center">
        <Image src={value as string} width={40} height={40} alt="User Profile" className="rounded-full" />
      </div>
    ) : (
      <p className="font-normal text-sm text-slate-800">{String(value)}</p>
    );
  }

  if (tableType === 'transaction') {
    return col.key === 'amount' ? (
      <p className="font-normal text-sm text-green-600">
        {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(Number(value))}
      </p>
    ) : col.key === 'status' ? (
      <span
        className={`px-3 py-1 rounded-md text-xs font-semibold ${
          value === 'Completed' ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'
        }`}
      >
        {String(value)}
      </span>
    ) : (
      <p className="font-normal text-sm text-slate-800">{String(value)}</p>
    );
  }

  if (col.key === 'actions' && actions) {
    return (
      <div className="flex space-x-2">
        {actions.onInfo && (
          <button
            type="button"
            className="text-white bg-cyan-500 font-light text-xs rounded-lg px-3 py-1 shadow-md hover:scale-105 transition"
            onClick={() => actions.onInfo?.(row.id)}
          >
            Info
          </button>
        )}
        {actions.onEdit && (
          <button
            type="button"
            className="text-white bg-yellow-500 font-light text-xs rounded-lg px-3 py-1 shadow-md hover:scale-105 transition"
            onClick={() => actions.onEdit?.(row.id)}
          >
            Edit
          </button>
        )}
        {actions.onDelete && (
          <button
            type="button"
            className="text-white bg-red-500 font-light text-xs rounded-lg px-3 py-1 shadow-md hover:scale-105 transition"
            onClick={() => actions.onDelete?.(row.id)}
          >
            Delete
          </button>
        )}
      </div>
    );
  }

  return <p className="font-normal text-sm text-slate-800">{String(value)}</p>;
};
