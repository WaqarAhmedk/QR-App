import React, { useEffect, useState } from 'react';
import FolderDropDown from './macros/foldedropdown';
import { useDispatch, useSelector } from 'react-redux';
import { FolderModal } from './FolderModal';
import { setName } from '@/store/barCode/barCodeSlice';

const QrFolderComponet = ({ open, close }) => {
  const { qrFolders } = useSelector((state) => state);
  const [formErrors, setFormErrors] = useState({});
  const [qrName, setQrName] = useState('');
  const { qrName: name } = useSelector((state) => state.barCode);
  const dispatch = useDispatch();

  useEffect(() => {
    if (name) {
      setQrName(name);
    }
  }, [name]);
  return (
    <div>
      <FolderModal
        open={open}
        handleClose={() => {
          close();
        }}
        childrenClass={''}
        children={
          <>
            <div className='relative w-[80%] flex-column gap-2 pb-5'>
              <label>Give a name to your QR code</label>
              <input
                placeholder='Qr Name'
                className='bg-[white] input'
                value={qrName}
                onChange={(e) => {
                  setQrName(e.target.value);
                  dispatch(setName(e.target.value));

                  if (e.target.value.trim().length > 0) {
                    if (e.target.value.trim().length > 20) {
                      setFormErrors({
                        ...formErrors,
                        qrName: {
                          message: 'Qr Name Must be less than 20 characters',
                          type: 'qrName',
                        },
                      });
                    } else {
                      const updatedFormErrors = { ...formErrors };
                      delete updatedFormErrors?.qrName;
                      setFormErrors(updatedFormErrors);
                    }
                  } else {
                    setFormErrors({
                      ...formErrors,
                      qrName: {
                        message: 'Qr Name is Required!',
                        type: 'qrName',
                      },
                    });
                  }
                }}
              />
              {formErrors?.qrName?.type && (
                <div className='bg-white text-primary'>
                  {formErrors?.qrName?.message}
                </div>
              )}
            </div>

            <FolderDropDown
              label={'Select Folder'}
              listItems={qrFolders?.folders}
              handleClose={close}
              formErrors={formErrors}
              setFormErrors={setFormErrors}
              qrName={qrName}
            />
          </>
        }
        className={'w-[85%] md:w-[60%] lg:w-[40%] 1620:w-[30%]  1720:w-[30%]'}
      />
    </div>
  );
};

export default QrFolderComponet;
