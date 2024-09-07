/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
   
    linearBorderGradients: {
      directions: { 
        't': 'to top',
        'tr': 'to top right',
        'r': 'to right',
        'br': 'to bottom right',
        'b': 'to bottom',
        'bl': 'to bottom left',
        'l': 'to left',
        'tl': 'to top left',
      },
      colors: { 
        'red': '#f00',
        'red-blue': ['#f00', '#00f'],
        'blue-green': ['#0000ff', '#00FF00'],
        'red-green-blue': ['#f00', '#0f0', '#00f'],
        'black-white-with-stops': ['#000', '#000 45%', '#fff 55%', '#fff'],
      },
      background: {
        'gray-50': '#F9FAFB',
        'gray-900':'#111827',
      },
      borders: { 
        '1': '1px',
        '2': '2px',
        '4': '4px',
        '6': '6px',
      },
    },

  },
  plugins: [
    require('tailwindcss-border-gradient-radius'),
  ],
}