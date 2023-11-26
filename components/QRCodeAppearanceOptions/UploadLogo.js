import React from 'react'
import FileUpload from '../macros/FileUpload'
import { LOGOS } from '@/utils/mock'
import Image from 'next/image'
import RangeInput from '../macros/RangeInput'
import { useFormContext } from 'react-hook-form'
import { useDispatch } from 'react-redux'

function UploadLogo() {
  const { setValue } = useFormContext()
  const dispatch = useDispatch()
  const onAddLogo = event => {
    const file = event.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = async () => {
        setImage({
          file: file,
          preview: reader.result
        })
        setValue(name, {
          file: file,
          preview: reader.result
        })
        if (file) {
          setLoading(true)
          dispatch(uploadFileGCP([file]))
            .unwrap()
            .then(res => {
              setValue(name, {
                file: file,
                preview: reader.result,
                url: res[0].url
              })
              setLoading(false)
            })
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const handleLogoSelect = file => {
    setValue('logo', {
      file: file,
      preview: file
    })
  }

  return (
    <div className= 'space-y-5'>
      <FileUpload name='logo' label='Upload from gallery' />
      <div className='md:w-[90%] lg:w-full space-y-4'>
        <p>Logos</p>
        <div className='flex flex-wrap  gap-2 xl:gap-4 1320:gap-6'>
          {[1].map(item => {
            {
              return LOGOS.map(({ src }, index) => {
                return (
                  <Image
                    key={index}
                    src={src}
                    width={60}
                    height={60}
                    alt='icons'
                    className='w-[30px] cursor-pointer h-[30px] '
                    onClick={() => {
                      handleLogoSelect(src)
                    }}
                  />
                )
              })
            }
          })}
        </div>
      </div>
      {/* <div className='space-y-4 antialiased'>
        <span className='font-medium text-base'>OR</span>
        <div className='flex flex-col md:flex-row md:items-center md:gap-5'>
          <div
            className='text-center max-w-[280px] rounded-[7px] 
          gradient px-[10px] lg:px-[30px] py-[5px] lg:py-[8px] text-white'
          >
            <label
              htmlFor='logo-input'
              className='font-semibold text-xs md:text-sm cursor-pointer'
            >
              Add Your Own Logo
            </label>
            <input
              type='file'
              id='logo-input'
              className='hidden'
              onChange={onAddLogo}
            />
          </div>
          <p className='text-sm text-t1'>Min size: 512px</p>
        </div>
      </div> */}
      <div className='w-[90%] lg:w-[70%] mt-5'>
        <RangeInput name='logoSize' label='Logo Scaling' />
      </div>
    </div>
  )
}

export default UploadLogo
