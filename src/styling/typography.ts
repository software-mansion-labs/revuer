import { Roboto } from '@next/font/google'

const ROBOTO = Roboto({
  weight: ['400', '700'],
  subsets: ['latin'],
})

export const FONTS = {
  default: ROBOTO,
} as const
