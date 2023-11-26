import Image from "next/image";

export const Tab = ({ name, premium, handleTabSelect, selectedTab }) => (
  <div
    className={`flex flex-wrap cursor-pointer items-center lg:py-4  gap-[5px] ${
      selectedTab === name
        ? `border-b-primary border-b-4`
        : "border-b-transparent border-b-4"
    }`}
    onClick={() => handleTabSelect()}
  >
    <p
      className={`text-[10px] lg:text-sm   font-semibold ${
        selectedTab === name ? `text-primary` : "text-black"
      }`}
    >
      {name}
    </p>
    {premium && (
      <Image
        src="/assets/svgs/icons/crown.svg"
        alt="premium"
        width={20}
        height={20}
        className="w-[14px] h-[14px] lg:w-[20px] lg:h-[20px]"
      />
    )}
  </div>
);
