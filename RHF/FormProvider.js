import { useForm, FormProvider, useFormContext } from "react-hook-form";
import { VALIDATION_MATCH } from "./schema/schema-handler";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LOGOS } from "@/utils/mock";

var isBase64 = require("is-base64");

import {
  DEFAULT_VALUES_MATCH,
  DEFAULTS,
} from "./defaultValues/defaultsProvider";
import {
  getQrCode,
  saveQrCode,
  updateTheQrCode,
  uploadFileGCP,
} from "@/store/barCode/barCodeAction";
import {
  convertToFile,
  downloadQRCode,
  getUserToDashBoard,
} from "@/utils/functions";
import {
  setCoverImage,
  setProfileImage,
  setQrCodeState,
  setQrType,
  setFormSubmitted,
  setQrUrl,
  setFolderModal,
} from "@/store/barCode/barCodeSlice";
import { useRouter } from "next/router";
import moment from "moment";
import { toast } from "react-toastify";
import { FolderModal } from "@/components/FolderModal";
import QrFolderComponet from "@/components/QrFolderComponent";

function RHFProvider({ children }) {
  const [fdata, setfData] = useState(null);
  const { folderModal } = useSelector((state) => state.barCode);
  const { user } = useSelector((state) => state.auth);
  // const { setValue } = useFormContext();

  const findByName = (array, nameToFind) => {
    return array.find((item) => item?.name === nameToFind);
  };
  const {
    barCode,
    auth: {
      user: { subscriptionId },
    },
  } = useSelector((state) => state);
  const dispatch = useDispatch();
  const router = useRouter();
  const { edit_qrId } = router.query;
  const [qrValues, setQrValues] = useState();

  const defaultValues = useMemo(() => {
    return {
      ...DEFAULT_VALUES_MATCH[barCode?.qrType],
      ...DEFAULTS,
    };
  }, [barCode?.qrType]);

  const freeQRs = ["Url", "Sms", "MakeCall"];

  function makeResetValues(qrValues, name) {
    console.log("qrValues", qrValues);
    if (qrValues) {
      const excludedFields = [
        "files",
        "eyeBall",
        "eyeFrame",
        "pattern",
        "bgColor",
        "fgColor",
        "qrFrame",
        "qrTemplate",
        "qrEyeBallColor",
        "qrEyeFrameColor",
        "qrFrameColor",
      ];

      const resetValues = Object.keys(qrValues)
        .filter((key) => !excludedFields.includes(key))
        .reduce((obj, key) => {
          obj[key] = qrValues[key];
          return obj;
        }, {});

      return {
        ...resetValues,
        ...qrValues[name],
      };
    }
  }

  useEffect(() => {
    if (edit_qrId) {
      dispatch(getQrCode(edit_qrId)).then((res) => {
        setQrValues({ ...res.payload });
        dispatch(setQrCodeState(res.payload));
      });
    } else {
      dispatch(setQrType("Url"));
    }
  }, [edit_qrId]);

  const methods = useForm({
    mode: "onChange",
    defaultValues: defaultValues,

    resolver: yupResolver(VALIDATION_MATCH[barCode?.qrType]),
  });

  function camelize(str) {
    return str
      ?.replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
        return index === 0 ? word.toLowerCase() : word.toUpperCase();
      })
      .replace(/\s+/g, "");
  }

  useEffect(() => {
    /** When Qr In edit mode */
    const typesToStoreImages = ["advanceLinks", "social", "menu", "coupon"];
    if (qrValues) {
      let name = camelize(qrValues.qrType);
      methods.reset(makeResetValues(qrValues, name));
      let temp = qrValues;
      if (typesToStoreImages.includes(name)) {
        temp = {
          ...temp,
          coverImage: {
            url: temp[name]?.preview?.coverImage,
          },
          profileImage: {
            url: temp[name]?.preview?.profileImage,
          },
        };
      }
      if (qrValues?.qrType === "Menu") {
        temp = {
          ...temp,
          products: temp?.menu?.products,
        };
      }
      delete temp[name];
      dispatch(setQrCodeState(temp));
    }
  }, [qrValues]);

  const handleClose = () => {
    // handleFormSubmit(data);
    dispatch(setFolderModal(false));
  };
  useEffect(() => {
    if (!edit_qrId) {
      methods.reset(defaultValues);
      dispatch(setProfileImage(""));
      dispatch(setCoverImage(""));
    }
  }, [defaultValues]);

  const CheckBeforeSubmit = async (data) => {
    const token = localStorage.getItem("token");
    // if (!token) {
    //   toast.info('Please Login First');
    //   return;
    // }
    return handleFormSubmit(data);
  };

  const hasErrors = Object.keys(methods.formState.errors).length > 0;

  if (hasErrors && folderModal) {
    dispatch(setFolderModal(false));
  }

  const handleFormSubmit = async (data) => {
    console.log("data in handle submit", data);

    dispatch(setFolderModal(false));

    let theData = data;
    theData = {
      ...theData,
      qrFolder: barCode?.qrFolder,
      qrName: barCode?.qrName,
    };
    // keep the updated fields and delete the old one from the data.
    // in the edit mode.

    console.log("qrtype", theData.qrType, "the data", theData);
    if (theData.qrType === "AdvanceLinks" && edit_qrId) {
      delete theData.advanceLinks;
    }

    if (theData.qrType === "Social" && edit_qrId) {
      delete theData.social;
    }

    if (theData.qrType === "Coupon" && edit_qrId) {
      delete theData.coupon;
    }

    if (theData.qrType === "DownloadPdf" && edit_qrId) {
      delete theData.downloadPdf;
    }
    if (theData.qrType === "UploadImage" && edit_qrId) {
      delete theData.uploadImage;
    }
    if (theData.qrType === "Menu" && edit_qrId) {
      delete theData.menu;
    }
    if (theData.qrType === "BusinessCard" && edit_qrId) {
      delete theData.businessCard;
    }
    if (theData.qrType === "Location" && edit_qrId) {
      delete theData.location;
    }
    if (theData.qrType === "LandingPage" && edit_qrId) {
      delete theData.landingPage;
    }
    if (theData.qrType === "Sms" && edit_qrId) {
      delete theData.sms;
    }
    if (theData.qrType === "SendEmail" && edit_qrId) {
      delete theData.sendEmail;
    }
    if (theData.qrType === "MakeCall" && edit_qrId) {
      delete theData.makeCall;
    }
    // if (theData.qrType === "Url" && edit_qrId) {
    //   delete theData.url;
    // }
    if (theData.qrType === "ReviewCollector" && edit_qrId) {
      delete theData.reviewCollector;
    }
    if (theData.qrType === "Calendar" && edit_qrId) {
      delete theData.calendar;
    }
    if (theData.qrType === "Forms" && edit_qrId) {
      delete theData.forms;
    }
    if (theData.qrType === "ShowText" && edit_qrId) {
      delete theData.showText;
    }
    if (theData.qrType === "AppDownload" && edit_qrId) {
      delete theData.appDownload;
    }
    if (theData.qrType === "Video" && edit_qrId) {
      delete theData.video;
    }
    /**
       * download the qr image file * /
      /*
       *  below the code use to structure the theData for FORM submission.
          we get the current type of qr type according to that we create a object theData of it.
       */

    const nestedPick = (obj, keys) => {
      const result = {};
      keys.forEach((key) => {
        const keyParts = key.split(".");
        let value = obj;
        let currentResult = result;
        for (let i = 0; i < keyParts.length; i++) {
          const part = keyParts[i];
          if (value && value.hasOwnProperty(part)) {
            if (i === keyParts.length - 1) {
              currentResult[part] = value[part];
            } else {
              currentResult[part] = {};
              currentResult = currentResult[part];
              value = value[part];
            }
          } else {
            value = undefined;
            break;
          }
        }
      });
      return result;
    };

    const formFields = {
      BusinessCard: [
        "firstName",
        "lastName",
        "email",
        "workPhone",
        "mobilePhone",
        "companyName",
        "jobTitle",
        "street",
        "city",
        "zipcode",
        "website",
        "country",
        "state",
        "summary",
      ],
      AppDownload: ["googlePlayUrl", "appStoreUrl"],
      Social: ["preview", "links"],
      SendEmail: ["subject", "email", "message"],
      Location: ["mapUrl", "mapLocation"],
      Url: ["url"],
      Sms: ["phone", "message"],
      ShowText: ["text"],
      LandingPage: ["url"],
      Coupon: [
        "pallete",
        "couponTime",
        "preview",
        "validUntil",
        "buttonLink",
        "buttonText",
        "salePercentage",
        "couponDetails",
        "couponNo",
      ],
      Video: ["videoTitle", "videoUrl", "description", "preview"],
      DownloadPdf: ["url", "file"],
      AdvanceLinks: ["preview", "links"],
      Calendar: ["url"],
      Forms: ["url"],
      Menu: [
        "shopName",
        "description",
        "coverImage",
        "storeLink",
        "buttonName",
        "products",
        "preview",
        "menuName",
      ],
      UploadImage: ["files", "galleryName", "backgroundColor"],
      ReviewCollector: ["url"],
      MakeCall: ["phone"],
    };

    const formName = barCode.qrType;
    const camelCaseFormName = camelize(formName);

    const filteredFields = {
      ...(formName && formFields[formName] ? { [camelCaseFormName]: {} } : {}),
    };

    if (filteredFields[camelCaseFormName]) {
      const fields = formFields[formName];
      const pickedFields = { ...nestedPick(theData, fields) };
      Object.assign(filteredFields[camelCaseFormName], pickedFields);
      for (const field in pickedFields) {
        delete theData[field];
      }
    }

    const finalResult = {
      ...filteredFields,
      ...barCode,
      ...theData,
    };

    if (finalResult[camelCaseFormName]?.preview?.profileImage) {
      finalResult[camelCaseFormName].preview.profileImage =
        barCode?.profileImage.url || "";
    }
    if (finalResult[camelCaseFormName]?.preview?.coverImage) {
      finalResult[camelCaseFormName].preview.coverImage =
        barCode?.coverImage.url || "";
    }

    if (
      camelCaseFormName === "menu" &&
      finalResult?.menu?.products.length > 0
    ) {
      for (let i = 0; i < finalResult?.menu?.products.length; i++) {
        finalResult.menu.products[i].image =
          finalResult.menu.products[i].image?.url ||
          finalResult.menu.products[i].image;
      }
    }

    // if (camelCaseFormName === 'uploadImage') {
    //   finalResult[camelCaseFormName].files = finalResult[
    //     camelCaseFormName
    //   ].files.map(item => item.url)
    // }

    if (camelCaseFormName === "downloadPdf") {
      delete finalResult.downloadPdf.file;
    }

    if (camelCaseFormName === "coupon") {
      finalResult.coupon.validUntil = moment(
        finalResult.coupon.validUntil
      ).format("YYYY-MM-DD");
    }
    /**
     *   if the logo is system file path then only store the logo name.
     */

    if (finalResult?.logo?.url && typeof finalResult?.logo === "object") {
      finalResult.logo = finalResult?.logo?.url;
      console.log("final result logo if: ", finalResult?.logo);
    } else if (finalResult?.logo && finalResult?.logo?.file) {
      let str = finalResult.logo.file;
      str = str.split("/");
      str = str[str.length - 1].split(".")[0];
      finalResult.logo = str;
      console.log("final result logo:else ", finalResult?.logo);
    } else {
      finalResult.logo = "";
    }

    const uploadQrImage = async (qrRes, name) => {
      try {
        setTimeout(async () => {
          const qrImage = await downloadQRCode(
            theData?.qrQuality,
            theData?.qrDownloadOption
          );
          // if (isBase64(qrImage, { allowMime: true })) {
          let newFile = await convertToFile(qrImage, "logo");

          if (newFile) {
            dispatch(uploadFileGCP([newFile]))
              .unwrap()
              .then(async (res) => {
                const qrImageUrl = res[0].url;
                const qrId = qrRes.id;
                const qrImage2 = await downloadQRCode(
                  theData?.qrQuality,
                  theData?.qrDownloadOption,
                  "logo"
                ).catch(() => {
                  methods.reset(makeResetValues(finalResult, name));
                });

                dispatch(
                  updateTheQrCode({
                    id: qrId,
                    payload: { qrImage: qrImageUrl },
                  })
                )
                  .unwrap()
                  .then(() => {
                    if (edit_qrId) {
                      // toast.success('Your QR Is Updated', {
                      //   toastId: 'Qr code creation',
                      // });
                      getUserToDashBoard(user);
                    } else {
                      methods.reset();
                      dispatch(setProfileImage(""));
                      dispatch(setCoverImage(""));
                      getUserToDashBoard(user);
                    }
                    dispatch(setFormSubmitted(true));
                  });
              });
            // }
          } else {
            console.log("WE ARE HERE");
          }
        }, 2000);
      } catch (err) {
        console.log("THE ERROR", err);
      }
    };

    delete finalResult?.coverImage;
    delete finalResult?.profileImage;

    try {
      if (edit_qrId) {
        let updatedData = finalResult;
        delete updatedData._id;
        delete updatedData.user;

        dispatch(updateTheQrCode({ id: edit_qrId, payload: updatedData }))
          .unwrap()
          .then(async (qrRes) => {
            uploadQrImage(qrRes);
          });
      } else {
        let name = camelize(finalResult.qrType);

        dispatch(saveQrCode(finalResult))
          .unwrap()
          .then(async (qrRes) => {
            uploadQrImage(qrRes, name);
          })
          .catch(() => {
            methods.reset(makeResetValues(finalResult, name));
          });
      }
    } catch (error) {
      console.log("ERROR", error);
    }
  };
  // console.log('ERORRS', methods.formState.errors);

  function extractNameFromSrc(array) {
    return array?.map((item) => {
      const srcParts = item?.src.split("/");
      const fileName = srcParts[srcParts?.length - 1]; // Get the last part of the src
      const name = fileName?.replace(".svg", ""); // Remove the '.svg' extension if present
      return { ...item, name };
    });
  }
  const newArrayWithExtractedNames = extractNameFromSrc(LOGOS);

  const findObjectByName = (newArrayWithExtractedNames, nameToSearch) => {
    return newArrayWithExtractedNames?.find(
      (item) => item?.name === nameToSearch
    );
  };

  useEffect(() => {
    if (edit_qrId) {
      const found = findObjectByName(newArrayWithExtractedNames, barCode?.logo);
      console.log("found", found, "name", barCode?.logo);
      if (found && barCode?.logo) {
        methods.setValue("logo", {
          file: found?.name,
          preview: found?.src,
        });
      }
    }
  }, [barCode?.logo, edit_qrId]);

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(CheckBeforeSubmit)}>
        {children}

        <QrFolderComponet
          open={folderModal}
          close={() => {
            // methods.handleSubmit(data);
            // setSelectFolder(false);
            handleClose();
          }}
        />
      </form>
    </FormProvider>
  );
}

export default RHFProvider;
