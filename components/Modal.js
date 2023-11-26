import React, { useRef, useEffect } from "react";
import { useOnClickOutside } from "@/hooks/useOnClickOutside";
import Image from "next/image";
const Modal = ({
  open,
  handleClose,
  children,
  iconType = "normal",
  className,
  notCrossIcon,
  style,
  icon,
  childrenClass,
}) => {
  const ref = useRef();
  // useOnClickOutside(ref, () => handleClose())
  const CROSS_BLACK = "/assets/svgs/icons/cross_icon.svg";
  const CROSS_WHITE = "/assets/svgs/icons/cross_icon_white.svg";
  useEffect(() => {
    // 27 is the key code for escape
    function handleKeyDown(event) {
      if (event.keyCode === 27) {
        handleClose();
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const crossIconClass = `absolute 
   font-bold rounded-full cursor-pointer
   w-[14px] h-[14px] lg:w-[20px] lg:h-[20px] ${
     iconType == "outside" ? "right-0 -top-10 " : "right-5 top-5 fill-black"
   }`;
  const handleModalClose = (e) => {
    e.preventDefault();
    e.stopPropagation();
    handleClose();
  };
  return (
    <>
      {open && (
        <div
          className="w-screen h-screen z-50 right-0 top-0 fixed shadow bg-background flex justify-center items-center m-0 "
          style={{
            backgroundColor: "rgba(0,0,0,0.8)",
            margin: "0px",
          }}
        >
          <div
            className={`relative bg-background ${
              iconType === "normal" ? "pt-0" : "pt-0"
            }  rounded-[5px] shadow-md bg-white overflow-scroll no-scrollbar  ${className}`}
            ref={ref}
            style={style}
          >
            <div
              className={`flex flex-col items-center justify-center w-full h-full ${childrenClass}`}
            >
              {children}
            </div>
            {notCrossIcon ? null : (
              <Image
                className={crossIconClass}
                src={icon ? CROSS_WHITE : CROSS_BLACK}
                alt="icon"
                width={20}
                unoptimized
                height={20}
                onClick={handleModalClose}
              />
            )}
          </div>
        </div>
      )}
    </>
  );
};
export { Modal };
