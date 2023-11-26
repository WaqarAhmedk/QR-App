import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { getQrCode, setAnalytics } from '@/store/barCode/barCodeAction';
import {
  PreviewAdvanceLinksData,
  PreviewMenuData,
  VideoPreviewData,
  PreviewCoupanData,
  PreviewImages,
  PreviewSocialData,
} from '../Preview';

import {
  isIE,
  isChrome,
  isFirefox,
  isEdge,
  isOpera,
  isSafari,
  isSamsungBrowser,
} from 'react-device-detect';
import PreviewBusiness from '../Preview/PreviewBusiness';
import PreviewPdf from '../Preview/PreviewPdf';
import { eslint } from '@/next.config';
import axios from 'axios';
import Loader from '../macros/Loader';

const DisplayData = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { id } = router.query;
  const [compToRender, setCompToRender] = useState(null);

  // const { loading } = useSelector((state) => state.barCode);
  // const [locationInfo, setLocationInfo] = useState();
  let location;

  const getOperatingSystem = () => {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    if (/windows phone/i.test(userAgent)) {
      return 'Windows Phone';
    }
    if (/android/i.test(userAgent)) {
      return 'Android';
    }
    if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
      return 'iOS';
    }
    return 'Other';
  };

  const getBrowserName = () => {
    if (isOpera) return 'Opera';
    if (isFirefox) return 'Firefox';
    if (isSafari) return 'Safari';
    if (isIE) return 'IE';
    if (isEdge) return 'Edge';
    if (isChrome) return 'Chrome';
    if (isSamsungBrowser) return 'Samsung Browser';
    return 'Other';
  };

  const getCityCountry = async (latitude, longitude) => {
    let city,
      country = '';
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyB_laT0Fi__NkfSLvWXyfqdXf_xEWIq8fs`
    );

    if (response.status !== 200) {
      throw new Error('Error retrieving geolocation data');
    }

    const data = response.data;
    const results = data.results;

    for (const component of results[0].address_components) {
      if (component.types.includes('locality')) {
        city = component.long_name;
      }
      if (component.types.includes('country')) {
        country = component.long_name;
      }
    }
    return {
      city,
      country,
    };
  };

  // useEffect(() => {
  //   let logs = {};
  //   logs.country = locationInfo?.country || '';
  //   logs.city = locationInfo?.city || '';
  //   logs.qrId = id;
  //   logs.browser = getBrowserName();
  //   logs.device = getOperatingSystem();
  //   dispatch(setAnalytics(logs));
  // }, [locationInfo?.city]);

  const updateAnalytics = () => {
    let logs = {};
    try {
      if (location?.city && location?.country) {
        logs.location = {
          city: location?.city || '',
          country: location?.country || '',
        };
      }
      logs.qrId = id;
      logs.browser = getBrowserName();
      logs.device = getOperatingSystem();

      dispatch(setAnalytics(logs));
    } catch (error) {
      console.log(error);
    }
  };

  const handleSendEmail = (data) => {
    const { email, subject, message } = data;
    const deepLinkUrl = `mailto:${email}?subject=${subject}&body=${message}`;
    window.location.href = deepLinkUrl;
  };

  const handleMakeCall = (data) => {
    const { phone } = data;
    const deepLinkUrl = `tel:${phone}`;
    window.location.href = deepLinkUrl;
  };

  const handleOpenMaps = (data) => {
    const { mapUrl } = data;
    window.location.href = mapUrl;
  };

  const handleOpenUrl = (data) => {
    let { url } = data;
    if (url.startsWith('www.')) {
      url = 'https://' + url;
    }
    console.log('url', url);
    window.location.href = url;
  };

  const handleSendSMS = (data) => {
    const { phone, message } = data;
    let link;
    getOperatingSystem() === 'iOS'
      ? (link = `sms:${phone}&body=${message}`)
      : (link = `sms:${phone}?body=${message}`);
    const deepLinkUrl = link;
    window.location.href = deepLinkUrl;
  };

  const handleOpenStore = (data) => {
    const { googlePlayUrl, appStoreUrl } = data;
    const deepLinkUrl =
      getOperatingSystem() === 'iOS' ? appStoreUrl : googlePlayUrl;
    window.location.href = deepLinkUrl;
  };

  // if (loading) {
  //   return <p>Loading......</p>;
  // }

  useEffect(() => {
    (async () => {
      setLoading(true);
      if (typeof window !== 'undefined' && window.navigator) {
        let coords = {};
        if (true) {
          try {
            coords = await new Promise((resolve, reject) => {
              navigator.geolocation.getCurrentPosition(
                (position) => {
                  const positionCoords = {};
                  positionCoords.latitude = position.coords.latitude;
                  positionCoords.longitude = position.coords.longitude;
                  resolve(positionCoords);
                },
                (err) => {
                  reject(err);
                }
              );
            });
          } catch (error) {
            console.log('err ==>', error);
          }
        }
        // fix from this.
        if (coords.latitude && coords.longitude) {
          await getCityCountry(coords.latitude, coords.longitude).then(
            (res) => {
              if (res) {
                let city = res.city;
                let country = res.country;
                location = { city, country };
              }
            }
          );
        }

        if (id) {
          dispatch(getQrCode(id)).then(async (res) => {
            if (res?.payload) {
              // setLoading(true);
              const { qrType, updateAndTrack, qrStatus, ...data } = res.payload;
              if (qrStatus === 'Blocked' || qrStatus === 'Deleted') {
                setCompToRender(
                  <div
                    className={`max-w[400px] relative   h-full  flex flex-col  justify-center`}
                  >
                    <p className='font-bold'> This Qr is Not Available</p>
                  </div>
                );
                return;
              }
              updateAnalytics();

              if (!data) return;

              setTimeout(() => {
                const componentMapping = {
                  AdvanceLinks: <PreviewAdvanceLinksData data={data} />,
                  Menu: <PreviewMenuData data={data} />,
                  Social: <PreviewSocialData data={data} />,
                  Coupon: <PreviewCoupanData data={data} />,
                  Video: <VideoPreviewData data={data} />,
                  UploadImage: <PreviewImages data={data} />,
                  BusinessCard: <PreviewBusiness data={data} />,
                  DownloadPdf: <PreviewPdf data={data} />,
                  SendEmail: () => handleSendEmail(data.sendEmail),
                  MakeCall: () => handleMakeCall(data.makeCall),
                  AppDownload: () => handleOpenStore(data.appDownload),
                  Location: () => handleOpenMaps(data.location),
                  Sms: () => handleSendSMS(data.sms),
                  Url: () => handleOpenUrl(data.url),
                  LandingPage: () => handleOpenUrl(data.landingPage),
                  ReviewCollector: () => handleOpenUrl(data.reviewCollector),
                  Calendar: () => handleOpenUrl(data.calendar),
                  Forms: () => handleOpenUrl(data.forms),
                  ShowText: () => <div>{data.showText.text}</div>,
                };
                const componentToRender = componentMapping[qrType] || (
                  <div>No data Found</div>
                );
                setLoading(false);
                setCompToRender(componentToRender);
              }, 2000);
            } else {
              // alert("No data found")
            }
          });
        }
      }
    })();
  }, [dispatch, id]);

  if (loading) {
    return <Loader classNames='w-[40px] h-[50px]' />;
  }
  return (
    <div className='flex h-screen items-center flex-col 375:justify-start 500:justify-center 500:m-auto 375:m-0 375:w-full 500:w-[350px]'>
      {compToRender}
    </div>
  );
};

export default DisplayData;
