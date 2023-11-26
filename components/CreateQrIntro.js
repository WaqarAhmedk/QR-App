import React from 'react'
import Image from 'next/image'

function CreateQrIntro() {
  return (
    <section className="layout-container padding-x ">
      <div className="max-w-[642px] flex-column m-auto items-center gap-5 md:gap-8">
        <article className="flex-column max-w-[100%] leading-6 gap-3 md:gap-10 text-center">
          <p className="text-xl md:text-heading font-bold text-t2">
            Create a QR Code in Seconds
          </p>
          <p className="px-[10px] !leading-[20.8px] md:text-base font-medium text-t1">
            No lengthy processes or waiting for your QR code to be emailed to
            you. Insert your destination, personalise as much as you like and
            the new QR will be ready instantly.
          </p>
        </article>
        <Image
          src="/assets/svgs/LandingPage/CreateQr.svg"
          alt="CreateQr"
          width={200}
          height={200}
          className="w-[85%] 500:w-[70%] lg:w-full"
        />
      </div>
    </section>
  )
}

export default CreateQrIntro
