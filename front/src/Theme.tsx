import { createTheme } from '@mui/material/styles'

const SPACING = 4

export default createTheme({
    spacing: SPACING,
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: 'none'
                },
                text: {
                    padding: 0,
                    '&:hover': {
                        backgroundColor: 'transparent'
                    }
                }
            }
        },
        MuiTypography: {
            styleOverrides: {
                h1: {
                    marginBottom: SPACING * 4
                }
            }
        }
    }
})
