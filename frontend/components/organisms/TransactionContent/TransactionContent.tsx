"use client"

import React, {useState, useEffect} from "react";
import axios from "axios";
import ButtonTab from "./ButtonTab";
import TableRow from "./TableRow";
import { useSidebar } from "@/context/SidebarContext";

export default function TransactionContent() {

  const fetchAllOrderUser = () => {
    try {
      
    } catch (error) {
      console.error("error message when get all order user");
    }
  }

  const { expanded } = useSidebar();

  return (
    <main className={`main-wrapper ${expanded ? 'expanded' : 'collapsed'}`}>
      <div className="ps-lg-0">
        <h2 className="text-4xl fw-bold color-palette-1 mb-30">
          My Orders
        </h2>
        <div className="mb-30">
          <p className="text-lg color-palette-2 mb-12">You’ve spent</p>
          <h3 className="text-5xl fw-medium color-palette-1">
            {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(Number(3190000))}
          </h3>
        </div>
        <div className="row mt-30 mb-20">
          <div className="col-lg-12 col-12 main-content">
            <div id="list_status_title">
              <ButtonTab title="All" active />
              <ButtonTab title="Success" active={false}/>
              <ButtonTab title="Pending" active={false}/>
              <ButtonTab title="Failed" active={false}/>
            </div>
          </div>
        </div>
        <div className="latest-transaction">
          <p className="text-lg fw-medium color-palette-1 mb-14">
            Latest Orders
          </p>
          <div className="main-content main-content-table overflow-x-auto md:overflow-x-visible">
            <table className="min-w-[640px] table table-borderless color-palette-1">
              <thead>
                <tr>
                  <th scope="col">
                    Order ID
                  </th>
                  <th scope="col">Customer</th>
                  <th scope="col">Order Date</th>
                  <th scope="col">Total Price</th>
                  <th className="" scope="col">Status</th>
                  <th className="w-10" scope="col">Action</th>
                </tr>
              </thead>
              <tbody id="list_status_item">
                <TableRow orderId="ORD-20250508-001" name="Jennie Koo" orderDate="08 Mei 2025" totalPrice={new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(Number(3190000))} status="Pending" />
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
}
