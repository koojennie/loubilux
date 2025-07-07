'use client';

import { useSidebar } from "@/context/SidebarContext";
import Row from "./Row";
import { FaWhatsapp } from "react-icons/fa6";
import StatusBadge from "@/components/Atoms/StatusBadge";
import { Order } from "@/types/type";

interface TransactionDetailContentProps {
  order: Order;
}

export default function TransactionDetailContent({ order }: TransactionDetailContentProps) {
  function formatOrderDate(dateString: string): string {
    const [datePart, timePart] = dateString.split(", ");
    const [day, month, year] = datePart.split("/").map(Number);

    const monthNames = [
      "Januari", "Februari", "Maret", "April", "Mei", "Juni",
      "Juli", "Agustus", "September", "Oktober", "November", "Desember"
    ];

    const monthName = monthNames[month - 1];

    return `${day} ${monthName} ${year}`;
  }


  console.log(order)


  const { expanded } = useSidebar();
  return (
    <main className={`main-wrapper ${expanded ? 'expanded' : 'collapsed'}`}>
      <div className="ps-lg-0">
        <h2 className="text-4xl fw-bold color-palette-1 mb-30">Order Details #{order.orderId}</h2>
        <div className="details">
          <div className="main-content main-content-card overflow-auto">
            <section className="checkout mx-auto">
              <div className="d-flex flex-row  align-items-center justify-content-between mb-30">
                <div className="game-checkout d-flex flex-row align-items-center">
                  <div className="pe-4">
                    <img src="/icon/loubilux-logo.png" width="100" height="10" className="img-fluid" alt="" />
                  </div>
                </div>
                <StatusBadge status={order.statusOrder as 'Pending' | 'Success' | 'Failed'} />
              </div>
              <hr />
              <div className="purchase pt-10">
                <h2 className="text-xl color-palette-1">Your Order is Confirmed</h2>
                <table className="text-lg color-palette-1 mt-3">
                  <thead>
                    <tr className="">
                      <th className="pr-20">Name</th>
                      <th className="pr-20">Date</th>
                      <th>Payment</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="pr-20">{order.user.name}</td>
                      <td className="pr-20">{formatOrderDate(order.orderDate)}</td>
                      <td>Midtrans</td>
                    </tr>
                  </tbody>
                </table>
                <table className="text-lg color-palette-1 mt-3">
                  <thead>
                    <tr className="">
                      <th>Delivery Info</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Jl. Margonda Raya Pondok Cina, Depok</td>
                    </tr>
                  </tbody>
                </table>
                <div className="border-b-2 border-gray-200 border-dashed mt-3">
                </div>
                {/* product lists */}
                {order.items.map((item, index) => (
                  <div key={index} className="flex items-center justify-between !pt-6 border-b-2 border-dashed !pb-6 border-gray-200">
                    <div className="flex items-center gap-3">
                      <img src={item.images[0] || "/img/placeholder-image.svg"} alt="product" className="w-[100px] h-[100px] rounded-lg max-sm:w-[50px] max-sm:h-[50px]" />
                      <div className="flex flex-col">
                        <p className="text-lg font-semibold">{item.name}</p>
                        <p className="text-base font-normal">{typeof item.category === 'string' ? item.category : item.category.name}</p>
                        <p className="text-base font-medium">{item.quantity}x</p>
                      </div>
                    </div>
                    <p className="text-lg font-medium">{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(Number(item.subPrice))}</p>
                  </div>
                ))}

              </div>
              <div className="!pt-6">
                <Row label="Shipping Fee" value="Rp 15.000" />
                <Row label="Total" value={new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(Number(order.totalPrice))} />
              </div>
              <div className="w-60 mt-8">
                <a className="flex items-center justify-center gap-2 !mx-auto !rounded-full py-3 px-7 text-center bg-[#493628] !font-semibold text-lg text-white transition-all duration-500 hover:bg-[#705C53]" href="https://api.whatsapp.com/send/?phone=6281212768921&text&type=phone_number&app_absent=0" target="_blank" role="button">
                  <FaWhatsapp />
                  Contact Admin
                </a>
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  )
}
