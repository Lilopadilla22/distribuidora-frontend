
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'tomato': '#FF6F61',
        'orange': {
          400: '#FFA726',
          500: '#FFA726',
        },
        'yellow': {
          300: '#FFD54F',
          400: '#FFD54F',
        },
        'brown': {
          600: '#A1887F',
        },
        'leaf': '#388E3C',
        'bg-custom': '#FFF8F3',
      },
      fontFamily: {
        'sans': ['Poppins', 'Montserrat', 'Roboto', 'sans-serif'],
      },
    },
  },
  plugins: [],
};