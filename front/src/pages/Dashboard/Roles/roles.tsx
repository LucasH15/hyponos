import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material'
import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'

import UserService from '@Services/user'

interface IUser {
    id: string
    firstname?: string
    lastname?: string
    email: string
    role: string
}

const Roles = () => {
    const [users, setUsers] = useState<null | IUser[]>(null)

    useEffect(() => {
        const token = localStorage.getItem('hyponosToken')

        if (token) {
            UserService.getAll(token)
                .then(response => setUsers(response.data))
                .catch(error => console.log(error))
        }
    }, [])
    console.log(users)
    return (
        <>
            <Helmet>
                <title>Rôles</title>
                <meta name="robots" content="none" />
            </Helmet>

            {users && (
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Firstname</TableCell>
                            <TableCell>Lastname</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Role</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {Object.values(users).map(user => (
                            <TableRow key={user.id}>
                                <TableCell>{user.id}</TableCell>
                                <TableCell>{user?.firstname}</TableCell>
                                <TableCell>{user?.lastname}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>{user.role}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            )}
        </>
    )
}

export default Roles
