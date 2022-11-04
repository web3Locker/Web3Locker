const webpack = require('webpack');

module.exports = {
webpack: function(config, env) {
const fallback = config.resolve.fallback || {};
Object.assign(fallback, {
"stream": require.resolve("stream-browserify"),
"http": require.resolve("stream-http"),
"https": require.resolve("https-browserify"),
"url": require.resolve("url"),
"crypto": require.resolve("crypto-browserify")
})
config.resolve.fallback = fallback;
config.plugins = (config.plugins || []).concat([
new webpack.ProvidePlugin({
process: 'process/browser',
Buffer: ['buffer', 'Buffer']
})
])
config.ignoreWarnings = [/Failed to parse source map/];
return config;
},
}