import React, { useEffect, useState } from "react";
import Image from "next/image";
import { AdvanceLinksContext } from "@/context/AdvanceLink_SocialContext";
import { useContext } from "react";
import { useWatch } from "react-hook-form";
import { useSelector } from "react-redux";

function PreviewSocial(props) {
  const { barCode } = useSelector((state) => state);
  let links = useWatch({ name: "links" });
  let preview = useWatch({ name: "preview" });
  const state = useSelector((state) => state.barCode);
  const currentData = props.data;

  const [coverImage, setCoverImage] = useState();
  const [profileImage, setProfileImage] = useState();

  useEffect(() => {
    if (state?.profileImage?.url) {
      setCoverImage(state?.profileImage?.url);
    }
    if (preview?.coverImage?.preview) {
      setCoverImage(preview?.coverImage?.preview);
    } else {
      setCoverImage("/assets/images/previewProfileBg.png");
    }
  }, [
    state?.barCode?.coverImage,
    preview?.coverImage?.preview,
    state?.coverImage?.url,
  ]);

  useEffect(() => {
    if (state?.profileImage?.url) {
      setProfileImage(state?.profileImage?.url);
    }
    if (preview?.profileImage?.preview) {
      setProfileImage(preview?.profileImage?.preview);
    } else {
      setProfileImage("/assets/svgs/profile_social.svg");
    }
  }, [state?.barCode?.profileImage, preview?.profileImage?.preview]);

  let textColor = currentData?.social.preview.textColor;

  const linkItems = links?.map((current, index) => (
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
      <p
        className="text-base text=  w-full"
        style={{ color: textColor || preview?.textColor }}
      >
        /[{current.name}]
      </p>
    </div>
  ));
  //--- icons text color is remaining
  return (
    <>
      <div
        className="w-full  rounded-[20px] h-[100%]"
        style={{
          background: `${
            currentData?.social.preview.bgColor
              ? currentData?.social.preview.bgColor
              : preview?.bgColor
          }`,
        }}
      >
        <Image
          src={coverImage}
          width={100}
          height={100}
          className="w-full md:min-h-[140px]  lg:min-h-[180px] lg:max-h-[180px] object-cover rounded-t-[20px]"
          unoptimized
          alt="bg-img"
        />
        <div className="relative px-5 ">
          <div
            className={`absolute -top-12 flex-column gap-1.5 h-auto bg-[red]`}
          >
            <Image
              src={profileImage}
              width={100}
              height={100}
              alt="bg-img"
              className="w-[70px] lg:w-[100px] h-[70px] lg:h-[100px] lg:min-h-[100px] object-cover	 "
            />
          </div>
        </div>
        <div className="mt-[60px] space-y-2 w-full  pb-5 px-5 ">
          <h3
            className={`font-bold  break-words max-w-[100%] h-`}
            style={{
              color: `${textColor ? textColor : preview?.textColor}`,
            }}
          >
            {preview.profileName}
          </h3>
          <p
            className="text-[13.3px] beak-words break-words max-w-[100%] h-auto"
            style={{
              color: `${textColor ? textColor : preview?.textColor}`,
            }}
          >
            {preview.summary}
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

export default PreviewSocial;
