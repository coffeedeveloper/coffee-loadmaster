module.exports = {
  entry: "./src/index.js",
  output: {
    path: __dirname + "/build",
    filename: "loadmaster.js",
    libraryTarget: "umd"
  },
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: "babel-loader"
    }]
  }
};
