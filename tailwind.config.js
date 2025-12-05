/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                'bd-green': '#006A4E',
                'bd-red': '#F42A41',
                'dark-blue': {
                    50: '#e6f0ff',
                    100: '#b3d1ff',
                    200: '#80b3ff',
                    300: '#4d94ff',
                    400: '#1a75ff',
                    500: '#0052cc',
                    600: '#003d99',
                    700: '#002966',
                    800: '#001433',
                    900: '#000a1a',
                },
            },
            animation: {
                'float': 'float 3s ease-in-out infinite',
                'slide-in': 'slideIn 0.5s ease-out',
                'fade-in': 'fadeIn 0.6s ease-out',
                'scale-in': 'scaleIn 0.4s ease-out',
                'bounce-slow': 'bounce 3s infinite',
            },
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translateY(0px)' },
                    '50%': { transform: 'translateY(-20px)' },
                },
                slideIn: {
                    '0%': { transform: 'translateX(-100%)', opacity: '0' },
                    '100%': { transform: 'translateX(0)', opacity: '1' },
                },
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                scaleIn: {
                    '0%': { transform: 'scale(0.8)', opacity: '0' },
                    '100%': { transform: 'scale(1)', opacity: '1' },
                },
            },
        },
    },
    plugins: [require('daisyui')],
    daisyui: {
        themes: [
            {
                light: {
                    "primary": "#0052cc",
                    "secondary": "#006A4E",
                    "accent": "#F42A41",
                    "neutral": "#2a323c",
                    "base-100": "#ffffff",
                    "info": "#3abff8",
                    "success": "#36d399",
                    "warning": "#fbbd23",
                    "error": "#f87272",
                },
                dark: {
                    "primary": "#4d94ff",
                    "secondary": "#00a86b",
                    "accent": "#ff6b8a",
                    "neutral": "#1f2937",
                    "base-100": "#0a0e1a",
                    "base-200": "#141824",
                    "base-300": "#1e2433",
                    "info": "#3abff8",
                    "success": "#36d399",
                    "warning": "#fbbd23",
                    "error": "#f87272",
                },
            },
        ],
    },
}
