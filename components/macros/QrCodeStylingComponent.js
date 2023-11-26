import { useFormContext, useWatch } from 'react-hook-form';
import { QRCode } from 'react-qrcode-logo';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getValueAfterPipe } from '@/utils/functions';

function QrCodeStylingComponent() {
  const {
    bgColor,
    fgColor,
    qrEyeBallColor,
    qrEyeFrameColor,
    qrFrameColor,
    qrFrame,
    pattern,
  } = useSelector((state) => state.barCode);

  const logo = useWatch({ name: 'logo' });
  const logoSize = useWatch({ name: 'logoSize' });
  const { qrCodeUrl } = useSelector((state) => state.barCode);
  // useEffect(() => {
  //   if (qrCodeUrl) {
  //     setInputData(qrCodeUrl)
  //   }
  // }, [qrCodeUrl])

  const [logoDimenson, setLogoDimension] = useState();
  let qrErrorLevel = useWatch({ name: 'qrErrorLevel' });

  // QR ERROR LEVEL
  const { setValue } = useFormContext();

  const [errLevel,setErrLevel]=useState('')
  const inputString = qrCodeUrl;

  useEffect(() => {
    if (logoSize) {
      // Ensure logoSize is a string and remove any leading/trailing whitespaces
      const sizeLogo = Number(logoSize)
      // Check if parsing was successful (not NaN)
      try{
      if (sizeLogo) {
        let size = (200 * sizeLogo) / 2;
        setLogoDimension(size);
        if(size<=40){
          setValue("qrErrorLevel", 'L');
        }
        else if(size>40 && size<=50){
          setValue("qrErrorLevel", 'M');
        }
        else if(size>50 && size<=60){
          setValue("qrErrorLevel", 'Q');
        }
        else if (size>60){
          setValue("qrErrorLevel", 'H');
        }
      } else {
        console.log("Invalid logoSize:", logoSize);
      }}
      catch (err){
        console.log("Error ->", err);
      }
    }
  }, [logoSize, logoDimenson]);


  useEffect(() => {
    let backgroundColor= qrFrame === 'frameBoldText' ? qrFrameColor : bgColor
    if (typeof window !== 'undefined') {
      const eyeFrames = document.querySelectorAll('#eyeFrame');
      const eyeBalls = document.querySelectorAll('#eyeBall');
      const eyeBoxs = document.querySelectorAll('#eye-box');

      eyeFrames.forEach((frame) => {
        frame.style.borderWidth =
          qrErrorLevel === 'H' && inputString.length > 58 ? '5px' : '7px';
        frame.style.background = backgroundColor;
        frame.style.borderColor = qrEyeFrameColor;
      });

      eyeBalls.forEach((ball) => {
        ball.style.background = qrEyeBallColor;
      });

      eyeBoxs.forEach((box) => {
        box.style.background = backgroundColor;
        box.style.width =
          getValueAfterPipe({ inputString, qrErrorLevel }) + 'px';
        box.style.height =
          getValueAfterPipe({ inputString, qrErrorLevel }) + 'px';
      });
    }
  }, [
    bgColor,
    fgColor,
    qrFrame,
    inputString,
    qrFrameColor,
    qrEyeBallColor,
    qrEyeFrameColor,
    qrErrorLevel,
    qrCodeUrl,
  ]);

  const options = {
    qrStyle: pattern,
    size: 200,
    bgColor: qrFrame === 'frameBoldText' ? qrFrameColor : bgColor,
    fgColor: fgColor,
    ecLevel: qrErrorLevel,
    logoWidth: logoDimenson,
    logoHeight: logoDimenson,
    logoImage: logo?.preview || logo || '',
  };

  return (
    <div>
      <QRCode {...options} value={inputString} />
    </div>
  );
}

export default QrCodeStylingComponent;
