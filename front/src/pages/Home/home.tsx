import { Typography } from '@mui/material'
import { Helmet } from 'react-helmet-async'

const Home = () => {
    return (
        <div>
            <Helmet>
                <title>Accueil</title>
            </Helmet>
            <Typography variant="h1" component="h1">
                Hello
            </Typography>
        </div>
    )
}

export default Home
