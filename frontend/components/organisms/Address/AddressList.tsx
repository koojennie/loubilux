import { useSidebar } from "@/context/SidebarContext";
import { useEffect, useState } from "react";
import axios from "axios";
import { User } from "@/types/type";
import Input from "../Input/Input";
import toast, { Toaster } from "react-hot-toast";

export default function AddressList() {
  const { expanded } = useSidebar();
  const [addresses, setAddresses] = useState<any[]>([]);
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(null);
  const [userShipping, setUserShipping] = useState<User | null>(null);
  const [userId, setUserId] = useState<string>("");
  const [form, setForm] = useState({
    userId: '',
    receiverName: '',
    detail: '',
    city: '',
    province: '',
    postalCode: '',
    phoneNumber: ''
  });

  const fetchUser = async () => {
    try {
      const responseMe = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/auth/me`,
        { withCredentials: true }
      );

      const userId = responseMe.data.user.id;
      setUserId(userId);

      try {
        const responseUser = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/users/userbyid/${userId}`,
          { withCredentials: true }
        );
        setUserShipping(responseUser.data.data);
      } catch (error: any) {
        console.error(`Error when fetch user detail: ${error.message}`);
      }

    } catch (err: any) {
      console.error(`Error: ${err.message}`);
    }
  };

  const fetchAddresses = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/address`, {
        withCredentials: true,
      });
      setAddresses(response.data.data);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    fetchUser();
    fetchAddresses();
  }, []);

  useEffect(() => {
    if (selectedAddress) {
      setForm({
        userId: userId,
        receiverName: selectedAddress.receiverName,
        detail: selectedAddress.detail,
        city: selectedAddress.city,
        province: selectedAddress.province,
        postalCode: selectedAddress.postalCode,
        phoneNumber: selectedAddress.phoneNumber,
      });
    } else {
      setForm({
        userId: userId,
        receiverName: '',
        detail: '',
        city: '',
        province: '',
        postalCode: '',
        phoneNumber: '',
      });
    }
  }, [selectedAddressId]);

  const handleChange = (field: string, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleSelectAddress = (addressId: string) => {
    setSelectedAddressId(addressId);
    // console.log('Selected addressId:', addressId);
  };
  const selectedAddress = addresses.find(addr => addr.addressId === selectedAddressId);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      console.log(form);
      if (selectedAddressId) {

        await axios.put(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/address/${selectedAddressId}`, form, {
          withCredentials: true,
        });

        toast.success('Updated Successfuly');
      } else {
        await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/address/create`, form, {
          withCredentials: true,
        });
        toast.success('Create New Address Successfully')
      }

      await fetchAddresses();
      setSelectedAddressId(null);
      setForm({
        userId: userId,
        receiverName: '',
        detail: '',
        city: '',
        province: '',
        postalCode: '',
        phoneNumber: '',
      });
    } catch (error: any) {
      console.error(`Failed to save address: ${error.message}`);
    }
  };

  const handleDeleteAddress = async (addressId: string) => {
    const confirmDelete = confirm("Are you sure you want to delete this address?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/address/${addressId}`, {
        withCredentials: true,
      });
      setAddresses(prev => prev.filter(addr => addr.addressId !== addressId));
      if (selectedAddressId === addressId) {
        setSelectedAddressId(null);
      }
    } catch (error) {
      console.error("Failed to delete address", error);
      alert("Failed to delete address. Please try again.");
    }
  };



  return (
    <main className={`main-wrapper ${expanded ? 'expanded' : 'collapsed'}`}>
      <Toaster/>
      <div className="ps-lg-0">
        <h2 className="text-4xl fw-bold color-palette-1 mb-30">Address</h2>
        {/* <div className="bg-card p-[1.875rem] w-full max-w-xl"> */}
        <div className="">
          <div className="flex flex-col lg:flex-row gap-6">


            {/* Address list */}
            <div className="mt-10 ">
              <p className="text-2xl font-semibold mb-4">Select Address</p>
              <div className="grid gap-4 overflow-y-auto max-h-[600px] pr-2">
                {addresses.map((address) => (
                  <div
                    key={address.addressId}
                    onClick={() => handleSelectAddress(address.addressId)}
                    className={`relative cursor-pointer border p-3 rounded-lg transition ${selectedAddressId === address.addressId ? 'border-[#493628] bg-[#f8f5f2]' : 'border-gray-300'
                      }`}
                  >
                    {/* Delete button */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteAddress(address.addressId);
                      }}
                      className="absolute top-2 right-2 text-red-500 hover:text-red-700 text-sm"
                      title="Delete Address"
                    >
                      ✕
                    </button>

                    <p className="font-medium">{address.receiverName}</p>
                    <p className="text-sm">{address.detail}, {address.city}, {address.province}</p>
                    <p className="text-sm">{address.postalCode}</p>
                    <p className="text-sm">Phone: {address.phoneNumber}</p>
                  </div>
                ))}
                {/* Button to indicate empty form */}
                <button
                  type="button"
                  onClick={() => setSelectedAddressId(null)}
                  className={`flex items-center gap-2 border border-dashed border-gray-400 rounded-lg p-3 justify-center hover:bg-gray-100 transition ${selectedAddressId === null ? 'border-[#493628] bg-[#f8f5f2]' : 'border-gray-300'}`}
                >
                  <span className="text-xl font-bold">+</span>
                  <span>Add New Address</span>
                </button>
              </div>
            </div>


            {/* Address Form - Kanan */}
            <div className="bg-card  w-full lg:w-1/2 max-w-xl">
              <p className="text-2xl font-semibold mb-4">
                {selectedAddressId ? 'Update Address' : 'Add Address'}
              </p>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="block mb-1">Receiver Name</label>
                  <input
                    type="text"
                    className="input input-bordered w-full"
                    value={form?.receiverName}
                    onChange={(e) => handleChange('receiverName', e.target.value)}
                  />
                </div>
                <div className="mb-4">
                  <label className="block mb-1">Phone Number</label>
                  <input
                    type="text"
                    className="input input-bordered w-full"
                    value={form?.phoneNumber}
                    onChange={(e) => handleChange('phoneNumber', e.target.value)}
                  />
                </div>
                <div className="mb-4">
                  <label className="block mb-1">Detail</label>
                  <input
                    type="text"
                    className="input input-bordered w-full"
                    value={form?.detail}
                    onChange={(e) => handleChange('detail', e.target.value)}
                  />
                </div>
                <div className="mb-4">
                  <label className="block mb-1">City</label>
                  <input
                    type="text"
                    className="input input-bordered w-full"
                    value={form?.city}
                    onChange={(e) => handleChange('city', e.target.value)}
                  />
                </div>
                <div className="mb-4">
                  <label className="block mb-1">Province</label>
                  <input
                    type="text"
                    className="input input-bordered w-full"
                    value={form?.province}
                    onChange={(e) => handleChange('province', e.target.value)}
                  />
                </div>
                <div className="mb-4">
                  <label className="block mb-1">Postal Code</label>
                  <input
                    type="text"
                    className="input input-bordered w-full"
                    value={form?.postalCode}
                    onChange={(e) => handleChange('postalCode', e.target.value)}
                  />
                </div>

                <button type="submit" className="btn btn-primary bg-[#493628] w-full">
                  {selectedAddressId ? 'Update Address' : 'Save Address'}
                </button>
              </form>
            </div>

          </div>
        </div>
      </div>
    </main>
  )
}