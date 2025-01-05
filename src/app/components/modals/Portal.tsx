
import { useEffect, useRef } from "react";
import { Poppins } from "next/font/google";
import { createPortal } from "react-dom";

type ClientPortalInterface = {
  children: React.ReactNode;
  show?: boolean;
  onClose?: () => void;
  selector: string;
};
const Portal = ({ children, selector, show }: ClientPortalInterface) => {
  const ref = useRef<Element | null>(null);
  useEffect(() => {
    ref.current = document.getElementById(selector);
  }, [selector]);
  return show && ref.current ? createPortal(children, ref.current) : null;
}

export default Portal;