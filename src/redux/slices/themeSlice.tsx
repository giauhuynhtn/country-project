import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface ThemeState {
  themeList: string[]
  currentTheme: string
}

const initialState: ThemeState = {
  themeList: ['primary', 'orangeTheme', 'pinkTheme', 'greenTheme'],
  currentTheme: 'primary',
}

export const themeSlice = createSlice({
  name: 'themeObj',
  initialState,
  reducers: {
    changeTheme: (state, action: PayloadAction<string>) => {
      state.currentTheme = action.payload
    },
  },
})

export const { changeTheme } = themeSlice.actions

export default themeSlice.reducer
