import React from 'react'
import classNames from 'classnames'
import Image from 'next/image'

function CardQrImage({ image, title }) {
  const cardClass = classNames(
    'flex-column text-center rounded-[20px] shadow-secondary w-full items-center max-w-[270px] ',
  )

  return (
    <div className={cardClass}>
      <p className="text-sm w-full rounded-t-[20px] p-5  lg:text-base bg-secondary text-black">
        {title}
      </p>
      <Image
        src={image}
        width={180}
        height={180}
        className=" p-[31px]"
        alt="qr"
      />
    </div>
  )
}

export default CardQrImage
