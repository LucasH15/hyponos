import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { Navigate, Route, Routes } from 'react-router-dom'

import Home from '@Pages/Home'
import theme from './Theme'

function App() {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Routes>
                <Route path="/" component={Home} />
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </ThemeProvider>
    )
}

export default App
