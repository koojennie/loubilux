"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";

import { Opname } from '@/types/type';

import HeaderContentAdmin from "@/components/organisms/HeaderContetntAdmin/HeaderContentAdmin";
import TableComponents from '@/components/organisms/Table/TableComponents';

type OpnameProps = {
    initialOpnames: Opname[];
}

const OpnamePage = ({ initialOpnames }: OpnameProps) => {
    const router = useRouter();

    const [opname, setOpname] = useState<Opname[]>(initialOpnames);
    // data page
    const [page, setPage] = useState<number>(1);
    const [totalItems, setTotalItems] = useState<number>(1);
    const [limit, setLimit] = useState<number>(5);
    const [sortBy, setSortBy] = useState<string>("opnameDate");
    const [orderBy, setOrderBy] = useState<string>('DESC');
    const [searchQuery, setSearchQuery] = useState<string>("");

    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        fetchAllOpname();
    }, [page, limit]);

    const fetchAllOpname = async () => {
        try {
            const response = await axios.get(
                `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/opname/all?page=${page}&limit=${limit}&sortBy=${sortBy}&orderBy=${orderBy}&searchQuery=${searchQuery}`,
                {
                    withCredentials: true
                }
            );

            setOpname(response.data.data);
            setTotalItems(response.data.totalItems);
        } catch (error) {
            console.error("Error when fetching opname", error);
            toast.error(`Error when fetching opname : ${error}`);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <>
            <div className="flex flex-col px-8 rounded-2xl shadow-xl bg-white shadow-gray-200">
                <HeaderContentAdmin
                    header="Stock Opname"
                    subHeader="List of all stock opname items"
                    labelAdd="Add Stock Opname"
                    tableType="opname"
                    columns={[
                        // { key: 'no', label: 'Number' },
                        { key: 'opnameId', label: 'Opname Id' },
                        { key: 'productName', label: 'Product Name' },
                        { key: 'createdAt', label: 'Opname Date' },
                        // { key: 'price', label: 'Price' },
                        // { key: 'statusPublish', label: 'Status' },
                        // { key: 'category', label: 'Category' },
                    ]}
                      totalItems={totalItems}
                      onChangeDropDownLimitData={setLimit}
                      onChangeDropDownOrderBy={setOrderBy}
                      onChangeDropDownSortBy={setSortBy}
                      onChangeSearchQuery={setSearchQuery}
                    // backPage={() => { console.log("Back") }}
                    toAddPage={() => router.push('/admin/opname/add')}
                />

                {!isLoading ? (
                    <TableComponents
                        data={opname}
                        columns={[
                            // { key: 'no', label: 'Number' },  
                            { key: 'opnameId', label: 'Opname Id' },
                            { key: 'createdAt', label: 'Opname Date' },
                            { key: 'productName', label: 'Product Name' },
                            { key: 'recordedStock', label: 'Stock' },
                            { key: 'physicalStock', label: 'Physical Stock' },
                            { key: 'difference', label: 'Difference' },
                            { key: 'note', label: 'Note' },
                        ]}
                        // onInfo={(id) => handleOpenCloseModalViewDetail(opname.find(opname => opname.opnameId === id))}
                        // onEdit={handleToPageEdit}
                        // onDelete={(id) => handleOpenCloseModalConfirmationDelete(opname.find(opname => opname.opnameId === id))}
                        tableType="opname"
                        page={page}
                        limit={limit}
                        totalItems={totalItems}
                        onPageChange={setPage}
                    />
                ) : (<div>Loading...</div>)}

            </div>

            {/* <ModalViewDetails
        isOpen={isModalViewDetailOpen}
        onClose={handleOpenCloseModalViewDetail}
        tableType="products"
        data={selectedViewDetailProduct}
        columns={[
          { key: 'productId', label: 'Product Code' },
          { key: 'name', label: 'Name' },
          { key: 'quantity', label: 'Quantity' },
          { key: 'price', label: 'Price' },
          { key: 'statusPublish', label: 'Status' },
          { key: 'category', label: 'Category' },
        ]}
        ref={modalViewDetailRef}
      />

      <ModalConfirmationDelete
        isOpen={isModalConfirmationDeleteOpen}
        onClose={handleOpenCloseModalConfirmationDelete}
        // onConfirm={() => handleDeleteProduct} 
        onConfirm={() => handleDeleteProduct(selectedDeleteProduct)}
        ref={modalConfirmationDeleteRef}
      />
                 */}
            <Toaster />
        </>
    );
}

export default OpnamePage;