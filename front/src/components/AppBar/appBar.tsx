import { ROLE_ADMIN, ROLE_MANAGER } from '@Constants/roles'
import { useContext } from 'react'
import * as React from 'react'
import {
    Button,
    Container,
    Grid,
    IconButton,
    Menu,
    MenuItem,
    AppBar as MuiAppBar,
    Toolbar,
    Typography
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import { Link } from 'react-router-dom'

import { ADMIN, HOME, HOTELS, LOGIN, MY_SPACE, REGISTER } from '@Constants/routes'
import { AuthContext } from '../../AuthProvider'

const AppBar = () => {
    const auth = useContext(AuthContext)
    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null)
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null)

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget)
    }
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget)
    }

    const handleCloseNavMenu = () => {
        setAnchorElNav(null)
    }

    const handleCloseUserMenu = () => {
        setAnchorElUser(null)
    }

    const logout = () => {
        auth.logout()
    }

    return (
        <MuiAppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    {/*For desktop*/}
                    <Typography
                        variant="h6"
                        noWrap
                        component={Link}
                        to={HOME}
                        sx={{ mr: 2, color: 'white', textDecoration: 'none', display: { xs: 'none', md: 'flex' } }}
                    >
                        LOGO
                    </Typography>

                    {/*For mobile*/}
                    <Grid sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left'
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left'
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' }
                            }}
                        >
                            <MenuItem component={Link} to={HOME}>
                                <Typography textAlign="center">Accueil</Typography>
                            </MenuItem>

                            <MenuItem component={Link} to={HOTELS}>
                                <Typography textAlign="center">Hôtels</Typography>
                            </MenuItem>
                        </Menu>
                    </Grid>

                    {/*For mobile*/}
                    <Typography
                        variant="h6"
                        noWrap
                        component={Link}
                        to={HOME}
                        sx={{
                            flexGrow: 1,
                            color: 'white',
                            textDecoration: 'none',
                            display: { xs: 'flex', md: 'none' }
                        }}
                    >
                        LOGO
                    </Typography>

                    {/*For desktop*/}
                    <Grid sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        <Button component={Link} to={HOME} sx={{ my: 2, color: 'white', display: 'block' }}>
                            Accueil
                        </Button>

                        <Button component={Link} to={HOTELS} sx={{ my: 2, color: 'white', display: 'block' }}>
                            Hôtels
                        </Button>
                    </Grid>

                    <Grid sx={{ flexGrow: 0 }}>
                        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }} color="inherit">
                            <AccountCircleIcon />
                        </IconButton>
                        {auth?.user?.id ? (
                            <Menu
                                sx={{ mt: '45px' }}
                                id="menu-appbar"
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right'
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right'
                                }}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}
                            >
                                <MenuItem component={Link} to={MY_SPACE} onClick={handleCloseUserMenu}>
                                    <Typography textAlign="center">Mon espace</Typography>
                                </MenuItem>

                                {(auth.user.role === ROLE_ADMIN || auth.user.role === ROLE_MANAGER) && (
                                    <MenuItem component={Link} to={ADMIN} onClick={handleCloseUserMenu}>
                                        <Typography textAlign="center">Administration</Typography>
                                    </MenuItem>
                                )}

                                <MenuItem
                                    onClick={() => {
                                        handleCloseUserMenu()
                                        logout()
                                    }}
                                >
                                    <Typography textAlign="center">Déconnexion</Typography>
                                </MenuItem>
                            </Menu>
                        ) : (
                            <Menu
                                sx={{ mt: '45px' }}
                                id="menu-appbar"
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right'
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right'
                                }}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}
                            >
                                <MenuItem component={Link} to={LOGIN} onClick={handleCloseUserMenu}>
                                    <Typography textAlign="center">Connexion</Typography>
                                </MenuItem>

                                <MenuItem component={Link} to={REGISTER} onClick={handleCloseUserMenu}>
                                    <Typography textAlign="center">Inscription</Typography>
                                </MenuItem>
                            </Menu>
                        )}
                    </Grid>
                </Toolbar>
            </Container>
        </MuiAppBar>
    )
}

export default AppBar
