import React, { useMemo } from 'react'
import Image from 'next/image'
import classNames from 'classnames'
import Link from 'next/link'
import { NavHelp } from '@/utils/mock'
import Router, { useRouter } from 'next/router'
import DropArrow from '@/public/assets/svgs/drop_arrow'

export const NavbarItem = ({
  text,
  menu,
  onClick,
  dropdown,
  helpRef,
  setIsOpen,
  className,
}) => {
  const router = useRouter()

  const itemClass = classNames(
    'text-base',
    'flex',
    'items-center',
    'text-center',
    'ml-1',
    'font-[500]',
    'antialised',
  )

  const menuClass = classNames(
    'absolute',
    'w-[104px]',
    'h-[92px]',
    'justify-between',
    'rounded-[8px]',
    'bg-[white]',
    'border-[1px]',
    '2xl:py-2',
    'border-white',
    'shadow-xl',
    'top-10`',
  )
  const dropDownItem = classNames(
    `cursor-pointer items-left  rounded-md pl-1 hover:text-white gradient-hover font-medium `,
  )

  function matchRoute() {
    return NavHelp.some((nav) => nav.route === router?.pathname)
  }

  return (
    <div className="relative cursor-pointer" onClick={onClick}>
      <p className={`${itemClass} ${className}`}>
        {text}
        {dropdown && (
          <DropArrow fill={matchRoute() ? 'rgba(58, 87, 236, 1)' : 'black'} />
        )}
      </p>
      {menu && (
        <div className={menuClass}>
          <div
            ref={helpRef}
            className="flex-column justify-evenly px-1 h-full text-left "
          >
            {NavHelp.map((item) => (
              <Link
                key={item.id}
                href={item.route}
                onClick={() => {
                  if (setIsOpen) {
                    setIsOpen(false)
                  }
                }}
              >
                <p
                  key={item.id}
                  className={`${
                    item.route === router?.pathname
                      ? 'gradient text-white rounded-md pl-1'
                      : dropDownItem
                  }`}
                >
                  {item.title}
                </p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
