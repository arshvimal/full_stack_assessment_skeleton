/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        primary: '#BA4F7D',
        primaryMuted: '#DAC8D0',
        secondary: '#55444B',
        secondaryMuted: '#E8E3E5',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
}

