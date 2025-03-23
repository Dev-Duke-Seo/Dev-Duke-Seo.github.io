module.exports = function override(config, env) {
  // Node.js 폴리필 설정
  config.resolve.fallback = {
    ...config.resolve.fallback,
    "path": require.resolve("path-browserify"),
    "fs": require.resolve("browserify-fs")
  };
  
  return config;
}; 