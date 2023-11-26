import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Modal } from "../Modal";
import Button from "./Button";
import Signup from "@/pages/signup";
import SignupForm from "../SignupForm";

const SigninModal = ({ open, setOpen }) => {
  const router = useRouter();
  const [showSignup, setShowSignup] = useState(false);
  return (
    <Modal
      open={open}
      icon={true}
      className={`max-h-[90%] max-w-[90%] md:max-w-[80%] xl:max-w-[80%]  1320:max-w-[900px] !pt-0`}
      handleClose={() => setOpen(false)}
    >
      {showSignup ? (
        <div className="grid md:grid-cols-2 text-black  ">
          <SignupForm
            formclass={
              "w-full max-h-[650px] flex-column px-[1rem] md:px-[2rem] xl:px-[3rem]  lg:pt-10  text-left gap-2 text-heading font-bold shadow-md"
            }
            closeModal={() => {
              setOpen(false)
            }}
            isModal={true}
            headingText={"Create account with 15 Days trial period"}
          />
          <div className="hidden md:block max-h-[650px]">

            <Image
              src="/assets/images/QR.png"
              width={100}
              height={100}
              className="w-[100%]  h-[100%] "
              alt="login-banner"
              style={{
                objectFit: "cover",
              }}
              unoptimized
            />
          </div>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 text-black">
          <div className="flex flex-col justify-between gap-4 md:gap-0 p-6 lg:p-8">
            <div className="flex flex-col gap-3 xl:gap-4 text-start">
              <h2 className="text-[20px] 500:text-[25px] font-bold self-start">
                Create account with 15 Days trial period
              </h2>
              <div>
                <p className="text-sm lg:text-base text-t1 font-medium ">
                  Why choose dynamic QR codes over static ones?
                </p>
                <p className="text-sm lg:text-base text-t1 font-regular mt-1">
                  Unlike static QR codes, dynamic QR codes offer the flexibility
                  to make changes whenever necessary. Track, manage, and
                  organize codes effortlessly through a central portal, ensuring
                  quick retrieval when needed.
                </p>
              </div>
            </div>
            <div className="flex flex-col justify-center items-center gap-1 lg:gap-3">
              <Button
                type="fill"
                className="w-full "
                onClick={() => {
                  setShowSignup(true);
                }}
                buttonClass="text-base"
                text="START 15-DAY FREE TRIAL"
              />
              <p
                onClick={() => router.push("/signin")}
                className="text-base font-medium text-primary cursor-pointer"
              >
                or Sign in
              </p>
            </div>
          </div>
          <div className="hidden md:block">
            <Image
              src="/assets/images/QR.png"
              width={100}
              height={100}
              className="w-full max-h-[500px] h-full"
              alt="login-banner"
              style={{
                objectFit: "cover",
              }}
              unoptimized
            />
          </div>
        </div>
      )}
    </Modal>
  );
};

export default SigninModal;
