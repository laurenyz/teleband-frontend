import { createMuiTheme } from '@material-ui/core/styles'

const theme = createMuiTheme({
    palette: {
        primary: {
          main: '#123c69',
        },
        secondary: {
          main: '#ac3b61',
        },
        background: {
          paper: '#fffafa',
          default: '#bab2b5'
        },
        text: {
          primary: "#333333",
          // secondary: "#eee2dc"
        }
      },
  });

export default theme