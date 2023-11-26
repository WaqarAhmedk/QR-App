import BlogCard from '@/components/macros/BlogCard'
import { BLOG_CARD } from '@/utils/mock'
import Image from 'next/image'
import React from 'react'

const ReadBlog = () => {
  return (
    <section className=" layout-container padding-x text-t2">
      <div className="bg-white shadow-md px-3 500:px-8 lg:pl-16 lg:pr-5 py-10 flex flex-col gap-4 rounded-xl border">
        <div>
          <h2 className="font-medium text-[32px]">Headline</h2>
        </div>
        <div className="flex-column lg:row-flex gap-7 justify-between">
          <div className=" w-[100%] rounded-xl flex-column gap-10">
            <Image
              src="/assets/images/blog_read.png"
              width={100}
              height={100}
              unoptimized
              className="w-full"
              alt="blog_header_image"
            />
            <article className="font-medium text-t1 antialiased flex-column gap-8 md:gap-12 lg:gap-24 text-sm md:text-base">
              <p>
                Lorem Ipsum Lorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem
                Ipsum IpsumLorem IpsumLorem IpsumLorem Ipsum Lorem IpsumLorem
                IpsumLorem IpsumLorem IpsumLorem Ipsum. IpsumLorem IpsumLorem
                IpsumLorem Ipsum Lorem Ipsum Lorem IpsumLorem IpsumLorem
                IpsumLorem IpsumLorem Ipsum IpsumLorem IpsumLorem IpsumLorem
                Ipsum Lorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem Ipsum.
                IpsumLorem IpsumLorem IpsumLorem Ipsum
              </p>
              <p>
                Lorem Ipsum Lorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem
                Ipsum IpsumLorem IpsumLorem IpsumLorem Ipsum Lorem IpsumLorem
                IpsumLorem IpsumLorem IpsumLorem Ipsum. IpsumLorem IpsumLorem
                IpsumLorem Ipsum Lorem Ipsum Lorem IpsumLorem IpsumLorem
                IpsumLorem IpsumLorem Ipsum IpsumLorem IpsumLorem IpsumLorem
                Ipsum Lorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem Ipsum.
                IpsumLorem IpsumLorem IpsumLorem Ipsum
              </p>
              <p>
                Lorem Ipsum Lorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem
                Ipsum IpsumLorem IpsumLorem IpsumLorem Ipsum Lorem IpsumLorem
                IpsumLorem IpsumLorem IpsumLorem Ipsum. IpsumLorem IpsumLorem
                IpsumLorem Ipsum Lorem Ipsum Lorem IpsumLorem IpsumLorem
                IpsumLorem IpsumLorem Ipsum IpsumLorem IpsumLorem IpsumLorem
                Ipsum Lorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem Ipsum.
                IpsumLorem IpsumLorem IpsumLorem Ipsum
              </p>
            </article>
          </div>
          <div className="w-[100%] lg:w-[52%] rounded-xl grid grid-cols-1 500:grid-cols-2 md:grid-cols-3 lg:grid-cols-1 gap-5">
            {BLOG_CARD.slice(0, 3).map((item) => (
              <BlogCard {...item} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default ReadBlog
