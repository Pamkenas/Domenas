/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Required for GitHub Pages
  images: {
    unoptimized: true, // Required for static exports
  },
  // ONLY add the line below if your repo is NOT named username.github.io
  // basepath: '/your-repo-name', 
};

export default nextConfig;