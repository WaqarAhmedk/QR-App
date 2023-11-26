import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { useOnClickOutside } from '@/hooks/useOnClickOutside';
import { useFormContext, useWatch } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { createFolder, getUserQrFolders } from '@/store/folders/foldersActions';
import { toast } from 'react-toastify';
import { setFolder, setFolderModal } from '@/store/barCode/barCodeSlice';
import Input from './Input';
import Loader from './Loader';

const listClass = `cursor-pointer text-left pl-4 text-t1 py-1 rounded-[3px] hover:text-primary hover:font-semibold`;

const FolderDropDown = ({
  label,
  listItems,
  handleClose,
  formErrors,
  setFormErrors,
  qrName,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [folderName, setFolderName] = useState();
  const { qrFolder, qrName: name } = useSelector((state) => state.barCode);
  const { loading } = useSelector((state) => state.qrFolders);
  const {
    setError,
    formState: { errors },
  } = useFormContext();
  const [message, setMessage] = useState({
    info: '',
    type: '',
  });
  const [foldersList, setFoldersList] = useState([
    {
      name: '+ New Folder',
      id: 'new-folder',
    },
  ]);
  const { user } = useSelector((state) => state.auth);
  const [showInput, setShowInput] = useState(false);
  
  const [selected, setSelected] = useState({
    name: 'Select a Folder',
    id: null,
  });
  useEffect(() => {
    setFoldersList([])
    setFoldersList([{
      name: '+ New Folder',
      id: 'new-folder',
    },])
    setFoldersList((prev) => [...prev, ...listItems]);
  }, [listItems])

  useEffect(() => {
    if (qrFolder) {
      const item = listItems.find((item) => item.id === qrFolder);
      if (item) {
        setSelected({
          name: item.name,
          id: item.id,
        });
      }
    }
  }, [listItems, qrFolder]);

  

  const dispatch = useDispatch();

  const dropDownRef = useRef();
  useOnClickOutside(dropDownRef, () => setIsOpen(false));
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleCreateNewFolder = () => {
    const userId = user?.id;
    if (!folderName) {
      setFormErrors({
        ...formErrors,
        folderName: {
          message: 'Folder Name is Required!',
          type: 'folderName',
        },
      });
      return;
    }
    dispatch(createFolder({ name: folderName, userId }))
      .unwrap()
      .then((res) => {
        setSelected({
          name: res.name,
          id: res.id,
        });
        const updatedFormErrors = { ...formErrors };
        delete updatedFormErrors?.folder;
        delete updatedFormErrors?.folderName;
        setFormErrors(updatedFormErrors);
        setShowInput(false);
        setMessage({});
        dispatch(setFolder(res.id));
      })
      .catch((err) => {
        setMessage({
          type: 'error',
          info: err,
        });
      });
  };
  const handleSelect = (value) => {
    if (showInput) {
      setShowInput(false);
    }
    if (value.id === 'new-folder') {
      setShowInput(true);
      setIsOpen(false);
      return;
    }

    setSelected(value);
    dispatch(setFolder(value.id));
    setIsOpen(false);
    setMessage({});
    const updatedFormErrors = { ...formErrors };
    delete updatedFormErrors?.folder;
    setFormErrors(updatedFormErrors);
  };
  const handleSaveQrCode = () => {
    let errors = {};
    if (!qrName) {
      errors = {
        ...errors,
        qrName: {
          message: 'Qr Name is Required!',
          type: 'qrName',
        },
      };
    }
    if (selected.id === '' || selected.id === null) {
      errors = {
        ...errors,
        folder: {
          message: 'Folder is Required!',
          type: 'folder',
        },
      };
    }
    if (Object.keys(errors)?.length > 0 || formErrors?.length > 0) {
      setFormErrors({
        ...formErrors,
        ...errors,
      });
      return;
    }
  };

  const crossIconClass = `
   font-bold rounded-full cursor-pointer
   w-[14px] h-[14px] mt-3 `;
  return (
    <div className='relative w-[80%] flex-column gap-2' ref={dropDownRef}>
      {label && (
        <p className='block text-sm lg:text-base font-sm text-gray-90'>
          {label}
        </p>
      )}
      <button
        name='drop-down'
        className='bg-light text-t1 gap-6 px-4 w-full py-3 rounded-xl flex items-center whitespace-nowrap justify-between border border-grey'
        onClick={toggleDropdown}
        type='button'
      >
        {selected.name}
      </button>
      {formErrors?.folder?.type === 'folder' && (
        <p className='text-primary'>{formErrors?.folder?.message}</p>
      )}

      {isOpen ? (
        foldersList?.length > 0 ? (
          <ul className='absolute z-50 mt-[25px] max-h-[150px] overflow-auto flex-column w-full py-1 top-[65px] left-0 bg-light border border-grey rounded-xl'>
            {foldersList?.map(({ name, id }, index) => {
              return (
                <li
                  key={index * Math.random()}
                  onClick={() => {
                    handleSelect({ name: name, id: id });
                  }}
                  className={`cursor-pointer text-left pl-4 text-t1 py-1 rounded-[3px] hover:text-primary hover:font-semibold ${
                    id === 'new-folder' ? 'text-[indigo]' : ''
                  }`}
                >
                  {name}
                </li>
              );
            })}
          </ul>
        ) : (
          <ul className='absolute z-50 mt-8 max-h-[150px] overflow-auto flex-column w-full py-1 top-[65px] left-0 bg-light border border-grey rounded-xl'>
            <li
              onClick={() => {
                handleSelect(folder);
              }}
              className={`${listClass}`}
            >
              {folder?.name}
            </li>
          </ul>
        )
      ) : (
        ''
      )}
      {showInput ? (
        <div className='relative w-full flex gap-2'>
          <input
            className='input'
            placeholder='Create New Folder'
            name='folderName'
            onChange={(e) => {
              setFolderName(e.target.value);
              if (e.target.value?.length > 0) {
                const updatedFormErrors = { ...formErrors };
                delete updatedFormErrors?.folderName;
                setFormErrors(updatedFormErrors);
              }
            }}
          />
          {}

          <div
            onClick={handleCreateNewFolder}
            className='gradient cursor-pointer flex w-[20%] text-center justify-center items-center rounded-md'
          >
            {loading ? (
              <Loader classNames='w-[23px] !m-0' />
            ) : (
              <p className='text-white'>Add</p>
            )}
            {/*  */}
          </div>
          <Image
            className={crossIconClass}
            src='/assets/svgs/icons/cross_icon.svg'
            alt='icon'
            width={20}
            unoptimized
            height={20}
            onClick={() => {
              setShowInput(false);
              const updatedFormErrors = { ...formErrors };
              delete updatedFormErrors?.folderName;
              setFormErrors(updatedFormErrors);
            }}
          />
        </div>
      ) : (
        ''
      )}
      {formErrors?.folderName?.type && (
        <div className='text-primary'>{formErrors?.folderName?.message}</div>
      )}
      <p className='text-primary'>{message?.info}</p>

      <div className='flex justify-between mt-5'>
        <button
          type='button'
          className='text-primary text-center 375:w-[70%] 500:w-[30%] border border-primary focus:outline-none focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5  mr-2 mb-2'
          onClick={handleClose}
        >
          Cancel
        </button>

        {(name?.length === 0 || qrFolder?.length === 0) && (
          <button
            type='button'
            // disabled={message?.info && mFessage?.type !== 'success'}
            className='text-white text-center 375:w-[70%] 500:w-[30%] t-border gradient font-medium rounded-lg text-sm px-5 py-2.5  mr-2 mb-2 '
            onClick={handleSaveQrCode}
          >
            Save
          </button>
        )}
        {name?.length > 0 && qrFolder?.length > 0 && (
          <button
            type='submit'
            // disabled={message?.info && message?.type !== 'success'}
            className='text-white text-center 375:w-[70%] 500:w-[30%] t-border gradient font-medium rounded-lg text-sm px-5 py-2.5  mr-2 mb-2 '
            onClick={handleSaveQrCode}
          >
            Save
          </button>
        )}
      </div>
    </div>
  );
};

export default FolderDropDown;
