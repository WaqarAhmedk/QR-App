import React from 'react'
import {
  setBgColor,
  setEyeBallColor,
  setEyeFrameColor,
  setFgColor,
  setQrFrameColor,
  setQrTextColor
} from '@/store/barCode/barCodeSlice'

import {
  setBgColor as setBackgroundColor,
  setButtonColor,
  setTextColor as setCoupanTextColor
} from '@/store/coupan/coupanSlice'
import { useDispatch, useSelector } from 'react-redux'

const InputColorWithContext = ({ name, inputLabel, contextFor }) => {
  const { barCode } = useSelector(state => state)
  const { coupan } = useSelector(state => state)

  const dispatch = useDispatch()

  const handleChange = e => {
    const value = e.target.value
    if (contextFor === 'coupan') {
      if (name === 'bgColor') {
        dispatch(setBackgroundColor(value))
      }
      if (name === 'textColor') {
        dispatch(setCoupanTextColor(value))
      }
      if (name === 'buttonColor') {
        dispatch(setButtonColor(value))
      }
    } else {
      if (name === 'bgColor') {
        dispatch(setBgColor(value))
      } else if (name === 'fgColor') {
        dispatch(setFgColor(value))
      } else if (name === 'qrEyeBallColor') {
        dispatch(setEyeBallColor(value))
      } else if (name === 'qrEyeFrameColor') {
        dispatch(setEyeFrameColor(value))
      } else if (name === 'qrTextColor') {
        dispatch(setQrTextColor(value))
      } else if (name === 'qrFrameColor') {
        dispatch(setQrFrameColor(value))
      }
    }
  }

  return (
    <div className={`flex flex-col gap-1`}>
      <span className='text-sm text-t1'>
        {inputLabel}
      </span>
      <div
        className='flex items-center min-h-[30px]
      border-[1px] px-2
      rounded-full gradient-border'
      >
        <input
          type='color'
          value={
            contextFor === 'coupan' ? coupan[name] : barCode[name]
          }
          onChange={handleChange}
          className='input-color antialised'
        />
        <span className='text-sm md:text-base'>
          {contextFor === 'coupan' ? coupan[name] : barCode[name]}
        </span>
      </div>
    </div>
  )
}

export default InputColorWithContext
