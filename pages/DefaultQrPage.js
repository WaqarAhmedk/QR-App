import React from "react";
import Image from "next/image";

const socialMediaIcons = [
  "/assets/svgs/social/facebook-colored.svg",
  "/assets/svgs/social/twitter-colored.svg",
  "/assets/svgs/social/linkedin-colored.svg",
  "/assets/svgs/social/instagram-colored.svg",
];

export default function DefaultQrPage() {
  return (
    <div className="container mx-auto p-4">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-xl font-bold mb-3 text-center">
          Missing Info for Your QR Code
        </h1>
        {/* <div className="flex justify-center space-x-2 mb-3">
          {socialMediaIcons.map((icon, index) => (
            <Image
              key={index}
              src={icon}
              height={25}
              width={25}
              alt="social-icon"
              className="cursor-pointer"
            />
          ))}
        </div> */}
        <div>
          <h5 className="text-lg mb-1">Hey there,</h5>
          <p className="text-gray-700 mb-3">
            Seems you forgot vital details for your QR Code. Remember to "Save"
            after!
          </p>
          <h3 className="text-lg font-bold mb-1 mt-3">Next Steps?</h3>
          <p className="text-gray-700 mb-3">
            No worries! Fill the info, tap "Create QR Code," then rescan.
          </p>
          <p className="text-gray-700 mb-3">
            If you still see this after scanning, don't print yet.
          </p>
          <h4 className="text-md mt-2 font-bold">Regards, Q1 BOX Team</h4>
        </div>
      </div>
    </div>
  );
}
