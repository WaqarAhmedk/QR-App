import Accordion from '@/components/macros/Accordion';
import Button from '@/components/macros/Button';
import Image from 'next/image';
import React from 'react';
const FAQS = [
  {
    id: 1,
    question: 'What is Q1 box?',
    answer: 'Q1 box is a QR code generator tool.',
  },
  {
    id: 2,
    question: 'How does Q1 box work?',
    answer:
      'Q1 box allows you to easily create and customize QR codes for various purposes.',
  },
  {
    id: 3,
    question: 'Can I modify my QR codes created with Q1 box?',
    answer:
      'Yes, you can easily modify your QR codes generated with Q1 box at any time.',
  },
  {
    id: 4,
    question: 'What types of QR codes can I generate with Q1 box? ',
    answer:
      'Q1 box supports a wide range of QR code types, including URLs, text, contact information, advance links, and more.',
  },
  {
    id: 5,
    question: 'Can I track and manage my QR codes with Q1 box? ',
    answer:
      'Yes, Q1 box provides a centralised portal to track, manage, and organise your QR codes efficiently.',
  },
  {
    id: 6,
    question: 'Is Q1 box user-friendly? ',
    answer:
      'Absolutely! Q1 box is designed with a user-friendly interface, making it easy for anyone to generate and manage QR codes.',
  },
  {
    id: 7,
    question:
      'Are there any limitations on the number of QR codes I can create with Q1 box?',
    answer:
      'Q1 box does not impose any restrictions on the number of QR codes you can create.',
  },
  {
    id: 8,
    question: 'Can I organise my QR codes into folders using Q1 box?',
    answer:
      'Yes, Q1 box allows you to organise your QR codes into folders, providing a convenient way to categorize and retrieve them.',
  },
  {
    id: 9,
    question: 'Is Q1 box a paid service? ',
    answer:
      'Q1 box offers both free and paid plans, allowing you to choose the option that suits your needs.',
  },
  {
    id: 10,
    question: 'How can I get support for Q1 box?  ',
    answer:
      'Q1 box provides customer support via email or through their online help center to assist users with any queries or issues they may have.',
  },
];
const faq = () => {
  const faq = [
    {
      Q: 'What is Q1 box?',
      A: 'Q1 box is a QR code generator tool.',
    },
    {
      Q: 'How does Q1 box work?',
      A: 'Q1 box allows you to easily create and customize QR codes for various purposes.',
    },
    {
      Q: 'Can I modify my QR codes created with Q1 box?',
      A: 'Yes, you can easily modify your QR codes generated with Q1 box at any time.',
    },
    {
      Q: 'What types of QR codes can I generate with Q1 box?',
      A: 'Q1 box supports a wide range of QR code types, including URLs, text, contact information, advance links, and more.',
    },
    {
      Q: 'Can I track and manage my QR codes with Q1 box?',
      A: 'Yes, Q1 box provides a centralized portal to track, manage, and organize your QR codes efficiently.',
    },
    {
      Q: 'Is Q1 box user-friendly?',
      A: 'Absolutely! Q1 box is designed with a user-friendly interface, making it easy for anyone to generate and manage QR codes.',
    },
    {
      Q: 'Are there any limitations on the number of QR codes I can create with Q1 box?',
      A: 'Q1 box does not impose any restrictions on the number of QR codes you can create.',
    },
    {
      Q: 'Can I organize my QR codes into folders using Q1 box?',
      A: 'Yes, Q1 box allows you to organize your QR codes into folders, providing a convenient way to categorize and retrieve them.',
    },
    {
      Q: 'Is Q1 box a paid service?',
      A: 'Q1 box offers both free and paid plans, allowing you to choose the option that suits your needs.',
    },
    {
      Q: 'How can I get support for Q1 box?',
      A: 'Q1 box provides customer support via email or through their online help center to assist users with any queries or issues they may have.',
    },
  ];

  return (
    <section className='layout-container padding-x text-t2'>
      <div className='bg-white shadow-md px-[15px] sm:px-[34px] py-16 flex flex-col items-center gap-4 sm:gap-10'>
        <div className='flex flex-col gap-3 lg:gap-5 text-center justify-center'>
          <p className='heading font-bold'>Frequently asked questions</p>
          <p className='breif text-t1'>We are there for helping you</p>
        </div>
        <div className='w-[97%] 500:w-[90%] md:w-[85%] lg:w-[70%]'>
          {FAQS.map((faq) => {
            return (
              <div index={faq.id}>
                <Accordion title={faq.question}>
                  <p
                    className='text-t1 antialised lg:py-5
                  '
                  >
                    {faq.answer}
                  </p>
                </Accordion>
                <div className='h-[0.5px] w-full bg-gray-300 my-1' />
              </div>
            );
          })}
        </div>
        <div className='px-2 py-4 500:p-10 bg-[#F9FAFB] rounded-xl w-full lg:w-[90%] flex justify-center items-center'>
          <div className='text-base sm:text-lg  flex-column items-center gap-4 sm:gap-2 text-center'>
            <Image
              src='/assets/images/team.png'
              alt='TeamImage'
              width={100}
              height={100}
              unoptimized
            />
            <h3 className='font-semibold'>Still have questions?</h3>
            <p>
              Can't find the answer you're looking for? Please chat to our
              friendly team.
            </p>
            <Button
              text='Get in Touch'
              type='fill'
              className='!px-8 !py-3 !rounded-lg'
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default faq;
