import React from "react";
import PlainCard from "./macros/PlainCard";
import { MORE_THAN_A_QR } from "@/utils/mock";
import classNames from "classnames";

export default function MoreThanAQrCode() {
  const wrapperClass = classNames("layout-container text-center space-y-14");

  const sectionClass = classNames(
    "padding-x m-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 justify-items-center gap-2 lg:gap-10"
  );

  const headingClass = classNames("text-xl md:text-heading font-bold text-t2");

  return (
    <div className={wrapperClass}>
      <p className={headingClass}>More Than a QR Code Maker</p>
      <section className={sectionClass}>
        {MORE_THAN_A_QR.map((current, index) => (
          <PlainCard {...current} key={index} />
        ))}
      </section>
    </div>
  );
}
