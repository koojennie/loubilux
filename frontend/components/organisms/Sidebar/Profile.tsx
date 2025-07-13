import Image from "next/image";
import { User } from "@/types/type";

interface profileProps {
  user: User
}


export default function Profile({user}: profileProps) {
  return (
    <div className="user text-center pb-50 pe-30">
      <Image
        src={user?.profilePicture || "/img/user-loubilux.svg"}
        alt="user"
        width={90}
        height={90}
        className={`avatar object-cover mb-20`}
        style={{ borderRadius: "60px", width: "90px", height: "90px" }}

      />
      <h2 className="fw-bold text-xl color-palette-1 m-0">{user.name}</h2>
      <p className="color-palette-2 m-0">{user.email}</p>
    </div>
  );
}
