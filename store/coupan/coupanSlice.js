import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  bgColor: '#5E61F6',
  buttonColor: 'gradient',
  textColor: '#5E61F6',
  buttonText: 'Get it Now!',
  sale: '10% OFF',
  hours: '48',
  minutes: '00',
  seconds: '00',
}

const sliceName = createSlice({
  name: 'sliceName',
  initialState,
  reducers: {
    setBgColor: (state, action) => {
      state.bgColor = action.payload
    },
    setButtonColor: (state, action) => {
      state.buttonColor = action.payload
    },
    setTextColor: (state, action) => {
      state.textColor = action.payload
    },
    setButtonText: (state, action) => {
      state.buttonText = action.payload
    },
    setSale: (state, action) => {
      state.sale = action.payload
    },
    setCountdownHours: (state, action) => {
      state.hours = action.payload
    },
    setCountdownMinutes: (state, action) => {
      state.minutes = action.payload
    },
    setCountdownSeconds: (state, action) => {
      state.seconds = action.payload
    },
  },
})

export const {
  setBgColor,
  setButtonColor,
  setTextColor,
  setButtonText,
  setSale,
  setCountdownHours,
  setCountdownMinutes,
  setCountdownSeconds,
} = sliceName.actions

export default sliceName.reducer
