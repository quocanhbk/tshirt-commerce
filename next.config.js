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
    images: {
        domains: [
            "static.dosi-in.com",
            "bizweb.dktcdn.net",
            "product.hstatic.net",
            "hstatic.net",
            "storage.googleapis.com",
            "assets.adidas.com",
            "media.coolmate.me",
        ],
    },
}
