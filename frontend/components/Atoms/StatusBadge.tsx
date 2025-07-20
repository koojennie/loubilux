import { HiClock, HiCheckCircle, HiXCircle } from "react-icons/hi";

interface StatusBadgeProps {
  status: "Pending" | "Processing" | "Completed" | "Cancelled";
}

const statusConfig = {
  Pending: {
    icon: <HiClock className="text-xl me-1 text-yellow-600" />,
    className: "bg-yellow-100 text-yellow-600",
  },
  Processing: {
    icon: <HiClock className="text-sm me-1 text-blue-600" />,
    className: "bg-blue-100 text-blue-600",
  },
  Completed: {
    icon: <HiCheckCircle className="text-xl me-1 text-green-600" />,
    className: "bg-green-100 text-green-600",
  },
  Cancelled: {
    icon: <HiXCircle className="text-xl me-1 text-red-600" />,
    className: "bg-red-100 text-red-600",
  },
};

export default function StatusBadge({ status }: StatusBadgeProps) {
  const { icon, className } = statusConfig[status] || {
    icon: null,
    className: "bg-gray-100 text-gray-800",
  };

  return (
    <p className={`inline-flex items-center justify-center px-4 py-1 gap-1 rounded-lg text-lg font-medium ${className}`}>
      {icon}
      {status}
    </p>
  );
}