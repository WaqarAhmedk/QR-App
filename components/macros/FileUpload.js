import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useFormContext, useWatch } from 'react-hook-form';
import { uploadFileGCP } from '@/store/barCode/barCodeAction';
import { useDispatch, useSelector } from 'react-redux';
import Loader from './Loader';
import { setCoverImage, setProfileImage } from '@/store/barCode/barCodeSlice';
import { useRouter } from 'next/router';

function FileUpload({
  preLabel,
  label,
  onChange,
  accept,
  name,
  keyIndex,
  qrType,
}) {
  const index = keyIndex;
  const barCode = useSelector((state) => state.barCode);

  const [image, setImage] = useState();
  const [curr, setCurr] = useState(null);
  const { setValue } = useFormContext();
  const dispatch = useDispatch();
  // const values = useWatch({ name: name });
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  let getImage = barCode[name.split('.')[1]]?.url;
  let products = barCode?.products || [];
  const router = useRouter();
  const { edit_qrId } = router.query;

  useEffect(() => {
    if (edit_qrId && qrType === 'Menu') {
      let previewImage;
      if (products && products[index]?.image) {
        previewImage = products[index].image;
      } else {
        previewImage = '/assets/svgs/icons/gallery.svg';
      }
      setImage({ preview: previewImage });
    }
  }, [products, edit_qrId]);

  useEffect(() => {
    if (
      (edit_qrId && name.includes('coverImage')) ||
      name.includes('profileImage')
    ) {
      let previewImage;
      if (getImage) {
        previewImage = getImage;
      } else {
        previewImage = '/assets/svgs/icons/gallery.svg';
      }
      setImage({ preview: previewImage });
    }
  }, [getImage, edit_qrId]);

  useEffect(() => {
    setCurr(index);
  }, [index]);

  useEffect(() => {
    if (barCode.formSubmitted) {
      setImage();
    }
  }, [barCode.formSubmitted]);

  const handleFile = (name, result, url, file) => {
    setValue(name, {
      file: file,
      preview: result,
      url: url,
    });
    if (name === 'preview.coverImage') {
      dispatch(
        setCoverImage({
          preview: result,
          url: url,
        })
      );
    }
    if (name === 'preview.profileImage') {
      dispatch(
        setProfileImage({
          preview: result,
          url: url,
        })
      );
    }
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = async () => {
        setImage({
          file: file,
          preview: reader.result,
        });

        handleFile(name, reader.result, '', file);
        if (file) {
          setLoading(true);
          setUploading(true);
          dispatch(uploadFileGCP([file]))
            .unwrap()
            .then((res) => {
              handleFile(name, reader.result, res[0].url, file);
              setLoading(false);
            });
          setUploading(false);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    if (!onChange) return;
    onChange(image);
  }, [image]);

  return (
    <div className='flex-column  gap-3 md:gap-3 text-base md:text-lg'>
      <p className='font-medium text-sm'>{preLabel ? preLabel : label}</p>
      <div className={`relative w-[50px]`}>
        <input
          type='file'
          className='hidden'
          id={label}
          onChange={(e) => handleFileUpload(e)}
          accept={accept}
        />
        {loading && (
          <span className='absolute top-[9px] left-3'>
            <Loader classNames='w-[20px] h-[20px]' />
          </span>
        )}
        <label htmlFor={label}>
          {image && !loading ? (
            <Image
              src={image.preview}
              alt='Selected Image'
              width={40}
              height={40}
              className='w-[40px] h-[40px] rounded-md cursor-pointer'
            />
          ) : (
            <>
              <Image
                src='/assets/svgs/icons/gallery.svg'
                alt='Select Image'
                width={20}
                height={20}
                className='w-[40px] cursor-pointer'
              />
              <Image
                src='/assets/svgs/icons/plus_black.svg'
                alt='Add Image'
                width={15}
                height={15}
                className='absolute -right-0 cursor-pointer  -top-[10px] z-10'
              />
            </>
          )}
        </label>
      </div>
    </div>
  );
}

export default FileUpload;
