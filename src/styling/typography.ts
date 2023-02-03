import { Monoton, Roboto } from '@next/font/google'

const ROBOTO = Roboto({
  weight: ['400', '700'],
  subsets: ['latin'],
})

const MONOTON = Monoton({ weight: ['400'], subsets: ['latin'] })

export const FONTS = {
  default: ROBOTO,
  logo: MONOTON,
} as const
