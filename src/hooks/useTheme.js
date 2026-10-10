import { useEffect } from "react";
import useLocalStorage from "./useLocalStorage";

const systemTheme = () =>
  window.matchMedia?.("(prefers-color-scheme: dark)").matches ? "dark" : "light";

export default function useTheme() {
  const [theme, setTheme] = useLocalStorage("ipt:theme", systemTheme);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  const toggle = () => setTheme((t) => (t === "dark" ? "light" : "dark"));
  return [theme, toggle];
}
