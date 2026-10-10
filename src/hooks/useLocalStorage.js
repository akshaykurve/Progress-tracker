import { useCallback, useEffect, useState } from "react";

export default function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const raw = localStorage.getItem(key);
      if (raw !== null) return JSON.parse(raw);
    } catch {
      return typeof initialValue === "function" ? initialValue() : initialValue;
    }
    return typeof initialValue === "function" ? initialValue() : initialValue;
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      return;
    }
  }, [key, value]);

  const reset = useCallback(() => {
    setValue(typeof initialValue === "function" ? initialValue() : initialValue);
  }, [initialValue]);

  return [value, setValue, reset];
}
