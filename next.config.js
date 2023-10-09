/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains:[
      "indipik-bucket-stage.s3.ap-south-1.amazonaws.com",
      "indipik-bucket-stage.s3.amazonaws.com",
      "image.shutterstock.com"
    ]
   },

}
module.exports = nextConfig
