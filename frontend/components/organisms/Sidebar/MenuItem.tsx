import cx from "classnames";
import Link from "next/link";
import { FaReceipt, FaUserPen, FaArrowRightFromBracket, FaMapLocationDot  } from "react-icons/fa6";

import React from "react";

interface MenuItemProps {
    title: string;
    icon: 'ic-menu-transactions' | 'ic-menu-profile' | 'ic-menu-logout' | 'ic-menu-address';
    href: string;
    active?: boolean;
    onClick?: React.MouseEventHandler<HTMLDivElement>;
}

const iconMap = {
  'ic-menu-transactions': FaReceipt,
  'ic-menu-profile': FaUserPen,
  'ic-menu-logout': FaArrowRightFromBracket,
  'ic-menu-address': FaMapLocationDot,
};

export default function MenuItem(props: Partial<MenuItemProps>) {
  const { title, icon, href, active } = props;
  const classItem = cx({
    item: true,
    'mb-30': true,
    active,
  })
  const IconComponent = icon ? iconMap[icon] : null;

  return (
    <div className={classItem} onClick={props.onClick}>
      {IconComponent && (
        <div className="me-3 cursor-pointer">
          <IconComponent size={24} className="text-[#493628]" />
        </div>
      )}
      <p className="item-title m-0">
        <Link
          href={href || '/'}
          className="text-lg text-decoration-none"
        >
          {title}
        </Link>
      </p>
    </div>
  );
}
