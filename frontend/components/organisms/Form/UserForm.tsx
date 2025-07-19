"use client";
import React, { useState, useEffect, FormEvent } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import ImageUploader from "../ImageUploader/ImageUploder";
import ModalConfirmation from "../Modal/ModalConfirmation";
import { showConfirmationAlert } from "@/components/Atoms/AlertConfirmation";

interface UserFormProps {
  onSubmit?: (formData: any) => void;
  onEditSubmit?: (formData: any) => void;
  isEdit?: boolean;
  initialData?: any;
}

const UserForm: React.FC<UserFormProps> = ({ onSubmit, onEditSubmit, isEdit = false, initialData }) => {
  const router = useRouter();

  // state form
  const [generatedUserCode, setGeneratedUserCode] = useState(initialData?.userId || "");
  const [name, setName] = useState(initialData?.name || "");
  const [username, setUsername] = useState(initialData?.username || "");
  const [email, setEmail] = useState(initialData?.email || "");
  const [phoneNumber, setPhoneNumber] = useState(initialData?.phoneNumber || "");
  const [role, setRole] = useState(initialData?.role);
  const [password, setPassword] = useState(initialData?.password || "");
  const [confirmPassword, setConfirmPassword] = useState(initialData?.password || "");
  const [profilePicture, setProfilePicture] = useState(initialData?.profilePicture || "");
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [isMatchPassword, setIsMatchPassword] = useState(false);

  const [oldImage, setOldImage] = useState<string>(""); // Store old image before replacement
  const [newImage, setNewImage] = useState<string>("");
  const [deletedImage, setDeteledImage] = useState<string>("");
  const [keepImage, setKeepImage] = useState<boolean>(false);

  // state open modal 
  const [isOpenCloseModalConfirmation, setIsOpenCloseModalConfirmation] = useState<boolean>(false);
  const [isOpenCloseModalDeleteConfirmation, setIsOpenCloseModalDeleteConfirmation] = useState<boolean>(false);
  const [submitEvent, setSubmitEvent] = useState<FormEvent | null>(null); // Simpan event

  useEffect(() => {
    if (isEdit && initialData) {
      setGeneratedUserCode(initialData.userId || "");
      setName(initialData.name || "");
      setUsername(initialData.username || "")
      setEmail(initialData.email || "")
      setPhoneNumber(initialData.phoneNumber || "")
      setProfilePicture(initialData.profilePicture || "");
      setOldImage(initialData.profilePicture || "");
      setRole(initialData.role || "")
    }
  }, [initialData, isEdit]);

  useEffect(() => {
    if (!isEdit) {
      getGenerateNewUserId();
    }
  })

  const getGenerateNewUserId = async () => {
    try {
      const result = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/users/generateuserid`);

      setGeneratedUserCode(result.data.userId);
    } catch (error) {
      console.error("error when get generate newe user Id", error)
    }
  }


  const validatePassword = (password: string) => {
    const strongPasswordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.,:;])[A-Za-z\d@$!%*?&.,:;]{8,}$/;
    return strongPasswordRegex.test(password);
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    setIsPasswordValid(validatePassword(newPassword));
  }

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newConfirmPassword = e.target.value;
    setConfirmPassword(newConfirmPassword);
    setIsMatchPassword(newConfirmPassword === password);
  }

  // Handle Open & Close Modal Confirmation
  const handleIsOpenCloseModalConfirmation = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitEvent(e);

    const isConfirmed = await showConfirmationAlert({
      title: "Confirmation",
      text: isEdit
        ? "Are you sure you want to edit this user?"
        : "Are you sure you want to add this user?",
      icon: "question",
    });

    if (isConfirmed) {
      handleSubmit(e);
    }
  }

  // handle submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const base64Pattern = /^data:image\/(png|jpeg|jpg|gif);base64,/;

    let tempNewImage = "";
    let tempDeletedImage = "";
    let tempKeepImage = false;

    // case 1 upload image first time 
    if (!oldImage && profilePicture && base64Pattern.test(profilePicture)) {
      tempNewImage = profilePicture;
    }

    // case 2: deleted image profile
    if (!profilePicture && oldImage) {
      tempDeletedImage = oldImage;
    }

    // case 3 : replace old profile image
    if (profilePicture && base64Pattern.test(profilePicture) && oldImage) {
      tempNewImage = profilePicture;
      tempDeletedImage = oldImage;
    }

    // case 4 does't change image 
    if (oldImage === profilePicture) {
      tempKeepImage = true;
    }

    const formData = {
      userId: generatedUserCode,
      name,
      username,
      email,
      phoneNumber,
      role,
      password,
      confirmPassword,
      profilePicture,
      newImage: tempNewImage,
      oldImage,
      deletedImage: tempDeletedImage,
      keepImage: tempKeepImage
    };

    if (isEdit && onEditSubmit) {
      onEditSubmit(formData);
    } else if (!isEdit && onSubmit) {
      onSubmit(formData);
    }

    // onSubmit(formData);
    setIsOpenCloseModalConfirmation(false);

  }

  return (
    <div>
      <form onSubmit={handleSubmit} action="">
        <div className="flex flex-col py-8 pt-8 mb-12 px-8">
          <h4 className="flex text-2xl font-semibold text-[#493628]">
            {isEdit ? "Edit User" : "Add New User"}
          </h4>
          <p className="mb-4 text-lg text-[#493628]">
            {isEdit ? "Change in the information below to edit user." : "Fill in the information below to add a new user."}
          </p>
          <div className="grid grid-rows-1 gap-4">

            <div className="col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* User Form */}
              <div className="w-full">
                <p className="block mb-2 font-semibold text-base text-[#493628]">User ID</p>
                <p className="text-gray-500 text-sm truncate">{generatedUserCode || `Please Choose Category first`}</p>
                <input type="hidden" name='productCode' value={generatedUserCode} />
              </div>

              {/* Name */}
              <div className="w-full">
                <label className="block mb-2 text-base font-semibold text-[#493628]">Name</label>
                <input
                  type="text"
                  className="w-full h-10 bg-transparent placeholder:text-gray-500 text-[#493628] text-sm border rounded-lg px-3 focus:border-[#493628]"
                  placeholder="username..."
                  value={name}
                  onChange={(e) => { setName(e.target.value) }
                  }
                />
              </div>

              {/* username */}
              <div className="w-full">
                <label className="block mb-2 text-base font-semibold text-[#493628]">Username</label>
                <input
                  type="text"
                  className="w-full h-10 bg-transparent placeholder:text-gray-500 text-[#493628] text-sm border rounded-lg px-3 focus:border-[#493628]"
                  placeholder="username..."
                  value={username}
                  onChange={(e) => { setUsername(e.target.value) }
                  }
                />
              </div>

              {/* phone number */}
              <div className="w-full">
                <label className="block mb-2 text-base font-semibold text-[#493628]">Phone Number</label>
                <input
                  type="text"
                  className="w-full h-10 bg-transparent placeholder:text-gray-500 text-[#493628] text-sm border rounded-lg px-3 focus:border-[#493628]"
                  placeholder="Phone Number..."
                  value={phoneNumber}
                  onChange={(e) => { setPhoneNumber(e.target.value) }
                  }
                />
              </div>

              {/* Email */}
              <div className="w-full">
                <label className="block mb-2 text-base font-semibold text-[#493628]">Email</label>
                <input
                  type="email"
                  className="w-full h-10 bg-transparent placeholder:text-gray-500 text-[#493628] text-sm border rounded-lg px-3 focus:border-[#493628]"
                  placeholder="email..."
                  value={email}
                  onChange={(e) => { setEmail(e.target.value) }
                  }
                />
              </div>

              {/* Status */}
                <div className="w-full">
                <label className="block mb-2 text-base font-semibold text-[#493628]">Role</label>
                <select
                  className="w-full h-10 bg-transparent placeholder:text-gray-500 text-[#493628] text-sm border rounded-lg px-3 focus:border-[#493628]"
                  value={role || ""}
                  onChange={(e) => setRole(e.target.value)}
                >
                  <option value="" disabled>
                  {role ? "Select Role" : "Select Role"}
                  </option>
                  <option value="user">Customer</option>
                  <option value="admin">Admin</option>
                  <option value="superadmin">Super Admin</option>
                </select>
                </div>

              <div className="col-span-2 w-full">
                {/* Password */}
                <div className="mb-4">
                  <label className="block mb-2 text-base font-semibold text-[#493628]">Password</label>
                  <input
                    type="password"
                    className="w-full h-10 bg-transparent placeholder:text-gray-500 text-[#493628] text-sm border rounded-lg px-3 focus:border-[#493628]"
                    placeholder="Your Password..."
                    value={password}
                    onChange={handlePasswordChange}
                  />
                  {/* Pesan Validasi */}
                  {password && !isPasswordValid && (
                    <p className="text-red-500 text-xs mt-1">
                      Password must be at least 8 characters, include uppercase, lowercase, number, and special character.
                    </p>
                  )}
                </div>

                {/* Confirm Password */}
                <div className="mb-4">
                  <label className="block mb-2 text-base font-semibold text-[#493628]">Confirm Password</label>
                  <input
                    type="password"
                    className="w-full h-10 bg-transparent placeholder:text-gray-500 text-[#493628] text-sm border rounded-lg px-3 focus:border-[#493628]"
                    placeholder="Confirm Password..."
                    value={confirmPassword}
                    onChange={handleConfirmPasswordChange}
                  />
                  {/* Pesan jika tidak match */}
                  {confirmPassword && !isMatchPassword && (
                    <p className="text-red-500 text-xs mt-1">Passwords do not match.</p>
                  )}
                  {/* Pesan jika cocok */}
                  {confirmPassword && isMatchPassword && (
                    <p className="text-green-500 text-xs mt-1">✅ Password match!</p>
                  )}
                </div>
              </div>
            </div>


            <div className="col-span-1">
              <label className="block mb-2 text-base font-semibold text-[#493628]">Image</label>
              <ImageUploader image={profilePicture} setImage={setProfilePicture} />
            </div>
          </div>


        </div>
        <div className="p-6 pl-8">
          <div className="right-0 content-end flex justify-start min-h-10">
            <button
              className="select-none !rounded-lg border-2 border-[#493628] px-4 text-center text-base font-semibold text-[#493628] transition-all hover:bg-[#493628] hover:text-white disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              type="button"
              onClick={() => router.push('/admin/users')}
            >
              Cancel
            </button>
            <span className="px-2"></span>
            <button
              className="select-none !rounded-lg bg-[#493628] px-4 text-center text-base font-semibold text-white transition-all hover:bg-[#705C53] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              type="submit"
              onClick={handleIsOpenCloseModalConfirmation}
              disabled={!isEdit && (!isPasswordValid || !isMatchPassword)}
            >
              Save
            </button>
          </div>
        </div>
      </form>
    </div>

  );
};

export default UserForm;