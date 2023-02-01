import { createStitches } from '@stitches/react'
import { darkColors } from './colors'
import { sizes } from './sizes'
import { utils } from './utils'

export const { css, styled, theme, globalCss, getCssText } = createStitches({
  theme: {
    colors: darkColors,
    sizes,
  },
  media: {},
  utils,
})

export type Theme = typeof theme
