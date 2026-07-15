/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}", 
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      boxShadow: {
        // Registrando sua sombra com o Hex exato
        'emerald': '0px 10px 20px #10b981',
        
        // Dica: Se quiser ela um pouco mais suave com transparência (40% de opacidade):
        'emerald-soft': '0px 10px 20px rgba(16, 185, 129, 0.4)',
      }
    },
  },
  plugins: [],
}