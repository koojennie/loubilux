'use client'
import React, { useState, useEffect } from "react";
import { toast, Toaster } from "react-hot-toast"
import axios from "axios";
import { FaRegTrashCan } from "react-icons/fa6";
import { useSidebar } from "@/context/SidebarContext";
import Input from "../Input/Input";
import { User } from "@/types/type";


export default function ProfileContent() {
  const { expanded } = useSidebar();

  // state user
  const [user, setUser] = useState<User | null>(null);
  const [userId, setUserId] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [changePassword, setChangePassword] = useState<boolean>(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageBase64, setImageBase64] = useState<string | null>(null);


  const fetchUser = async () => {
    try {
      const authRes = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/auth/me`, {
        withCredentials: true,
      })

      const userId = authRes.data.user.id
      const userRes = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/users/userbyid/${userId}`,
        {
          withCredentials: true,
        }
      )

      setUser(userRes.data.data)
    } catch (error: any) {
      const msg = error?.response?.data?.message || 'Failed to fetch user data.'
      toast.error(msg)
      console.error('Fetch error:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUser();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    if (!user) return
    setUser({ ...user, [name]: value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) return

    try {
      const updateData: any = {
        name: user.name,
        username: user.username,
        email: user.email,
        phoneNumber: user.phoneNumber,
      };

      if (changePassword) {
        updateData.password = user.password;
        updateData.confirmPassword = user.confirmPassword;
      }

      if(imageBase64) {
        updateData.newImage = imageBase64;
      }

      console.log(updateData);

      // await axios.put(
      //   `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/users/${user.id}`,
      //   updateData,
      //   { withCredentials: true }
      // )
      toast.success('Profile updated successfully!')
    } catch (error: any) {
      toast.error(error?.response?.data?.message || 'Failed to update profile.')
    }
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImageFile(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setImageBase64(reader.result as string); 
    };
    reader.readAsDataURL(file);
  };

  if (loading) {
    return (
      <main className={`main-wrapper ${expanded ? 'expanded' : 'collapsed'}`}>
        <div className="ps-lg-0 w-full max-w-xl">
          <h2 className="text-4xl fw-bold color-palette-1 mb-30 animate-pulse">Loading Settings...</h2>
          <div className="bg-card p-[1.875rem] w-full max-w-xl rounded-lg shadow-md animate-pulse">
            <div className="flex gap-5 items-center">
              <div className="w-[90px] h-[90px] rounded-full bg-gray-300" />
              <div className="flex flex-col gap-2">
                <div className="w-[90px] h-[30px] bg-gray-300 rounded" />
                <div className="w-[90px] h-[30px] bg-gray-300 rounded" />
              </div>
            </div>

            <div className="mt-8 space-y-5">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="w-full mt-2 h-12 bg-gray-300 rounded" />
              ))}
            </div>

            <div className="mt-6 flex items-center gap-3">
              <div className="w-5 mt-2 h-5 bg-gray-300 rounded" />
              <div className="w-32 mt-2 h-5 bg-gray-300 rounded" />
            </div>

            <div className="mt-6 space-y-5">
              <div className="w-full mt-2 h-12 bg-gray-300 rounded" />
              <div className="w-full mt-2 h-12 bg-gray-300 rounded" />
            </div>

            <div className="mt-8">
              <div className="w-full mt-2 h-12 bg-gray-400 rounded" />
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className={`main-wrapper ${expanded ? 'expanded' : 'collapsed'}`}>
      <div className="ps-lg-0">
        <h2 className="text-4xl fw-bold color-palette-1 mb-30">Settings</h2>
        <div className="bg-card p-[1.875rem] w-full max-w-xl">
          <form action="" onSubmit={handleSubmit} className="w-full max-w-xl">
            <div className="photo d-flex">
              <div className="position-relative me-20">
                {imageBase64 ? (
                  <img src={imageBase64} alt="Preview" width="90" height="90" className="avatar img-fluid rounded-full" />
                ) : (
                  <img src={user?.profilePicture || "icon/upload.svg"} width="90" height="90" className="avatar img-fluid rounded-full" />
                )}
                
                <div className="avatar-overlay position-absolute top-0 d-flex justify-content-center align-items-center">
                  <FaRegTrashCan className="text-white" />
                </div>
              </div>
              <div className="image-upload">
                <label htmlFor="avatar">
                  <img src="/icon/upload.svg" width="90" height="90" alt="upload" />
                </label>
                <input id="avatar" type="file" name="avatar" accept="image/png, image/jpeg" onChange={handleImageChange}/>
              </div>
            </div>

            <div className="pt-30">
              <Input
                label=""
                placeholder="Enter your full name"
                nameInput={"userId"}
                value={userId}
                type="hidden"
              />
            </div>
            <div className="pt-30">
              <Input
                label="Full Name"
                placeholder="Enter your full name"
                nameInput={"name"}
                value={user?.name}
                type="text"
                onChange={handleChange}
              />
            </div>
            <div className="pt-30">
              <Input
                label="Username"
                placeholder="Enter your username"
                nameInput={"username"}
                value={user?.username}
                type="text"
                onChange={handleChange}
              />
            </div>
            <div className="pt-30">
              <Input
                label="Email Address"
                placeholder="Enter your email adress"
                nameInput={"email"}
                value={user?.email}
                type="email"
                onChange={handleChange}
              />
            </div>
            <div className="pt-30">
              <Input
                label="Phone Number"
                placeholder="Enter your number"
                nameInput={"phoneNumber"}
                value={user?.phoneNumber}
                type="text"
                onChange={handleChange}
              />
            </div>
            <div className="flex items-center pt-3">
              <input
                id="checked-checkbox"
                type="checkbox"
                checked={changePassword}
                onChange={() => setChangePassword(!changePassword)}
                className="w-5 h-5"
              />
              <label className="ms-2 text-base font-medium text-[#493628]">Change Password</label>
            </div>
            {changePassword && (
              <div id="passwordSection">
                <div className="pt-30">
                  <Input label="Password"
                    placeholder="Enter your password"
                    nameInput="password"
                    type="password"
                    onChange={handleChange}
                  />
                </div>
                <div className="pt-30">
                  <Input label="Confirm Password"
                    placeholder="Confirm your password"
                    nameInput="confirmPassword"
                    type="password"
                    onChange={handleChange}
                  />
                </div>
              </div>
            )}
            <div className="button-group d-flex flex-column pt-50">
              <button type="submit" className="btn btn-save fw-medium text-lg text-white rounded-pill"
                role="button">Save My Profile</button>
            </div>
          </form>
        </div>
      </div>
    </main>
  )
}
