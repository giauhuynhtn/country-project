import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Country } from './countriesSlice'

export interface CartState {
  items: Country[]
  isOpening: boolean
}

const initialState: CartState = {
  items: [],
  isOpening: false,
}

export const cartSlice = createSlice({
  name: 'cartList',
  initialState,
  reducers: {
    addCart: (state, action: PayloadAction<Country>) => {
      state.items = [...state.items, action.payload]
    },
    removeCart: (state, action: PayloadAction<Country>) => {
      const newCartList = state.items.filter(
        (item) =>
          item.name &&
          action.payload.name &&
          item.name.common !== action.payload.name.common
      )
      state.items = newCartList
    },
    openCart: (state) => {
      state.isOpening = true
    },
    closeCart: (state) => {
      state.isOpening = false
    },
  },
})

export const { addCart, removeCart, openCart, closeCart } = cartSlice.actions

export default cartSlice.reducer
