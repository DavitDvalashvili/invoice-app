import { useContext } from "react";
import { ThemeContext } from "./layout";

export default function Home() {
  const theme = useContext(ThemeContext);
  return <h1 className="text-red-500">Graphic Design</h1>;
}
