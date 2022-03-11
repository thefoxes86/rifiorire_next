import Link from "next/link";
import CartIcon from "./cart/CartIcon";
import { useState } from "react";
import Hamburger from "./Hamburger";
import SearchIcon from "./SVG/SearchIcon";
import Logo from "./SVG/Logo";
import Heart from "./SVG/Heart";
import User from "./SVG/User";

const Nav = ({ menu }) => {
  const [isMenuVisible, setMenuVisibility] = useState(false);

  return (
    <header>
      <nav
        id="header"
        className="fixed top-0 z-50 w-full md:py-1 py-3 bg-white"
      >
        <div className="container flex flex-wrap items-center justify-between px-6 mx-auto mt-0">
          <div className="order-2 md:order-1 flex items-center">
            <Hamburger items={menu} setMenuVisibility={setMenuVisibility} />
            {/* <SearchIcon /> */}
          </div>
          <div className="order-1 md:order-2">
            <Link href="/">
              <a className="flex items-center text-xl font-bold tracking-wide text-gray-800 no-underline hover:no-underline ">
                <Logo />
              </a>
            </Link>
          </div>
          <div
            className="flex items-center order-2 md:order-3"
            id="nav-content"
          >
            {/* <Search /> */}
            {/* <SVGMobileSearchIcon /> */}
            {/* <Heart /> */}
            {/* <User /> */}

            <CartIcon />
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Nav;
