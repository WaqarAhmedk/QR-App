import React, { useState } from "react";
import Image from "next/image";
import Button from "@/components/macros/Button";
import InputControlled from "@/components/macros/InputControlled";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { forgetPassword } from "@/store/auth/authActions";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ForgetPassword } from "@/RHF/schema";

function ForgotPassword() {
  const router = useRouter();
  const dispatch = useDispatch();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
    },
    resolver: yupResolver(ForgetPassword),
  });

  const handleResetPassword = (data) => {
    dispatch(forgetPassword(data.email))
      .unwrap()
      .then(() => {
        reset();
      });
  };

  return (
    <div className="layout-container padding-x">
      <div className="bg-white flex-column min-h-[690px] 1320:min-h-[790px] justify-center items-center w-full">
        <form
          onSubmit={handleSubmit(handleResetPassword)}
          className="w-full md:w-[50%]"
        >
          <div className="flex-column gap-[30px] items-center">
            <Image
              src="/assets/svgs/key.svg"
              width={96}
              height={96}
              alt="forgot-password-icon"
            />
            <p className="italic text-2xl font-bold cursor-pointer">
              Forgot Password?
            </p>
          </div>
          <div className="space-y-6 md:space-y-10 mt-10">
            <InputControlled
              name="email"
              inputLabel="Email"
              placeholder="Enter your email"
              control={control}
              errors={errors}
            />
            <Button
              type="fill"
              className="w-full font-medium"
              text="Reset Password"
            />
            <div className="row-flex gap-2 justify-center w-full">
              <Image
                src="/assets/svgs/back_arrow.svg"
                width={14}
                height={14}
                alt="forgot-password-icon"
              />

              <p
                className="text-sm lg:text-base text-t1 cursor-pointer"
                onClick={() => {
                  router.push("/signin");
                }}
              >
                Back to login
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ForgotPassword;
