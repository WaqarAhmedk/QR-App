import React, { useContext, useEffect, useState } from 'react';
import Image from 'next/image';
import { useWatch } from 'react-hook-form';
import { useSelector } from 'react-redux';

function PreviewAdvanceLinks(props) {
  const preview = useWatch({ name: 'preview' });
  const links = useWatch({ name: 'links' });
  const state = useSelector((state) => state.barCode);
  const [coverImage, setCoverImage] = useState('/assets/svgs/bg_rectangle.svg');
  const [profileImage, setProfileImage] = useState('/assets/svgs/profile.svg');

  useEffect(() => {
    if (state?.coverImage?.url) {
      setCoverImage(state.coverImage.url);
    }
    if (state?.profileImage?.url) {
      setProfileImage(state.profileImage.url);
    }
    if (preview?.coverImage?.preview) {
      setCoverImage(preview.coverImage.preview);
    }
    if (preview?.profileImage?.preview) {
      setProfileImage(preview.profileImage.preview);
    }
  }, [
    state?.coverImage?.url,
    state?.profileImage?.url,
    preview?.coverImage?.preview,
    preview?.profileImage?.preview,
  ]);

  // useEffect(() => {
  //   if (state?.profileImage?.url) {
  //     setProfileImage(state?.profileImage?.url);
  //   }
  //   if (preview?.profileImage?.preview) {
  //     setProfileImage(preview?.profileImage?.preview);
  //   } else {
  //     setProfileImage('/assets/svgs/profile.svg');
  //   }
  // }, [
  //   state?.barCode?.profileImage,
  //   preview?.profileImage?.preview,
  //   state?.profileImage?.url,
  //   state?.coverImage?.url,
  // ]);

  const currentData = props.data;
  let textColor = preview?.textColor;
  let backgroundColor = preview?.bgColor;
  let profilename =
    currentData?.advanceLinks.preview.name || preview?.name || 'Profile Name';
  const renderLinks = links || currentData?.advanceLinks.links;
  let srcc = currentData?.advanceLinks.links ? 'db' : 'local';

  return (
    <>
      <div
        className={`w-full relative  rounded-[20px] `}
        style={{
          background: `${backgroundColor}`,
        }}
      >
        <Image
          src={coverImage}
          width={100}
          height={100}
          className='w-full rounded-t-[20px] object-cover max-h-[174px]'
          alt='bg-img'
        />
        <div className='border-2 absolute top-[90px] left-0 right-0 m-auto p-1 rounded-[100px] border-white h-[112px] w-[112px]'>
          <Image
            src={profileImage}
            width={100}
            height={100}
            alt='bg-img'
            className='rounded-[100px] w-full h-full'
          />
        </div>
        <div className='text-center  mt-[75px] md:mt-10'>
          <p
            style={{
              color: `${textColor}`,
            }}
          >
            {profilename}
          </p>
        </div>
        <div className='px-3 space-y-2 w-full py-10'>
          {renderLinks?.map(({ name, url }, index) => {
            return (
              <div
                key={index}
                className={`bg-white row-flex  items-center rounded-md px-5 py-2 cursor-pointer ${
                  srcc === 'db' && url?.length < 1
                    ? 'opacity-0 pointer-events-none'
                    : ''
                }`}
                onClick={() => window.open(url)}
              >
                <p
                  style={{ color: `${textColor}` }}
                  className='text-base font-medium text-center w-full break-words	'
                >
                  {name || 'Click Me!'}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default PreviewAdvanceLinks;
