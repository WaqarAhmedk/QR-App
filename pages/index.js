import CreateQrIntro from '@/components/CreateQrIntro';
import MoreThanAQrCode from '@/components/MoreThanAQrCode';
import QrCards from '@/components/QrCards';
import QrBanner from '@/components/QrBanner';
import LargeCards from '@/components/macros/LargeCard';
import Media from '@/components/media';
import Image from 'next/image';
import GeneratorBox from '@/components/GeneratorBox';
import Steps from '@/components/macros/Steps';

export default function Home() {
  return (
    <>
      <GeneratorBox />
      <div className='space-y-10 lg:space-y-24 mt-10 lg:mt-20 overflow-x-hidden'>
        <div className='space-y-10 lg:space-y-24 relative '>
          <CreateQrIntro />
          <MoreThanAQrCode />
          <QrCards />
          {/* <Image
            src='/assets/images/shadow.png'
            alt='shadow'
            width={650}
            height={650}
            className='absolute -z-10 bottom-0  -right-48 '
          /> */}
        </div>
        <div className='bg-secondary'>
          <QrBanner />
        </div>
        <div className='relative overflow-hidden'>
          {/* <Image
            src='/assets/images/shadow.png'
            alt='shadow'
            width={500}
            height={500}
            className='absolute -z-10 bottom-0  -left-48 top-10'
          /> */}
          <LargeCards />
        </div>
      </div>

      <Steps />

      <section>
        <Media />
      </section>
    </>
  );
}
