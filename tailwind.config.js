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
      },
      fontFamily: {
        poppinsBlack: ['PoppinsBlack'],
        poppinsBold: ['PoppinsBold'],
        bebas: ['BebasNeue'],
        jaro: ['Jaro'], // O nome aqui dentro deve ser idêntico ao do useFonts
      },
      colors: {
        primary: {
          50: '#eef2ff',  // Fundo super claro (para substituir o emerald-50)
          100: '#e0e7ff', // Fundo de Badges/Tags (para substituir o emerald-100)
          200: '#c7d2fe', // Bordas e divisórias claras
          300: '#a5b4fc', // Ícones mais suaves
          400: '#818cf8', // Destaques intermediários
          500: '#6366f1', // A COR PRINCIPAL (Botão central, Avatar, Ícones em destaque)
          600: '#4f46e5', // Efeito "active" ao clicar nos botões
          700: '#4338ca', // Textos fortes e ícones pequenos em fundos claros
          800: '#3730a3', // Sombras ou textos muito escuros
          900: '#312e81', // Pode ser usado no fundo do seu Card de Lig
          950: "#1e1b4b"
        }
      }
    },
  },
  plugins: [],
}