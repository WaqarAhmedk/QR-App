import React from 'react'
import Image from 'next/image'

function Media() {
  return (
    <section className="layout-container text-t2 space-y-14">
      <div className="padding-x space-y-8 lg:space-y-16 mt-[80px] xl:mt-[102px]">
        <section className="text-center flex-column space-y-5 lg:space-y-16">
          <p className="text-xl md:text-heading font-bold">
            Up Your Digital & Printed Marketing Game
          </p>
          <p className="text-sm md:text-base">
            Use Q1 Box code generator to enhance digital marketing campaigns, or
            add them to printed materials to boost engagement and guide
            customers on a carefully planned user journey.
          </p>
        </section>
        <Image
          src="/assets/images/media_tiles.png"
          width={100}
          height={100}
          className="w-full"
          unoptimized
          alt="image"
        />
      </div>
      <div className="relative">
        <div className="absolute flex-column 500:gap-1 top-[25%] lg:gap-3 text-white left-0 right-0 xl:gap-10 text-center mx-auto">
          <p className="text-[10px] 500:text-sm md:text-xl lg:text-2xl xl:text-[32px] font-bold">
            {' '}
            Let's get started
          </p>
          <p className="text-[8px] antialiased 500:text-[10px] md:text-sm lg:text-base font-[500]">
            Transform your marketing efforts and start using Q1 Box today.
          </p>
        </div>
        <Image
          src="/assets/svgs/bar.svg"
          width={20}
          height={20}
          className="w-[90%] m-auto"
          unoptimized
          alt="image"
        />
      </div>
    </section>
  )
}

export default Media
