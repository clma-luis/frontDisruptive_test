import { URL_HOME } from "@/shared/constants/urlPaths";
import { NavbarMenu } from "../NavbarMenu";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0  border-gray-200  bg-background dark:bg-background">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href={URL_HOME} className="flex items-center space-x-3 rtl:space-x-reverse">
          <span className="self-center text-2xl font-bold whitespace-nowrap dark:text-white">DISRUPTIVE</span>
        </a>
        <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          <NavbarMenu />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
