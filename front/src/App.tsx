import { ThemeProvider } from '@mui/material/styles'
import { CssBaseline, GlobalStyles } from '@mui/material'
import { Navigate, Route, Routes } from 'react-router-dom'
import { SnackbarProvider } from 'notistack'

import { ROLE_ADMIN, ROLE_MANAGER } from '@Constants/roles'
import Home from '@Pages/Home'
import Register from '@Pages/Register'
import Login from '@Pages/Login'
import MonEspace from '@Pages/MonEspace'
import Admin from '@Pages/Admin'
import AdminRoles from '@Pages/Admin/Roles'
import AuthProvider from './AuthProvider'
import RequireAuth from './RequireAuth'
import theme from './Theme'

function App() {
    return (
        <AuthProvider>
            <ThemeProvider theme={theme}>
                <GlobalStyles
                    styles={{
                        '#root': {
                            minHeight: '100vh',
                            display: 'flex',
                            flexDirection: 'column',
                            paddingLeft: 16,
                            paddingRight: 16
                        }
                    }}
                />
                <CssBaseline />
                <SnackbarProvider
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right'
                    }}
                    maxSnack={3}
                >
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/inscription" element={<Register />} />
                        <Route path="/connexion" element={<Login />} />
                        <Route
                            path="/mon-espace"
                            element={
                                <RequireAuth>
                                    <MonEspace />
                                </RequireAuth>
                            }
                        />
                        <Route
                            path="/admin"
                            element={
                                <RequireAuth roles={[ROLE_ADMIN, ROLE_MANAGER]}>
                                    <Admin />
                                </RequireAuth>
                            }
                        >
                            <Route
                                path="/admin/roles"
                                element={
                                    <RequireAuth roles={[ROLE_ADMIN]}>
                                        <AdminRoles />
                                    </RequireAuth>
                                }
                            />
                        </Route>
                        <Route path="*" element={<Navigate to="/" />} />
                    </Routes>
                </SnackbarProvider>
            </ThemeProvider>
        </AuthProvider>
    )
}

export default App
