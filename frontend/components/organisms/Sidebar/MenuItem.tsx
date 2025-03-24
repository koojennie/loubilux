import Image from "next/image";
import cx from "classnames";
import Link from "next/link";

interface MenuItemProps {
    title: string;
    icon: 'ic-menu-transactions' | 'ic-menu-profile' | 'ic-menu-logout';
    href: string;
    active?: boolean;
}

export default function MenuItem(props: Partial<MenuItemProps>) {
  const { title, icon, href, active } = props;
  const classItem = cx({
    item: true,
    'mb-30': true,
    active,
  })
  return (
    <div className={classItem}>
      <div className="me-3">
        <Image src={`/icon/${icon}.svg`} width={25} height={25} alt="" />
      </div>
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
