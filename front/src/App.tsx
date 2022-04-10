import { ThemeProvider } from '@mui/material/styles'
import { CssBaseline, GlobalStyles } from '@mui/material'
import { Navigate, Route, Routes } from 'react-router-dom'
import { SnackbarProvider } from 'notistack'

import {
    ADMIN,
    ADMIN_HOTEL,
    ADMIN_HOTELS,
    ADMIN_HOTELS_ADD,
    ADMIN_HOTELS_EDIT,
    ADMIN_ROOMS,
    ADMIN_USERS,
    ADMIN_USERS_ADD,
    ADMIN_USERS_EDIT,
    HOME,
    HOTEL,
    HOTELS,
    LOGIN,
    MY_SPACE,
    REGISTER
} from '@Constants/routes'
import { ROLE_ADMIN, ROLE_MANAGER } from '@Constants/roles'
import Home from '@Pages/Home'
import Register from '@Pages/Register'
import Login from '@Pages/Login'
import MySpace from '@Pages/MySpace'
import Hotel from '@Pages/Hotels/Hotel'
import Hotels from '@Pages/Hotels'
import Admin from '@Pages/Admin'
import AdminUsers from '@Pages/Admin/Users'
import AdminUsersAdd from '@Pages/Admin/Users/Add'
import AdminUsersEdit from '@Pages/Admin/Users/Edit'
import AdminHotel from '@Pages/Admin/Hotels/Hotel'
import AdminHotels from '@Pages/Admin/Hotels'
import AdminHotelsAdd from '@Pages/Admin/Hotels/Add'
import AdminHotelsEdit from '@Pages/Admin/Hotels/Edit'
import AdminRooms from '@Pages/Admin/Rooms'
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
                        <Route path={HOTELS} element={<Hotels />} />
                        <Route path={HOTEL} element={<Hotel />} />
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
                        <Route
                            path={ADMIN_HOTELS}
                            element={
                                <RequireAuth roles={[ROLE_ADMIN]}>
                                    <AdminHotels />
                                </RequireAuth>
                            }
                        />
                        <Route
                            path={ADMIN_HOTEL}
                            element={
                                <RequireAuth roles={[ROLE_ADMIN]}>
                                    <AdminHotel />
                                </RequireAuth>
                            }
                        />
                        <Route
                            path={ADMIN_HOTELS_ADD}
                            element={
                                <RequireAuth roles={[ROLE_ADMIN]}>
                                    <AdminHotelsAdd />
                                </RequireAuth>
                            }
                        />
                        <Route
                            path={ADMIN_HOTELS_EDIT}
                            element={
                                <RequireAuth roles={[ROLE_ADMIN]}>
                                    <AdminHotelsEdit />
                                </RequireAuth>
                            }
                        />
                        <Route
                            path={ADMIN_ROOMS}
                            element={
                                <RequireAuth roles={[ROLE_ADMIN, ROLE_MANAGER]}>
                                    <AdminRooms />
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
