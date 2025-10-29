import { Container, Grid, Link as MuiLink, Typography } from '@mui/material'
import { Link } from 'react-router-dom'

import { CONTACT, HOME, HOTELS } from '@Constants/routes'

/**
 * @visibleName Footer
 */
const Footer = () => {
    return (
        <Grid component="footer" sx={{ mt: 'auto' }}>
            <Grid sx={{ backgroundColor: 'secondary.main', color: 'secondary.contrastText', py: 4, mt: 15 }}>
                <Container maxWidth="xl">
                    <Grid sx={{ display: 'flex', justifyContent: 'center', columnGap: 5 }}>
                        <MuiLink component={Link} to={HOME} underline="hover" color="inherit">
                            Accueil
                        </MuiLink>

                        <MuiLink component={Link} to={HOTELS} underline="hover" color="inherit">
                            Nos hôtels
                        </MuiLink>

                        <MuiLink component={Link} to={CONTACT} underline="hover" color="inherit">
                            Contact
                        </MuiLink>
                    </Grid>
                </Container>

                <Container maxWidth="xl" sx={{ mt: 3 }}>
                    <Typography component="p" sx={{ textAlign: 'center' }}>
                        © Site développé par{' '}
                        <MuiLink href="https://lucas-hubert.me" underline="hover" color="inherit" target="_blank">
                            Lucas Hubert
                        </MuiLink>
                    </Typography>
                </Container>
            </Grid>
        </Grid>
    )
}

export default Footer
