"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaInfo, FaPenToSquare, FaRegPenToSquare, FaTrashCan } from 'react-icons/fa6';
import { generateSlug } from '@/utils/generateSlug';
import { formatForFrontend } from "@/utils/helper";


export type TableType = 'products' | 'users' | 'transaction' | 'orders' | "categories" | "opname";

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
        <p className="font-normal text-sm !mb-0 text-slate-800">
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
          className={`px-3 py-1 rounded-lg text-sm font-semibold ${value === 'active' ? 'bg-green-200 text-green-800'
            : value === 'draft'
              ? 'bg-yellow-100 text-yellow-600'
              : 'bg-gray-100 text-gray-600'
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
          className={`px-3 py-1 rounded-md text-sm font-semibold 
              ${value === 'user' ? 'bg-yellow-100 text-yellow-600'
              : value === 'admin' ? 'bg-pink-100 text-pink-600'
                : value === 'superadmin' ? 'bg-purple-100 text-purple-600'
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
          className={`inline-block px-3 py-1 rounded-lg text-base font-semibold cursor-pointer 
            ${value === "Completed"
              ? "bg-green-100 text-green-600"
              : value === "Cancelled"
          ? "bg-red-100 text-red-600"
          : value === "Processing"
            ? "bg-blue-100 text-blue-600"
            : "bg-yellow-100 text-yellow-600"
            }`}
        >
          {value}
        </span>
      );
    } else if (col.key === 'isPaid') {
      return (
        <span className={`px-3 py-1 rounded-md text-sm font-semibold ${value === 'true' ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'
          }`}
        >
          {value === 'true' ? 'Paid' : 'Waiting'}
        </span>
      )
    } else if (col.key === 'orderDate') {
      return (
        <p className="font-normal text-sm text-slate-800">{formatForFrontend(value)}</p>
      )
    } else if (col.key === 'paymentMethod') {
      return (
        <span className={`px-3 py-1 rounded-md text-sm font-semibold ${value === 'true' ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'
          }`}
        >
          {value === 'true' ? 'Paid' : 'Waiting'}
        </span>
      )
    }
  } else if (tableType === 'opname') {
    if (col.key === 'createdAt') {
      const date = new Date(value);
      const formattedDate = date.toLocaleDateString('id-ID', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
      return (
        <p className="font-normal text-sm text-slate-800">{formattedDate}</p>
      );
    } else if (col.key === 'difference') {
      const num = Number(value);
      return (
        <span
          className={`px-3 py-1 rounded-md text-sm font-semibold ${num < 0
            ? 'bg-red-200 text-red-800'
            : num > 0
              ? 'bg-yellow-100 text-yellow-600'
              : 'bg-green-100 text-green-600'
            }`}
        >
          {String(value)}
        </span>
      );
    }
  }

  if (col.key === 'actions' && actions) {
    const slugName = generateSlug(row.name);
    const slugId = `${slugName}-${row.id}`;

    return (
      <div className="flex space-x-2">
        {actions.onInfo && tableType === 'orders' ? (
          <Link href={`/admin/orders/${row.orderId}`} passHref>
            <button
              type="button"
              className="text-[#493628] border-2 border-[#493628] font-medium text-sm !rounded-lg p-2 m-1 text-center inline-flex items-center shadow-gray-300 hover:scale-[1.09] transition-transform"
            ><FaInfo />
            </button>
          </Link>
        ) : actions.onInfo && (
          <button
            type="button"
            className="text-[#493628] border-2 border-[#493628] font-medium text-sm !rounded-lg p-2 m-1 text-center inline-flex items-center hover:scale-[1.09] transition-transform"
            onClick={() => actions.onInfo?.(row.id)}
          ><FaInfo />
          </button>
        )}

        {actions.onEdit && (
          <Link href={`/admin/${tableType}/${row.id}/edit`}>
            <button
              type="button"
              className="text-[#493628] border-2 border-[#493628] font-medium text-sm !rounded-lg p-2 m-1 text-center inline-flex items-center hover:scale-[1.09] transition-transform"
            >
              <FaPenToSquare />
            </button>
          </Link>
        )}

        {actions.onDelete && tableType !== 'orders' && (
          <button
            type="button"
            className="text-[#493628] border-2 border-[#493628] font-medium text-sm !rounded-lg p-2 m-1 text-center inline-flex items-center hover:scale-[1.09] transition-transform"
            onClick={() => actions.onDelete?.(row.id)}
          >
            <FaTrashCan />
          </button>
        )}
      </div>
    );
  }

  return <p className="md:text-sm !mb-0 !important font-normal text-gray-900">
    {String(value)}
  </p>

};
