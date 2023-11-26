import SignupForm from "@/components/SignupForm";
import Image from "next/image";

function Signup() {
  return (
    <div className="container text-t2">
      <div className="bg-gray-300 w-full hidden md:block md:min-w-[31%]">
        <Image
          src="/assets/images/login_form.png"
          width={100}
          height={100}
          className="w-full h-full"
          alt="login-banner"
          unoptimized
        />
      </div>
      <SignupForm
        formclass={
          "w-full flex-column px-[1.5rem] md:px-[2.5rem] xl:px-[4.5rem] py-16 lg:pt-24  text-left gap-9 text-heading font-bold bg-white shadow-md"
        }
        closeModal={() => { }}
        isModal={false}
        headingText={"Join us today 👋"}
      />
    </div>
  );
}

export default Signup;
