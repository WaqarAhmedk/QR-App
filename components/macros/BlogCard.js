import Image from 'next/image'
import { useRouter } from 'next/router'
import React from 'react'
import Button from './Button'

const BlogCard = ({ image, Date, Title, Description }) => {
  const router = useRouter()
  return (
    <div className="bg-white rounded-3xl shadow-sm border p-5">
      <div className="flex-column gap-3 items-">
        <Image
          src={image}
          width={100}
          height={100}
          alt="card_image"
          className="w-full mb-6"
          unoptimized
        />

        <p className="text-t2 antialiased">{Date}</p>
        <div className="flex items-center justify-between">
          <h4 className="text-[24px] font-medium">{Title}</h4>
          <Image
            src="/assets/svgs/arrow-top-right.svg"
            width={10}
            height={10}
            alt="Next_icon"
            className="cursor-pointer"
            unoptimized
          />
        </div>
        <p className="text-t2 antialiased">{Description}</p>
        <div
          className="self-start w-[35%]"
          onClick={() => router.push('/blog/ReadBlog')}
        >
          <Button type="fill" text="Read" />
        </div>
      </div>
    </div>
  )
}

export default BlogCard
