"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import TableComponents from "@/components/organisms/Table/TableComponents";
import HeaderContentAdmin from "@/components/organisms/HeaderContetntAdmin/HeaderContentAdmin";
import ModalConfirmationDelete from "@/components/organisms/Modal/ModalConfirmationDelete";
import ModalViewDetail from "@/components/organisms/Modal/ModalViewDetail";

export interface User {
  _id: string;
  id: string;
  userId: string;
  name: string;
  username: string;
  email: string;
  phoneNumber: string;
  role: string;
  profilePicture: string;
}

interface UsersProps {
  initialUsers: User[];
};

const UserPage = ({ initialUsers }: UsersProps) => {
  const router = useRouter();

  const [user, setUser] = useState<User[]>(initialUsers);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedViewDetailUser, setSelectedViewDetailUser] = useState<User | null>(null);
  const [selectedDeleteUser, setSelectedDeleteUser] = useState<User | null>(null);
  const [page, setPage] = useState<number>(1);
  const [totalUsers, setTotalUsers] = useState<number>(1);
  const [limit, setLimit] = useState<number>(5);
  const [sortBy, setSortBy] = useState<string>("userId");
  const [orderBy, setOrderBy] = useState<string>("asc");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isModalConfirmationDeleteOpen, setIsModalConfirmationDeleteOpen] = useState<boolean>(false);
  const [isModalViewDetailOpen, setIsModalViewDetailOpen] = useState<boolean>(true);
  const [token, setToken] = useState<string>("");


  const fetchAllUsers = async () => {
    setIsLoading(true);

    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/users?sortBy=${sortBy}&sortOrder=${orderBy}&limit=${limit}&page=${page}&searchQuery=${searchQuery}`,
        {
          withCredentials: true
        }
      )
      const result = response.data.data.map((user: any)=>({
        id: user._id,
        ...user
      }));
      setUser(result);
      setTotalUsers(response.data.totalUsers)
    } catch (error) {
      console.error("Error fetching products", error);
    }
    setIsLoading(false);
  };

  // fetch data
  useEffect(() => {
    fetchAllUsers()
  }, [ orderBy, sortBy, page, limit, searchQuery]);

  const handleDeleteUsers = async (user: User | null) => {
    if (!user) {
      toast.error("No user selected for deletion");
      return;
    }

    try {
      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/users/${user._id}`,
        {
          withCredentials: true
        }
      );

      toast.success("User deleted successfully");

      fetchAllUsers();

      setIsModalConfirmationDeleteOpen(!isModalConfirmationDeleteOpen);
    } catch (error) {
      toast.error("Error occurred while deleting the user");
      console.error("Error when deleting user", error);
    }
  };

  const handleOpenCloseModalConfirmationDelete = (user?: User) => {
    setSelectedDeleteUser(user || null);
    setIsModalConfirmationDeleteOpen(!isModalConfirmationDeleteOpen);
  };

  const handleOpenCloseModalViewDetail = (user?: User) => {
    setSelectedViewDetailUser(user || null);
    setIsModalViewDetailOpen(!isModalViewDetailOpen);
  };

  const handleToPageEdit = () => { };

  return (
    <>
      <div className="flex flex-col px-8 rounded-2xl shadow-xl bg-white shadow-gray-200">
        {/*Title */}
        <HeaderContentAdmin
          header="Users"
          subHeader="List of all Users"
          labelAdd="Add Users"
          tableType="users"
          columns={[
            { key: "userId", label: "User ID" },
            { key: "name", label: "Name" },
            { key: "username", label: "username" },
            { key: "email", label: "email" },
            { key: "phoneNumber", label: "Phone Number" },
            { key: "role", label: "role" }
          ]}
          totalItems={totalUsers}
          onChangeDropDownLimitData={setLimit}
          onChangeDropDownOrderBy={setOrderBy}
          onChangeDropDownSortBy={setSortBy}
          onChangeSearchQuery={setSearchQuery}
          // backPage={() => { console.log("Back") }}
          toAddPage={() => router.push("/admin/users/add")}
        />

        {!isLoading ? (
          <TableComponents
            data={user}
            columns={[
              { key: "userId", label: "user ID" },
              { key: "username", label: "username" },
              { key: "name", label: "Name" },
              { key: "email", label: "Email" },
              { key: "role", label: "Role" },
            ]}
            onInfo={(id) => { handleOpenCloseModalViewDetail(user.find(user => user.id === id)) }}
            // onEdith={handleToPageEdit}
            onEdit={handleToPageEdit}
            onDelete  ={(id) => {handleOpenCloseModalConfirmationDelete(user.find(user => user.id === id)) }}
            tableType="users"
            page={page}
            limit={limit}
            totalItems={totalUsers}
            onPageChange={setPage}
          />
        ) : (
          <div>Loading...</div>
        )}
      </div>

      <ModalViewDetail
        isOpen={isModalViewDetailOpen}
        onClose={handleOpenCloseModalViewDetail}
        data={selectedViewDetailUser}
        tableType="users"
        columns={[
          { key: "userId", label: "user ID" },
          { key: "username", label: "username" },
          { key: "name", label: "Name" },
          { key: "email", label: "Email" },
          { key: "role", label: "Role" },
        ]}
      />

      <ModalConfirmationDelete
        isOpen={isModalConfirmationDeleteOpen}
        onClose={handleOpenCloseModalConfirmationDelete}
        // onConfirm={() => handleDeleteUsers}
        onConfirm={() => handleDeleteUsers(selectedDeleteUser)}
      />

      <Toaster />
    </>
  );
};

export default UserPage;
