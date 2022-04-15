import { ROLE_ADMIN, ROLE_MANAGER } from '@Constants/roles'
import {
    ADMIN,
    ADMIN_HOTEL,
    ADMIN_HOTELS,
    ADMIN_HOTELS_ADD,
    ADMIN_HOTELS_EDIT,
    ADMIN_ROOMS,
    ADMIN_ROOMS_ADD,
    ADMIN_ROOMS_EDIT,
    ADMIN_USER,
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
import Home from '@Pages/Home'
import Hotels from '@Pages/Hotels'
import Login from '@Pages/Login'
import MySpace from '@Pages/MySpace'
import Register from '@Pages/Register'
import Hotel from '@Pages/Hotels/Hotel'
import Admin from '@Pages/Admin'
import AdminHotels from '@Pages/Admin/Hotels'
import AdminHotelsAdd from '@Pages/Admin/Hotels/Add'
import AdminHotelsEdit from '@Pages/Admin/Hotels/Edit'
import AdminHotel from '@Pages/Admin/Hotels/Hotel'
import AdminUsers from '@Pages/Admin/Users'
import AdminUsersAdd from '@Pages/Admin/Users/Add'
import AdminUsersEdit from '@Pages/Admin/Users/Edit'
import AdminUser from '@Pages/Admin/Users/User'
import AdminRooms from '@Pages/Admin/Rooms'
import AdminRoomsAdd from '@Pages/Admin/Rooms/Add'
import AdminRoomsEdit from '@Pages/Admin/Rooms/Edit'
import { Navigate } from 'react-router-dom'

const routes = [
    {
        path: HOME,
        element: <Home />,
        requireAuth: false
    },
    {
        path: REGISTER,
        element: <Register />,
        requireAuth: false
    },
    {
        path: LOGIN,
        element: <Login />,
        requireAuth: false
    },
    {
        path: HOTELS,
        element: <Hotels />,
        requireAuth: false
    },
    {
        path: HOTEL,
        element: <Hotel />,
        requireAuth: false
    },
    {
        path: MY_SPACE,
        element: <MySpace />,
        requireAuth: true
    },
    {
        path: ADMIN,
        element: <Admin />,
        requireAuth: true,
        roles: [ROLE_ADMIN, ROLE_MANAGER]
    },
    {
        path: ADMIN_USERS,
        element: <AdminUsers />,
        requireAuth: true,
        roles: [ROLE_ADMIN]
    },
    {
        path: ADMIN_USERS_ADD,
        element: <AdminUsersAdd />,
        requireAuth: true,
        roles: [ROLE_ADMIN]
    },
    {
        path: ADMIN_USERS_EDIT,
        element: <AdminUsersEdit />,
        requireAuth: true,
        roles: [ROLE_ADMIN]
    },
    {
        path: ADMIN_USER,
        element: <AdminUser />,
        requireAuth: true,
        roles: [ROLE_ADMIN]
    },
    {
        path: ADMIN_HOTELS,
        element: <AdminHotels />,
        requireAuth: true,
        roles: [ROLE_ADMIN]
    },
    {
        path: ADMIN_HOTEL,
        element: <AdminHotel />,
        requireAuth: true,
        roles: [ROLE_ADMIN]
    },
    {
        path: ADMIN_HOTELS_ADD,
        element: <AdminHotelsAdd />,
        requireAuth: true,
        roles: [ROLE_ADMIN]
    },
    {
        path: ADMIN_HOTELS_EDIT,
        element: <AdminHotelsEdit />,
        requireAuth: true,
        roles: [ROLE_ADMIN]
    },
    {
        path: ADMIN_ROOMS,
        element: <AdminRooms />,
        requireAuth: true,
        roles: [ROLE_ADMIN, ROLE_MANAGER]
    },
    {
        path: ADMIN_ROOMS_ADD,
        element: <AdminRoomsAdd />,
        requireAuth: true,
        roles: [ROLE_ADMIN, ROLE_MANAGER]
    },
    {
        path: ADMIN_ROOMS_EDIT,
        element: <AdminRoomsEdit />,
        requireAuth: true,
        roles: [ROLE_ADMIN, ROLE_MANAGER]
    },
    {
        path: '*',
        element: <Navigate to={HOME} />,
        requireAuth: false
    }
]

export default routes
