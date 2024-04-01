import { configureStore } from '@reduxjs/toolkit'
import storeTodosReducer from './storeTodos/storeTodosSlice'
import userReducer from './user/userSlice'

export const store = configureStore({
  reducer: {
    storeTodos: storeTodosReducer,
    user: userReducer
  },
})
