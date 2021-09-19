const withPWA = require('next-pwa');
const { resolve } = require('path');
const MODE = process.env.NODE_ENV === 'development' ? 'development' : 'production';
const withDebug = MODE == 'development';
module.exports = withPWA({
  pwa: {
    dest: 'public',
    disable: withDebug,
  },
  webpack: (config) => {
    config.resolve.alias['~'] = resolve(__dirname, 'src');
    config.resolve.extensions.push('.elm');
    if (MODE === 'development') {
      config.module.rules.push({
        test: /\.elm$/,
        exclude: [/elm-stuff/, /node_modules/],
        use: [
          { loader: 'elm-hot-webpack-loader' },
          {
            loader: 'elm-webpack-loader',
            options: {
              debug: withDebug,
            },
          },
        ],
      });
    } else {
      config.module.rules.push({
        test: /\.elm$/,
        exclude: [/elm-stuff/, /node_modules/],
        use: {
          loader: 'elm-webpack-loader',
          options: {
            optimize: true,
          },
        },
      });
    }
    return config;
  },
});
