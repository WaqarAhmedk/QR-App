import React from 'react'
import ToggleBar from './macros/ToggleBar'
import Image from 'next/image'
import InputColor from './macros/inputColor'

function QrColor() {
  return (
    <div className="flex-column w-full gap-10 items-center">
      <Image
        unoptimized
        src="/assets/images/qr.png"
        height={140}
        width={140}
        alt="qr"
      />
      <div className="w-full  px-5 py-2 bg-light border border-grey rounded-[5px]">
        <p className="font-bold">Color</p>
        <div className="row-flex gap-2">
          <InputColor
            name="fgColor"
            inputLabel="Foreground"
            defaultColor="#000000"
          />
          <InputColor
            name="bgColor"
            inputLabel="Background"
            defaultColor="#ffffff"
          />
        </div>
      </div>
    </div>
  )
}

export default QrColor
