import Image from 'next/image'
import React, { useEffect } from 'react'

const ContactUs = () => {
  useEffect(() => {
    let form = document.getElementById('my-form')
    if (!form.hasChildNodes()) {
      const script = document.createElement('script')
      script.src = '//js.hsforms.net/forms/embed/v2.js'
      script.charset = 'utf-8'
      script.type = 'text/javascript'
      document.getElementById('my-form').appendChild(script)

      script.addEventListener('load', () => {
        if (window.hbspt) {
          window.hbspt.forms.create({
            region: 'na1',
            portalId: '24245452',
            formId: 'c734151f-d5f0-4bcb-a1e4-3f51c7f94f7b',
            target: '#my-form',
          })
        }
      })
    }
  }, [])

  return (
    <section className="layout-container padding-x text-t2">
      <div className="bg-white shadow-md px-[15px] sm:px-[34px] py-10 flex flex-col items-center gap-4 sm:gap-10">
        <div className="flex flex-col gap-3 text-center justify-center">
          <p className="heading font-bold">Contact us</p>
          <p className="breif text-t1">
            We''d love to hear from you. Please fill out this form.
          </p>
        </div>
        <div className="flex flex-col gap-4 text-center justify-center w-full">
          <p className="md:text-lg font-bold">Contact Details</p>
          <div className="breif text-t2 row-flex justify-center items-center gap-3">
            <Image
              src="/assets/svgs/Contact/call.svg"
              alt="Phone Icon"
              width={20}
              height={20}
              unoptimized
            />
            <div className="flex-column  500:row-flex 500:gap-5">
              <p>Call us:</p>
              <p className="font-bold">123456789</p>
            </div>
          </div>
          <div className="breif text-t2 row-flex justify-center items-center gap-3">
            <Image
              src="/assets/svgs/Contact/mail.svg"
              alt="Phone Icon"
              width={20}
              height={20}
              unoptimized
            />
            <div className="flex-column  500:row-flex 500:gap-5">
              <p>Sales inquiries:</p>
              <p className="font-bold">sales@helloportal.com.au</p>
            </div>
          </div>
          <div className="w-[80%] h-[0.5px] bg-gray-300 m-auto" />
        </div>
        <div
          id="my-form"
          className="w-full sm:w-[90%] md:w-[75%] lg:w-[60%]"
        ></div>
      </div>
    </section>
  )
}

export default ContactUs
