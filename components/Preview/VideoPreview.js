import React, { useState } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import MediaPlayer from '../macros/MediaPlayer';

function VideoPreview(props) {
  const { control } = useFormContext();
  const [playing, setPlaying] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const currentData = props.data;

  const { videoTitle, description, videoUrl, coupanTime } = useWatch(control, {
    name: ['videoTitle', 'buttonLink', 'description', 'videoUrl'],
  });

  const colorPreview = useWatch({ name: 'preview' });

  const handleClose = () => setOpenModal(false);

  const handlePlayVideo = () => {
    setPlaying(!playing);
  };

  return (
    <>
      <div
        style={{
          borderColor: colorPreview?.backGroundColor,
          borderWidth: 10,
          background: colorPreview?.backGroundColor,
        }}
        className='flex-column gap-2 justify-between text-white p-[7px] break-words  w-full  rounded-[10px]'
      >
        <div>
          <MediaPlayer
            setIsPlaying={setPlaying}
            isPlaying={playing}
            url={
              currentData?.video.videoUrl
                ? currentData?.video.videoUrl
                : videoUrl
            }
          />
        </div>
        <div className='flex-column overflow-auto bg-[white] p-3 rounded-lg  max-h-[300px] gap-2'>
          <p
            className='font-semibold'
            style={{
              color: colorPreview?.textColor,
            }}
          >
            {videoTitle || `Exploring the Amazon Rainforest`}
          </p>
          <p
            style={{
              color: colorPreview?.textColor,
            }}
          >
            {description ||
              `  Join us on an incredible journey through the Amazon Rainforest, one of the
      most biodiverse and awe-inspiring places on Earth. Immerse yourself in the
      lush greenery, encounter exotic wildlife, and learn about the delicate
      balance of this remarkable ecosystem.`}
          </p>
        </div>
        <button
          onClick={handlePlayVideo}
          type='button'
          style={{
            background: colorPreview?.buttonColor,
            color: colorPreview?.textColor,
          }}
          className='w-full shadow-sm py-3 rounded-full'
        >
          {playing ? 'Pause' : 'Play'}
        </button>
      </div>
    </>
  );
}

export default VideoPreview;
