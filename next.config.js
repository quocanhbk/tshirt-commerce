/** @type {import('next').NextConfig} */
module.exports = {
    reactStrictMode: true,
    async redirects() {
        return [
            {
                source: "/me",
                destination: "/me/personal-information",
                permanent: true,
            },
        ]
    },
}
