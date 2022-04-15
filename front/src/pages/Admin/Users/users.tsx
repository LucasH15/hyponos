import { Button, Grid, IconButton, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Add, Delete, Edit, Info } from '@mui/icons-material'
import { Link } from 'react-router-dom'
import { useSnackbar } from 'notistack'

import { DEFAULT_ERROR_MESSAGE } from '@Constants/form'
import { TOKEN_KEY } from '@Constants/request'
import { ADMIN_USER, ADMIN_USERS_ADD, ADMIN_USERS_EDIT } from '@Constants/routes'
import BasicDialog from '@Components/BasicDialog'
import UserService from '@Services/user'

interface IUser {
    id: string
    firstName?: string
    lastName?: string
    email: string
    role: string
}

const AdminUsers = () => {
    const token = localStorage.getItem(TOKEN_KEY)
    const [openDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false)
    const [currentUserId, setCurrentUserId] = useState<string | null>(null)
    const [users, setUsers] = useState<null | IUser[]>(null)
    const { enqueueSnackbar } = useSnackbar()

    const deleteUser = () => {
        if (token && currentUserId) {
            UserService.del(token, currentUserId)
                .then(() => {
                    enqueueSnackbar("L'utilisateur a bien été supprimé", { variant: 'success' })
                    fetchUsers()
                })
                .catch(error => {
                    let errorMessage = DEFAULT_ERROR_MESSAGE
                    if (error.response) {
                        errorMessage = error.response.data.error.message
                    }
                    enqueueSnackbar(errorMessage, { variant: 'error' })
                })
        }
    }

    const fetchUsers = () => {
        if (token) {
            UserService.getAll(token)
                .then(response => setUsers(response.data))
                .catch(() => {
                    enqueueSnackbar(DEFAULT_ERROR_MESSAGE, { variant: 'error' })
                })
        }
    }

    useEffect(() => {
        fetchUsers()
    }, [])

    return (
        <>
            <Helmet>
                <title>Utilisateurs</title>
                <meta name="robots" content="none" />
            </Helmet>

            <Typography variant="h1" align="center" sx={{ mb: 2 }}>
                Utilisateurs
            </Typography>

            <Grid container justifyContent="end">
                <Grid item>
                    <Button variant="contained" component={Link} to={ADMIN_USERS_ADD} startIcon={<Add />}>
                        Ajouter un utilisateur
                    </Button>
                </Grid>
            </Grid>

            {users && (
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Prénom</TableCell>
                            <TableCell>Nom</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Rôle</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {Object.values(users).map(user => (
                            <TableRow key={user.id}>
                                <TableCell>
                                    <Button component={Link} to={ADMIN_USER.replace(':userId', user.id)}>
                                        {user.id}
                                    </Button>
                                </TableCell>
                                <TableCell>{user?.firstName}</TableCell>
                                <TableCell>{user?.lastName}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>{user.role}</TableCell>
                                <TableCell>
                                    <IconButton component={Link} to={ADMIN_USER.replace(':userId', user.id)}>
                                        <Info />
                                    </IconButton>

                                    <IconButton component={Link} to={ADMIN_USERS_EDIT.replace(':userId', user.id)}>
                                        <Edit />
                                    </IconButton>

                                    <IconButton
                                        onClick={() => {
                                            setOpenDeleteDialog(true)
                                            setCurrentUserId(user.id)
                                        }}
                                    >
                                        <Delete />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            )}

            <BasicDialog
                title="Voulez-vous vraiment supprimer cet utiliseur ?"
                handleOk={deleteUser}
                open={openDeleteDialog}
                handleClose={() => {
                    setOpenDeleteDialog(false)
                    setCurrentUserId(null)
                }}
            />
        </>
    )
}

export default AdminUsers
