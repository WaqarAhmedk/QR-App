import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useFormContext, useWatch } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { uploadFileGCP } from "@/store/barCode/barCodeAction";
import Loader from "./Loader";
import { formatFileSize } from "@/utils/mock";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

function ImageUpload({
  text,
  label,
  fileType,
  variant,
  description,
  name,
  maxFiles,
  type,
}) {
  const formFiles = useWatch({ name: name });

  const [files, setFiles] = useState([]);
  const { loading, qrType, formSubmitted } = useSelector(
    (state) => state.barCode
  );
  const { setValue, register } = useFormContext();
  const [state, setState] = useState(true);
  const [uploadedUrls, setUploadedUrls] = useState([]);

  const dispatch = useDispatch();
  const router = useRouter();
  const { edit_qrId } = router.query;

  // useEffect(() => {
  //   console.log("files are", files);
  //   if (files?.length > 10) {
  //     alert("cannot upload more than 10 files");
  //     return;
  //   }
  // }, [files]);

  useEffect(() => {
    if (edit_qrId && state) {
      if (formFiles?.length === 1) {
        setFiles([formFiles]);
        setState(false);
      }
      if (formFiles?.length >= 1 && name === "files") {
        setFiles([...formFiles]);
        setUploadedUrls([...formFiles]);
        setState(false);
      }
    }
  }, [formFiles, edit_qrId, state, name]);

  useEffect(() => {
    if (formSubmitted) {
      setFiles([]);
    }
  }, [formSubmitted]);

  const onDrop = useCallback(
    async (acceptedFiles, fileRejections) => {
      if (files?.length + acceptedFiles.length > 10) {
        toast.error("Upload limit exceeded");
        return;
      }

      if (fileRejections && fileRejections.length > maxFiles) {
        toast.error("Upload limit exceeded");
        return;
      }

      const updatedFiles = acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      );
      dispatch(uploadFileGCP(updatedFiles))
        .unwrap()
        .then((res) => {
          const urls = res.map((file) => file.url);
          setUploadedUrls((prevUrls) => [...prevUrls, ...urls]);
          if (variant === "pdf") {
            setValue(name || "file", urls[0]);
          } else {
            setValue(name || "file", [...uploadedUrls, ...urls]);
          }
        });

      if (variant === "pdf") {
        setFiles([...updatedFiles]);
      } else {
        setFiles((prevFiles) => [...prevFiles, ...updatedFiles]);
      }
    },
    [dispatch, setValue, variant, name, uploadedUrls, files]
  );

  const removeFile = (index) => {
    const updatedFiles = Array.isArray(files) ? [...files] : [];
    const newFiles = Array.isArray(formFiles) ? [...formFiles] : [];
    const newUploadedUrls = Array.isArray(uploadedUrls)
      ? [...uploadedUrls]
      : [];

    updatedFiles.splice(index, 1);
    newFiles.splice(index, 1);
    newUploadedUrls.splice(index, 1);

    setFiles(updatedFiles);
    setValue(name || "file", newFiles);
    setUploadedUrls(newUploadedUrls);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: fileType,
    maxFiles: variant === "pdf" ? 1 : 10,
    multiple: variant === "pdf" ? false : true,
    maxSize: 5 * 1024 * 1024,
  });

  return (
    <div className="arimo-regular">
      {label && (
        <label className="block mb-2 font-medium text-gray-90">{label}</label>
      )}
      {variant === "pdf" ? (
        <div className="relative">
          {files.length > 0 &&
            files.map((file, index) => (
              <div
                className="relative pl-4 border border-blue-500 px-3 py-2 rounded-md my-3 bg-white text-blue-500 flex flex-col justify-center"
                key={index}
              >
                {loading && (
                  <Loader classNames="w-[25px z-10 absolute top-3 w-[25px] ml-2" />
                )}
                <>
                  <p className="text-sm md:text-base">
                    {file?.length > 0 &&
                      file?.substring(file?.lastIndexOf("/") + 1)}
                  </p>
                  {file?.name && (
                    <p className="text-sm md:text-base">{file.name}</p>
                  )}
                </>
                <p className="text-[10px] text-slate-500">
                  {file?.size && formatFileSize(file?.size)}
                </p>
                {!loading && (
                  <img
                    src="/assets/svgs/icons/cross.svg"
                    width={20}
                    height={20}
                    alt="check_arrow"
                    unoptimized
                    onClick={() => removeFile(index)}
                    className="absolute -right-2 -top-[10px] z-10 cursor-pointer mix-blend-multiply bg-white"
                  />
                )}
              </div>
            ))}
        </div>
      ) : (
        <div className="flex gap-4 flex-wrap my-5">
          {files.map((file, index) => (
            <div className="flex-column" key={index}>
              <div className="relative w-[50px]">
                <div className="relative">
                  <img
                    src={file?.length > 0 ? file : file.preview}
                    alt="check_arrow"
                    className={`w-[55px] h-[50px]  rounded-md ${
                      loading && "opacity-[0.8]"
                    }`}
                  />
                  {loading && (
                    <Loader classNames="w-[25px absolute top-3 w-[25px] ml-2" />
                  )}
                </div>

                {!loading && (
                  <img
                    src="/assets/svgs/icons/cross.svg"
                    width={20}
                    height={20}
                    alt="check_arrow"
                    unoptimized
                    onClick={() => removeFile(index)}
                    className="absolute -right-2 -top-[10px] z-10 mix-blend-multiply cursor-pointer bg-white"
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {files.length >= 10 ? (
        <div className="p-6 border border-dashed border-[#CBD5E1] rounded-xl bg-[#F9FAFB] cursor-pointer">
          <div className="flex flex-col justify-center items-center text-[#52525B] gap-1 arimo-regular">
            <h3 className="text-base text-center arimo-regular text-primary">
              <div className="flex justify-center items-center border gradient-border rounded-lg py-2.5 px-8 font-semibold bg-transparent">
                {text}
              </div>
            </h3>
            <p className="text-[13px] mt-2">{description}</p>
          </div>
        </div>
      ) : (
        <div
          {...getRootProps()}
          className="p-6 border border-dashed border-[#CBD5E1] rounded-xl bg-[#F9FAFB] cursor-pointer"
        >
          <input {...(name ? register(name) : {})} {...getInputProps()} />

          <div className="flex flex-col justify-center items-center text-[#52525B] gap-1 arimo-regular">
            <h3 className="text-base text-center arimo-regular text-primary">
              <div className="flex justify-center items-center border gradient-border rounded-lg py-2.5 px-8 font-semibold bg-transparent">
                {text}
              </div>
            </h3>
            <p className="text-[13px] mt-2">{description}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default ImageUpload;
