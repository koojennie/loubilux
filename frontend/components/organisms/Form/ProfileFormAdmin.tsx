"use client";
import React, { useState, useEffect, FormEvent, Fragment } from "react";
import { useRouter } from "next/navigation";
import axios from "axios"
import { BiSolidEditAlt } from "react-icons/bi";;
import ImageUploader from "../ImageUploader/ImageUploder";
import ModalConfirmation from "../Modal/ModalConfirmation";


interface UserFormProps {
  onSubmit?: (formData: any) => void;
  onEditSubmit?: (formData: any) => void;
  isEdit?: boolean;
  initialData?: any;
}

const ProfileFormAdmin: React.FC<UserFormProps> = ({ onSubmit, onEditSubmit, isEdit = false, initialData }) => {
  const router = useRouter();
  const defaultImage = "https://res.cloudinary.com/dqjlprqcy/image/upload/v1742188549/user-loubilux_ldr7fh.svg";


  // state form
  const [generatedUserCode, setGeneratedUserCode] = useState(initialData?.userId || "");
  const [name, setName] = useState(initialData?.name || "");
  const [username, setUsername] = useState(initialData?.username || "");
  const [email, setEmail] = useState(initialData?.email || "");
  const [phoneNumber, setPhoneNumber] = useState(initialData?.phoneNumber || "");
  const [role, setRole] = useState(initialData?.role || "user");
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
    if (initialData) {
      setGeneratedUserCode(initialData.userId || "");
      setName(initialData.name || "");
      setUsername(initialData.username || "")
      setEmail(initialData.email || "")
      setPhoneNumber(initialData.phoneNumber || "")
      setRole(initialData.role || "")
      setProfilePicture(initialData.profilePicture || "");
      setOldImage(initialData.profilePicture || "");
    }
  }, [initialData, isEdit]);

  useEffect(() => {

  })

  const validatePassword = (password: string) => {
    const strongPasswordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
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
  const handleIsOpenCloseModalConfirmation = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitEvent(e);
    setIsOpenCloseModalConfirmation(true);
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
      console.log("case pertama upload");
    }

    // case 2: deleted image profile
    if (!profilePicture && oldImage) {
      tempDeletedImage = oldImage;
      console.log("case kedua upload");
    }

    // case 3 : replace old profile image
    if (profilePicture && base64Pattern.test(profilePicture) && oldImage) {
      tempNewImage = profilePicture;
      tempDeletedImage = oldImage;

      console.log("case ketiga upload");
    }

    // case 4 does't change image 
    if (oldImage === profilePicture) {
      tempKeepImage = true;
      console.log("case keempat upload = ", tempKeepImage);
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
        <div className="flex flex-col py-8 pt-8 mb-12 px-8 ">
          <h4 className="flex text-2xl mb-1 !font-semibold text-[#493628]">
            {isEdit ? "Edit Profile Page" : " My Profile Page"}
          </h4>
          {!isEdit && (
            <button className="flex justify-end gap-2 text-base font-medium" onClick={() => { router.push('/admin/profile/edit') }}>
              Edit Profile <BiSolidEditAlt className="" size={20} />
            </button>

          )}
          <p className="mb-4 text-xl font-medium mt-1 text-[#493628]">
            {isEdit ? "Edit Profile" : "Profile User"}
          </p>
          <div className="grid grid-cols-1 gap-3">

            {isEdit ? (
              <div className="w-full">
                <ImageUploader isProfileAdmin={true} image={profilePicture} setImage={setProfilePicture} />
              </div>
            ) : (
              <img src={profilePicture || defaultImage} width="90" height="90" className="avatar img-fluid" />
            )}

            {/* User Form */}
            <div className="w-full mt-2">
              <p className="block mb-2 font-medium text-lg text-[#493628]">User ID</p>
              <p className="text-gray-900 text-base truncate">{generatedUserCode || `Please Choose Category first`}</p>
              <input type="hidden" name='productCode' value={generatedUserCode} />
            </div>

            {/* Name */}
            <div className="w-full">
              <label className="block mb-1 font-medium text-lg text-[#493628]">Name</label>
              {isEdit ? (

                <input
                  type="text"
                  className="w-full h-10 bg-transparent placeholder:text-[#493628] text-[#493628] text-sm border border-slate-200 rounded px-3 shadow-sm focus:border-slate-400"
                  placeholder="username..."
                  value={name}
                  onChange={(e) => { setName(e.target.value) }
                  }
                />
              ) : (
                <p className="text-gray-900 text-base truncate">{name || `Please Choose Category first`}</p>
              )}
            </div>

            {/* username */}
            <div className="w-full">
              <label className="block mb-1 font-medium text-lg text-[#493628]">Username</label>
              {isEdit ? (
                <input
                  type="text"
                  className="w-full h-10 bg-transparent placeholder:text-[#493628] text-[#493628] text-sm border border-slate-200 rounded px-3 shadow-sm focus:border-slate-400"
                  placeholder="username..."
                  value={username}
                  onChange={(e) => { setUsername(e.target.value) }
                  }
                />
              ) : (
                <p className="text-gray-900 text-base truncate">{username}</p>
              )}
            </div>

            {/* phone number */}
            <div className="w-full">
              <label className="block mb-1 font-medium text-lg text-[#493628]">Phone Number</label>
              {isEdit ? (

                <input
                  type="text"
                  className="w-full h-10 bg-transparent placeholder:text-[#493628] text-[#493628] text-sm border border-slate-200 rounded px-3 shadow-sm focus:border-slate-400"
                  placeholder="Phone Number..."
                  value={phoneNumber}
                  onChange={(e) => { setPhoneNumber(e.target.value) }
                  }
                />
              ) : (
                <p className="text-gray-900 text-base truncate">{phoneNumber}</p>
              )}
            </div>

            {/* Email */}
            <div className="w-full">
              <label className="block mb-1 font-medium text-lg text-[#493628]">Email</label>
              {isEdit ? (
                <input
                  type="email"
                  className="w-full h-10 bg-transparent placeholder:text-[#493628] text-[#493628] text-sm border border-slate-200 rounded px-3 shadow-sm focus:border-slate-400"
                  placeholder="email..."
                  value={email}
                  onChange={(e) => { setEmail(e.target.value) }
                  }
                />
              ) : (
                <p className="text-gray-900 text-base truncate">{email}</p>
              )}
            </div>

            {/* Role */}
            <div className="w-full">
              <label className="block mb-1 font-medium text-lg text-[#493628]">Role</label>
              {isEdit ? (

                <select
                  className="w-full h-10 bg-transparent text-[#493628] text-sm border border-slate-200 rounded px-3 shadow-sm focus:border-slate-400"
                  value={role || 'user'}
                  onChange={(e) => setRole(e.target.value)}
                >
                  <option value="user">Customer</option>
                  <option value="admin">Admin</option>
                  <option value="superadmin">Super Admin</option>
                </select>
              ) : (
                <p className={`px-3 py-2 rounded-lg w-40 text-lg text-center font-semibold ${role === 'user' ? 'bg-yellow-200 text-yellow-800' : role === 'admin' ? 'bg-indigo-200 text-indigo-800' : role === 'superadmin' ? 'bg-purple-200 text-purple-800' : 'bg-gray-200 text-gray-800'}`}
                  >
                    {role === 'superadmin' ? String('Super Admin') : role === 'admin' ? String('Admin') : role === 'user' ? String('User') : String(role)}
                </p>
              )}
            </div>

            {isEdit && (
              <Fragment>
                {/* Password */}
                <div className="mb-4">
                  <label className="block mb-1 text-sm text-[#493628]">Password</label>
                  <input
                    type="password"
                    className="w-full h-10 bg-transparent placeholder:text-[#493628] text-[#493628] text-sm border border-slate-200 rounded px-3 shadow-sm focus:border-slate-400"
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
                  <label className="block mb-1 text-sm text-[#493628]">Confirm Password</label>
                  <input
                    type="password"
                    className="w-full h-10 bg-transparent placeholder:text-[#493628] text-[#493628] text-sm border border-slate-200 rounded px-3 shadow-sm focus:border-slate-400"
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
              </Fragment>
            )}

          </div>
        </div>


        <div className={`${isEdit ? 'p-8 pl-8' : "pl-8 pb-3 "} `}>
          <div className=" content-end">
            <button
              className="select-none rounded border-2 border-[#493628] py-2 px-4 text-center text-sm font-semibold text-[#493628] transition-all hover:bg-[#493628] hover:text-white disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              type="button"
              onClick={() => router.push('/admin')}
            >
              {isEdit ? "Cancel" : "Back"}
            </button>
            <span className="px-2"></span>
            {isEdit && (
              <button
                className=" mx-auto select-none rounded bg-slate-800 py-2 px-4 text-center text-sm font-semibold text-white shadow-md shadow-slate-900/10 transition-all hover:shadow-lg hover:shadow-slate-900/20 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                type="submit"
                onClick={handleIsOpenCloseModalConfirmation}
                disabled={!isEdit && (!isPasswordValid || !isMatchPassword)}
              >
                Save
              </button>
            )}
          </div>
        </div>
      </form>

      <ModalConfirmation
        isOpen={isOpenCloseModalConfirmation}
        onClose={() => setIsOpenCloseModalConfirmation(false)}
        onConfirm={() => handleSubmit(submitEvent!)}
        textModal="Are you sure add this users?"
      />

      {/* <ModalConfirmationDelete 
    isOpen={isOpenCloseModalDeleteConfirmation}
    onClose={()=> setIsOpenCloseModalDeleteConfirmation(false)}
    onConfirm={}
  /> */}
    </div>

  );
};

export default ProfileFormAdmin;