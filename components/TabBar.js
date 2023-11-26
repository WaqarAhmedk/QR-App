import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { TAB_BAR } from '@/utils/mock';
import { Modal } from './Modal';
import Card from './macros/Card';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';

function TabBar({ handleCurrentQrType }) {
  const { barCode } = useSelector((state) => state);
  const router = useRouter();
  const { edit_qrId } = router.query;
  const [selectedTab, setSelectedTab] = useState(barCode.qrType);
  const [selected, setSelected] = useState();

  const [openModal, setOpenModal] = useState(false);
  const [Tabs, setTabs] = useState(TAB_BAR.slice(0, 5));
  const [tabEnd, setTabEnd] = useState(3);
  const nameListRef = useRef(null);

  const toggleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);

  useEffect(() => {
    if (!edit_qrId) {
      if (window.innerWidth >= 1410) {
        setTabs(TAB_BAR.slice(0, 4));
      }
      if (window.innerWidth >= 1024) {
        setTabEnd(2);
      } else if (window.innerWidth >= 768) {
        setTabs(TAB_BAR.slice(0, 3));
        setTabEnd(1);
      } else {
        setTabs(TAB_BAR.slice(0, 3));
        setTabEnd(1);
      }
    }
  }, []);

  const handleTabs = (tabKey) => {
    console.log('tabKey', tabKey);
    const index = TAB_BAR.findIndex((obj) => obj.key === tabKey);
    if (index !== -1) {
      const start = Math.max(0, index - 2);
      const end = index === 0 ? 4 : Math.min(TAB_BAR.length, index + tabEnd);
      const result = TAB_BAR.slice(start, end);
      setTabs(result);
      setSelectedTab(tabKey);
    } else {
      console.log(`Object with name ${selectedTab} not found in the array`);
    }
  };

  useEffect(() => {
    if (!edit_qrId) {
      setSelectedTab(barCode.qrType);
    }
  }, [barCode.qrType]);

  useEffect(() => {
    if (edit_qrId) {
      const index = TAB_BAR.findIndex((obj) => obj.key === barCode.qrType);
      setSelected(index);
    }
  }, [barCode.qrType]);

  if (edit_qrId) {
    return (
      <div className='bg-secondary relative shadow-inner rounded-[14px] p-1 w-1/3'>
        <p
          className={` text-[#303038]
            bg-white cursor-pointer
             h-[30px] px-1.5 1320:px-[10px]  pt-1 text-center rounded-xl  hover:shadow-md whitespace-nowrap`}
        >
          {TAB_BAR[selected]?.label}
        </p>
      </div>
    );
  }

  return (
    <>
      <Modal open={openModal} className='p-7' handleClose={handleClose}>
        <div className=''>
          <div className='flex-column gap-5 text-lg font-[500]'>
            <p className='text-t2'>Select type of QR</p>
            <div className='grid grid-cols-2 md:grid-cols-5 gap-4'>
              {TAB_BAR.map((current, index) => {
                return (
                  <Card
                    label={current.label}
                    tabKey={current.key}
                    handleClose={() => {
                      handleClose();
                    }}
                    handleCurrentQrType={(tab_Key) => {
                      handleCurrentQrType(tab_Key);
                    }}
                    handleTabs={handleTabs}
                    key={index}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </Modal>
      <div
        className='bg-secondary relative shadow-inner rounded-[14px] pl-1 
      pr-[28px]  h-[40px] w-full'
      >
        <Image
          src='/assets/svgs/icons/menu.png'
          width={16}
          height={16}
          alt='arrow'
          className='cursor-pointer right-2 top-[14px]  absolute'
          onClick={toggleOpen}
        />
        <div
          className='flex flex-row 500:gap-1.5 text-center items-center  h-[40px] overflow-hidden'
          ref={nameListRef}
        >
          {Tabs.map(({ label, key }, index) => {
            return (
              <p
                key={index}
                className={`w-[100%] text-[#303038] ${
                  selectedTab === key ? 'bg-white' : ''
                } hover:bg-white cursor-pointer
                 h-[30px] px-1.5 1320:px-[10px]  pt-1 text-center rounded-xl  hover:shadow-md whitespace-nowrap`}
                onClick={() => {
                  handleCurrentQrType(key), setSelectedTab(key);
                }}
              >
                {label}
              </p>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default TabBar;
