import { configureStore } from '@reduxjs/toolkit'
 import userReducer from '../store/user/userSlice'
 import userTheme from '../store/theme/themeSlice/'
export const store = configureStore({
  reducer: { 
    user:userReducer,
    theme:userTheme
  },
})