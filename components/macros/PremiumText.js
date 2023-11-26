import React from 'react'
import Image from 'next/image'

function PremiumText({ text }) {
  return (
    <div className="flex gap-[10px]">
      <p className="text-base md:text-lg font-[500]">{text}</p>
      <Image
        src="/assets/svgs/icons/crown.svg"
        alt="premium"
        width={20}
        height={20}
      />
    </div>
  )
}

export default PremiumText
