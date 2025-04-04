import cx from "classnames";
import Link from "next/link";
import { FaReceipt, FaUserPen, FaArrowRightFromBracket } from "react-icons/fa6";

interface MenuItemProps {
    title: string;
    icon: 'ic-menu-transactions' | 'ic-menu-profile' | 'ic-menu-logout';
    href: string;
    active?: boolean;
}

const iconMap = {
  'ic-menu-transactions': FaReceipt,
  'ic-menu-profile': FaUserPen,
  'ic-menu-logout': FaArrowRightFromBracket,
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
    <div className={classItem}>
      {IconComponent && (
        <div className="me-3">
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
