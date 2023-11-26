import React, { useEffect, useState } from "react";
import { Modal } from "./Modal";
import { Tab } from "./macros/Tab";

import Image from "next/image";
import {
  ColorChange,
  Frames,
  Shapes,
  Templates,
  UploadLogo,
} from "./QRCodeAppearanceOptions";
import { CUSTOMIZE_QR_TABS } from "@/utils/mock";
import DownloadOptions from "./DownloadOptions";
import Qr from "./macros/Qr";
import { useDispatch, useSelector } from "react-redux";
import { setModalTab } from "@/store/barCode/barCodeSlice";
import { getTemplates } from "@/store/barCode/barCodeAction";

// const RightOptions = () => {
//   return (
//     <div className='flex-column xl:border-l h-full  pb-3 max-w-[800px] border-gray-200'>
//       <div className='w-full flex-column gap-2 1320:gap-4 p-10 items-center'>
//         <Qr />
//       </div>
//       <div className='border-t border-gray-200 pb-1 1320:pb-5 pt-10 px-5'>
//         <DownloadOptions disableDownloadText={true} />
//       </div>
//     </div>
//   );
// };

function CustomizeQrModal() {
  const { modalTab } = useSelector((state) => state.barCode);
  const dispatch = useDispatch();
  let token = localStorage.getItem("token");

  useEffect(() => {
    dispatch(getTemplates());
  }, [token]);

  const CurrentOption = React.memo(() => {
    const getComponent = () => {
      switch (modalTab) {
        case "TEMPLATES":
          return <Templates />;
        case "UPLOAD LOGO":
          return <UploadLogo />;
        case "COLOR CHANGE":
          return <ColorChange />;
        case "SHAPE":
          return <Shapes />;
        case "FRAMES":
          return <Frames />;
        default:
          return <Templates />;
      }
    };

    return getComponent();
  });
  return (
    <div className="w-full h-full mt-8 ">
      <div className="flex flex-wrap justify-between text-center py-2 lg:py-0 gap-x-3 gap-y-1 lg:gap-4 border-y border-gray-200">
        {CUSTOMIZE_QR_TABS.map(({ name, premium }) => {
          return (
            <Tab
              key={name}
              name={name}
              selectedTab={modalTab}
              premium={premium}
              handleTabSelect={() => dispatch(setModalTab(name))}
            />
          );
        })}
      </div>
      <div className="flex-column ">
        <div className=" pt-4 pb-4 xl:col-span-8">
          <CurrentOption />
        </div>
        {/* <div className='xl:col-span-4'>
            {modalTab === 'FRAMES' ? (
              <RightOptions image='/assets/images/scan_me.png' />
            ) : (
              <RightOptions />
            )}
          </div> */}
      </div>
    </div>
  );
}

export default CustomizeQrModal;
