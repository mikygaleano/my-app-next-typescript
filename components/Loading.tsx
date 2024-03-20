'use client'
import { useState, useEffect } from "react";
import {CircularProgress} from "@nextui-org/react";

export default function Loading() {
  const [value, setValue] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setValue((preValue) => (preValue >= 100 ? 0 : preValue + 10));
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <CircularProgress
      aria-label="Loading..."
      size="lg"
      value={value}
      color="warning"
      showValueLabel={true}
    />
  );
}
