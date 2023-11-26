import { createContext, useReducer } from 'react';

export const BarCodeContext = createContext();

const initialState = {
  qrType: 'Url',
  files: [],
  eyeBall: 'eye-ball-plain-square',
  eyeFrame: 'eye-frame-plain-square',
  pattern: 'rounded',
  bgColor: '#ffffff',
  fgColor: '#000000',
  qrFrame: 'none',
  qrTemplate: 'none',
  qrEyeBallColor: '#000000',
  qrEyeFrameColor: '#000000',
  formSubmitted: false,
  qrName: '',
};

function reducer(state, action) {
  switch (action.type) {
    case 'SET_QR_TYPE':
      return { ...state, qrType: action.payload };
    case 'SET_FILES':
      return { ...state, files: [...state.files, action.payload] };
    case 'REMOVE_FILE':
      const filteredFiles = state.files.filter(
        (file) => file.id !== action.payload.id
      );
      return { ...state, files: filteredFiles };
    case 'UPDATE':
      return { ...state, files: [...state.files, action.payload] };
    case 'SET_EYE_FRAME':
      return { ...state, eyeFrame: action.payload };
    case 'SET_EYE_BALL':
      return { ...state, eyeBall: action.payload };
    case 'SET_PATTERN':
      return { ...state, pattern: action.payload };
    case 'SET_BGCOLOR':
      return { ...state, bgColor: action.payload };
    case 'SET_FGCOLOR':
      return { ...state, fgColor: action.payload };
    case 'SET_ERORR_LEVEL':
      return { ...state, errorLevel: action.payload };
    case 'SET_QR_FRAME':
      return { ...state, qrFrame: action.payload, qrTemplate: 'none' };
    case 'SET_QR_TEMPLATE':
      return { ...state, qrTemplate: action.payload, qrFrame: 'none' };
    case 'SET_EYE_BALL_COLOR':
      return { ...state, qrEyeBallColor: action.payload };
    case 'SET_EYE_FRAME_COLOR':
      return { ...state, qrEyeFrameColor: action.payload };
    case 'SET_FORM_SUBMITTED':
      return { ...state, formSubmitted: action.payload };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

export function BarCodeProvider({ children }) {
  const [barCode, dispatch] = useReducer(reducer, initialState);

  const setQrType = (value) => {
    dispatch({ type: 'SET_QR_TYPE', payload: value });
  };

  const setFiles = (value) => {
    dispatch({ type: 'SET_FILES', payload: value });
  };
  const updateFiles = (value) => {
    dispatch({ type: 'REMOVE_FILE', payload: value });
  };

  const setEyeFrame = (value) => {
    dispatch({ type: 'SET_EYE_FRAME', payload: value });
  };

  const setEyeBall = (value) => {
    dispatch({ type: 'SET_EYE_BALL', payload: value });
  };
  const setPattern = (value) => {
    dispatch({ type: 'SET_PATTERN', payload: value });
  };
  const setBgColor = (value) => {
    dispatch({ type: 'SET_BGCOLOR', payload: value });
  };
  const setFgColor = (value) => {
    dispatch({ type: 'SET_FGCOLOR', payload: value });
  };
  const setQrFrame = (value) => {
    dispatch({ type: 'SET_QR_FRAME', payload: value });
  };
  const setQrTemplate = (value) => {
    dispatch({ type: 'SET_QR_TEMPLATE', payload: value });
  };

  const setEyeBallColor = (value) => {
    dispatch({ type: 'SET_EYE_BALL_COLOR', payload: value });
  };

  const setFormSubmitted = (value) => {
    dispatch({ type: 'SET_FORM_SUBMITTED', payload: value });
  };

  const setEyeFrameColor = (value) => {
    dispatch({ type: 'SET_EYE_FRAME_COLOR', payload: value });
  };

  return (
    <BarCodeContext.Provider
      value={{
        barCode,
        setBgColor,
        setEyeBall,
        setEyeBallColor,
        setEyeFrameColor,
        setFgColor,
        setEyeFrame,
        setFiles,
        setPattern,
        setQrFrame,
        setQrTemplate,
        setQrType,
        updateFiles,
        setFormSubmitted,
      }}
    >
      {children}
    </BarCodeContext.Provider>
  );
}
