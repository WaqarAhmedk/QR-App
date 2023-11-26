import { toPng, toJpeg, toSvg } from 'html-to-image';
import { axiosInstance } from '@/api/axios';

const toggleOpen = ({
  isOpen,
  setIconIndex,
  setIsOpen,
  icons,
  iconIndex,
  type,
  onToggleDecorator,
}) => {
  type === 'Modal' ? onToggleDecorator() : setIsOpen ? setIsOpen(!isOpen) : '';
  setIconIndex(iconIndex === icons.length - 1 ? 0 : iconIndex + 1);
};

function isObject(value) {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

const useSelectToggle = (setState, id, key) => {
  setState((prevArray) =>
    prevArray.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          [key]: true,
        };
      } else {
        return {
          ...item,
          [key]: false,
        };
      }
    })
  );
};

const useDisable = (setState, id, key) => {
  setState((prevArray) =>
    prevArray.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          [key]: false,
        };
      }
      return item;
    })
  );
};

function generateFilePreview(file) {
  return new Promise((resolve, reject) => {
    if (!file) {
      reject(new Error('File is required'));
    }

    const reader = new FileReader();

    reader.onload = (event) => {
      resolve(event.target.result);
    };

    reader.onerror = (event) => {
      reject(event.target.error);
    };

    reader.readAsDataURL(file);
  });
}

const setSelectedPallets = (setValue, value) => {
  setValue('preview.bgColor', value.backGroundColor);
  setValue('preview.iconsColor', value.iconsColor);
  setValue('preview.textColor', value.textColor);
};

const setMenuSelectedPallete = (setValue, value) => {
  setValue('preview.bgColor', value.backGroundColor);
  setValue('preview.textColor', value.textColor);
  setValue('preview.borderColor', value.borderColor);
};

const downloadQRCode = async (
  downloadQuality,
  downloadOption,
  shouldDownload
) => {
  const quality = downloadQuality === 'HIGH' ? 1 : 0.1;
  const qrCodeNode = document.getElementById('qr_parent');
  try {
    const dataUrl = await convertToDataURL(qrCodeNode, quality, downloadOption);
    if (shouldDownload) {
      downloadDataUrl(dataUrl, shouldDownload);
    }
    return dataUrl;
  } catch (error) {
    console.error('Oops, something went wrong!', error);
    return null;
  }
};

const convertToDataURL = async (node, quality, format) => {
  let dataUrl;
  if (format === 'PNG') {
    dataUrl = await toPng(node, { quality });
  } else if (format === 'JPG') {
    dataUrl = await toJpeg(node, { quality });
  } else if (format === 'SVG') {
    dataUrl = await toSvg(node, { quality });
  } else {
    throw new Error('Invalid downloadOption provided.');
  }
  return dataUrl;
};

const downloadDataUrl = (dataUrl, filename) => {
  const link = document.createElement('a');
  link.download = filename;
  link.href = dataUrl;
  link.click();
};

function isObjectValid(variable) {
  return (
    typeof variable === 'object' &&
    !Array.isArray(variable) &&
    variable !== null
  );
}

// function isObjectValid(variable) {
//   return (
//     typeof variable === "object" &&
//     !Array.isArray(variable) &&
//     variable !== null
//   );
// // }

function isBase64(encodedString) {
  try {
    // Attempt to decode the string
    const decodedData = atob(encodedString);

    // Check if the decoded data can be re-encoded to match the original string
    const reEncodedData = btoa(decodedData);
    if (reEncodedData === encodedString) {
      // If the re-encoded data matches the original string, it is Base64 encoded
      return true;
    }
  } catch (error) {
    // If an error occurs during decoding, it is not Base64 encoded
    return false;
  }

  // If the string cannot be decoded or re-encoded correctly, it is not Base64 encoded
  return false;
}

async function convertToFile(dataUrl, fileName) {
  const response = await fetch(dataUrl);
  const blob = await response.blob();
  const file = new File([blob], fileName);
  return file;
}

function deleteNestedKeys(obj, keyPath) {
  const keys = keyPath.split('.');
  const currentKey = keys.shift();

  if (obj.hasOwnProperty(currentKey)) {
    if (keys.length === 0) {
      delete obj[currentKey];
    } else if (typeof obj[currentKey] === 'object') {
      deleteNestedKeys(obj[currentKey], keys.join('.'));
    }
  } else {
    for (let nestedKey in obj) {
      if (typeof obj[nestedKey] === 'object') {
        deleteNestedKeys(obj[nestedKey], keyPath);
      }
    }
  }
}

