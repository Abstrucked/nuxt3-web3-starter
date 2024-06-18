import type { Config } from 'tailwindcss'

export default <Partial<Config>>{

  theme: {
    extend: {
      colors: {
        primary: 'harlequin',
        gray: 'cool',
        background: 'dark',
        'harlequin': {
          '50': '#eeffe4',
          '100': '#d9ffc4',
          '200': '#b5ff90',
          '300': '#85ff50',
          '400': '#4bff0a',
          '500': '#37e600',
          '600': '#27b800',
          '700': '#1d8b00',
          '800': '#1c6d07',
          '900': '#1a5c0b',
          '950': '#073400',
        },
      }
    }
  }
}