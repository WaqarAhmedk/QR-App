import React, { useEffect, useState } from "react";
import Image from "next/image";
import { AdvanceLinksContext } from "@/context/AdvanceLink_SocialContext";
import { useContext } from "react";
import { useWatch } from "react-hook-form";

function PreviewPdf({ data }) {
  const currentData = data;

  const download = (url) => {
      const a = document.createElement("a");
      a.href = url;
      a.download = url.split("/").pop();
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
  };

  let { url } = currentData.downloadPdf;

  //--- icons text color is remaining
  return (
    <>
      <div className="w-full  rounded-[20px] ">
      <div className=" min-h-[60px] bg-white m-5 flex justify-between items-center pl-5 pr-5 rounded-md">
              <div className="flex justify-between items-center">
                <Image
                  src={`/assets/svgs/icons/pdf-icon.svg`}
                  width={20}
                  height={20}
                  alt="food"
                  className="  rounded-full bg-red h-[40px] w-[40px] items-center"
                />
               
                  <div className="ml-5">
                    {url.substring(url.lastIndexOf("/") + 1)}
                  </div>
                
              </div>
              <div
              
                className={`h-[30px] w-[30px] items-center flex pl-2 `}
                onClick={() => {
                  download(url);
                }}
              >
                <Image
                  src={ `/assets/images/arrow_down.png`}
                  width={10}
                  height={10}
                  className=""
                />
              </div>
            </div>
      </div>
    </>
  );
}

export default PreviewPdf;
