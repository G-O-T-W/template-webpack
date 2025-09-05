// webpack.config.js
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: {
    app: "./src/index.js"
  },
  output: {
       filename: "main.js",
       path: path.resolve(__dirname, "dist"),
       clean: true,
  },
  optimization: {
    // Minimizing CSS (By Default Only In Production)
    minimizer: [
      // For webpack v5, you can use the `...` syntax to extend existing minimizers (i.e. `terser-webpack-plugin`), uncomment the next line // `...`,
      new CssMinimizerPlugin(),
    ],
  },
  plugins: [
    // Handling HTML
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
    // Minimizing CSS (By Default Only In Production)
    new MiniCssExtractPlugin(),
  ],
  module: {
    rules: [
      {
        // Loading CSS
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        // Image files we reference in our HTML template
        test: /\.html$/i,
        loader: "html-loader",
      },
      {
        // Images we use in our JavaScript, where we will need to import the files
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
    ],
  },
};
