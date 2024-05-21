import { useEffect, useState } from "react";

export default function useWindowWidth() {
  const [width, setWidth] = useState(() => {
    // Check if window is defined (for SSR/SSG)
    if (typeof window !== "undefined") {
      return window.innerWidth;
    }
    // Return a default value if window is not defined
    return 0;
  });

  useEffect(() => {
    const handleResize = () => {
      // Check if window is defined (for SSR/SSG)
      if (typeof window !== "undefined") {
        setWidth(window.innerWidth);
      }
    };

    // Add event listener only if window is defined
    if (typeof window !== "undefined") {
      window.addEventListener("resize", handleResize);

      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  return width;
}
