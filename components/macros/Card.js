import React from 'react'

function Card({
  label,
  tabKey,
  handleCurrentQrType,
  handleClose,
  handleTabs
}) {
  return (
    <div
      className='w-full md:h-[50px]
      text-t1  flex items-center justify-center text-center 
      px-2 
      cursor-pointer hover:border-primary
      hover:text-primary
     bg-light border 
     border-grey 
      rounded-[5px]'
      onClick={() => {
        handleCurrentQrType(tabKey)
        handleClose()
        handleTabs(tabKey)
      }}
    >
      <p className='text-[12px]  lg:text-base text-center'>{label}</p>
    </div>
  )
}

export default Card
