import Image from "next/image";
import React, { useEffect } from "react";

const ContactUs = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "//js.hsforms.net/forms/embed/v2.js";
    script.charset = "utf-8";
    script.type = "text/javascript";
    document.getElementById("my-form").appendChild(script);

    script.addEventListener("load", () => {
      if (window.hbspt) {
        window.hbspt.forms.create({
          region: "na1",
          portalId: "24245452",
          formId: "36b94cc9-3f66-43f9-9c8a-9810070c5a61",
          target: "#my-form",
        });
      }
    });
  }, []);

  return (
    <section className="layout-container padding-x text-t2">
      <div className="bg-white shadow-md px-[15px] sm:px-[34px] py-10 flex flex-col items-center gap-4 sm:gap-10">
        <div className="flex flex-col gap-3 text-center justify-center">
          <p className="heading font-bold">Support</p>
        </div>
        <div className="flex flex-col-reverse gap-5 md:flex-row items-center justify-between w-full sm:w-[90%] lg:w-[80%]">
          <div className="flex flex-col gap-4 items-center md:items-start w-full">
            <p className=" md:text-lg font-bold">Contact Details</p>
            <div className="text-sm  lg:text-base text-t2 row-flex  items-center gap-3">
              <Image
                src="/assets/svgs/Contact/call.svg"
                alt="Phone Icon"
                width={20}
                height={20}
                unoptimized
              />
              <div className="flex-column items-center 500:row-flex 500:gap-2 xl:gap-5">
                <p>Call us:</p>
                <p className="font-bold">123456789</p>
              </div>
            </div>
            <div className="text-sm  lg:text-base text-t2 row-flex  items-center gap-3">
              <Image
                src="/assets/svgs/Contact/mail.svg"
                alt="Phone Icon"
                width={20}
                height={20}
                unoptimized
              />
              <div className="flex-column items-center 500:row-flex 500:gap-2 xl:gap-5">
                <p className="whitespace-nowrap">Sales inquiries:</p>
                <p className="font-bold">sales@helloportal.com.au</p>
              </div>
            </div>
          </div>
          <Image
            src="/assets/images/support.png"
            alt="Phone Icon"
            className="w-[250px] lg:w-[280px] xl:w-[350px]"
            width={100}
            height={100}
            unoptimized
          />
        </div>
        <div className="w-[80%] h-[0.5px] bg-gray-300 m-auto" />

        <div
          id="my-form"
          className="w-full sm:w-[90%] md:w-[75%] lg:w-[60%]"
        ></div>
      </div>
    </section>
  );
};

export default ContactUs;
