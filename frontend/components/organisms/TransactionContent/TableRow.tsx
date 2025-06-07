import Link from "next/link";
import cx from "classnames";
import Image from "next/image";
import { HiClock, HiCheckCircle, HiXCircle } from "react-icons/hi";

interface TableRowProps {
    image: string;
    title: string;
    category: string;
    quantity: number;
    price: string;
    status: 'Pending' | 'Success' | 'Failed';
}

export default function TableRow(props: TableRowProps) {
    const { image, title, category, quantity, price, status } = props;
    const statusClass = cx({
        'float-start icon-status' : true,
        pending: status === 'Pending',
        success: status === 'Success',
        failed: status === 'Failed',
    });

    const statusConfig = {
      Pending: {
        icon: <HiClock className="me-1 text-yellow-600" />,
        className: "bg-yellow-100 text-yellow-800",
      },
      Success: {
        icon: <HiCheckCircle className="me-1 text-green-600" />,
        className: "bg-green-100 text-green-800",
      },
      Failed: {
        icon: <HiXCircle className="me-1 text-red-600" />,
        className: "bg-red-100 text-red-800",
      },
    };

    const { icon, className } = statusConfig[status] || {
      icon: null,
      className: "bg-gray-100 text-gray-800",
    };

  return (
    <tr data-category="pending" className="align-middle">
      <th scope="row">
        <Image
          className="float-start me-3 mb-lg-0 mb-3 rounded-xl"
          src={`/img/${image}.png`}
          width={80}
          height={80}
          alt=""
        />
        <div className="game-title-header">
          <p className="game-title fw-medium text-start color-palette-1 m-0">
            {title}
          </p>
          <p className="text-xs fw-normal text-start color-palette-2 m-0">
            {category}
          </p>
        </div>
      </th>
      <td>
        <p className="fw-medium color-palette-1 m-0">{quantity} pcs</p>
      </td>
      <td>
        <p className="fw-medium color-palette-1 m-0">{price}</p>
      </td>
      <td>
        <div className={`inline-flex items-center px-2.5 py-0.5 rounded text-sm font-medium ${className}`}>
          {icon}
          {status}
        </div>
      </td>
      <td>
        <Link
          href="/member/transactions/detail"
          className="btn btn-status rounded-pill text-sm"
        >
          Details
        </Link>
      </td>
    </tr>
  );
}
