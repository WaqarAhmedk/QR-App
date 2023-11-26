import { AdvanceLinksContext } from "@/context/AdvanceLink_SocialContext";
import { COLOR_PALLETES_ADVANCE_LINKS, socialIcons } from "@/utils/mock";
import { setSelectedPallets } from "@/utils/functions";
import { useFieldArray, useFormContext } from "react-hook-form";
import ColorPallete from "../ColorPallete";
import FileUpload from "../macros/FileUpload";
import Image from "next/image";
import Input from "../macros/Input";
import InputColor from "../macros/inputColor";
import InputWithIcon from "../macros/InputWithIcon";
import PremiumText from "../macros/PremiumText";
import React, { useEffect, useState } from "react";
import Toggle from "../macros/Toggle";

function Social() {
  const { fields, append, remove, move } = useFieldArray({ name: "links" });
  const { getValues, setValue } = useFormContext();
  const [formValues, setFormValues] = useState([]);
  const [draggedIndex, setDraggedIndex] = useState(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const onChange = (value) => {
    if (value) {
      setSelectedPallets(setValue, value);
    }
  };

  useEffect(() => {
    const formValues = getValues();
    setFormValues(formValues.links);
  }, [getValues()]);

  const handleDragStart = (e, index) => {
    e.dataTransfer.setData("text/plain", index);
  };

  const handleDragOver = (e, index) => {
    e.preventDefault();
    setHoveredIndex(index);
  };

  const handleDrop = (e, dropIndex) => {
    const draggedIndex = e.dataTransfer.getData("text/plain");
    move(draggedIndex, dropIndex);
    setDraggedIndex(null);
    setHoveredIndex(null);
  };

  return (
    <section className="flex-column gap-2">
      <div className="text-lg font-medium">
        <PremiumText text="Design" />
      </div>
      <div className="flex-column gap-6 ">
        <ColorPallete
          pallete={COLOR_PALLETES_ADVANCE_LINKS}
          palleteClass="color-palette-flex"
          onChange={onChange}
          type="advanceLinks"
        />
        <div className="input-color-wrapper">
          <InputColor
            name="preview.bgColor"
            inputLabel="Background Color"
            defaultColor="#5E61F6"
          />
          <InputColor
            name="preview.iconsColor"
            inputLabel="Icons color"
            defaultColor="#5E61F6"
          />
          <InputColor
            name="preview.textColor"
            inputLabel="Text color"
            defaultColor="#ffffff"
          />
        </div>

        <div className="row-flex w-full gap-10 md:gap-40">
          <FileUpload
            label="Cover Image"
            accept="image/*"
            // onChange={handleProfileImage}
            name="preview.coverImage"
          />
          <FileUpload
            label="Profile Image"
            accept="image/*"
            name="preview.profileImage"
            // onChange={handleCoverImage}
          />
        </div>
        <div className="flex-column gap-5 ">
          {" "}
          <div className="flex items-center flex-wrap 1320:flex-nowrap gap-5">
            {socialIcons.map(({ name, url, Icon, type }) => {
              return (
                <div
                  key={name}
                  className="cursor-pointer"
                  onClick={() => {
                    console.log("NAME", name);
                    const isTypeExist = formValues.some(
                      ({ type: valueType }) => valueType === type
                    );
                    if (!isTypeExist) {
                      append({ name, url, type });
                    }
                  }}
                >
                  <Icon
                    isLight={
                      !formValues?.some(
                        ({ type: valueType }) => valueType === type
                      )
                    }
                  />
                </div>
              );
            })}
          </div>
          <div className="w-[93%] flex flex-col gap-3">
            <Input
              inputLabel="Profile Name"
              name={`preview.profileName`}
              placeholder={"Profile Name"}
            />
            <Input
              inputLabel="Summary"
              name={`preview.summary`}
              placeholder={"Summary"}
            />
          </div>
          <div className="w-[93%] flex flex-col gap-3">
            <h2 className="font-bold"> Social Links</h2>
          </div>
          <div className="flex-column gap-5">
            <div className="flex-column gap-5">
              {fields.map(({ placeHolder, name }, index) => {
                const isDragging = index === draggedIndex;
                const isHovered = index === hoveredIndex;

                return (
                  <div
                    className="relative bg-[#fafafa] p-3"
                    draggable
                    onDragStart={(e) => handleDragStart(e, index)}
                    onDragOver={(e) => handleDragOver(e, index)}
                    onDrop={(e) => handleDrop(e, index)}
                  >
                    <div
                      key={index}
                      className=" flex-column items-center rounded-md gap-3 w-[93%]"
                    >
                      <div className="relative w-full flex items-center">
                        <Input
                          width="w-full"
                          name={`links.${index}.name`}
                          placeholder="/Handle Name"
                          index={index}
                        />
                        <Image
                          className="cursor-pointer absolute -right-5  md:-right-9 "
                          src="/assets/images/drag.png"
                          style={{
                            cursor: "-moz-grab",
                            cursor: "grab",
                          }}
                          width={18}
                          height={20}
                          alt="input-delete"
                        />
                      </div>

                      <div className="relative w-full flex items-center">
                        <InputWithIcon
                          name={`links.${index}.url`}
                          width="w-full"
                          index={index}
                          type={name}
                          placeholder={placeHolder}
                        />
                        {fields.length > 1 && (
                          <Image
                            className="cursor-pointer absolute -right-5  md:-right-9 "
                            src="/assets/svgs/icons/bin.svg"
                            width={18}
                            height={20}
                            alt="input-delete"
                            onClick={() => {
                              console.log("name", name);
                              remove(index);
                            }}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <span className="row-flex items-center gap-4">
            <Toggle name="updateAndTrack" />
            <p className="text-sm text-t1">Update & Track Later.</p>
          </span>
        </div>
      </div>
    </section>
  );
}

export default Social;
