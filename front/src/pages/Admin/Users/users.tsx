import { Button, Grid, IconButton, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material'
import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Add, Delete, Edit } from '@mui/icons-material'
import { Link } from 'react-router-dom'
import { useSnackbar } from 'notistack'

import { TOKEN_KEY } from '@Constants/request'
import { ADMIN_USERS_ADD } from '@Constants/routes'
import BasicDialog from '@Components/BasicDialog'
import UserService from '@Services/user'

interface IUser {
    id: string
    firstname?: string
    lastname?: string
    email: string
    role: string
}

const AdminUsers = () => {
    const [openDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false)
    const [users, setUsers] = useState<null | IUser[]>(null)
    const { enqueueSnackbar } = useSnackbar()

    const deleteUser = () => {
        console.log('user deleted')
        enqueueSnackbar("L'utilisateur a bien été supprimé", { variant: 'success' })
    }

    useEffect(() => {
        const token = localStorage.getItem(TOKEN_KEY)

        if (token) {
            UserService.getAll(token)
                .then(response => setUsers(response.data))
                .catch(error => console.log(error))
        }
    }, [])

    return (
        <>
            <Helmet>
                <title>Utilisateurs</title>
                <meta name="robots" content="none" />
            </Helmet>

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
                                <TableCell>{user.id}</TableCell>
                                <TableCell>{user?.firstname}</TableCell>
                                <TableCell>{user?.lastname}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>{user.role}</TableCell>
                                <TableCell>
                                    <IconButton onClick={() => console.log('edit')}>
                                        <Edit />
                                    </IconButton>

                                    <IconButton onClick={() => setOpenDeleteDialog(true)}>
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
                handleClose={() => setOpenDeleteDialog(false)}
            />
        </>
    )
}

export default AdminUsers
