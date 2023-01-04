import { createTheme } from "@mui/material";

export const theme = createTheme({
    
        palette: {
          primary: {
            main: '#1e91d6ff',
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
                        fontFamily: 'Lexend Deca, Arial',
                        '&:hover': {
                            backgroundColor: '#e8f7eeff;',
                            color: '#457604',
                            border: '1px solid #447604ff'
                        }
                    }                
                }
            },

        }
})