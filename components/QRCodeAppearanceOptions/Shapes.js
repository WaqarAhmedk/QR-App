import React, { useContext } from 'react'
import { QR_SHAPES } from '@/utils/mock'
import { BarCodeContext } from '@/context/BarCodeContext'
import {
  setPattern,
  setEyeBall,
  setEyeFrame,
} from '@/store/barCode/barCodeSlice'

import Image from 'next/image'
import { useDispatch } from 'react-redux'

function Shapes() {
  const dispatch = useDispatch()
  const handleFrameClick = (frame, type) => {
    if (type === 'pattren') {
      dispatch(setPattern(frame))
    }
    if (type === 'eye-frame') {
      dispatch(setEyeFrame(frame))
    }
    if (type === 'eye-ball') {
      dispatch(setEyeBall(frame))
    }
  }

  return (
    <>
      <div className="text-lg font-[500] px-3 lg:px-0 flex-column gap-5">
        {QR_SHAPES.map(({ childrens, name, type }, index) => (
          <div key={index} className="flex-column gap-2">
            <p className="text-sm lg:text-base font-semibold">{name}</p>
            <div className="flex flex-wrap lg:grid lg:grid-cols-10 gap-2 md:gap-4">
              {childrens.map(({ image, mode }, childIndex) => (
                <div
                  onClick={() => {
                    handleFrameClick(mode, type)
                  }}
                  className="border rounded-md w-[40px] h-[40px] cursor-pointer
                  flex justify-center  items-center col-span-1 row-span-1"
                >
                  <Image
                    key={childIndex}
                    src={image}
                    width={100}
                    height={100}
                    className="w-[30px] h-[30px]"
                    alt="Image"
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export default Shapes
