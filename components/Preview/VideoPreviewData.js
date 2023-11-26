import React, { useState } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import MediaPlayer from "../macros/MediaPlayer";

function VideoPreviewData(props) {
  const [playing, setPlaying] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const currentData = props.data;

  const handleClose = () => setOpenModal(false);

  const handlePlayVideo = () => {
    setPlaying(!playing);
  };

  return (
    <>
      <div
    
        style={{
          borderColor: currentData?.video.preview.backGroundColor,
          borderWidth: 10,
          background: currentData?.video.preview.backGroundColor,
        }}
        className="flex-column gap-2 justify-between text-white p-[7px] break-words  w-full  rounded-[10px]"
      >
        <div>
          <MediaPlayer
            setIsPlaying={setPlaying}
            isPlaying={playing}
            url={currentData?.video.videoUrl}
          />
        </div>
        <div className="flex-column overflow-auto bg-[white] p-3 rounded-lg  max-h-[300px] gap-2">
          <p
            className="font-semibold"
            style={{
              color: currentData?.video.preview.textColor,
            }}
          >
            {currentData?.video.videoTitle}
          </p>
          <p
            style={{
              color: currentData?.video.preview.textColor,
            }}
          >
            {currentData?.video.description}
          </p>
        </div>
        <button
          onClick={handlePlayVideo}
          type="button"
          style={{
            background: currentData?.video.preview.buttonColor,

            color: currentData?.video.preview.textColor,
          }}
          className="w-full shadow-sm py-3 rounded-full"
        >
          {playing ? "Pause" : "Play"}
        </button>
      </div>
    </>
  );
}

export default VideoPreviewData;
