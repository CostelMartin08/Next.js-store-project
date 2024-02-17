import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        custom: ["Kumbh Sans", 'sans-serif'],
      },
      fontSize: {
        sm: '0.8rem',
        md: '1.1rem',
        lg: '1.8rem',
        xl: '2.8rem',
        '2xl': '1.563rem',
        '3xl': '1.953rem',
        '4xl': '2.441rem',
        '5xl': '3.052rem',
      },
      colors: {
        textColor: 'white',
        orange: 'hsl(26, 100%, 55%)',
        grayishBlue: '#607274',
        orangeBg: 'hsl(26, 70%, 85%)',
      }
    },
  },
  plugins: [],
};
export default config;