function getValueAfterPipe({ inputString, qrErrorLevel }) {
  const stringLength = inputString?.length;
  var ranges = [];
  if (qrErrorLevel === 'H') {
    ranges = [
      { min: 0, max: 0, value: 70 },
      { min: 1, max: 2, value: 67 },
      { min: 3, max: 7, value: 70 },
      { min: 8, max: 14, value: 60 },
      { min: 15, max: 24, value: 50 },
      { min: 25, max: 34, value: 44 },
      { min: 35, max: 44, value: 39 },
      { min: 45, max: 58, value: 36 },
      { min: 59, max: 64, value: 32 },
      { min: 65, max: 100, value: 30 },
    ];
  } else if (qrErrorLevel === 'Q') {
    ranges = [
      { min: 0, max: 0, value: 70 },
      { min: 1, max: 2, value: 67 },
      { min: 3, max: 11, value: 70 },

      { min: 12, max: 20, value: 57 },
      { min: 21, max: 32, value: 50 },
      { min: 33, max: 46, value: 44 },
      { min: 47, max: 60, value: 40 },
      { min: 61, max: 74, value: 35 },
      { min: 75, max: 85, value: 32 },
    ];
  } else if (qrErrorLevel === 'L') {
    ranges = [
      { min: 0, max: 0, value: 70 },
      { min: 1, max: 2, value: 67 },
      { min: 3, max: 14, value: 70 },
      { min: 15, max: 17, value: 67 },
      { min: 18, max: 32, value: 60 },
      { min: 33, max: 53, value: 50 },
      { min: 54, max: 78, value: 43 },
      { min: 79, max: 106, value: 38 },
    ];
  } else {
    ranges = [
      { min: 0, max: 0, value: 70 },
      { min: 1, max: 2, value: 67 },
      { min: 3, max: 14, value: 70 },
      { min: 15, max: 26, value: 60 },
      { min: 26, max: 42, value: 50 },
      { min: 43, max: 62, value: 44 },
      { min: 63, max: 84, value: 39 },
      { min: 85, max: 104, value: 36 },
      { min: 105, max: 106, value: 35 },
    ];
  }

  for (const range of ranges) {
    if (stringLength >= range.min && stringLength <= range.max) {
      return range.value;
    }
  }
}

const navigateUserToDashboard = (_, is_trial_or_sub_valid) => {
  const storedUser = localStorage.getItem('user');
  const user = storedUser ? JSON.parse(storedUser) : null;
  if (user && is_trial_or_sub_valid) {
    const token = localStorage.getItem('token');
    const queryParams = new URLSearchParams({
      token: token,
      email: user.email,
      userId: user.userId,
      role: user.role,
    });

    // Check if the window is inside an iframe
    if (window.self !== window.top) {
      // We are inside an iframe, so access the parent window
      const parentWindow = window.parent;
      // parentWindow.location.replace(process.env.NEXT_PUBLIC_QR_APP);
      window.open(process.env.NEXT_PUBLIC_QR_APP, 'qr_app');
    } else {
      setTimeout(() => {
        // window.open(
        //   process.env.NEXT_PUBLIC_QR_APP + '?' + queryParams.toString(),
        //   'qr_app'
        // );
        window.location.href =
          process.env.NEXT_PUBLIC_QR_APP + '?' + queryParams.toString();
      }, 1000);
    }
  } else if (user?.role === 'superAdmin') {
    const token = localStorage.getItem('token');
    const queryParams = new URLSearchParams({
      token: token,
      email: user.email,
      userId: user.id,
      role: user.role,
    });

    setTimeout(() => {
      window.location.href =
        process.env.NEXT_PUBLIC_QR_APP + '?' + queryParams.toString();
    }, 1000);
  } else {
    window.location.href = '/plan-expired';
  }
};

const getUserToDashBoard = async (user) => {
  try {
    const response = await axiosInstance.get('/plan/subscription-info');
    const is_trial_or_sub_valid = response.trialValid || response.isValid;
    navigateUserToDashboard(user, is_trial_or_sub_valid);
  } catch (error) {
    console.log('ERROR', error);
    // Handle error if needed
  }
};

function disableStyling() {
  const disableStylingRoutes = ['/create-qr'];
  if (disableStylingRoutes.includes(window.location.pathname)) {
    return true;
  }
}

export {
  toggleOpen,
  isObject,
  useSelectToggle,
  useDisable,
  setSelectedPallets,
  generateFilePreview,
  downloadQRCode,
  isObjectValid,
  setMenuSelectedPallete,
  isBase64,
  convertToFile,
  deleteNestedKeys,
  getValueAfterPipe,
  getUserToDashBoard,
  disableStyling,
};
