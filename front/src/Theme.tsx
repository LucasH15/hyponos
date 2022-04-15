import { createTheme } from '@mui/material/styles'

export default createTheme({
    spacing: 4,
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
        }
    }
})
