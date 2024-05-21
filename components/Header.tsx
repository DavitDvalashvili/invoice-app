import Image from "next/image";
import { IoSunny } from "react-icons/io5";
import { FaMoon } from "react-icons/fa";
import { useContext } from "react";
import { ThemeContext } from "@/app/layout";
import useScreenSize from "@/hooks/useScreenSize";

const Header = () => {
  const themeContext = useContext(ThemeContext);
  const theme = themeContext.theme;
  const screenSize = useScreenSize();

  return (
    <header
      className={`flex justify-between items-center lg:h-[100vh]  lg:flex-col lg:rounded-tr-[28px] lg:rounded-br-[28px] ${
        theme === "light"
          ? "bg-light-headerBackground"
          : "bg-dark-headerBackground"
      }`}
    >
      <Image
        src="/logo.svg"
        alt="logo"
        height={
          screenSize.width < 768 ? 72 : screenSize.width < 1440 ? 80 : 103
        }
        width={screenSize.width < 768 ? 72 : screenSize.width < 1440 ? 80 : 103}
        priority
      />
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
          <Image
            src="./avatar.svg"
            alt="avatar"
            height={screenSize.width < 1440 ? 32 : 40}
            width={screenSize.width < 1440 ? 32 : 40}
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
