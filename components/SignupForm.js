import React, { useEffect, useMemo } from "react";
import Image from "next/image";
import Button from "@/components/macros/Button";
import { useRouter } from "next/router";
import PasswordInput from "@/components/macros/PasswordInput";
import InputControlled from "@/components/macros/InputControlled";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Signup as SignupValidations } from "@/RHF/schema";
import { useDispatch, useSelector } from "react-redux";
import {
  logingoogle,
  logingoogleSuccess,
  signup,
} from "@/store/auth/authActions";

import { getUserToDashBoard } from "@/utils/functions";
export default function SignupForm({ formclass, isModal, headingText, closeModal }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.auth);

  const {
    control,
    handleSubmit,
    reset,

    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      firstName: "",
      lastName: "",
      password: "",
      confirmPassword: "",
    },
    resolver: yupResolver(SignupValidations),
  });

  const handleFormSubmit = (data) => {

    delete data.confirmPassword;
    dispatch(signup(data))
      .unwrap()
      .then((d) => {
        reset();
        if (isModal) {
          closeModal()
        }
      });
  };
  useEffect(() => {
    let authToken = localStorage.getItem("token");
    if (authToken && loading === false) {
      window.location.href = "/";
    }
  }, [user]);
  // Google Auth
  const googleCode = useMemo(() => {
    const { code, scope } = router.query;
    return { code, scope };
  }, [router.query]);
  return (
    <>
      <div className={formclass}>
        <p className="text-2xl italic leading-10">{headingText}</p>
        <div className="space-y-8">
          <div className="space-y-3 font-normal">
            <div className="flex  gap-2	">
              <InputControlled
                name="firstName"
                inputLabel=" First Name"
                placeholder="Enter your fist name"
                control={control}
                errors={errors}
              />

              <InputControlled
                name="lastName"
                inputLabel="Last Name"
                placeholder="Enter your last name"
                control={control}
                errors={errors}
              />
            </div>
            <InputControlled
              name="email"
              inputLabel="Email"
              placeholder="Enter your email"
              control={control}
              errors={errors}
            />

            <PasswordInput
              inputLabel="Password"
              type="password"
              name="password"
              placeholder="Enter your password"
              control={control}
              errors={errors}
            />
          </div>
          <div className="space-y-10">
            <div className="flex-column md:row-flex md:text-center gap-2 md:gap-5 items-center">
              <div className="md:self-start w-1/2 lg:w-auto">
                <Button
                  type="fill"
                  actionType="button"
                  className="lg:w-[160px] font-medium"
                  text="Sign Up"
                  onClick={handleSubmit(handleFormSubmit)}
                />
              </div>

              {isModal ? (
                ""
              ) : (
                <span className="flex-column md:gap-3 md:row-flex items-center font-bold">
                  <p className="text-sm">or</p>
                  <p
                    onClick={() => {
                      router.push("/signin");
                    }}
                    className="cursor-pointer text-sm  text-primary"
                  >
                    Sign in
                  </p>
                </span>
              )}
            </div>

            <div className="flex items-center justify-center">
              <div
                onClick={() => {
                  dispatch(logingoogle("signup"));
                }}
                className="mb-3 flex cursor-pointer  w-[70%] gap-1 items-center justify-center rounded-md gradient  lg:px-[20px] py-[5px] lg:py-[10px] text-white text-sm"
              >
                {" "}
                <Image
                  src="/assets/images/search.png"
                  width={16}
                  height={16}
                  alt="arrow"
                />
                <span
                  style={{ fontWeight: "500" }}
                  className=" text-base font-regular   text-white"
                >
                  Sign Up with Google
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
