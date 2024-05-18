const flowbite = require("flowbite-react/tailwind");
import animations from '@midudev/tailwind-animations'

module.exports = {
    darkMode: 'class',
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
        flowbite.content(),
    ],
    theme: {
        patterns: {
            opacities: {
                100: "1",
                80: ".80",
                60: ".60",
                40: ".40",
                20: ".20",
                10: ".10",
                5: ".05",
            },
            sizes: {
                1: "0.25rem",
                2: "0.5rem",
                4: "1rem",
                6: "1.5rem",
                8: "2rem",
                16: "4rem",
                20: "5rem",
                24: "6rem",
                32: "8rem",
            }
        },
        extend: {
            colors: {
                primary: {"50":"#eff6ff","100":"#dbeafe","200":"#bfdbfe","300":"#93c5fd","400":"#60a5fa","500":"#3b82f6","600":"#2563eb","700":"#1d4ed8","800":"#1e40af","900":"#1e3a8a","950":"#172554"}
            },
            keyframes: {
                ping: {
                    '75%, 100%': {
                        transform: 'scale(4)',
                        opacity: '0',
                    },
                },
            },
        },
    },
    plugins: [
        flowbite.plugin(),
        require('tailwindcss-bg-patterns'),
        animations,
    ],
}