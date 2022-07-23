import { ReactNode } from 'react'
import { CssBaseline } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles'
import { BrowserRouter } from 'react-router-dom'

import theme from '../Theme'

const MuiThemeWrapper = ({ children }: { children?: ReactNode }) => (
    <BrowserRouter>
        <ThemeProvider theme={theme}>
            <CssBaseline />
            {children}
        </ThemeProvider>
    </BrowserRouter>
)

export default MuiThemeWrapper
