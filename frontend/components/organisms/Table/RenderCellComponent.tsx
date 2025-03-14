import Image from 'next/image';

export type TableType = 'product' | 'user' | 'transaction';

export interface Column<T> {
  key: keyof T | 'actions';
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
    if (col.key === 'price') {
      return (
        <p className="font-normal text-sm text-slate-800">
          {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(Number(value))}
        </p>
      );
    } else if (col.key === 'image') {
      return (
        <div className="flex justify-center">
          <Image src={value as string} width={50} height={50} alt="Product Image" className="rounded-md" />
        </div>
      );
    } else if (col.key === 'status') {
      return (
        <span
          className={`px-3 py-1 rounded-md text-xs font-semibold ${value === 'active' ? 'bg-green-200 text-green-800'
              : value === 'draft'
                ? 'bg-yellow-200 text-yellow-800'
                : 'bg-gray-200 text-gray-800'
            }`}
        >
      {typeof value === 'string' ? value.charAt(0).toUpperCase() + value.slice(1) : ''}

    </span>);
    }
  } else if (tableType === 'user') {
    if (col.key === 'profilePicture') {
      return (
        <div className="flex justify-center">
          <Image src={value as string} width={35} height={35} alt="User Profile" className="rounded-full" />
        </div>
      );
    }
  } else if (tableType === 'transaction') {
    if (col.key === 'amount') {
      return (
        <p className="font-normal text-sm text-green-600">
          {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(Number(value))}
        </p>
      );
    } else if (col.key === 'status') {
      return (
        <span
          className={`px-3 py-1 rounded-md text-xs font-semibold ${value === 'Completed' ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'
            }`}
        >
          {String(value)}
        </span>
      );
    }
  }

  if (col.key === 'actions' && actions) {
    return (
      <div className="flex space-x-2">
        {actions.onInfo && (
          <button
            type="button"
            className="text-white bg-cyan-500 font-light text-xs !rounded-lg p-2.5 m-1 text-center inline-flex items-center shadow-md shadow-gray-300 hover:scale-[1.09] transition-transform"
            onClick={() => actions.onInfo?.(row.id)}
          >
            Info
          </button>
        )}
        {actions.onEdit && (
          <button
            type="button"
            className="text-white bg-yellow-500 font-light text-xs !rounded-lg p-2.5 m-1 text-center inline-flex items-center shadow-md shadow-gray-300 hover:scale-[1.09] transition-transform"

            onClick={() => actions.onEdit?.(row.id)}
          >
            Edit
          </button>
        )}
        {actions.onDelete && (
          <button
            type="button"
            className="text-white bg-red-500 font-light text-xs !rounded-lg p-2.5 m-1 text-center inline-flex items-center shadow-md shadow-gray-300 hover:scale-[1.09] transition-transform"
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
