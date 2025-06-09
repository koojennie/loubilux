'use client'
import { useSidebar } from "@/context/SidebarContext";
import { FaRegTrashCan } from "react-icons/fa6";
import Input from "../Input/Input";

export default function ProfileContent() {
  const { expanded } = useSidebar();
  return (
    <main className={`main-wrapper ${expanded ? 'expanded' : 'collapsed'}`}>
            <div className="ps-lg-0">
                <h2 className="text-4xl fw-bold color-palette-1 mb-30">Settings</h2>
                <div className="bg-card p-[1.875rem] w-full max-w-xl">
                    <form action="" className="w-full max-w-xl">
                        <div className="photo d-flex">
                            <div className="position-relative me-20">
                                <img src="/img/user-loubilux.svg" width="90" height="90" className="avatar img-fluid" />
                                <div
                                    className="avatar-overlay position-absolute top-0 d-flex justify-content-center align-items-center">
                                    <FaRegTrashCan width={32} height={32} className={`text-white`}/>
                                </div>
                            </div>
                            <div className="image-upload">
                                <label htmlFor="avatar">
                                    <img src="/icon/upload.svg" width="90" height="90" alt="upload" />
                                </label>
                                <input id="avatar" type="file" name="avatar" accept="image/png, image/jpeg" />
                            </div>
                        </div>
                        <div className="pt-30">
                            <Input label="Full Name" placeholder="Enter your full name"/>
                        </div>
                        <div className="pt-30">
                            <Input label="Username" placeholder="Enter your username" />
                        </div>
                        <div className="pt-30">
                            <Input label="Email Address" placeholder="Enter your email adress" />
                        </div>
                        <div className="pt-30">
                            <Input label="Password" placeholder="Enter your password" />
                        </div>
                        <div className="pt-30">
                            <Input label="Confirm Password" placeholder="Confirm your password" />
                        </div>
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
