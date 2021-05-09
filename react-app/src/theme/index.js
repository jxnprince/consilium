import  React from 'react'
import { createMuiTheme } from '@material-ui/core'
import { blueGrey, amber } from '@material-ui/core/colors'


export const theme = createMuiTheme({
  palette:{
    primary: { 
      main: amber['A700'],
      default: amber['A700'],
      contrastText: blueGrey[900]
    },
    secondary: { 
      main: blueGrey[900],
      default: blueGrey[900],
      contrastText: '#e6e9f0'
    }
  },
})