// craco.config.js
module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      // Add .md file loader
      const markdownRule = {
        test: /\.md$/,
        use: 'raw-loader'
      };
      
      webpackConfig.module.rules.push(markdownRule);
      
      return webpackConfig;
    }
  }
};
