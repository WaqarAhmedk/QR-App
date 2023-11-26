import React from 'react'
import classNames from 'classnames'

function PlainCard({ breif, title }) {
  const cardClass = classNames(`w-full lg:max-w-[250px]  h-auto text-center flex-column gap-2 lg:gap-4 rounded-[20px] bg-[white] gradient-border-3
  p-4 lg:p-[23px]`)

  return (
    <div className={cardClass}>
      <p className="text-black font-bold lg:text-lg">{title}</p>
      <p className="text-sm lg:text-base text-t1 antialiased font-[500]">
        {breif}
      </p>
    </div>
  )
}

export default PlainCard
