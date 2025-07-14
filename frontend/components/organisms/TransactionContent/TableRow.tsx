import Link from "next/link";
import { HiClock, HiCheckCircle, HiXCircle } from "react-icons/hi";
import { formatForFrontend } from "@/utils/helper";

interface TableRowProps {
  orderId: string;
  name: string;
  orderDate: string;
  totalPrice: string;
  status: 'Pending' | 'Success' | 'Failed';
}

export default function TableRow(props: TableRowProps) {
  const { orderId, name, orderDate, totalPrice, status } = props;

  const statusConfig = {
    Pending: {
      icon: <HiClock className="text-sm me-1 text-yellow-600" />,
      className: "bg-yellow-100 text-yellow-600",
    },
    Processing: {
      icon: <HiClock className="text-sm me-1 text-blue-600" />,
      className: "bg-blue-100 text-blue-600",
    },
    Success: {
      icon: <HiCheckCircle className="text-sm me-1 text-green-600" />,
      className: "bg-green-100 text-green-600",
    },
    Failed: {
      icon: <HiXCircle className="text-sm me-1 text-red-600" />,
      className: "bg-red-100 text-red-600",
    },
  };

  const { icon, className } = statusConfig[status] || {
    icon: null,
    className: "bg-gray-100 text-gray-800",
  };

  return (
    <tr data-category="pending" className="align-middle">
      {/* <th scope="row"> */}
      <td>
        <p className="fw-medium color-palette-1 m-0">{orderId}</p>
      </td>
      {/* </th> */}
      <td>
        <p className="fw-medium color-palette-1 m-0">{name}</p>
      </td>
      <td>

        <p className="fw-medium color-palette-1 m-0">{formatForFrontend(orderDate)}</p>
      </td>
      <td>
        <p className="fw-medium color-palette-1 m-0">{totalPrice}</p>
      </td>
      <td>
        <div className={`inline-flex items-center px-2.5 py-0.5 rounded text-sm font-medium ${className}`}>
          {icon}
          {status}
        </div>
      </td>
      <td>
        <Link
          href={`/member/transactions/${orderId}`}
          className="btn btn-status rounded-pill text-sm"
        >
          Details
        </Link>
      </td>
    </tr>
  );
}
