import { ThemeProvider } from '@mui/material/styles'
import { CssBaseline, GlobalStyles } from '@mui/material'
import { Navigate, Route, Routes } from 'react-router-dom'
import { SnackbarProvider } from 'notistack'

import {
    ADMIN,
    ADMIN_USERS,
    ADMIN_USERS_ADD,
    ADMIN_USERS_EDIT,
    HOME,
    LOGIN,
    MY_SPACE,
    REGISTER
} from '@Constants/routes'
import { ROLE_ADMIN, ROLE_MANAGER } from '@Constants/roles'
import Home from '@Pages/Home'
import Register from '@Pages/Register'
import Login from '@Pages/Login'
import MySpace from '@Pages/MySpace'
import Admin from '@Pages/Admin'
import AdminUsers from '@Pages/Admin/Users'
import AdminUsersAdd from '@Pages/Admin/Users/Add'
import AdminUsersEdit from '@Pages/Admin/Users/Edit'
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
                        <Route path={HOME} element={<Home />} />
                        <Route path={REGISTER} element={<Register />} />
                        <Route path={LOGIN} element={<Login />} />
                        <Route
                            path={MY_SPACE}
                            element={
                                <RequireAuth>
                                    <MySpace />
                                </RequireAuth>
                            }
                        />
                        <Route
                            path={ADMIN}
                            element={
                                <RequireAuth roles={[ROLE_ADMIN, ROLE_MANAGER]}>
                                    <Admin />
                                </RequireAuth>
                            }
                        />
                        <Route
                            path={ADMIN_USERS}
                            element={
                                <RequireAuth roles={[ROLE_ADMIN]}>
                                    <AdminUsers />
                                </RequireAuth>
                            }
                        />
                        <Route
                            path={ADMIN_USERS_ADD}
                            element={
                                <RequireAuth roles={[ROLE_ADMIN]}>
                                    <AdminUsersAdd />
                                </RequireAuth>
                            }
                        />
                        <Route
                            path={ADMIN_USERS_EDIT}
                            element={
                                <RequireAuth roles={[ROLE_ADMIN]}>
                                    <AdminUsersEdit />
                                </RequireAuth>
                            }
                        />
                        <Route path="*" element={<Navigate to={HOME} />} />
                    </Routes>
                </SnackbarProvider>
            </ThemeProvider>
        </AuthProvider>
    )
}

export default App
