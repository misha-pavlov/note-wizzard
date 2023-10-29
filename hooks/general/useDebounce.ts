import { useState, useEffect } from "react";

const useDebounce = <T>(value: T, delay: number): T => {
  const [valueState, setValueState] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setValueState(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return valueState;
};

export default useDebounce;
