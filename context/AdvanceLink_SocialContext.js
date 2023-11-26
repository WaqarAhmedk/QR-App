import { createContext, useReducer } from 'react'

export const AdvanceLinksContext = createContext()

const initialState = {
  coverImage: {
    file: '',
    preview: ''
  },
  profileImage: {
    file: '',
    preview: ''
  },
  profileName: ''
}
const SET_COVER_IMAGE = 'SET_COVER_IMAGE'
const SET_PROFILE_IMAGE = 'SET_PROFILE_IMAGE'

const reducer = (state, action) => {
  switch (action.type) {
    case SET_COVER_IMAGE:
      return {
        ...state,
        coverImage: {
          file: action.payload.file,
          preview: action.payload.preview
        }
      }
    case SET_PROFILE_IMAGE:
      return {
        ...state,
        profileImage: {
          file: action.payload.file,
          preview: action.payload.preview
        }
      }
    default:
      return state
  }
}

export const AdvanceLinksProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const setCoverImage = (image, preview) => {
    dispatch({
      type: SET_COVER_IMAGE,
      payload: {
        file: image,
        preview: preview
      }
    })
  }

  const setProfileImage = (image, preview) => {
    dispatch({
      type: SET_PROFILE_IMAGE,
      payload: {
        file: image,
        preview: preview
      }
    })
  }

  const value = {
    state,
    setCoverImage,
    setProfileImage
  }

  return (
    <AdvanceLinksContext.Provider value={value}>
      {children}
    </AdvanceLinksContext.Provider>
  )
}
