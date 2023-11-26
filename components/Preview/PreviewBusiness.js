import React, { useEffect, useState } from "react";
import Image from "next/image";
import { AdvanceLinksContext } from "@/context/AdvanceLink_SocialContext";
import { useContext } from "react";
import { useWatch } from "react-hook-form";
import { object } from "yup";

function PreviewBusiness({ data }) {
  //--- icons text color is remaining
  const currentData = data;
  const { businessCard } = data;
  const { email, workPhone } = businessCard;

  return (
    <>
      <div className="bg-primary m-5 pt-3  w-full  ">
        <h2 className="text-xl text-white font-bold mb-2 text-center">
          {currentData?.businessCard.firstName +
            " " +
            currentData?.businessCard.lastName}
        </h2>
        <p className="text-white mb-4 text-center break-words">
          {currentData?.businessCard.jobTitle}
        </p>
        <div className="bg-white rounded-lg shadow-md p-4 m-5  rounded-[20px]">
          <h2 className="text-xl text-primary  mb-2 ">Contact</h2>

          <div className="mb-2 border-b">
            <label className="block text-sm font-medium text-gray-400">
              Email:
            </label>
            <p className="text-gray-800 pb-2 break-words">
              {currentData?.businessCard.email}
            </p>
          </div>
          <div className="mb-2  border-b">
            <label className="block text-sm font-medium text-gray-400">
              Mobile:
            </label>
            <p className="text-gray-800 pb-2 break-words">
              {currentData?.businessCard.mobilePhone}
            </p>
          </div>
          <div className="mb-2 border-b">
            <label className="block text-sm font-medium text-gray-400">
              Work Phone:
            </label>
            <p className="text-gray-800 pb-2 break-words">
              {currentData?.businessCard.workPhone}
            </p>
          </div>
          <div className="mb-2 border-b">
            <label className="block text-sm font-medium text-gray-400">
              Company:
            </label>
            <p className="text-gray-800 pb-2 break-words">
              {currentData?.businessCard.companyName}
            </p>
          </div>
          <div className="mb-2 border-b">
            <label className="block text-sm font-medium text-gray-400">
              Street:
            </label>
            <p className="text-gray-800 pb-2 break-words">
              {currentData?.businessCard.street}
            </p>
          </div>
          <div className="mb-2 border-b">
            <label className="block text-sm font-medium text-gray-400">
              City:
            </label>
            <p className="text-gray-800 pb-2 break-words">
              {currentData?.businessCard.city}
            </p>
          </div>
          <div className="mb-2 border-b">
            <label className="block text-sm font-medium text-gray-400">
              Zip Code:
            </label>
            <p className="text-gray-800 pb-2 break-words">
              {currentData?.businessCard.zipcode}
            </p>
          </div>
          <div className="mb-2 border-b">
            <label className="block text-sm font-medium text-gray-400">
              Country:
            </label>
            <p className="text-gray-800 pb-2 break-words">
              {currentData?.businessCard.country}
            </p>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-4 m-5  rounded-[20px]">
          <label className="block text-sm font-medium text-primary">
            Website:
          </label>
          <a
            href={currentData?.businessCard.website}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 break-words"
          >
            {currentData?.businessCard.website}{" "}
          </a>
        </div>
        <div className="bg-white rounded-lg shadow-md p-4 m-5  rounded-[20px]">
          <label className="block text-sm font-medium text-primary">
            Summary:
          </label>
          <p className="text-gray-800 w-full break-words">
            {currentData?.businessCard.summary}
          </p>
        </div>
      </div>
    </>
  );
}

export default PreviewBusiness;
