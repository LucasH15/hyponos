import { createTheme, responsiveFontSizes } from '@mui/material/styles'

const SPACING = 4
const TITLE_FONT = ['PT Serif', 'serif'].join(',')

let theme = createTheme({
    spacing: SPACING,
    typography: {
        fontFamily: ['Roboto', 'sans-serif'].join(','),
        title: {
            fontFamily: ['Cinzel Decorative', 'serif'].join(','),
            fontSize: '2.5rem'
        },
        h1: {
            fontFamily: TITLE_FONT
        },
        h2: {
            fontFamily: TITLE_FONT
        },
        h3: {
            fontFamily: TITLE_FONT
        },
        h4: {
            fontFamily: TITLE_FONT
        },
        h5: {
            fontFamily: TITLE_FONT
        },
        h6: {
            fontFamily: TITLE_FONT
        },
        subtitle1: {
            fontFamily: TITLE_FONT
        },
        subtitle2: {
            fontFamily: TITLE_FONT
        }
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: 'none',
                    minWidth: 0
                },
                text: {
                    padding: 0,
                    '&:hover': {
                        backgroundColor: 'transparent'
                    }
                }
            }
        },
        MuiTypography: {
            styleOverrides: {
                h1: {
                    marginBottom: SPACING * 4
                }
            }
        },
        MuiTab: {
            styleOverrides: {
                root: {
                    textTransform: 'none'
                }
            }
        }
    }
})

theme.typography.title = {
    ...theme.typography.title,
    [theme.breakpoints.up('sm')]: {
        fontSize: '3.5rem'
    },
    [theme.breakpoints.up('md')]: {
        fontSize: '4.5rem'
    },
    [theme.breakpoints.up('lg')]: {
        fontSize: '5rem'
    }
}

theme = responsiveFontSizes(theme)

export default theme
