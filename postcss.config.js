export default {
    plugins: {
        '@tailwindcss/postcss': {},
        autoprefixer: {}, // Autoprefixer is often included in tailwindcss/postcss but kept for safety or if v3 habits linger, though v4 handles prefixes. Let's keep it simple.
    },
}
