import React from "react";
import Image from "next/image";
import { BANNER_ICONS } from "@/utils/mock";

function QrBanner() {
  return (
    <>
      <div className="layout-container relative">
        <div className="py-20 2xl:py-[100px] bg-secondary bg-image space-y-20 left-0 right-0">
          {/* {--------------------------------------------} */}
          <article className="flex-column w-full lg:max-w-[50%] m-auto leading-6 gap-3 md:gap-[30px] text-center">
            <p className="text-xl md:text-heading font-bold text-t2">
              Create a QR for Any Platform
            </p>
            <p className="text-sm px-[10px] text-t1 md:text-base !leading-[20.8px] font-medium">
              More than a basic URL QR code generator. With Q1 Box,
              <br /> you can create QRs for SMS, email, app downloads, PDF
              documents and much more.
            </p>
          </article>
          {/* {--------------------------------------------} */}

          {/* {--------------------------------------------} */}
          <section className="m-auto gap-8 padding-x grid w-full md:max-w-[70%] grid-cols-1 md:grid-cols-2  lg:grid-cols-4 lg:max-w-[100%] justify-items-center md:gap-5 2xl:gap-0">
            {BANNER_ICONS.map(({ image, title }, key) => (
              <div
                key={key}
                className="w-full max-w-[270px] bg-secondary px-[10px] py-[12px]  border-[3px] border-white rounded-primary h-[326px]"
              >
                <div className="bg-white flex-column text-center justify-center items-center gap-5  m-auto rounded-primary h-full w-full px-5">
                  <Image src={image} width={130} height={130} alt="image" />
                  <p className="text-lg font-bold text-t2">{title}</p>
                </div>
              </div>
            ))}
          </section>
          {/* {--------------------------------------------} */}
        </div>
      </div>
    </>
  );
}

export default QrBanner;
