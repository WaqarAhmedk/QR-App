import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useRouter } from "next/router";
import SigninModal from "./macros/SigninModal";
import { createPayment, updatePayment } from "@/store/payment/paymentActions";
import { axiosInstance } from "@/api/axios";
// import { createPayment } from '@/store/payment/paymentSlice';

const PricingCard = ({
  Type,
  price,
  dynamic,
  scans,
  users,
  analytics,
  bulk,
  maxResolution,
  QRShapes,
  whiteLabeling,
  isAnnual,
  popular = false,
  buttonType = "plain",
  header = false,
}) => {
  const {
    auth: { user },
  } = useSelector((state) => state);
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.payment);

  const storedUser = localStorage.getItem("user");
  const _user = storedUser ? JSON.parse(storedUser) : null;

  const handleCreatePayment = async () => {
    const response = await axiosInstance.get("/plan/subscription-info");
    const storedUser = localStorage.getItem("user");
    const user = storedUser ? JSON.parse(storedUser) : null;
    const is_trial_or_sub_valid = response?.trialValid || response?.isValid;
    if (is_trial_or_sub_valid && user?.id) {
      let authToken = localStorage.getItem("token");
      window.open(
        `https://qr-app-dashboard.herokuapp.com?token=${authToken}&email=${user.email}&userId=${user.id}`,
        "my_dashboard"
      );
    } else if (!response.currentSubscriptionValid) {
      if (!loading) {
        dispatch(
          createPayment({
            isAnnual,
            selectedPlan: Type,
            fromHomePage: true,
          })
        );
      }
    } else if (response.currentSubscriptionValid) {
      if (!loading) {
        dispatch(
          updatePayment({
            isAnnual,
            selectedPlan: Type,
            fromHomePage: true,
          })
        );
      }
    }
  };

  return (
    <div
      className={`${popular ? "gradient text-white " : " !text-[#303038]"
        } flex-column text-black row items-center pb-10 font-medium`}
    >
      <div className="relative px-2 lg:px-5 py-2.5 flex-column gap-2 items-center border-b border-gray-200 w-full h-[209px]   ">
        {popular ? (
          <p className="absolute top-2 text-[#303038] font-semibold bg-white rounded-full px-3 py-1 text-xs lg:text-sm xl:text-base">
            Most Popular
          </p>
        ) : (
          ""
        )}

        <div className="md:pt-10 text-center md:pb-5">
          <div className="flex-column items-center ">
            <h1 className="text-base xl:text-lg font-bold mb-5">
              {Type ? Type : "Type "}
            </h1>
            {!header ? (
              <div className="flex items-center gap-1 italic ">
                <div className="flex items-start">
                  <p className="text-sm lg:text-base">$</p>
                  <p className="font-black text-[30px]">
                    {price ? price : "$$"}
                  </p>
                </div>
                <p className="text-sm lg:text-base"> /mo</p>
              </div>
            ) : (
              ""
            )}
          </div>
          {!header ? (
            <p className="text-sm xl:text-base font-normal">billed annualy</p>
          ) : (
            ""
          )}
        </div>
      </div>
      <div className="border-b w-full flex justify-center text-center  items-center border-gray-200 h-[150px] text-sm xl:text-base">

        {
          Type !== "Enterprise" ? <>
            {
              dynamic ? <p>
                {dynamic} Dynamic <br />
                QR Code
              </p> : <div>
                <p>Dynamic QR Codes</p>
                <p className="text-[#C2C4C5] text-xs ">  Alter the destination URL at your convenience while keeping the QR Code unchanged; Dynamic QR Codes offer traceable capabilities</p>

              </div>
            }
          </> : <p>Tiered Pricing</p>
        }
        {/* {Type !== "Enterprise" ? (



          <p>
            {dynamic ? (
              <>
                {dynamic} Dynamic <br />
                QR Code
              </>
            ) : (
              "Dynamic QR Codes"
            )}
          </p>
        ) : (
          <p>Tiered Pricing</p>
        )} */}
      </div>
      <div className="border-b w-full flex justify-center text-center items-center  border-gray-200 h-[150px] text-sm xl:text-base">


        {
          Type !== "Enterprise" ? <>

            {scans ? (
              <p>
                {scans}
                <br />
                Scans
              </p>
            ) : <div>
              <p>Scans</p>
              <p className="text-[#C2C4C5] text-xs ">Total Number of QR Code Scans that are Allowed</p>
            </div>
            }
          </> : <p>
            Custom no.
            <br />
            of Scans
          </p>
        }
        {/* {Type !== "Enterprise" ? (
          <p>
            {scans ? (
              <>
                {scans}
                <br />
                Scans
              </>
            ) : (
              "Scans"
            )}
          </p>
        ) : (
          <p>
            Custom no.
            <br />
            of Scans
          </p>
        )} */}
      </div>
      <div className="border-b w-full flex justify-center text-center items-center py-3  border-gray-200 h-[150px] text-sm xl:text-base">

        {Type !== "Enterprise" ? <>

          {users ? <p>
            {
              users === 1 ? "Single User" : `${users} Users`
            }
          </p> : <div>
            <p>Users</p>
            <p className="text-[#C2C4C5] text-xs ">Incorporate multiple users and tailor their access levels accordingly.</p></div>}
          <p>

          </p>

        </> : (
          <p>
            Custom no.
            <br />
            of Users
          </p>
        )}
        {/* {Type !== "Enterprise" ? (
          <p>
            {users ? (users === 1 ? "Single User" : `${users} Users`) : "Users"}
          </p>
        ) : (
          <p>
            Custom no.
            <br />
            of Users
          </p>
        )} */}
      </div>
      <div className="border-b w-full flex justify-center text-center items-center py-3 border-gray-200 h-[150px] text-sm xl:text-base">
        {analytics ? <p>{analytics}</p> : <div>
          <p>Analytics</p>
          <p className="text-[#C2C4C5] text-xs ">Leverage QR Code analytics for informed decision-making and improved outcomes. </p></div>}

      </div>
      <div className="border-b w-full flex justify-center text-center items-center py-5 border-gray-200 h-[150px] text-sm xl:text-base">
        {bulk === true ? "Yes" : bulk === false ? "" : <div>
          <p>Bulk Uploads</p>
          <p className="text-[#C2C4C5] text-xs ">Empower your workflow with the capability to effortlessly upload and manage bulk data </p>
        </div>}
      </div>
      <div className="border-b w-full flex justify-center text-center items-center py-5 border-gray-200 h-[150px] text-sm xl:text-base">
        <p>{maxResolution ? maxResolution : <div>
          <p>Max Download Resolution</p>
          <p className="text-[#C2C4C5] text-xs ">Optimize your downloads with maximum resolution settings.  </p>
        </div>}</p>
      </div>
      <div className="border-b w-full flex justify-center text-center items-center py-5 border-gray-200 h-[150px] text-sm xl:text-base">
        <p>
          {QRShapes === true ? "Yes" : QRShapes === false ? "" : <div>
            <p>QR Shapes</p>
            <p className="text-[#C2C4C5] text-xs ">Elevate your QR codes with distinctive shapes for a truly unique touch that captures attention.</p>
          </div>}
        </p>
      </div>
      <div className=" w-full flex justify-center text-center items-center py-5  h-[72px] text-sm xl:text-base">
        <p>
          {whiteLabeling === true
            ? "Yes"
            : whiteLabeling === false
              ? ""
              : "White Labeling Domain"}
        </p>
      </div>
      {!header && _user?.role === "admin" ? (
        <div className=" w-full flex justify-center text-center items-center py-3 px-3 ">
          <button
            onClick={() => handleCreatePayment()}
            type="button"
            className={`${popular
              ? "text-t2 bg-white rounded-md border border-white"
              : "text-primary bg-white rounded-md border gradient-border "
              } px-2 xl:px-6 py-2 xl:py-3 font-semibold text-sm lg:text-base`}
          >
            Subscribe
          </button>
          {open && <SigninModal open={open} setOpen={setOpen} />}
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default PricingCard;
