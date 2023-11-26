import React from 'react'
import { QR } from '@/utils/mock'
import CardQrImage from './macros/CardQrImage'
import classNames from 'classnames'

export default function QrCards() {
  const wrapperClass = classNames(
    'layout-container font-bold text-center space-y-14',
  )

  const sectionClass = classNames(
    'padding-x m-auto grid grid-cols-1 sm:grid-cols-3 justify-items-center gap-y-6 sm:gap-5 max-w-[90%]',
  )

  return (
    <div className="space-y-10">
      <article className="flex-column w-full lg:max-w-[50%] m-auto leading-6 gap-3 md:gap-[30px] text-center">
        <p className="text-xl md:text-heading font-bold text-t2">
          White Label & Bring Your Brand
        </p>
        <p className="text-sm font-medium w-full xl:w-[65%] 1320:w-[46%] m-auto text-t1 md:text-base">
          Customise the design of your QR codes with a company logo, colours,
          shapes and more.
        </p>
      </article>
      <div className={wrapperClass}>
        <section className={sectionClass}>
          {QR.map((current, index) => (
            <CardQrImage {...current} key={index} />
          ))}
        </section>
      </div>
    </div>
  )
}
