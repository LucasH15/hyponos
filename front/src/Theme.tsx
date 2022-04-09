import { createTheme } from '@mui/material/styles'

export default createTheme({
    spacing: 4,
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: 'none'
                }
            }
        }
    }
})
