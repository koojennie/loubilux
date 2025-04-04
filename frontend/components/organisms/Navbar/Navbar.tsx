import Image from "next/image"
import Auth from "./Auth"
import Menu from "./Menu"
import ToggleMenu from "./ToggleMenu"

interface NavbarProps {
  activeMenu?: 'home' | 'catalog' | 'about-us';
}

export default function Navbar(props: NavbarProps) {
  const { activeMenu } = props;
  return (
    <section>
      <nav className="navbar navbar-expand-lg navbar-light bg-light bg-white pt-lg-40 pb-lg-40 pt-30 pb-50">
          <div className="container-fluid">
              <a className="navbar-brand" href="/">
                  <Image src="/icon/loubilux-logo.png" width={60} height={60} alt="Logo" />
              </a>
              <ToggleMenu />
              <div className="collapse navbar-collapse" id="navbarNav">
                  <ul className="navbar-nav ms-auto text-lg gap-lg-0 gap-2">
                      <Menu title="Home" href="/" active={activeMenu === 'home'}/>
                      <Menu title="Catalog" href="/catalog" active={activeMenu === 'catalog'}/>
                      <Menu title="About Us" href="about-us" active={activeMenu === 'about-us'}/>
                      <Auth isLogin/>
                  </ul>
              </div>
          </div>
      </nav>
    </section>
  )
}