import { useEffect, useState } from "react";

type Connection = {
  effectiveType?: string;
  saveData?: boolean;
  addEventListener?: (type: string, cb: () => void) => void;
  removeEventListener?: (type: string, cb: () => void) => void;
};

export function useBandwidth() {
  const [low, setLow] = useState(false);

  useEffect(() => {
    const nav = navigator as Navigator & { connection?: Connection };
    const conn = nav.connection;
    if (!conn) return;

    const evaluate = () => {
      const slow = ["slow-2g", "2g", "3g"].includes(conn.effectiveType ?? "");
      setLow(Boolean(conn.saveData) || slow);
    };
    evaluate();
    conn.addEventListener?.("change", evaluate);
    return () => conn.removeEventListener?.("change", evaluate);
  }, []);

  return low;
}
