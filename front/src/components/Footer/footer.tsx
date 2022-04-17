import { Container, Grid, Link as MuiLink } from '@mui/material'
import { Link } from 'react-router-dom'

import { HOME } from '@Constants/routes'

const Footer = () => {
    return (
        <Grid
            component="footer"
            sx={{ backgroundColor: 'primary.main', color: 'primary.contrastText', py: 4, mt: 'auto' }}
        >
            <Container maxWidth="xl">
                <MuiLink component={Link} to={HOME} underline="hover" color="inherit">
                    Accueil
                </MuiLink>
            </Container>
        </Grid>
    )
}

export default Footer
