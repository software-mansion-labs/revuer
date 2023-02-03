import { palette } from './palette'

export const darkColors = {
  background00: palette.gray95,
  background25: palette.gray75,
  background50: palette.gray50,
  background75: palette.gray25,
  background90: palette.gray10,
  background99: palette.gray05,
  text00: palette.gray95,
  primary50: palette.mint50,
  primary75: palette.mint25,
  primary90: palette.mint10,
  primary95: palette.mint05,
}

export type Color = `$${keyof typeof darkColors}`
