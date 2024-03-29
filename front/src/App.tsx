import { ThemeProvider } from '@mui/material/styles'
import { Container, CssBaseline, GlobalStyles } from '@mui/material'
import { Route, Routes } from 'react-router-dom'
import { SnackbarProvider } from 'notistack'

import AppBar from '@Components/AppBar'
import Footer from '@Components/Footer'
import ScrollToTop from '@Components/ScrollToTop'
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
                        },
                        a: {
                            textDecoration: 'none'
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
                        <ScrollToTop>
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
                        </ScrollToTop>
                    </Container>
                    <Footer title="test" />
                </SnackbarProvider>
            </ThemeProvider>
        </AuthProvider>
    )
}

export default App
