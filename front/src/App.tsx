import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { Navigate, Route, Routes } from 'react-router-dom'

import Home from '@Pages/Home'
import Register from '@Pages/Register'
import Login from '@Pages/Login'
import theme from './Theme'

function App() {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/inscription" element={<Register />} />
                <Route path="/connexion" element={<Login />} />
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </ThemeProvider>
    )
}

export default App
