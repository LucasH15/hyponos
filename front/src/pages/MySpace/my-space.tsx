import { Typography } from '@mui/material'
import { Helmet } from 'react-helmet-async'

const MySpace = () => {
    return (
        <>
            <Helmet>
                <title>Mon espace</title>
                <meta name="robots" content="none" />
            </Helmet>

            <Typography variant="h1" align="center">
                Mon espace
            </Typography>
        </>
    )
}

export default MySpace
