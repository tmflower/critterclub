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
            },
            list: {
                fontFamily: 'Lexend Deca, Arial',
                color: '#1e91d6ff',
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
            AltButton: {
                margin: '1rem',
                color: '#e8f7eeff;',
                backgroundColor: '#1e91d6ff',
                fontFamily: 'Lexend Deca, Arial',
                '&:hover': {
                    backgroundColor: '#e8f7eeff;',
                    color: '#1e91d6ff',
                    border: '1px solid #1e91d6ff'
                
                }               
            },
        }
})