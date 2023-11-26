import React from "react";
import Image from "next/image";
import { FOOTER_LINKS, SOCIAL_ICONS } from "@/utils/mock";

const Social = () => {
  return (
    <div className="flex space-x-5">
      {SOCIAL_ICONS.map(({ icon, goto }, index) => {
        return (
          <Image
            key={index}
            src={icon}
            alt="icon"
            width={28}
            height={28}
            className="cursor-pointer"
            onClick={() => {
              window.open(goto);
            }}
          />
        );
      })}
    </div>
  );
};

function Footer() {
  return (
    <div className="w-full layout-container">
      <footer className="padding-x h-[227px] gap-3 md:gap-7 w-full flex-column justify-center text-center">
        <section className="flex-column text-left md:text-center gap-2 md:row-flex justify-evenly">
          {FOOTER_LINKS.map(({ name, goto }, index) => {
            return (
              <p
                key={index}
                className="text-t2 text-base cursor-pointer"
                onClick={() => {
                  if (name === "Home") {
                    window.location.href = "/";
                  } else if (name == "Blog") {
                    window.location.href = "/blog";
                  } else if (name === "FAQ") {
                    window.location.href = "/help/faq";
                  } else if (name === "Pricing") {
                    window.location.href = "/pricing";
                  } else if (name === "Contact us") {
                    window.location.href = "/contact-us";
                  }
                }}
              >
                {name}
              </p>
            );
          })}
          <Social />
        </section>
        <section className="py-4 md:py-10 text-t1 text-base border-t-grey border-t-[1px]">
          <p>© Copyright 2023, All Rights Reserved by Q1 Box </p>
        </section>
      </footer>
    </div>
  );
}

export default Footer;
