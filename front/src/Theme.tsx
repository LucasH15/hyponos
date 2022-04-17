import { createTheme } from '@mui/material/styles'

const SPACING = 4
const TITLE_FONT = ['Roboto Slab', 'serif'].join(',')

export default createTheme({
    spacing: SPACING,
    typography: {
        fontFamily: ['Roboto', 'sans-serif'].join(','),
        title: {
            fontFamily: ['Cinzel Decorative', 'serif'].join(','),
            fontSize: '5rem'
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
        }
    }
})
