import { useState, useEffect } from "react";

const useWindowWidth = () => {
  const [windowWidth, setWindowWidth] = useState<number | undefined>(undefined);

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Update the window width state when the component mounts
      const handleResize = () => {
        setWindowWidth(window.innerWidth);
      };

      // Add event listener for window resize
      window.addEventListener("resize", handleResize);

      // Call handleResize to set initial window width
      handleResize();

      // Clean up the event listener when the component unmounts
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, []);

  return windowWidth;
};

export default useWindowWidth;
