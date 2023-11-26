import React, { useState } from 'react'
import InputColor from './inputColor'
import { ARROW_ICONS as icons } from '@/utils/mock'
import { ToggleIcons } from './toggleIcon'
import InputColorWithContext from './InputColorWithContext'

function QrColor() {
  const [isOpen, setIsOpen] = useState(true)
  const [iconIndex, setIconIndex] = useState(0)

  return (
    <div className="flex-column w-full gap-10 items-center">
      <div
        className="w-full 
      p-4 bg-light 
      border border-grey 
      flex-column gap-3
      rounded-[5px]"
      >
        <div className="row-flex justify-between">
          <p className="font-semibold">Color</p>
          <ToggleIcons
            {...{
              isOpen,
              setIconIndex,
              setIsOpen,
              icons,
              iconIndex,
              height: 6,
              width: 11,
            }}
          />
        </div>
        {isOpen && (
          <div className="flex-column gap-4">
            <div className="row-flex gap-3  1320:gap-4 md:flex-column lg:row-flex">
              <InputColorWithContext
                defaultValue="#000000"
                name="fgColor"
                inputLabel="Foreground"
              />
              <InputColorWithContext
                defaultValue="#ffffff"
                name="bgColor"
                inputLabel="Background"
              />
            </div>
            <div className="row-flex gap-3 1320:gap-4 md:flex-column lg:row-flex">
              <InputColorWithContext
                defaultValue="#ffffff"
                name="qrEyeFrameColor"
                inputLabel="Eye Frame Color"
              />
              <InputColorWithContext
                defaultValue="#ffffff"
                name="qrEyeBallColor"
                inputLabel="Eye Ball Color"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default QrColor
