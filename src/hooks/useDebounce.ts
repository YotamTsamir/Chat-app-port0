import { useEffect, useState } from "react";

export const useDebounce = (time: number, value: string) => {
  const [returnedValue, setReturnedValue] = useState(value);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setReturnedValue(value);
    }, time);

    return () => clearTimeout(timeout);
  }, [value, time]);

  return returnedValue;
};
