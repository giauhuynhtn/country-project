import { pink, teal, blue, orange } from '@mui/material/colors'
import { createTheme } from '@mui/material/styles'

export const themePalette = createTheme({
  palette: {
    primary: {
      main: blue[500],
      light: blue[100],
      dark: blue[600],
    },
    pinkTheme: {
      main: pink[300],
      light: pink[50],
      dark: pink[400],
    },
    greenTheme: {
      main: teal[500],
      light: teal[50],
      dark: teal[600],
    },
    orangeTheme: {
      main: orange[700],
      light: orange[50],
      dark: orange[800],
    },
  },
})
