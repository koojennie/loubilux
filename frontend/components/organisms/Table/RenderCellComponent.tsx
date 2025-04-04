"use client";

import Image from 'next/image';
// import { useRouter } from 'next/router';
import Link from 'next/link';
import { generateSlug } from '@/utils/generateSlug';


export type TableType = 'products' | 'users' | 'transaction' | 'orders'| "categories";

export interface Column<T> {
  key: keyof T | 'actions';
  label: string;
}

interface ActionProps {
  id: string | number;
  // _id: string | number;
  onInfo?: (id: string | number) => void;
  onEdit?: (id: string | number) => void;
  onDelete?: (id: string | number) => void;
}

export const renderCellContent = <T extends { [key: string]: any }>(
  row: T,
  col: Column<T>,
  tableType: TableType,
  actions?: ActionProps
) => {
  const value = row[col.key];

  // const router = useRouter();

  if (tableType === 'products') {
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
    } else if (col.key === 'statusPublish') {
      return (
          <span
            className={`px-3 py-1 rounded-md text-xs font-semibold ${value === 'active' ? 'bg-green-200 text-green-800'
              : value === 'draft'
                ? 'bg-yellow-200 text-yellow-800'
                : 'bg-gray-200 text-gray-800'
              }`}
          >
            {typeof value === 'string' ? value.charAt(0).toUpperCase() + value.slice(1) : 'No status'}
          </span>
        );
    }
  } else if (tableType === 'users') {
    if (col.key === 'profilePicture') {
      return (
        <div className="flex justify-center">
          <Image src={value as string} width={35} height={35} alt="User Profile" className="rounded-full" />
        </div>
      );
    } else if (col.key === 'role') {
      return (
        <span
          className={`px-3 py-1 rounded-md text-xs font-semibold 
              ${value === 'user' ? 'bg-yellow-200 text-yellow-800'
              : value === 'admin' ? 'bg-indigo-200 text-indigo-800'
                : value === 'superadmin' ? 'bg-purple-200 text-purple-800'
                  : 'bg-gray-200 text-gray-800'
            }`}
        >
          {value === 'superadmin' ? String('Super Admin')
            : value === 'admin' ? String('Admin')
              : value === 'user' ? String('User')
                : String(value)
          }
        </span>
      )
    }
  } else if (tableType === 'orders') {
    if (col.key === 'totalPrice') {
      return (
        <p className="font-normal text-sm text-slate-800">
          {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(Number(value))}
        </p>
      );
    } else if (col.key === 'statusOrder') {
      return (
        <span
          className={`px-3 py-1 rounded-md text-xs font-semibold ${value === 'Completed' ? 'bg-green-200 text-green-800' : 'bg-yellow-200 text-yellow-800'
            }`}
        >
          {String(value)}
        </span>
      );
    } else if (col.key === 'isPaid') {
      return (
        <span className={`px-3 py-1 rounded-md text-xs font-semibold ${value === 'true' ? 'bg-green-200 text-green-800' : 'bg-yellow-200 text-yellow-800'
          }`}
        >
          {value === 'true' ? 'Paid' : 'Waiting'}
        </span>
      )
    } else if (col.key === 'orderDate') {
      // const formattedDateStr = value.replace(/\./g, ':');

      // // Parse the date string into a Date object
      // const date = new Date(formattedDateStr);

      // // Format the date to a human-readable string
      // const humanReadableDate = date.toLocaleString('en-US', {
      //   weekday: 'long', // "Monday"
      //   year: 'numeric', // "2025"
      //   month: 'long', // "April"
      //   day: 'numeric', // "1"
      //   hour: '2-digit', // "04"
      //   minute: '2-digit', // "18"
      //   second: '2-digit' // "18"
      // });

      // Replace the dots with colons for easier parsing
      const formattedDateStr = value.replace(/\./g, ':');

      // Parse the date string into a Date object
      const date = new Date(formattedDateStr);

      // Set timezone to Indonesia (WIB) using toLocaleString()
      const options: Intl.DateTimeFormatOptions = {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false, // 24-hour format
        timeZone: "Asia/Jakarta", // Indonesia timezone
      };

      const humanReadableDate = date
        .toLocaleString('id-ID', options)
        .replace(',', '') // Remove the comma between date and time
        .replace(/(\d{2}):(\d{2})/, '$1.$2'); // Replace colon in time with a dot

      return (
        <p className="font-normal text-sm text-slate-800">{humanReadableDate} WIB</p>
      )
    } else if (col.key === 'paymentMethod') {
      return (
        <span className={`px-3 py-1 rounded-md text-xs font-semibold ${value === 'true' ? 'bg-green-200 text-green-800' : 'bg-yellow-200 text-yellow-800'
          }`}
        >
          {value === 'true' ? 'Paid' : 'Waiting'}
        </span>
      )
    }
  }

  if (col.key === 'actions' && actions) {
    const slugName = generateSlug(row.name);
    const slugId = `${slugName}-${row.id}`;

    return (
      <div className="flex space-x-2">
        {actions.onInfo && (
          <button
            type="button"
            className="text-white bg-cyan-500 font-light text-xs !rounded-lg p-2.5 m-1 text-center inline-flex items-center shadow-md shadow-gray-300 hover:scale-[1.09] transition-transform"
            onClick={() => actions.onInfo?.(row.id)} // Ensure onInfo is called with row.id
          >
            Info
          </button>
        )}
        {actions.onEdit && (
          <Link href={`/admin/${tableType}/${row.id}/edit`}>
            <button
              type="button"
              className="text-white bg-yellow-500 font-light text-xs !rounded-lg p-2.5 m-1 text-center inline-flex items-center shadow-md shadow-gray-300 hover:scale-[1.09] transition-transform"
            >
              Edit
            </button>
          </Link>
        )}

        {actions.onDelete && tableType !== 'orders' && (
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

  return <p className="md:text-sm !important font-normal text-slate-800">
    {String(value)}
  </p>

};
