import { ThemeProvider } from '@mui/material/styles'
import { Container, CssBaseline, GlobalStyles } from '@mui/material'
import { Route, Routes } from 'react-router-dom'
import { SnackbarProvider } from 'notistack'

import AppBar from '@Components/AppBar'
import AuthProvider from './AuthProvider'
import RequireAuth from './RequireAuth'
import theme from './Theme'
import routes from './Routes'

function App() {
    return (
        <AuthProvider>
            <ThemeProvider theme={theme}>
                <GlobalStyles
                    styles={{
                        '#root': {
                            minHeight: '100vh',
                            display: 'flex',
                            flexDirection: 'column'
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
                    <AppBar />
                    <Container maxWidth="xl" component="main" sx={{ py: 4 }}>
                        <Routes>
                            {routes.map(route => (
                                <Route
                                    key={route.path}
                                    path={route.path}
                                    element={
                                        route.requireAuth ? (
                                            <RequireAuth roles={route?.roles}>{route.element}</RequireAuth>
                                        ) : (
                                            route.element
                                        )
                                    }
                                />
                            ))}
                        </Routes>
                    </Container>
                </SnackbarProvider>
            </ThemeProvider>
        </AuthProvider>
    )
}

export default App
