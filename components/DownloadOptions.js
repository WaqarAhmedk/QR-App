import { useEffect, useState } from "react";
import {
  DOWNLOAD_OPTIONS_BTNS,
  QUALITY_BTNS,
  ERORR_LEVEL_OPTIONS, // Corrected the constant name
} from "@/utils/mock";
import { useSelectToggle } from "@/utils/functions";
import Button from "./macros/Button";
import { useFormContext } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { setFolderModal } from "@/store/barCode/barCodeSlice";
import SigninModal from "./macros/SigninModal";
import DropDown from "./macros/DropDown";
import TypeDropDown from "./macros/ImageType";
import Image from "next/image";

function DownloadOptions({ disableDownloadText }) {
  const [downloadBtns, setDownloadBtns] = useState(DOWNLOAD_OPTIONS_BTNS);
  const [errorBtns, setErrorBtns] = useState(ERORR_LEVEL_OPTIONS); // Corrected the constant name
  const [qualityBtns, setQualityBtns] = useState(QUALITY_BTNS);
  const { loading, qrType } = useSelector((state) => state.barCode);
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);

  const storageToken = localStorage.getItem("token");
  const [btnName, setBtnName] = useState("");
  const { setValue } = useFormContext();
  const router = useRouter();
  const { token: paramsToken } = router.query;
  const token = paramsToken || storageToken;
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  const [selectedOption, setSelectedOption] = useState("PNG");
  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setValue("qrDownloadOption", option);
    setIsOpen(false);
  };
  const options = ["PNG", "SVG"];
  useEffect(() => {
    if (token) {
      setBtnName("Create QR Code");
    } else {
      // if (['Url', 'Sms', 'Video'].includes(qrType)) {
      //   setBtnName('Create QR Code');
      // } else {
      setBtnName("Sign up to continue");
    }
  }, [qrType, token]);

  const handleDownloadSelect = (type) => {};

  const handleQualitySelect = (id) => {
    useSelectToggle(setQualityBtns, id, "selected");
    setValue("qrQuality", id);
  };

  // const handleErrorOption = (id) => {
  //   console.log('handleErrorOption',id)
  //   useSelectToggle(setErrorBtns, id, "selected");
  //   setValue("qrErrorLevel", id);
  // };

  const handleButtonClick = () => {
    if (btnName === "Create QR Code") {
      dispatch(setFolderModal(true));
    }
  };
  const [open, setOpen] = useState(false);
  return (
    <div className="flex-column gap-0  items-center text-center font-[500] mt-2">
      <div className="flex gap-2 items-center mb-2">
        {!disableDownloadText && (
          <p className="font-bold text-t2 ">DOWNLOAD IN</p>
        )}
        <div className="relative inline-block">
          <div
            className="rounded px-4 py-2 cursor-pointer flex gap-3"
            onClick={toggleDropdown}
          >
            <p className="text-[blue]"> {selectedOption}</p>
            <Image
              src={"/assets/svgs/icons/arrow_down.svg"}
              width={12}
              height={12}
            />
          </div>
          {isOpen && (
            <div className="absolute z-50	  bg-white">
              {options.map((option, index) => (
                <div
                  key={index}
                  className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                  onClick={() => handleOptionSelect(option)}
                >
                  {option}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* <div className="flex gap-2 lg:gap-4">
          {downloadBtns.map(({ text, id, selected }) => (
            <Button
              key={id + 3}
              text={text}
              className="w-[76px]"
              type="gradient"
              checkEnable={selected}
              actionType="button"
              onClick={() => handleDownloadSelect(id)}
            />
          ))}
        </div> */}
      </div>

      <div className="w-full my-4">
        {token ? (
          <Button
            text={btnName}
            className="w-[70%] lg:w-full font-medium"
            type="fill"
            actionType="button"
            loading={loading}
            onClick={handleButtonClick}
          />
        ) : (
          btnName === "Create QR Code" && ( // Fixed the syntax here
            <Button
              text={btnName}
              className="w-[70%] lg:w-full font-medium "
              type="fill"
              actionType="submit"
              loading={loading}
            />
          )
        )}
        {open && <SigninModal open={open} setOpen={setOpen} />}
        {btnName === "Sign up to continue" &&
          !token && ( // Fixed the syntax here
            <Button
              text={btnName}
              className="w-[70%] lg:w-full font-medium"
              type="fill"
              actionType="button"
              onClick={() => setOpen(true)}
            />
          )}
      </div>
    </div>
  );
}

export default DownloadOptions;

{
  /* <div className="flex-column gap-5 items-center text-center">
        <p className="font-bold text-t2">Err Level</p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 place-content-between">
          {errorBtns.map(({ type, id, text, selected }) => (
            <Button
              key={id + 1}
              text={text}
              className="w-[76px]"
              type={type}
              actionType="button"
              checkEnable={selected}
              onClick={() => handleErrorOption(id)}
            />
          ))}
        </div>
      </div> */
}
