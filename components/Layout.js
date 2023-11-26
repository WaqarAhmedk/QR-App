import { useRouter } from "next/router";
import React from "react";
import dynamic from "next/dynamic";

const BackgroundWave = dynamic(() => import("./macros/BackgroundWave"));
const Footer = dynamic(() => import("./Footer"));
const NavBar = dynamic(() => import("./NavBar"));

const Layout = ({ children }) => {
  const router = useRouter();
  const { id, userId, token } = router.query;

  // Create a new instance of URLSearchParams
  const searchParams = new URLSearchParams();

  // Add your parameters to the searchParams object
  searchParams.append("userId", userId);
  searchParams.append("token", token);

  const baseUrl = process.env.NEXT_PUBLIC_QR_WEB + `/create-qr`;
  const urlWithParams = `${baseUrl}?${searchParams}`;

  const DISABLE_WAVE = [`/create-qr`];
  const DISABLE_FOOTER_ROUTES = [
    "/signup",
    "/signin",
    "/reset-password",
    "/forgotpassword",
    "/display",
    `/display/[id]`,
    "/create-qr",
    `${urlWithParams}`,
  ];

  const DISABLE_NAVBAR = [`/display/[id]`, "/create-qr", `${urlWithParams}`];

  return (
    <>
      {DISABLE_WAVE.includes(router.pathname) ? null : <BackgroundWave />}
      <div className="">
        <div className="">
          {DISABLE_NAVBAR.includes(router.pathname) ? null : <NavBar />}
        </div>
        <div> {children}</div>
        <div className="">
          {DISABLE_FOOTER_ROUTES.includes(router.pathname) ? null : <Footer />}
        </div>
      </div>
    </>
  );
};

export default Layout;
