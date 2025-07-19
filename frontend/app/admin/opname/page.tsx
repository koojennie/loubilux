"use client";
import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";

import { Opname } from '@/types/type';

import HeaderContentAdmin from "@/components/organisms/HeaderContetntAdmin/HeaderContentAdmin";
import TableComponents from '@/components/organisms/Table/TableComponents';
import DeleteConfirmation from '@/components/Atoms/DeleteConfirmation';

type OpnameProps = {
    initialOpnames: Opname[];
}

const OpnamePage = ({ initialOpnames }: OpnameProps) => {
    const router = useRouter();

    // data page
    const [opname, setOpname] = useState<Opname[]>(initialOpnames);

    // get state page
    const [page, setPage] = useState<number>(1);
    const [totalItems, setTotalItems] = useState<number>(1);
    const [limit, setLimit] = useState<number>(5);
    const [sortBy, setSortBy] = useState<string>("createdAt");
    const [orderBy, setOrderBy] = useState<string>('ASC');
    const [searchQuery, setSearchQuery] = useState<string>("");

    // 
    const [isLoading, setIsLoading] = useState<boolean>(true);

    // state Modal
    const [selectedDeleteOpname, setSelectedDeleteOpname] = useState<Opname | null>(null);
    const [isModalConfirmationDeleteOpenClosed, setIsModalConfirmationDeleteOpenClosed] = useState<boolean>(false);
    const modalConfirmationDeleteRef = useRef<HTMLDivElement>(null);


    useEffect(() => {
        fetchAllOpname();
    }, [page, limit, orderBy, sortBy]);


    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (modalConfirmationDeleteRef.current && !modalConfirmationDeleteRef.current.contains(event.target as Node)) {
                setIsModalConfirmationDeleteOpenClosed(false);
            }
        };

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                if (isModalConfirmationDeleteOpenClosed) {
                    setIsModalConfirmationDeleteOpenClosed(!isModalConfirmationDeleteOpenClosed);
                }
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [isModalConfirmationDeleteOpenClosed]);


    const fetchAllOpname = async () => {
        try {
            const response = await axios.get(
                `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/opname/all?page=${page}&limit=${limit}&sortBy=${sortBy}&orderBy=${orderBy}&searchQuery=${searchQuery}`,
                {
                    withCredentials: true
                }
            );

            const result = response.data.data.map((opname: any) => ({
                id: opname.opnameId,
                ...opname,
            }));

            setOpname(result);
            setTotalItems(response.data.totalItems);
        } catch (error) {
            console.error("Error when fetching opname", error);
            toast.error(`Error when fetching opname : ${error}`);
        } finally {
            setIsLoading(false);
        }
    }

    const handleDeleteOpname = async (opname: Opname | null) => {
        if (!opname) {
            toast.error('No Opname Selected for deletion');
            console.error('No Opname Selected for deletion');
            return;
        }

        setIsLoading(true)

        try {
            await axios.delete(
                `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/opname/${opname.opnameId}`,
                { withCredentials: true }
            );

            toast.success('Deleted Opname Sucessfully');

            fetchAllOpname();

            setIsModalConfirmationDeleteOpenClosed(!isModalConfirmationDeleteOpenClosed);
        } catch (error) {
            toast.error('Error When Deleting Opname:  ${error}');
            console.error('Error when deleting Opname ', error);

        } finally {
            setIsLoading(false);
        }
    };

    const handleOpenCloseModalConfirmationDelete = (opname?: Opname) => {
        setSelectedDeleteOpname(opname || null);
        setIsModalConfirmationDeleteOpenClosed(!isModalConfirmationDeleteOpenClosed);
    };

    return (
        <>
            <div className="flex px-8 mx-3 my-2 flex-col rounded-2xl bg-white">
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
                        onEdit={() => { }}
                        // onDelete={(id) => handleOpenCloseModalConfirmationDelete(opname.find(opname => opname.opnameId === id))}
                        onDelete={(id) => handleOpenCloseModalConfirmationDelete(opname.find(opname => opname.opnameId === id))}
                        tableType="opname"
                        page={page}
                        limit={limit}
                        totalItems={totalItems}
                        onPageChange={setPage}
                    />
                ) : (<div>Loading...</div>)}

            </div>

            <DeleteConfirmation
                isOpen={isModalConfirmationDeleteOpenClosed}
                onClose={handleOpenCloseModalConfirmationDelete}
                onConfirm={() => handleDeleteOpname(selectedDeleteOpname)}
                title="Delete Opname"
                message="Are you sure? This action cannot be undone."
            />

            <Toaster />
        </>
    );
}

export default OpnamePage;