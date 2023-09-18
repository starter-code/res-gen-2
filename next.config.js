/** @type {import('next').NextConfig} */

module.exports = {
  webpack: config => {
    // Add a loader for TTF files
    config.module.rules.push({
      test: /\.(ttf|otf|eot|woff|woff2)$/,
      use: {
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
          publicPath: `/_next/static/fonts`, // Public path for fonts (customize as needed)
          outputPath: 'static/fonts', // Output directory for fonts (customize as needed)
        },
      },
    });

    return config;
  },
};
