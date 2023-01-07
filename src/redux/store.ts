import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import countriesReducer from './slices/countriesSlice'
import cartListReducer from './slices/cartSlice'
import themeReducer from './slices/themeSlice'

export const store = configureStore({
  reducer: {
    countries: countriesReducer,
    cartList: cartListReducer,
    themeObj: themeReducer,
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
