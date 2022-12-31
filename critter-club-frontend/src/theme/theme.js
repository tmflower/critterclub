import { createTheme } from "@mui/material";

export const theme = createTheme({
    
        palette: {
          primary: {
            main: '#1d71a5',
          },
          secondary: {
            main: '#457604',
          },
        },

        typography: {
            primary: {
                fontFamily: 'Lexend Deca, Arial',
                color: 'black'
            },
            secondary: {
                fontFamily: 'Lexend Deca, Arial',
                color: '#e8f7eeff;'
            }
        },

        components: {
            MuiButton: {
                styleOverrides: {
                    root: {
                        margin: '1rem',
                        color: '#e8f7eeff;',
                        backgroundColor: '#457604',
                        
                    }                    
                }
            },

        }
})