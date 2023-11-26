import { useState } from 'react'
import Image from 'next/image'

const Accordion = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleAccordion = () => setIsOpen(!isOpen)

  // TODO:add the text prop instead of children
  return (
    <div className="cursor-pointer py-5" onClick={toggleAccordion}>
      <div className="flex justify-between items-center ">
        <h2 className="text-base sm:text-lg font-semibold">{title}</h2>

        {isOpen ? (
          <Image
            src="/assets/svgs/faq/minus_circle.svg"
            width={20}
            height={20}
            className="w-4 sm:w-6 h-4 sm:h-6 "
          />
        ) : (
          <Image
            src="/assets/svgs/faq/plus_circle.svg"
            width={20}
            height={20}
            className="w-4 sm:w-6 h-4 sm:h-6 "
          />
        )}
      </div>
      {isOpen && <div className="mt-1 text-sm sm:text-base">{children}</div>}
    </div>
  )
}

export default Accordion
