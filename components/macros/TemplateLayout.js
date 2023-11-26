import { BarCodeContext } from "@/context/BarCodeContext";
import React, { useContext } from "react";
import { useSelector } from "react-redux";

function TemplateLayout({ children }) {
  const { barCode } = useSelector((state) => state);
  const { fgColor, qrTemplate } = barCode;

  const templateComponents = {
    ScanButton: ScanButton,
    ScanTagButton: ScanTagButton,
    // add more templates and their corresponding components as needed
  };

  const TemplateComponent = templateComponents[qrTemplate] || null;

  return (
    <div className="w-full">
      {children}
      <div>{TemplateComponent && <TemplateComponent fgColor={fgColor} />}</div>
    </div>
  );
}
export default TemplateLayout;

const ScanButton = ({ fgColor }) => {
  return (
    <div
      style={{ background: fgColor }}
      className="w-[100%] mt-2 rounded-md text-center flex items-center justify-center text-white h-[35px] bg-black"
    >
      Scan Me
    </div>
  );
};

const ScanTagButton = ({ fgColor }) => (
  <div className=" w-full -bottom-[30px]">
    <div className="flex-column items-center">
      <div className="up-triangle" />
      <div
        style={{ background: "#007bff" }}
        className="w-[100%] text-center flex items-center justify-center text-white h-[35px] bg-black"
      >
        Scan Me
      </div>
    </div>
  </div>
);
