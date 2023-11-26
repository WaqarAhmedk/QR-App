import React from "react";

const CardRound = ({ title, text }) => {
  return (
    <>
      <div className="border border-blue-600 flex flex-col items-center gap-4 px-3 500:px-6 rounded-tl-[100px] rounded-br-[100px] py-12 text-center">
        <h2 className="heading font-bold">{title}</h2>
        <p className="breif font-medium text-t1">{text}</p>
      </div>
    </>
  );
};

export default CardRound;
