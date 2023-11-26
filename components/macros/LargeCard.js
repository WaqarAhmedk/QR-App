import React from 'react'
import { CARDS } from '@/utils/mock'
import Image from 'next/image'

function LargeCards() {
  return (
    <div className="layout-container">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 justify-items-center m-auto padding-x lg:p-0 lg:w-[75%]">
        {CARDS.map((current, index) => {
          return (
            <div
              key={index}
              className="bg-white text-center flex-column  justify-center space-y-7  border-2  p-4 lg:p-8 max-w-[478px] rounded-primary  w-full shadow-sm"
            >
              <div className="flex-1 flex-column gap-4 lg:gap-10">
                <p className="text-xl md:text-2xl lg:text-heading leading-10 font-bold text-t2">
                  {current.title}
                </p>
                <span className="text-sm md:text-base font-[500] antialiased text-t1">
                  {current.breif}
                </span>
              </div>
              <Image
                src={current.image}
                width={327}
                height={100}
                className={`${index === 1 ? 'ml-10' : 'ml-10'} w-[80%]`}
                alt="image"
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default LargeCards
