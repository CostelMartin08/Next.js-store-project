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
        custom: ["Lato", 'sans-serif'],
      },
      colors: {
        textColor: 'white',
        orange: 'hsl(26, 100%, 55%)',
        grayishBlue: '#607274',
        orangeBg: 'hsl(26, 70%, 85%)',
      },
      variants: {
        animation: ['responsive', 'animate-pulse', 'motion-safe', 'motion-reduce', 'hover']
      },
    },
  },
  plugins: [],
};
export default config;
