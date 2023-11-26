import React, { useState } from "react";
import ToggleBar from "./ToggleBar";
import QrCodeStylingComponent from "./QrCodeStylingComponent";
import FrameLayout from "./FrameLayout";
import TemplateLayout from "./TemplateLayout";
import { useSelector } from "react-redux";
import Loader from "./Loader";

function Qr({ toggler = false }) {
  const [isOpen, setIsOpen] = useState(true);
  const { barCode } = useSelector((state) => state);
  const { eyeFrame, eyeBall, qrFrame, qrTemplate } = barCode;
  const { bgColor, fgColor } = barCode;
  const { loading } = useSelector((state) => state.barCode);
  return (
    <div className={`flex-column   items-center ${isOpen ? " pb-3" : "pb-3"}`}>
      {toggler && (
        <ToggleBar label="QR Code" setIsOpen={setIsOpen} isOpen={isOpen} />
      )}

      <div
        id="qr_parent"
        className="flex relative justify-center items-center w-[100%] p-1 h-full "
      >
        {isOpen && (
          <>
            {loading && (
              <span className="absolute z-10">
                <Loader classNames="w-[40px] h-[40px]" />
              </span>
            )}
            <div className={`${loading && "opacity-[0.6]"} `}>
              <div className="">
                {qrFrame !== "none" ? (
                  <FrameLayout>
                    <QrEyesStyling
                      eyeBall={eyeBall}
                      eyeFrame={eyeFrame}
                      bgColor={bgColor}
                    />
                  </FrameLayout>
                ) : qrTemplate !== "none" ? (
                  <TemplateLayout>
                    <QrEyesStyling
                      eyeBall={eyeBall}
                      eyeFrame={eyeFrame}
                      bgColor={bgColor}
                      fgColor={fgColor}
                      qrTemplate={qrTemplate}
                    />
                  </TemplateLayout>
                ) : (
                  <QrEyesStyling
                    eyeBall={eyeBall}
                    eyeFrame={eyeFrame}
                    bgColor={bgColor}
                  />
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Qr;

const QrEyesStyling = ({ eyeFrame, eyeBall, bgColor, fgColor, qrTemplate }) => {
  return (
    <div
      className={`${
        qrTemplate === "ScanTagButton"
          ? "pb-4"
          : qrTemplate === "ScanButton"
          ? "border-2 p-1 rounded-md"
          : ""
      }`}
      style={{ background: bgColor, borderColor: fgColor }}
    >
      <div className="relative" id="qr">
        <div id="eye-box" className="left-box">
          {eyeFrame === "eye-frame-hexagon" ? (
            <Hexagon eyeBall={eyeBall} />
          ) : (
            <OtherShapes eyeFrame={eyeFrame} eyeBall={eyeBall} />
          )}
        </div>
        <div id="eye-box" className="right-box">
          {eyeFrame === "eye-frame-hexagon" ? (
            <Hexagon eyeBall={eyeBall} />
          ) : (
            <OtherShapes eyeFrame={eyeFrame} eyeBall={eyeBall} />
          )}
        </div>
        <div id="eye-box" className="bottom-left-box">
          {eyeFrame === "eye-frame-hexagon" ? (
            <Hexagon eyeBall={eyeBall} />
          ) : (
            <OtherShapes eyeFrame={eyeFrame} eyeBall={eyeBall} />
          )}
        </div>
        <QrCodeStylingComponent />
      </div>
    </div>
  );
};

const OtherShapes = ({ eyeBall, eyeFrame }) => {
  return (
    <div id="eyeFrame" className={`${eyeFrame}`}>
      <div id="eyeBall" className={`${eyeBall}`} />
    </div>
  );
};

const Hexagon = ({ eyeBall }) => {
  return (
    <div id="eyeFrame" className="eye-frame-hexagon">
      <div className="eye-frame-inner-hexagon">
        <div id="eyeBall" className={`${eyeBall}`} />
      </div>
    </div>
  );
};
