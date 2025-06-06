"use client"

import React, {useState, useEffect} from "react";
import axios from "axios";
import ButtonTab from "./ButtonTab";
import TableRow from "./TableRow";

export default function TransactionContent() {

  const fetchAllOrderUser = () => {
    try {
      
    } catch (error) {
      console.error("error message when get all order user");
    }
  }

  return (
    <main className="main-wrapper">
      <div className="ps-lg-0">
        <h2 className="text-4xl fw-bold color-palette-1 mb-30">
          My Transactions
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
            Latest Transactions
          </p>
          <div className="main-content main-content-table overflow-auto">
            <table className="table table-borderless">
              <thead>
                <tr className="color-palette-1">
                  <th className="" scope="col">
                    Product
                  </th>
                  <th scope="col">Quantity</th>
                  <th scope="col">Price</th>
                  <th scope="col">Status</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody id="list_status_item">
                <TableRow image="featured-item1" title="Coach Mollie Tote Bag" category="Bag" quantity={1} price={290000} status="Pending" />
                <TableRow image="featured-item2" title="Michael Kors Crossbody" category="Bag" quantity={1} price={740000} status="Success" />
                <TableRow image="featured-item3" title="Lacoste Geneva 2001138" category="Wrist Watch" quantity={1} price={120000} status="Failed" />
                <TableRow image="featured-item4" title="Longchamp Sunglasses" category="Sunglasses" quantity={1} price={200000} status="Pending" />
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
}
