import cx from 'classnames';
import Link from 'next/link';

interface MenuProps {
  title: string;
  active?: boolean;
  href: string;
}

export default function Menu(props: Partial<MenuProps>) {
  const { title, active, href = '/'} = props;

  const classTitle = cx({
    'nav-link': true,
    'nav-item': true,
    'my-auto': true,
    active,
  });
  
  return (
      <Link className={classTitle} aria-current="page" href={href}>
        {title}
      </Link>
  );
}
