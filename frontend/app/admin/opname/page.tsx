"use client";

import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";

import { Opname } from '@/types/type';

import HeaderContentAdmin from "@/components/organisms/HeaderContetntAdmin/HeaderContentAdmin";
import TableComponents from '@/components/organisms/Table/TableComponents';
import DeleteConfirmation from '@/components/Atoms/DeleteConfirmation';

const Page = () => {
    const router = useRouter();

    // data page
    const [opname, setOpname] = useState<Opname[]>([]);

    // pagination and sorting
    const [page, setPage] = useState<number>(1);
    const [totalItems, setTotalItems] = useState<number>(1);
    const [limit, setLimit] = useState<number>(5);
    const [sortBy, setSortBy] = useState<string>("createdAt");
    const [orderBy, setOrderBy] = useState<string>('ASC');
    const [searchQuery, setSearchQuery] = useState<string>("");

    const [isLoading, setIsLoading] = useState<boolean>(true);

    // modal state
    const [selectedDeleteOpname, setSelectedDeleteOpname] = useState<Opname | null>(null);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        fetchAllOpname();
    }, [page, limit, orderBy, sortBy, searchQuery]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
                setIsModalOpen(false);
            }
        };

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape" && isModalOpen) {
                setIsModalOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [isModalOpen]);

    const fetchAllOpname = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get(
                `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/opname/all?page=${page}&limit=${limit}&sortBy=${sortBy}&orderBy=${orderBy}&searchQuery=${searchQuery}`,
                { withCredentials: true }
            );

            const result = response.data.data.map((item: any) => ({
                id: item.opnameId,
                ...item,
            }));

            setOpname(result);
            setTotalItems(response.data.totalItems);
        } catch (error) {
            console.error("Error fetching opname", error);
            toast.error("Failed to fetch opname data");
        } finally {
            setIsLoading(false);
        }
    };

    const handleDeleteOpname = async (opname: Opname | null) => {
        if (!opname) {
            toast.error('No Opname Selected for deletion');
            return;
        }

        setIsLoading(true);
        try {
            await axios.delete(
                `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/opname/${opname.opnameId}`,
                { withCredentials: true }
            );

            toast.success('Deleted Opname Successfully');
            fetchAllOpname();
            setIsModalOpen(false);
        } catch (error) {
            console.error("Error deleting opname", error);
            toast.error("Failed to delete opname");
        } finally {
            setIsLoading(false);
        }
    };

    const handleOpenCloseModal = (opname?: Opname) => {
        setSelectedDeleteOpname(opname || null);
        setIsModalOpen(!isModalOpen);
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
                        { key: 'opnameId', label: 'Opname Id' },
                        { key: 'productName', label: 'Product Name' },
                        { key: 'createdAt', label: 'Opname Date' },
                    ]}
                    totalItems={totalItems}
                    onChangeDropDownLimitData={setLimit}
                    onChangeDropDownOrderBy={setOrderBy}
                    onChangeDropDownSortBy={setSortBy}
                    onChangeSearchQuery={setSearchQuery}
                    toAddPage={() => router.push('/admin/opname/add')}
                />

                {!isLoading ? (
                    <TableComponents
                        data={opname}
                        columns={[
                            { key: 'opnameId', label: 'Opname Id' },
                            { key: 'createdAt', label: 'Opname Date' },
                            { key: 'productName', label: 'Product Name' },
                            { key: 'recordedStock', label: 'Stock' },
                            { key: 'physicalStock', label: 'Physical Stock' },
                            { key: 'difference', label: 'Difference' },
                            { key: 'note', label: 'Note' },
                        ]}
                        onEdit={() => {}}
                        onDelete={(id) => handleOpenCloseModal(opname.find(o => o.opnameId === id))}
                        tableType="opname"
                        page={page}
                        limit={limit}
                        totalItems={totalItems}
                        onPageChange={setPage}
                    />
                ) : (
                    <div>Loading...</div>
                )}
            </div>

            <DeleteConfirmation
                isOpen={isModalOpen}
                onClose={handleOpenCloseModal}
                onConfirm={() => handleDeleteOpname(selectedDeleteOpname)}
                title="Delete Opname"
                message="Are you sure? This action cannot be undone."
            />

            <Toaster />
        </>
    );
};

export default Page;
