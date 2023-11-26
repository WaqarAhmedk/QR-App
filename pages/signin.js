import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import PasswordInput from "@/components/macros/PasswordInput";
import CheckBox from "@/components/macros/Radio";
import Button from "@/components/macros/Button";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import validationSchema from "@/RHF/schema/Signin";
import InputControlled from "@/components/macros/InputControlled";
import { useDispatch, useSelector } from "react-redux";
import {
  login,
  logingoogle,
  logingoogleSuccess,
  sendVerificationEmail,
  validateToken,
} from "@/store/auth/authActions";
import { Modal } from "@/components/Modal";
import { getUserToDashBoard } from "@/utils/functions";

function Signin() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { token, email } = router.query;
  const [tokenModal, setTokenModal] = useState(false);
  const [verificationModal, setVerificationModal] = useState(false);
  const [validateError, setValidateError] = useState(false);
  const [emailInput, setEmailInput] = useState(false);
  const { user, loading } = useSelector((state) => state.auth);
  const [rememberme, setRememberme] = useState(false);

  const {
    control,
    getValues,
    setValue,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(validationSchema),
  });
  const handleFormSubmit = (data) => {
    dispatch(login(data))
      .unwrap()
      .then(() => {
        let token = localStorage.getItem("token");
        if (token) {
          getUserToDashBoard(user, token);
        }
      })
      .catch((code) => {
        if (code === 400) {
          setVerificationModal(true);
        }
      });
  };
  const googleCode = useMemo(() => {
    const { code, scope } = router.query;
    return { code, scope };
  }, [router.query]);

  const handleEmailVerification = () => {
    const email = getValues("email");
    dispatch(sendVerificationEmail(email));
    setVerificationModal(false);
  };

  useEffect(() => {
    if (token) {
      const data = {
        token,
        email,
      };
      dispatch(validateToken(data))
        .unwrap()
        .then(() => {
          setTokenModal(true);
          // router.push("/")
        })
        .catch(() => {
          // setValidateError(true)
          setVerificationModal(true);
        });
    }
  }, [token]);

  useEffect(() => {
    if (googleCode) {
      if (googleCode?.scope?.includes("googleapis")) {
        dispatch(logingoogleSuccess({ code: googleCode.code, url: "signin" }))
          .unwrap()
          .then(() => {
            let token = localStorage.getItem("token");
            if (token) {
              getUserToDashBoard(user, token);
            }
          });
      }
    }
  }, [googleCode]);

  //useeffect for remeber me
  useEffect(() => {
    const email = localStorage.getItem("email");
    const password = localStorage.getItem("password");
    if (email && password) {
      setValue("email", email);
      setValue("password", password);
      setRememberme(true);
    }
  }, []);
  return (
    <div className="container text-t2 ">
      <div className="bg-gray-300 w-full hidden md:block md:min-w-[31%] lg:min-w-0 lg:w-[95%] h-[650px]">
        <Image
          src="/assets/images/login_form.png"
          width={100}
          height={100}
          className="w-full h-full"
          alt="login-banner"
          style={{
            objectFit: "cover",
          }}
          unoptimized
        />
      </div>
      <form onSubmit={handleSubmit(handleFormSubmit)} className="form">
        <p className="text-2xl italic leading-10">
          Please sign in to your{" "}
          <span className="whitespace-nowrap">account👋</span>
        </p>

        <div className="space-y-4 font-normal">
          <InputControlled
            name="email"
            inputLabel="Email"
            setInput={setEmailInput}
            placeholder="Enter your email"
            control={control}
            errors={errors}
          />
          <PasswordInput
            inputLabel="Password"
            type="password"
            placeholder="Enter your password"
            control={control}
            name="password"
            errors={errors}
          />
        </div>

        <div className="flex-column gap-2 500:row-flex justify-between">
          <CheckBox
            onChange={(e) => {
              if (e.target.checked) {
                setRememberme(true);
              } else {
                setRememberme(false);
              }
            }}
            inputLabel="Remember me"
            defaultvalue={rememberme}
            classNames="text-[13px] md:text-sm font-normal"
          />
          <p
            onClick={() => {
              router.push("/forgotpassword");
            }}
            className="text-[13px] md:text-sm text-[#1D59F9] font-normal cursor-pointer"
          >
            Forgot password?
          </p>
        </div>
        <div className="md:self-start w-1/2 lg:w-auto">
          <Button
            type="fill"
            className="lg:w-[160px] font-medium"
            onClick={() => {
              if (rememberme) {
                localStorage.setItem("email", getValues("email"));
                localStorage.setItem("password", getValues("password"));
              } else {
                localStorage.removeItem("email");
                localStorage.removeItem("password");
              }
            }}
            text="Sign In"
          />
        </div>
        <div className="flex items-center justify-center">
          <div
            onClick={() => {
              dispatch(logingoogle("signin"));
            }}
            className="mb-3 flex  w-[70%] cursor-pointer gap-1 items-center justify-center rounded-md gradient  lg:px-[20px] py-[5px] lg:py-[10px] text-white text-sm"
          >
            <Image
              src="/assets/images/search.png"
              width={16}
              height={16}
              alt="arrow"
            />
            <span
              style={{ fontWeight: "500" }}
              className=" text-base font-regular rounded-[7px]  text-white"
            >
              Sign in with Google
            </span>
          </div>
        </div>
      </form>

      {verificationModal && (
        <Modal
          open={verificationModal}
          handleClose={() => setVerificationModal(false)}
        >
          <div className="md: p-8 flex justify-center flex-col items-center md:w-[80%] text-center">
            <Image
              src="/assets/images/emailUnverified.png"
              width={100}
              height={100}
              className="mb-2"
              alt="emailVerified"
              unoptimized
            />
            <h3 className="font-bold text-lg md:text-2xl">Not Verified!</h3>
            <p className="text-t1 text-sm md:text-lg">
              Your account is not verified, Click on the button below to verify
              your account.
            </p>
            <Button
              type="fill"
              actionType="button"
              className="w-full font-medium mt-3"
              onClick={handleEmailVerification}
              text="Verify"
            />
          </div>
        </Modal>
      )}

      {tokenModal && (
        <Modal open={tokenModal} handleClose={() => setTokenModal(false)}>
          <div className="md: p-8 flex justify-center flex-col items-center md:w-[80%] text-center">
            <Image
              src={
                validateError
                  ? "/assets/images/emailUnverified.png"
                  : "/assets/images/emailVerified.png"
              }
              width={100}
              height={100}
              className="mb-2"
              alt="emailVerified"
              unoptimized
            />
            <h3 className="font-bold text-lg md:text-2xl">
              {validateError
                ? "Verification Failed"
                : "Your Email has been verified"}
            </h3>
            <p className="text-t1 text-sm md:text-lg">
              {validateError
                ? "Something went wrong with your email verification. Please try again later"
                : "Now you can track, manage, and organize QR codes effortlessly through our central portal"}
            </p>
          </div>
        </Modal>
      )}
    </div>
  );
}

export default Signin;
