import React, { useEffect, useState } from "react";
import Image from "next/image";
import { AdvanceLinksContext } from "@/context/AdvanceLink_SocialContext";
import { useContext } from "react";
import { useWatch } from "react-hook-form";
import { useSelector } from "react-redux";

function PreviewSocialData(props) {
  const currentData = props.data;

  let textColor = currentData?.social.preview.textColor;

  const linkItems = (currentData?.social.links).map((current, index) => (
    <div
      key={index}
      className="row-flex bg-white items-center gap-3 cursor-pointer p-2 rounded-lg"
      onClick={() => window.open(current.url)}
    >
      <Image
        src={`/assets/svgs/social/${
          current?.type?.includes("website") ? "website" : current?.type
        }-colored.svg`}
        width={40}
        height={40}
        alt="icon"
      />
      <p className="text-base text=  w-full" style={{ color: textColor }}>
        /[{current.name}]
      </p>
    </div>
  ));
  //--- icons text color is remaining
  return (
    <>
      <div
        className="w-full   h-full"
        style={{
          background: `${currentData?.social.preview.bgColor}`,
        }}
      >
        <Image
          src={
            currentData?.social.preview.coverImage
              ? currentData?.social.preview.coverImage
              : "/assets/images/previewProfileBg.png"
          }
          width={100}
          height={100}
          style={{
            height: "300px",
            objectFit: "cover",
          }}
          className=" w-full"
          unoptimized
          alt="bg-img"
        />
        <div className="relative px-5 ">
          <div className={`absolute -top-12 flex-column gap-1.5 `}>
            <Image
              src={
                currentData?.social.preview.profileImage
                  ? currentData?.social.preview.profileImage
                  : "/assets/svgs/profile_social.svg"
              }
              width={100}
              height={100}
              alt="bg-img"
              className="w-[70px] lg:w-[100px]  h-[70px] lg:h-[100px] lg:min-h-[100px] object-cover	 "
            />
          </div>
        </div>
        <div className=" space-y-2 w-full pt-10 pb-5 px-5 py-10 ">
          <h3
            className={`font-bold  break-words max-w-[100%] h-`}
            style={{
              color: `${textColor ? textColor : preview?.textColor}`,
            }}
          >
            {currentData?.social?.preview.profileName}
          </h3>
          <p
            className="text-[13.3px] beak-words break-words max-w-[100%] h-auto"
            style={{
              color: `${textColor ? textColor : preview?.textColor}`,
            }}
          >
            {currentData?.social?.preview.summary}
          </p>
          <p className="font-medium">Social Links</p>
          <div className="  overflow-y-auto 375:max-h-[300px] max-h-[200px] flex-column gap-4">
            <div className="flex-column gap-3 ">{linkItems}</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PreviewSocialData;
