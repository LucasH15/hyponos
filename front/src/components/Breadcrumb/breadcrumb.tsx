import NavigateNextIcon from '@mui/icons-material/NavigateNext'
import { Breadcrumbs, Link as MuiLink, Stack, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import _ from 'lodash'

interface IBreadcrumb {
    routes: { label: string; path: string }[]
}

const Breadcrumb = ({ routes }: IBreadcrumb) => {
    return (
        <Stack spacing={2} sx={{ mb: 2 }}>
            <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
                {_.slice(routes, 0, routes.length - 1).map((route, index) => (
                    <MuiLink
                        underline="hover"
                        key={`breadcrumb-${index}`}
                        color="inherit"
                        component={Link}
                        to={route.path}
                    >
                        {route.label}
                    </MuiLink>
                ))}

                <Typography key="breadcrumb-last" color="text.primary">
                    {_.last(routes)?.label}
                </Typography>
            </Breadcrumbs>
        </Stack>
    )
}

export default Breadcrumb
