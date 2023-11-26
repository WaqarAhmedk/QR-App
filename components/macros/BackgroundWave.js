import React from 'react'
import Image from 'next/image'

function BackgroundWave() {
  return (
    <Image
      src="/assets/svgs/mask_group.svg"
      alt="background-wave"
      width={100}
      height={100}
      unoptimized
      className="w-full top-0  overflow-hidden  left-0 right-0  absolute -z-10"
    />
  )
}

export default BackgroundWave
