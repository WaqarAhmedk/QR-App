import { createSlice } from "@reduxjs/toolkit";
import {
  getQrCode,
  saveQrCode,
  setAnalytics,
  uploadFileGCP,
  updateTheQrCode,
  getTemplates,
} from "./barCodeAction";
const templateArray = [
  {
    _id: 1,
    qrImage: "/assets/svgs/qr/qr_1.svg",
    selected: false,
    type: "plain",
    pattern: "plain",
    eyeFrame: "eye-frame-plain-square",
    eyeBall: "eye-ball-plain-square",
  },
  {
    _id: 2,
    qrImage: "/assets/svgs/qr/qr_5.svg",
    selected: false,
    type: "dots",
    pattern: "dots",
    eyeFrame: "eye-frame-rounded",
    eyeBall: "eye-ball-plain-square",
  },
  {
    _id: 3,
    qrImage: "/assets/svgs/qr/qr_3.svg",
    selected: false,
    type: "ScanButton",
    logo: "youtube_plain",

    bgColor: "#ffffff",
    fgColor: "#000000",
    qrEyeFrameColor: "#000000",
    qrEyeBallColor: "#000000",
  },
  {
    _id: 4,
    qrImage: "/assets/svgs/qr/qr_2.svg",
    selected: false,
    type: "ScanTagButton",
    logo: "facebook",
    bgColor: "#000000",
    fgColor: "#ffffff",
    qrEyeFrameColor: "#ffffff",
    qrEyeBallColor: "#ffffff",
    pattern: "dots",
    eyeFrame: "eye-frame-rounded",
    eyeBall: "eye-ball-plain-square",
  },
];
const initialState = {
  qrType: "",
  eyeBall: "eye-ball-plain-square",
  eyeFrame: "eye-frame-plain-square",
  pattern: "rounded",
  bgColor: "#ffffff",
  fgColor: "#000000",
  qrFrame: "none",
  qrTemplate: "none",
  qrEyeBallColor: "#000000",
  qrEyeFrameColor: "#000000",
  qrTextColor: "#000000",
  qrFrameColor: "#FF0000",
  modalTab: "TEMPLATES",
  qrCodeUrl: "https://qr-app-web.herokuapp.com/DefaultQrPage",
  qrFile: "",
  coverImage: "",
  profileImage: "",
  formSubmitted: false,
  folderModal: false,
  qrName: "",
  qrFolder: "",
  templates: templateArray,
  templatesLoading: false,
};

const barCodeSlice = createSlice({
  name: "barCode",
  initialState,
  reducers: {
    setQrType: (state, action) => {
      state.qrType = action.payload;
    },
    setFiles: (state, action) => {
      state.files.push(action.payload);
    },
    removeFile: (state, action) => {
      state.files = state.files.filter((file) => file.id !== action.payload.id);
    },
    update: (state, action) => {
      state.files.push(action.payload);
    },
    setEyeFrame: (state, action) => {
      state.eyeFrame = action.payload;
    },
    setEyeBall: (state, action) => {
      state.eyeBall = action.payload;
    },
    setPattern: (state, action) => {
      state.pattern = action.payload;
    },
    setBgColor: (state, action) => {
      state.bgColor = action.payload;
    },
    setFgColor: (state, action) => {
      state.fgColor = action.payload;
    },
    setErrorLevel: (state, action) => {
      state.errorLevel = action.payload;
    },
    setQrFrame: (state, action) => {
      state.qrFrame = action.payload;
      state.qrTemplate = "none";
    },
    setQrTemplate: (state, action) => {
      const type = action.payload;
      state.qrTemplate = type;
      if (type !== "Custom") {
        state.qrFrame = "none";
      }
    },
    setEyeBallColor: (state, action) => {
      state.qrEyeBallColor = action.payload;
    },
    setEyeFrameColor: (state, action) => {
      state.qrEyeFrameColor = action.payload;
    },
    setQrTextColor: (state, action) => {
      state.qrTextColor = action.payload;
    },
    setQrFrameColor: (state, action) => {
      state.qrFrameColor = action.payload;
    },
    setModalTab: (state, action) => {
      state.modalTab = action.payload;
    },
    setQrUrl: (state, action) => {
      state.qrCodeUrl = action.payload;
    },
    setQrFile: (state, action) => {
      state.qrFile = action.payload;
    },
    setCoverImage: (state, action) => {
      state.coverImage = action.payload;
    },
    setProfileImage: (state, action) => {
      state.profileImage = action.payload;
    },
    setFormSubmitted: (state, action) => {
      state.formSubmitted = action.payload;
    },
    setFolderModal: (state, action) => {
      state.folderModal = action.payload;
    },
    setName: (state, action) => {
      state.qrName = action.payload;
    },
    setFolder: (state, action) => {
      state.qrFolder = action.payload;
    },
    setQrCodeState: (state, action) => {
      const { id, ...payload } = action.payload;
      const updatedData = {
        ...initialState,
        ...payload,
        qrCodeUrl: `https://qr-app-web.herokuapp.com/display/${id}`,
      };
      return updatedData;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(saveQrCode.pending, (state) => {
        state.loading = true;
      })
      .addCase(saveQrCode.fulfilled, (state, action) => {
        state.loading = false;
        state.qrCodeUrl =
          "https://qr-app-web.herokuapp.com/display" +
          "/" +
          action?.payload?.id;
      })
      .addCase(saveQrCode.rejected, (state) => {
        state.loading = false;
      })
      .addCase(updateTheQrCode.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateTheQrCode.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(updateTheQrCode.rejected, (state) => {
        state.loading = false;
      })
      .addCase(setAnalytics.pending, (state) => {
        state.loading = true;
      })
      .addCase(setAnalytics.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(setAnalytics.rejected, (state) => {
        state.loading = false;
      })
      .addCase(getQrCode.pending, (state) => {
        state.loading = true;
      })
      .addCase(getQrCode.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(getQrCode.rejected, (state) => {
        state.loading = false;
      })
      .addCase(uploadFileGCP.pending, (state) => {
        state.loading = true;
      })
      .addCase(uploadFileGCP.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(uploadFileGCP.rejected, (state) => {
        state.loading = false;
      })
      .addCase(getTemplates.pending, (state) => {
        state.templatesLoading = true;
      })
      .addCase(getTemplates.fulfilled, (state, action) => {
        const newTemplates = action?.payload;
        if (newTemplates?.length > 0) {
          state.templatesLoading = false;
          const uniqueNewTemplates = newTemplates.filter((newTemplate) => {
            return !state.templates.some(
              (existingTemplate) => existingTemplate._id === newTemplate._id
            );
          });
          state.templates = [...state.templates, ...uniqueNewTemplates];
        }
      })
      .addCase(getTemplates.rejected, (state) => {
        state.templatesLoading = false;
      });
  },
});

export const {
  setQrType,
  setFiles,
  removeFile,
  update,
  setEyeFrame,
  setEyeBall,
  setPattern,
  setBgColor,
  setFgColor,
  setErrorLevel,
  setQrFrame,
  setQrTemplate,
  setEyeBallColor,
  setEyeFrameColor,
  setFormSubmitted,
  setQrTextColor,
  setQrFrameColor,
  setDecorateModal,
  setModalTab,
  setQrUrl,
  setQrFile,
  setCoverImage,
  setProfileImage,
  setQrCodeState,
  setFolderModal,
  setForSub,
  setName,
  setFolder,
} = barCodeSlice.actions;

export default barCodeSlice.reducer;
