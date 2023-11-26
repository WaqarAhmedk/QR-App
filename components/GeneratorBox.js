import React, { useContext, useEffect, useState } from 'react';
import TabBar from './TabBar';
import QrColor from './macros/QrColor';
import QrStyle from './macros/QrStyle';
import { TAB_BAR } from '@/utils/mock';
import ToggleBar from './macros/ToggleBar';
import DownloadOptions from './DownloadOptions';
import CustomizeQrModal from './CustomizeQrModal';
import { ConditionalQrComponent } from './QrType';
import Qr from './macros/Qr';
import Preview from './Preview/Preview';
import { useDispatch, useSelector } from 'react-redux';
import { setQrType } from '@/store/barCode/barCodeSlice';
import { getUserQrFolders } from '@/store/folders/foldersActions';
import QrFolderComponet from './QrFolderComponent';
import { useRouter } from 'next/router';
import { disableStyling } from '@/utils/functions';
function GeneratorBox() {
  const [currentQrType, setCurrentQrType] = useState('Url');
  const { barCode, auth } = useSelector((state) => state);
  const [decorateVisible, setDecorateVisible] = useState(true);
  const [isOpen, setIsOpen] = useState(true);
  const formsThatHavePreview = [
    'AdvanceLinks',
    'Video',
    'Social',
    'Coupon',
    'Menu',
  ];
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    setCurrentQrType(barCode.qrType);
  }, [barCode.qrType]);

  useEffect(() => {
    dispatch(getUserQrFolders(auth.user.id));
  }, [auth?.user?.id]);

  const handleCurrentQrType = (tab_Key) => {
    const filteredTypes = TAB_BAR.filter((type) => type.key == tab_Key);
    setCurrentQrType(filteredTypes[0].key);
    sessionStorage.setItem('currentTab', filteredTypes[0].key);
    dispatch(setQrType(tab_Key));
  };

  const downloadOptions = formsThatHavePreview.includes(barCode.qrType)
    ? 'h-[50vh] flex-column justify-between gap-[50px]'
    : 'h-full flex-column justify-between gap-[50px]';
  const styles = {
    container: `w-full layout-container justify-center  flex-column md:row-flex gap-4 ${
      disableStyling() ? '' : 'padding-x max-h-[800px] '
    }`,

    leftBox:
      'bg-white space-y-7 w-full md:w-[60%] xl:w-[65%]  overflow-auto  shadow-md pb-[20px] px-2 p-4 lg:p-5 xl:p-7 1320:w-[65%]',
    textWrapper:
      'w-full text-center lg:w-[80%] col-span-8 space-y-2 md:text-left ',
    rightBox:
      'w-full bg-white shadow-md  md:max-w-[40%] xl:max-w-[35%] 1320:max-w-[35%] p-4  overflow-auto  ',
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.leftBox}>
          {!disableStyling() && (
            <article className={styles.textWrapper}>
              <h1 className='text-[32px] font-bold leading-[24px]'>
                Q1 Box Code Generator
              </h1>
              <p className='breif text-t1 font-medium '>
                Easily create, manage and track QR codes, improving your
                marketing efforts and organizing QR processes.
              </p>
            </article>
          )}
          <div className='w-full flex-column gap-6 1320:w-[85%]'>
            <ToggleBar label='Content' setIsOpen={setIsOpen} isOpen={isOpen} />
            {isOpen ? (
              <>
                <TabBar
                  handleCurrentQrType={(label) => {
                    handleCurrentQrType(label);
                  }}
                />
                <ConditionalQrComponent condition={currentQrType} />
                {/* <QrFolderComponet /> */}
              </>
            ) : null}
          </div>

          {/* {---------------------------------------} */}

          <div className='w-full  1320:w-[85%]'>
            <div>
              <ToggleBar
                label='Customisation'
                setIsOpen={setDecorateVisible}
                isOpen={decorateVisible}
              />
              {decorateVisible && <CustomizeQrModal />}
            </div>
          </div>
        </div>

        {/* {---------------------------------------} */}
        <div className={styles.rightBox}>
          <Preview currentQrType={currentQrType} />
          <div className={downloadOptions}>
            <Qr toggler={true} />
            {/* <QrStyle /> */}
            <span>
              <DownloadOptions />
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

export default GeneratorBox;
