import localFont from 'next/font/local';
import { Lato } from 'next/font/google';

export const mollieGlaston = localFont({
  src: '../fonts/mollie-glaston.woff2',
  variable: '--font-mollie-glaston',
  display: 'swap',
});

export const lato = Lato({
  subsets: ['latin'],
  weight: ['300', '400', '700'],
  variable: '--font-lato',
  display: 'swap',
  fallback: ['Helvetica', 'Arial', 'sans-serif'],
});