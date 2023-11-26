import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import ColorPallete from "../ColorPallete";
import { COLOR_PALLETES_ADVANCE_LINKS } from "@/utils/mock";
import InputColor from "../macros/inputColor";
import Input from "../macros/Input";
import Toggle from "../macros/Toggle";
import { ADVANCE_LINKS_INPUTS } from "@/utils/mock";
import FileUpload from "../macros/FileUpload";
import { setSelectedPallets } from "@/utils/functions";
import {
  useFieldArray,
  useForm,
  useFormContext,
  useWatch,
} from "react-hook-form";
import Button from "../macros/Button";

function AdvanceLinks() {
  const { fields, append, remove } = useFieldArray({ name: "links" });
  const { formState } = useFormContext();
  const [twebsites, setTwebsites] = useState(1);

  const {
    setValue,
    formState: { errors },
  } = useFormContext();

  const handleAddInput = () => {
    append({
      name: "Website " + twebsites,
      url: "https://www.website" + twebsites + ".com",
    });
    setTwebsites(twebsites + 1);
  };
  const handlePalleteChange = (pallete) => {
    setSelectedPallets(setValue, pallete);
  };

  return (
    <section className="flex-column gap-6 text-t2">
      <div className="row-flex gap-[10px] items-center font-medium">
        <p>Design</p>
        <Image
          src="/assets/svgs/icons/crown.svg"
          alt="premium"
          width={20}
          height={20}
        />
      </div>
      <div className="flex-column gap-6">
        <ColorPallete
          pallete={COLOR_PALLETES_ADVANCE_LINKS}
          palleteClass="color-palette-flex"
          type="advanceLinks"
          onChange={handlePalleteChange}
        />
        <div className="input-color-wrapper">
          <InputColor name="preview.bgColor" inputLabel="Background Color" />
          <InputColor name="preview.iconsColor" inputLabel="Icons Color" />
          <InputColor name="preview.textColor" inputLabel="Text Color" />
        </div>
        <div className="row-flex w-full gap-10 md:gap-40 font-medium">
          <FileUpload
            name="preview.coverImage"
            label="Cover Image"
            accept="image/*"
          />
          <FileUpload
            name="preview.profileImage"
            label="Profile Picture"
            accept="image/*"
          />
        </div>
        <div className="w-full">
          <Input
            inputLabel="Profile Name"
            name={`preview.name`}
            placeholder={"Profile Name"}
          />
        </div>

        <div className="flex-column gap-[10px]">
          <div className="flex mb-3 justify-between">
            <p className="text-base font-[500]">Advance Links</p>
          </div>
          <div className="flex-column  gap-[20px]">
            {fields?.map(({ placeHolder }, index) => {
              return (
                <div key={index} className="row-flex  items-center gap-5">
                  <div className="grid w-[93%] grid-cols-2 gap-2">
                    <Input
                      name={`links[${index}].name`}
                      width="w-full"
                      placeholder={placeHolder}
                    />
                    <Input
                      name={`links[${index}].url`}
                      width="w-full"
                      placeholder={placeHolder}
                    />
                  </div>
                  {index >= 1 && (
                    <Image
                      className="cursor-pointer"
                      src="/assets/svgs/icons/bin.svg"
                      width={18}
                      height={20}
                      alt="input-delete"
                      onClick={() => {
                        remove(index);
                      }}
                    />
                  )}
                </div>
              );
            })}
            <Button
              text="+ Add More"
              actionType="button"
              type="gradient"
              className="w-full"
              buttonClass="rounded-xl  w-full h-[45px] bg-none gradient-border"
              onClick={handleAddInput}
            />
            <span className="row-flex items-center gap-4">
              <Toggle name="updateAndTrack" />
              <p className="text-sm text-t1">Update & Track Later.</p>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AdvanceLinks;
