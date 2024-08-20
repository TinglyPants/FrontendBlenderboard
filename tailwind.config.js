/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{html,js}"],
    theme: {
        extend: {
            fontFamily: {
                poppins: ["Poppins", "sans-serif"],
            },

            colors: {
                black: "#000000",
                dark: "#111214",
                mid: "#17181A",
                light: "#232426",
                lightest: "#555555",
                highlight: "#ff7518",
                white: "#ffffff",
            },
        },
    },
    plugins: [],
};
