import Input from "@/components/organisms/Input/Input";
import Sidebar from "@/components/organisms/Sidebar/Sidebar";
import { FaRegTrashCan } from "react-icons/fa6";

export default function EditProfile() {
  return (
      <section className="edit-profile overflow-auto">
        <Sidebar activeMenu="edit-profile"/>
        <main className="main-wrapper">
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
                                    <img src="/icon/upload.svg" alt="upload" />
                                </label>
                                <input id="avatar" type="file" name="avatar" accept="image/png, image/jpeg" />
                            </div>
                        </div>
                        <div className="pt-30">
                            <Input label="Full Name" />
                        </div>
                        <div className="pt-30">
                            <Input label="Username" />
                        </div>
                        <div className="pt-30">
                            <Input label="Email Address" />
                        </div>
                        <div className="pt-30">
                            <Input label="Password" />
                        </div>
                        <div className="pt-30">
                            <Input label="Confirm Password" />
                        </div>
                        <div className="button-group d-flex flex-column pt-50">
                            <button type="submit" className="btn btn-save fw-medium text-lg text-white rounded-pill"
                                role="button">Save My Profile</button>
                        </div>
                    </form>
                </div>
            </div>
        </main>
    </section>
  )
}
