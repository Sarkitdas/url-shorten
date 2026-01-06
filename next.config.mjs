/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  // Allow requests from local network origin(s) during development
  allowedDevOrigins: [
    // Local machine & common dev ports
    'http://localhost',
    'http://localhost:3000',
    'http://localhost:5173',
    'http://127.0.0.1:3000',
    'http://0.0.0.0:3000',

    // LAN IP variants (add protocol + common ports)
    'http://192.168.0.102',
    'http://192.168.0.102:80',
    'http://192.168.0.102:3000',
    'http://192.168.0.102:5173',
    'http://192.168.0.102:8080',
    'http://192.168.0.102:5500',
    'https://192.168.0.102',
    'https://192.168.0.102:3000',
  ],
};

export default nextConfig;
