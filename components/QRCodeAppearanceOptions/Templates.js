import React, { useEffect, useState } from "react";
import { LOGOS, QR_STYLES } from "@/utils/mock";
import Image from "next/image";

import {
  setQrTemplate,
  setPattern,
  setEyeBall,
  setQrFrame,
  setQrFrameColor,
  setQrTextColor,
  setBgColor,
  setFgColor,
  setEyeBallColor,
  setEyeFrameColor,
  setEyeFrame,
} from "@/store/barCode/barCodeSlice";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { useFormContext } from "react-hook-form";

function templates() {
  const dispatch = useDispatch();
  const { templates } = useSelector((state) => state?.barCode);
  const { setValue } = useFormContext();
  const router = useRouter();
  const { edit_qrId } = router.query;
  // useEffect(()=>{
  //   setTemplates([...QR_STYLES, ...temps]);
  // },temps)
  const handleTemplateClick = (temp) => {
    console.log("type", temp);
    switch (temp.type) {
      case "plain":
        dispatch(setPattern("plain"));
        dispatch(setFgColor("#000000"));
        dispatch(setBgColor("#ffffff"));
        dispatch(setEyeFrame("eye-frame-plain-square"));
        dispatch(setEyeBall("eye-ball-plain-square"));
        dispatch(setEyeFrameColor("#000000"));
        dispatch(setEyeBallColor("#000000"));
        break;
      case "dots":
        dispatch(setPattern("dots"));
        dispatch(setEyeFrame("eye-frame-rounded"));
        dispatch(setEyeBall("eye-ball-plain-square"));
        dispatch(setFgColor("#000000"));
        dispatch(setBgColor("#ffffff"));
        dispatch(setEyeFrameColor("#000000"));
        dispatch(setEyeBallColor("#000000"));
        break;
      case "ScanTagButton":
        dispatch(setBgColor("#000000"));
        dispatch(setFgColor("#ffffff"));
        dispatch(setEyeFrameColor("#ffffff"));
        dispatch(setEyeBallColor("#ffffff"));
        dispatch(setPattern("dots"));
        dispatch(setEyeFrame("eye-frame-rounded"));
        dispatch(setEyeBall("eye-ball-plain-square"));
        break;
      case "ScanButton":
        dispatch(setBgColor("#ffffff"));
        dispatch(setFgColor("#000000"));
        dispatch(setEyeFrameColor("#000000"));
        dispatch(setEyeBallColor("#000000"));
        break;
      case "Custom":
        dispatch(setPattern(temp.pattern));
        dispatch(setEyeBall(temp.eyeBall));
        dispatch(setQrFrame(temp.qrFrame));
        dispatch(setQrFrameColor(temp.qrFrameColor));
        dispatch(setQrTextColor(temp.qrTextColor));
        dispatch(setBgColor(temp.bgColor));
        dispatch(setFgColor(temp.fgColor));
        dispatch(setEyeBallColor(temp.qrEyeBallColor));
        dispatch(setEyeFrameColor(temp.qrEyeFrameColor));
        dispatch(setEyeFrame(temp.eyeFrame));
        break;
      default:
        dispatch(setBgColor("#ffffff"));
        dispatch(setFgColor("#000000"));
        break;
    }
    function extractNameFromSrc(array) {
      return array.map((item) => {
        const srcParts = item.src.split("/");
        const fileName = srcParts[srcParts.length - 1]; // Get the last part of the src
        const name = fileName.replace(".svg", ""); // Remove the '.svg' extension if present
        return { ...item, name };
      });
    }
    const newArrayWithExtractedNames = extractNameFromSrc(LOGOS);
    console.log(newArrayWithExtractedNames);

    const findObjectByName = (newArrayWithExtractedNames, nameToSearch) => {
      return newArrayWithExtractedNames.find(
        (item) => item.name === nameToSearch
      );
    };

    const found = findObjectByName(newArrayWithExtractedNames, temp?.logo);
    console.log("found item with name", found);
    setValue("logo", {
      file: found?.name,
      preview: found?.src,
    });
    dispatch(setQrTemplate(temp.type));
  };
  const findByName = (array, nameToFind) => {
    return array.find((item) => item?.name === nameToFind);
  };

  return (
    <div className="grid grid-cols-5 lg:grid-cols-7 gap-4">
      {templates?.map((temp, index) => {
        return (
          <Image
            src={temp.qrImage}
            onClick={() => {
              handleTemplateClick(temp);
            }}
            width={100}
            key={index}
            className="cursor-pointer  object-cover w-[100px]"
            height={100}
            alt="qr-style"
          />
        );
      })}
    </div>
  );
}

export default templates;
