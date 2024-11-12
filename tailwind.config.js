/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode:  'selector',
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors:{
        'light-gray':  'hsl(0, 0%, 98%)',
        'light-gray-blue':  'hsl(233, 11%, 84%)',
        'lighter-gray-blue': 'hsl(236, 33%, 92%)',
        'dark-gray-blue': 'hsl(236, 9%, 61%)',
        'darker-gray-blue': 'hsl(233, 14%, 35%)',
        'darkest-gray-blue': 'hsl(235, 19%, 35%)',


        'dark-blue': 'hsl(235, 21%, 11%)',
        'dark-desaturated-blue':'hsl(235, 24%, 19%)',
        'light-gray-blue':'hsl(234, 39%, 85%)',

        
        'primary': 'hsl(220, 98%, 61%)',
        'from-gradient': 'hsl(192, 100%, 67%)',
        'to-gradient': 'hsl(280, 87%, 65%)'
      }
    },
  },
  plugins: [],
}

