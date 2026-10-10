import { useEffect, useState } from "react";

function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const savedValue = localStorage.getItem(key);

      if (savedValue !== null) {
        return JSON.parse(savedValue);
      }

      return typeof initialValue === "function"
        ? initialValue()
        : initialValue;
    } catch (error) {
      console.error(
        `Error reading localStorage key "${key}":`,
        error,
      );

      return typeof initialValue === "function"
        ? initialValue()
        : initialValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(
        `Error saving localStorage key "${key}":`,
        error,
      );
    }
  }, [key, value]);

  return [value, setValue];
}

export default useLocalStorage;