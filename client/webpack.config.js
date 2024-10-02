const CompressionPlugin = require('compression-webpack-plugin');

module.exports = {
    // Other configuration options...
    plugins: [
        new CompressionPlugin({
            filename: '[path].gz[query]', // Compressed files will have a .gz extension
            algorithm: 'gzip',             // Using gzip algorithm for compression
            test: /\.(js|css|html|svg)$/,  // Compress JavaScript, CSS, HTML, and SVG files
            threshold: 10240,              // Only compress files larger than 10KB
            minRatio: 0.8,                 // Compress files if they can be reduced by at least 20%
        }),
    ],
};
