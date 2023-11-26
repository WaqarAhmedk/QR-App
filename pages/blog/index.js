import BlogCard from '@/components/macros/BlogCard'
import { BLOG_CARD } from '@/utils/mock'
import React from 'react'

const Blog = () => {
  return (
    <section className=" layout-container padding-x text-t2">
      <div className="flex-column gap-10 mb-28">
        <div className="flex items-center justify-center w-full py-12 gradient rounded-xl text-white font-black text-[32px] italic">
          <h2>Blog</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 md:px-2">
          {BLOG_CARD.map((item) => (
            <BlogCard {...item} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Blog
