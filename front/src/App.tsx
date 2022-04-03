import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { Navigate, Route, Routes } from 'react-router-dom'

import { ROLE_ADMIN } from '@Constants/roles'
import Home from '@Pages/Home'
import Register from '@Pages/Register'
import Login from '@Pages/Login'
import Dashboard from '@Pages/Dashboard'
import Roles from '@Pages/Dashboard/Roles'
import AuthProvider from './AuthProvider'
import RequireAuth from './RequireAuth'
import theme from './Theme'

function App() {
    return (
        <AuthProvider>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/inscription" element={<Register />} />
                    <Route path="/connexion" element={<Login />} />
                    <Route
                        path="/dashboard"
                        element={
                            <RequireAuth>
                                <Dashboard />
                            </RequireAuth>
                        }
                    />
                    <Route
                        path="/dashboard/roles"
                        element={
                            <RequireAuth roles={[ROLE_ADMIN]}>
                                <Roles />
                            </RequireAuth>
                        }
                    />
                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
            </ThemeProvider>
        </AuthProvider>
    )
}

export default App
