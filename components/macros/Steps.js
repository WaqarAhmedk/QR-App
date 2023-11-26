import React from "react";
import Image from "next/image";
import CardRound from "./cardRound";
import { MarketingCard } from "@/utils/mock";


function Steps() {
  return (
    <>
      <section className="layout-container text-t2 space-y-14">
        <div className="padding-x mt-[80px] flex flex-col lg:flex-row items-center lg:items-start justify-between gap-10 xl:gap-[5.4rem] ">
          <div className="bg-white border-2 rounded-3xl p-5 md:bg-transparent md:border-none md:p-0 flex flex-col gap-5 lg:w-[59%]  max-w-[478px] md:max-w-none">
            <div className="flex flex-col gap-5 xl:w-[85%]">
              <h2 className="heading font-bold">
                Real-Time Marketing Made Easy
              </h2>
              <p className="breif font-medium text-t1">
                When you make a QR code, it gives you the power to update your
                marketing material in real-time. Now, it's so easy to instantly
                connect with customers and provide them with the latest
                collateral and information about your brand.
              </p>
              <ul className="text-t1 flex flex-col gap-1 breif">
                <li>
                  <span className="font-bold">Step 1:</span> Update the document
                  or webpage your QR code links to.{" "}
                </li>
                <li>
                  <span className="font-bold">Step 2:</span> Push your changes
                  live.{" "}
                </li>
                <li>
                  <span className="font-bold">Step 3:</span> Scan your QR code
                  and see the new content.
                </li>
              </ul>
            </div>
            <Image
              src="/assets/images/steps.png"
              width={100}
              height={100}
              className="w-full"
              unoptimized
              alt="steps"
            />
          </div>
          <div className="bg-white border-2 rounded-3xl p-5 md:bg-transparent md:border-none md:p-0 flex flex-col md:flex-row lg:flex-col items-center justify-center lg:text-center lg:w-[44%] gap-5 md:gap-10 lg:gap-5 max-w-[478px] md:max-w-none">
            <Image
              src="/assets/images/marketingqr.png"
              width={100}
              height={100}
              className="w-full md:w-1/2 lg:w-[94%]"
              unoptimized
              alt="steps"
            />
            <div className="flex flex-col gap-5">
              <h2 className="heading font-bold">Take Customers On a Journey</h2>
              <p className="breif font-medium text-t1">
                Historically, it's been challenging to get additional marketing
                material in front of leads. Now, rather than a lengthy leaflet
                or heavy brochure, you can give them easy access to digital
                content via a platform they enjoy. Whether it's copy, images, or
                video, creating a QR code is a highly effective way to steer
                customers toward content that makes them convert.
              </p>
            </div>
          </div>
        </div>
        <div className="relative px-[20px] lg:px-[75px] xl:px-[100px]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 1320:gap-20">
            {MarketingCard.map(({ title, text }) => (
              <CardRound title={title} text={text} />
            ))}
          </div>
        </div>
        <div className="padding-x text-center flex flex-col items-center gap-5 ">
          <div className="md:w-[85%] flex flex-col items-center gap-5">
            <h2 className="heading font-bold">
              More Hot Leads, Highly Engaged Prospects & Increased Sales
            </h2>
            <p className="breif font-medium text-t1 sm:w-[88%]">
              The Q1 Box QR code creator empowers you to share engaging content
              via an imaginative user journey. This gives you the foundation to
              increase brand awareness, drive engagement—and most importantly,
              generate more sales.
            </p>
          </div>
        </div>
      </section>
      <div className="relative flex items-center justify-center mt-8">
        <Image
          src="/assets/images/rectanglebackground.png"
          width={100}
          height={100}
          className="w-full hidden lg:block"
          unoptimized
          alt="white  background"
        />
        <div className="lg:absolute padding-x text-center flex flex-col gap-3 xl:gap-4 mt-6 border lg:border-none bg-white lg:bg-transparent py-12 lg:py-0">
          <h2 className="heading font-bold text-t2">
            Upgrade Your Marketing Strategy
          </h2>
          <p className="breif font-medium text-t1 ">
            QR codes bridge the gap between print and digital marketing. Some
            say print marketing is dead. On the contrary, adding a QR code to
            your printed material gives you the opportunity to direct users to
            additional content, encouraging them to buy into your brand.
          </p>
          <span className="nreif font-bold text-t2">
            Let's refresh your marketing strategy with Q1 Box
          </span>
        </div>
      </div>
    </>
  );
}

export default Steps;
