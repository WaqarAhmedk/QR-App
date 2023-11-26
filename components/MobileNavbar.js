import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useOnClickOutside } from "@/hooks/useOnClickOutside";
import { NAVLINKS } from "@/utils/mock";
import { useRouter } from "next/router";
import Button from "./macros/Button";
import DropArrow from "@/public/assets/svgs/drop_arrow";
import { useDispatch, useSelector } from "react-redux";
import { verifyToken } from "@/store/auth/authActions";
import { getUserToDashBoard } from "@/utils/functions";

function MobileNavbar({ className }) {
  const [isOpen, setIsOpen] = useState(false);
  const [subItems, setSubItems] = useState(false);
  const toggleDropDown = () => setIsOpen(!isOpen);
  const router = useRouter();
  const MenuRef = useRef();
  const dispatch = useDispatch();
  let authToken = localStorage.getItem("token");
  const { user } = useSelector((state) => state.auth);

  const handleNavigateToDashBoard = () => {
    getUserToDashBoard(user);
  };

  useEffect(() => {
    dispatch(verifyToken(authToken));
  }, []);

  useOnClickOutside(MenuRef, () => (setIsOpen(false), setSubItems(false)));

  const handleSubItems = (item) => {
    if (item.childrens) {
      if (subItems == true) {
        setSubItems(false);
      } else setSubItems(true);
    }
    if (item.goto) {
      setIsOpen(false);
      router.push(item.goto);
    }
  };

  const MobileNavbarClass = isOpen
    ? `absolute right-0 top-[35px] bg-[white] shadow-2xl 
       rounded-md w-[92vw]
       500:w-[50vw] sm:w-[40vw]
       flex flex-col gap-1 p-4 z-10 text-left h-auto`
    : "";

  return (
    <div className={`relative ${className}`} ref={MenuRef}>
      <div onClick={() => toggleDropDown()}>
        <Image
          src="/assets/svgs/menu_ham.svg"
          width={20}
          height={20}
          className={`cursor-pointer`}
          alt="menu_icon"
        />
      </div>
      <div className={MobileNavbarClass}>
        {isOpen ? (
          <div>
            {NAVLINKS.map((current, key) => (
              <div
                onClick={() => handleSubItems(current)}
                className="flex 
              relative
              justify-between
              cursor-pointer 
              first-letter:from-purple-500
            hover:text-white p-2 rounded-md gradient-hover"
                key={key}
              >
                <p
                  className={`${
                    current.goto === router?.pathname
                      ? "gradient w-full text-white rounded-md p-2"
                      : null
                  }`}
                >
                  {current.name}
                </p>
                {subItems && current.childrens && (
                  <div className="left-0 top-10 text-black absolute flex flex-col gap-2  rounded-md drop-shadow-md py-2  z-50 bg-light w-full">
                    {current.childrens.map((item) => {
                      return (
                        <p
                          onClick={() => {
                            router.push(item.goto);
                            setIsOpen(false);
                          }}
                          className={`px-5 py-1 hover:gradient rounded-md mx-3 hover:text-white  ${
                            item.goto === router?.pathname
                              ? "gradient text-white"
                              : ""
                          }`}
                        >
                          {item.name}
                        </p>
                      );
                    })}
                  </div>
                )}
                {current.childrens && (
                  <DropArrow
                    fill={
                      current.childrens.some(
                        (nav) => nav.goto === router?.pathname
                      )
                        ? "black"
                        : "black"
                    }
                  />
                )}
              </div>
            ))}
            <div className="flex-column gap-6 my-3 px-2">
              {authToken ? (
                <>
                  <Button
                    type="fill"
                    className="w-full"
                    onClick={handleNavigateToDashBoard}
                    text="Dashboard"
                  />
                </>
              ) : (
                <>
                  <Button
                    type="fill"
                    className=" w-full"
                    onClick={() => {
                      router.push("/signin");
                    }}
                    text="Sign In"
                  />
                  <Button
                    type="plain"
                    className=" w-full"
                    onClick={() => {
                      router.push("/signup");
                    }}
                    text="Sign Up"
                  />
                </>
              )}
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default MobileNavbar;
