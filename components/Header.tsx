import Image from "next/image";
import { IoSunny } from "react-icons/io5";
import { FaMoon } from "react-icons/fa";
import { useContext } from "react";
import { ThemeContext } from "@/app/(home)/layout";
import useWindowWidth from "@/hooks/useWindowWidth";

const Header = () => {
  const themeContext = useContext(ThemeContext);
  const theme = themeContext.theme;

  const windowWidth = useWindowWidth();

  return (
    <header
      className={`flex justify-between items-center lg:h-[100vh]  lg:flex-col lg:rounded-tr-[28px] lg:rounded-br-[28px] ${
        theme === "light"
          ? "bg-light-headerBackground"
          : "bg-dark-headerBackground"
      }`}
    >
      {windowWidth && (
        <Image
          src="/logo.svg"
          alt="logo"
          height={windowWidth < 768 ? 72 : windowWidth < 1440 ? 80 : 103}
          width={windowWidth < 768 ? 72 : windowWidth < 1440 ? 80 : 103}
          priority
        />
      )}
      <div className="flex justify-center items-center lg:flex-col  ">
        <div className="text-trueLavender cursor-pointer mr-6 md:mr-8 lg:mr-0 lg:mb-8">
          {theme === "light" && (
            <FaMoon
              onClick={() => {
                themeContext.setTheme("dark");
              }}
              className="w-[21.98px] h-[21.90px]"
            />
          )}
          {theme === "dark" && (
            <IoSunny
              onClick={() => {
                themeContext.setTheme("light");
              }}
              className="w-[21.98px] h-[21.90px]"
            />
          )}
        </div>
        <div className="px-6 py-[20px] md:px-8 md:py-6 border-l-[1px] border-blueIndigo lg:border-l-[0px] lg:border-t-[1px]">
          {/* <Image
            src="./avatar.svg"
            alt="avatar"
            height={windowWidth < 1440 ? 32 : 40}
            width={windowWidth < 1440 ? 32 : 40}
          /> */}
        </div>
      </div>
    </header>
  );
};

export default Header;
