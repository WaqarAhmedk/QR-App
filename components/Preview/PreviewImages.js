import React, { useState } from 'react';
import Image from 'next/image';
import { Modal } from '../Modal';
import Masonry from 'react-responsive-masonry';

import {
  FacebookIcon,
  TwitterIcon,
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  WhatsappIcon,
} from 'react-share';
function PreviewImages(props) {
  const localimages = [
    'https://images.freeimages.com/images/large-previews/ac1/global-warning-1153635.jpg',
    'https://images.freeimages.com/images/large-previews/9c0/forest-1400475.jpg',
    'https://images.freeimages.com/images/large-previews/ac1/global-warning-1153635.jpg',
    'https://images.freeimages.com/images/large-previews/9c0/forest-1400475.jpg',
    'https://images.freeimages.com/images/large-previews/ac1/global-warning-1153635.jpg',
  ];

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const currentData = props.data;
  const bgColor = currentData?.uploadImage?.backgroundColor;
  const galleryName = currentData?.uploadImage?.galleryName;
  const images = currentData?.uploadImage.files
    ? currentData.uploadImage.files
    : [];

  const handleImageClick = (image) => {
    setSelectedImage(image);
    setLightboxOpen(true);
  };

  const handleCloseLightbox = () => {
    setSelectedImage(null);
    setLightboxOpen(false);
  };
  const handleDownload = async (imageUrl) => {
    console.log('handleDownload', imageUrl);
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const fileName = 'updated_Data.png';
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = fileName;
      link.click();
    } catch (error) {
      console.error('Error downloading image:', error);
    }
  };
  const [shareUrl, setShareUrl] = useState();
  const handleShare = async (imageUrl) => {
    setShareUrl(imageUrl);
  };

  return (
    <>
      <div
        style={{
          backgroundColor: bgColor ? bgColor : 'white',
        }}
        className='w-full relative h-full overflow-y-auto border p-2'
      >
        <div className='flex justify-center items-center pt-2 pb-3'>
          <h3 className='font-bold break-words text-2xl'>
            {galleryName ? galleryName : 'Gallery'}
          </h3>
        </div>

        <Masonry columnsCount={2} gutter='10px'>
          {images.map((image, index) => (
            <div
              key={index}
              className='cursor-pointer border'
              onClick={() => handleImageClick(image)}
            >
              <Image
                src={image}
                width={100}
                height={100}
                className='w-full h-full object-cover'
                alt='img'
              />
            </div>
          ))}
        </Masonry>

        {lightboxOpen && (
          <div className='fixed bg-black inset-0 flex items-center justify-center z-50'>
            <div className='absolute top-0 right-1 text-white flex items-center gap-6 p-2'>
              <p
                onClick={() => handleDownload(selectedImage)}
                className='cursor-pointer'
              >
                Download
              </p>
              <div
                onClick={() => handleShare(selectedImage)}
                className='cursor-pointer'
              >
                <Image
                  src='/assets/images/share.png'
                  alt='Share'
                  width={30}
                  height={30}
                  className=''
                />
              </div>
              <div className='cursor-pointer' onClick={handleCloseLightbox}>
                X
              </div>
            </div>
            <div className='relative'>
              <Image
                src={selectedImage}
                width={500}
                height={500}
                className='max-w-full max-h-full'
                alt='img'
              />
            </div>
            <Modal
              open={shareUrl}
              handleClose={() => {
                setShareUrl(false);
              }}
            >
              <div className='py-5 px-10 flex flex-col items-center'>
                <div className='self-start text-sm'>
                  You can share the image to the following applications
                </div>
                <div className='flex gap-3 mt-6'>
                  <WhatsappShareButton url={shareUrl}>
                    <WhatsappIcon size={32} round />
                  </WhatsappShareButton>
                  <FacebookShareButton url={shareUrl}>
                    <FacebookIcon size={32} round />
                  </FacebookShareButton>
                  <TwitterShareButton url={shareUrl}>
                    <TwitterIcon size={32} round />
                  </TwitterShareButton>
                </div>
              </div>
            </Modal>
          </div>
        )}
      </div>
    </>
  );
}

export default PreviewImages;
