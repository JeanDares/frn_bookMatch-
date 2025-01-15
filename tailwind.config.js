/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
    theme: {
      extend: {
        colors: {
          'black-deep': '#000000',
          'gray-dark': '#333333',
          'gray-medium': '#666666',
          'gray-light': '#CCCCCC',
          'white-pure': '#FFFFFF',
        },
        fontFamily: {
          serif: ['Playfair Display', 'serif'],
          sans: ['Montserrat', 'sans-serif'],
        },
      },
    },
    plugins: [],

  
}

