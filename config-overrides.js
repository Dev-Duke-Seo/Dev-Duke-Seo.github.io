// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');

module.exports = function override(config, env) {
  // Node.js 폴리필 설정
  config.resolve.fallback = {
    ...config.resolve.fallback,
    "path": require.resolve("path-browserify"),
    "fs": require.resolve("browserify-fs")
  };
  
  // Path alias 설정 추가
  config.resolve.alias = {
    ...config.resolve.alias,
    '@': path.resolve(__dirname, 'src'),
  };
  
  return config;
}; 