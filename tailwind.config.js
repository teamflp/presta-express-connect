
/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: "#C63E46",
                "primary-hover": "#b73840",
                "primary-light": "#e57980",
                secondary: "#343a40",
                background: "#FDFAF7",
                light: "#f8f9fa",
                dark: "#212529",
                white: "#ffffff",
                black: "#000000",
            },
            boxShadow: {
                "card-hover": "0 10px 20px rgba(0, 0, 0, 0.1)",
                "form": "0 4px 6px rgba(0, 0, 0, 0.1)",
            },
            borderRadius: {
                special: '10px 0px 10px 10px',
            },
            backgroundImage: {
                'auth-pattern': "url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1IiBoZWlnaHQ9IjUiPgo8cmVjdCB3aWR0aD0iNSIgaGVpZ2h0PSI1IiBmaWxsPSIjZmZmIj48L3JlY3Q+CjxyZWN0IHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IiNmMGYwZjAiPjwvcmVjdD4KPC9zdmc+Cg==')",
            }
        },
    },
    safelist: [
        'text-white',
        'bg-white',
        'text-primary',
        'bg-primary',
    ],
    plugins: [],
}
