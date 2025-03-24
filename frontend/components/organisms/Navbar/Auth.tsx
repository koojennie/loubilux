import Link from "next/link";
import { FaCartShopping } from "react-icons/fa6";

interface AuthProps {
    isLogin?: boolean;
}
export default function Auth(props: Partial<AuthProps>) {
  const { isLogin } = props;
  if (isLogin) {
    return (
      <li className="nav-item my-auto dropdown flex flex-col md:flex-col lg:flex-row gap-3 md:gap-6 lg:gap-6 lg:items-center">
        <div className="vertical-line d-lg-block d-none"></div>
        <div className="relative dropdown-toggle ms-lg-25">
          <FaCartShopping className="text-3xl color-palette-1 cursor-pointer mb-16 mt-16" />
          <span className="absolute top-2 left-4 md:top-2 md:left-4 lg:top-2 lg:-right-3 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
            0
          </span>
        </div>
        <div className="sm:relative">
          <a
            className="dropdown-toggle ms-lg-25"
            href="#"
            role="button"
            id="dropdownMenuLink"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <img
              src="/img/user-loubilux.svg"
              className="rounded-circle"
              width="40"
              height="40"
              alt=""
            />
          </a>

          <ul
            className="dropdown-menu border-0"
            aria-labelledby="dropdownMenuLink"
          >
            <li>
              <Link className="dropdown-item text-lg color-palette-2" href="/member/edit-profile">
                My Profile
              </Link>
            </li>
            <li>
              <Link className="dropdown-item text-lg color-palette-2" href="/member/transactions">
                My Transactions
              </Link>
            </li>
            <li>
              <Link className="dropdown-item text-lg color-palette-2" href="/sign-in">
                Log Out
              </Link>
            </li>
          </ul>
        </div>
      </li>
    );
  }
  return (
    <li className="nav-item my-auto">
        <Link
            className="btn btn-sign-in d-flex justify-content-center ms-lg-2 rounded-pill"
            role="button" href="/sign-in"
        >
            Sign In
        </Link>
    </li>
  );
}
