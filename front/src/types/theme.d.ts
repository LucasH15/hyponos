/* eslint-disable @typescript-eslint/no-empty-interface */
import React from 'react'
import { Theme } from '@mui/material/styles'

declare module '@mui/material/styles' {
    interface TypographyVariants {
        title: React.CSSProperties
    }

    // allow configuration using `createTheme`
    interface TypographyVariantsOptions {
        title?: React.CSSProperties
    }
}

// Update the Typography's variant prop options
declare module '@mui/material/Typography' {
    interface TypographyPropsVariantOverrides {
        title: true
    }
}

declare module '@mui/material' {
    interface DefaultTheme extends Theme {}
    interface TypographyPropsVariantOverrides {
        title: true
    }
}
