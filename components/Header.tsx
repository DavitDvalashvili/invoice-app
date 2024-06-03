import Image from "next/image";
import logo from "@/public/logo.svg";
import avatar from "@/public/avatar.svg";
import { IoSunny } from "react-icons/io5";
import { FaMoon } from "react-icons/fa";
import useWindowWidth from "@/hooks/useWindowWidth";
import { useState } from "react";

const Header = () => {
  const windowWidth = useWindowWidth();
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    if (isDarkMode) {
      document.documentElement.classList.remove("dark");
    } else {
      document.documentElement.classList.add("dark");
    }
  };

  return (
    <header className="flex justify-between items-center lg:h-[100vh]  lg:flex-col lg:rounded-tr-[28px] lg:rounded-br-[28px] bg-CarbonBlue dark:bg-Kon ">
      {windowWidth && (
        <Image
          src={logo}
          alt="logo"
          height={windowWidth < 768 ? 72 : windowWidth < 1440 ? 80 : 103}
          width={windowWidth < 768 ? 72 : windowWidth < 1440 ? 80 : 103}
          priority
        />
      )}
      <div className="flex justify-center items-center lg:flex-col  ">
        <div className="text-trueLavender cursor-pointer mr-6 md:mr-8 lg:mr-0 lg:mb-8">
          {isDarkMode && (
            <FaMoon
              onClick={toggleDarkMode}
              className="w-[21.98px] h-[21.90px] text-TrueLavender"
            />
          )}
          {!isDarkMode && (
            <IoSunny
              onClick={toggleDarkMode}
              className="w-[21.98px] h-[21.90px] text-TrueLavender"
            />
          )}
        </div>
        <div className="px-6 py-[20px] md:px-8 md:py-6 border-l-[1px] border-BlueIndigo lg:border-l-[0px] lg:border-t-[1px]">
          {windowWidth && (
            <Image
              src={avatar}
              alt="avatar"
              height={windowWidth < 1440 ? 32 : 40}
              width={windowWidth < 1440 ? 32 : 40}
            />
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
