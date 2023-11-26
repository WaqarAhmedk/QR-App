import React, { useEffect } from "react";
import Image from "next/image";

function PreviewMenu(props) {
  const currentData = props.data;
  const textColor = currentData?.menu?.preview?.textColor;
  const bgColor = currentData?.menu?.preview?.bgColor;
  const borderColor = currentData?.menu?.preview?.borderColor;
  const buttonColor = currentData?.menu?.preview?.buttonColor;
  const coverImage =
    currentData?.menu?.preview?.coverImage || "/assets/images/restaurant.png";
  const menuName = currentData?.menu?.menuName;
  const shopName = currentData?.menu?.shopName;
  const storeLink = currentData?.menu?.storeLink;
  const description = currentData?.menu?.description;
  const buttonName = currentData?.menu?.buttonName;
  const products = currentData?.menu?.products;
  const has = products.some(
    (item) => item.name?.length > 0 || item?.price?.length > 0
  );
  const menuWrapper = `rounded-md grid gap-x-4 gap-y-14 place-items-center px-3 overflow-auto max-h-[374px] pt-[37px] mt-[0px];
   ${
     products.length > 0 && has && products.length === 1
       ? "grid-cols-1"
       : products.length > 0 && products.length > 1
       ? "grid-cols-2"
       : products.length === 0
       ? "grid-cols-2"
       : "grid-cols-2"
   }`;
  const handleOpenStore = () => {
    if (storeLink) {
      window.location.href = storeLink;
    }
  };

  return (
    <div className="lg:mt-3 break-words w-full">
      <div
        style={{
          backgroundColor: bgColor,
          borderColor: borderColor,
          borderWidth: "7px",
        }}
        className="bg-white min-h-[500px] relative pb-[100px] rounded-[5px] h-screen items-center flex-column"
      >
        <div className="w-full relative">
          <Image
            src={coverImage}
            width={100}
            height={100}
            className="w-full max-h-[150px] object-fill"
            alt="restaurant"
            unoptimized
          />
          <div className="absolute bottom-0 bg-[rgba(0,0,0,0.4)] w-full p-4">
            <p className="text-white">{shopName}</p>
          </div>
        </div>
        <div className="flex-column gap-3 p-2 ">
          <p
            className="text-center break-all px-2 text-xl font-[500] mt-3"
            style={{ color: textColor }}
          >
            {menuName}
          </p>
          <p className="break-all text-center">{description}</p>
        </div>
        <div className={menuWrapper}>
          {products.map((item, index) => (
            <div
              key={index}
              style={{ background: item.bgColor }}
              className="relative rounded-[5px] shadow-sm bg-white p-2 h-[105px] min-w-[125px] text-ellipsis max-w-[125px] flex items-center justify-center"
            >
              <div className="mt-4 text-center text-ellipsis justify-between flex-column">
                <p style={{ color: item.textColor }}>{item.name}</p>
                <p
                  style={{ color: item.textColor }}
                  className="text-ellipsis font-bold"
                >
                  {item.price}$
                </p>
              </div>
              <Image
                src={item?.Image || "/assets/svgs/food.svg"}
                width={57}
                height={57}
                alt="food"
                style={{
                  maxWidth: "57px",
                  maxHeight: "57px",
                }}
                className="absolute rounded-full min-w-[57px] min-h-[57px] -top-9 left-0 right-0 m-auto "
              />
            </div>
          ))}
        </div>
        <div
          className="primary-button font-medium text-lg cursor-pointer text-center w-[90%] absolute bottom-2  min-h-[50px]"
          style={{
            background: buttonColor,
          }}
          onClick={handleOpenStore}
        >
          {buttonName}
        </div>
      </div>
    </div>
  );
}

export default PreviewMenu;
