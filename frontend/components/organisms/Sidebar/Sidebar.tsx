import Footer from "./Footer";
import MenuItem from "./MenuItem";
import Profile from "./Profile"

interface SidebarProps {
  activeMenu: 'transactions' | 'edit-profile' | 'logout';
}

export default function Sidebar(props: SidebarProps) {
  const { activeMenu } = props;
  return (
    <section className="sidebar">
      <div className="content pt-50 pb-30 ps-30">
        <Profile />
        <div className="menus">
          <MenuItem title="Transactions" icon="ic-menu-transactions" href="/member/transactions" active={activeMenu === 'transactions'}/>
          <MenuItem title="Edit Profile" icon="ic-menu-profile" href="/member/edit-profile" active={activeMenu === 'edit-profile'}/>
          <MenuItem title="Log Out" icon="ic-menu-logout" href="/" active={activeMenu === 'logout'} />
        </div>
        <Footer />
      </div>
    </section>
  );
}
