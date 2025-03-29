"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import TableComponents from "@/components/organisms/Table/TableComponents";
import HeaderContentAdmin from "@/components/organisms/HeaderContetntAdmin/HeaderContentAdmin";
import ModalConfirmationDelete from "@/components/organisms/Modal/ModalConfirmationDelete";
import ModalViewDetails from "@/components/organisms/Modal/ModalViewDetailsProducts";

interface User {
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

const ProductPage = ({ initialUsers }: UsersProps) => {
  const router = useRouter();

  const [user, setUser] = useState<User[]>(initialUsers);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedViewDetailUser, setSelectedViewDetailUser] = useState<User | null>(null);
  const [selectedDeleteUser, setSelectedDeleteUser] = useState<User | null>(null);
  const [page, setPage] = useState<number>(1);
  const [totalItems, setTotalItems] = useState<number>(1);
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
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      setUser(response.data.data);
      console.log("data from fetch users ", response);
    } catch (error) {
      console.error("Error fetching products", error);
    }
    setIsLoading(false);
  };

  const fetchToken = async () => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/auth/login`,
        {
          username: "saniadmin1",
          password: "saniadmin1.P",
        }
      );
      const token = response.data.token;
      setToken(token);
      console.log("done get token", token);
    } catch (error) {
      console.error("Error fetching token", error);
    }
  };

  // fetch data
  useEffect(() => {
    const fetchData = async () => {
      await fetchToken();
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (token) {
      fetchAllUsers();
    }
  }, [token, orderBy, sortBy]);

  const handleDeleteUsers = async (user: User | null) => {
    // if (!user) {
    //   console.log("No product selected for deletion");
    //   return;
    // }

    // try {
    //   const response = await axios.delete(
    //     `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/products/${product._id}`,
    //     {
    //       headers: {
    //         Authorization: `Bearer ${token}`,
    //       },
    //     }
    //   );

    //   toast.success("Deleted Sucessfully");

    //   fetchProducts();

    //   setIsModalConfirmationDeleteOpen(!isModalConfirmationDeleteOpen);
    // } catch (error) {
    //   console.error("Error when deleting products ", error);
    // }
  };

  const handleOpenCloseModalConfirmationDelete = (user?: User) => {
    setSelectedDeleteUser(user || null);
    setIsModalConfirmationDeleteOpen(!isModalConfirmationDeleteOpen);
  };

  const handleOpenCloseModalViewDetail = (user?: User) => {
    console.log("ini adalah user yang di clik ", user);
    
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
          columns={[
            { key: "userId", label: "User ID" },
            { key: "name", label: "Name" },
            { key: "username", label: "username" },
            { key: "email", label: "email" },
            { key: "phoneNumber", label: "Phone Number" },
            { key: "role", label: "role" }
          ]}
          totalItems={totalItems}
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
            onEdit={handleToPageEdit}
            onDelete={() => { }}
            tableType="user"
            page={page}
            limit={limit}
            totalItems={totalItems}
            onPageChange={setPage}
          />
        ) : (
          <div>Loading...</div>
        )}
      </div>

      <ModalViewDetails
        isOpen={isModalViewDetailOpen}
        onClose={handleOpenCloseModalViewDetail}
        data={selectedViewDetailUser}
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

export default ProductPage;
