import { palette } from './palette'

export const darkColors = {
  background00: palette.gray10,
  background25: palette.gray25,
  background50: palette.gray50,
  background75: palette.gray75,
  background99: palette.gray95,
  text00: palette.gray10,
  primary25: palette.mint25,
  secondary25: palette.orange25,
}

export type Color = `$${keyof typeof darkColors}`
