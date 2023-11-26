import Image from 'next/image';

function PreviewAdvanceLinksData(props) {
  const currentData = props.data;
  let textColor =
    currentData?.advanceLinks.preview.textColor ;
  let backgroundColor =
    currentData?.advanceLinks.preview.bgColor ;
  let coverImage =
    currentData?.advanceLinks.preview.coverImage ||
    '/assets/svgs/bg_rectangle.svg';
  let profileImg =
    currentData?.advanceLinks.preview.profileImage  ||
    '/assets/svgs/profile.svg';
  let profilename =
    currentData?.advanceLinks.preview.name ||  'Profile Name';
  const renderLinks = currentData?.advanceLinks.links;

  return (
    <>
      <div
        className={`max-w[400px] relative   h-full w-full`}
        style={{
          background: `${backgroundColor}`,
        }}
      >
        <Image
          src={coverImage}
          width={100}
          height={100}
          className='w-full  object-cover max-h-[174px]'
          alt='bg-img'
        />
        <div className='border-2 absolute top-[90px] left-0 right-0 m-auto p-1 rounded-[100px] border-white h-[112px] w-[112px]'>
          <Image
            src={profileImg}
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
                className={`bg-white row-flex  items-center  px-5 py-2 cursor-pointer ${
                    url?.length < 1
                    ? 'opacity-[0.3] pointer-events-none'
                    : ''
                }`}
                onClick={() => window.open(url)}
              >
                <p
                  style={{ color: `${textColor}` }}
                  className='text-base font-medium text-center w-full '
                >
                  {name}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default PreviewAdvanceLinksData;
