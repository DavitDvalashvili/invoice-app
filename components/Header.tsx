import Image from "next/image";
import { IoSunny } from "react-icons/io5";
import { FaMoon } from "react-icons/fa";
import { useContext } from "react";
import { ThemeContext } from "@/app/layout";
import useWindowWidth from "@/hooks/useWindowWidth";

const Header = () => {
  const themeContext = useContext(ThemeContext);
  const theme = themeContext.theme;
  const windowWidth = useWindowWidth();

  return (
    <header
      className={`flex justify-between items-center bg-${theme}-headerBackground`}
    >
      <Image
        src="/logo.svg"
        alt="logo"
        height={windowWidth < 768 ? 72 : windowWidth < 1440 ? 80 : 103}
        width={windowWidth < 768 ? 72 : windowWidth < 1440 ? 80 : 103}
        priority
      />
      <div className="flex justify-center items-center  ">
        <div className="text-trueLavender cursor-pointer mr-6 md:mr-8 pr-6">
          {theme === "light" && (
            <FaMoon
              onClick={() => {
                themeContext.setTheme("dark");
              }}
              className="w-[19.98px] h-[19.90px]"
            />
          )}
          {theme === "dark" && (
            <IoSunny
              onClick={() => {
                themeContext.setTheme("light");
              }}
              className="w-[19.98px] h-[19.90px]"
            />
          )}
        </div>
        <div className="px-6 py-[20px] md:px-8 md:py-6 border-l-[1px] border-blueIndigo">
          <Image src="./avatar.svg" alt="avatar" height="32" width="32" />
        </div>
      </div>
    </header>
  );
};

export default Header;
