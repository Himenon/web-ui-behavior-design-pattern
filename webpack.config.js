const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const isProduction = process.env.NODE_ENV === "production";

const cssLoaders = [
  {
    loader: "css-loader",
    options: {
      modules: {
        exportLocalsConvention: "camelCase",
        localIdentName: "__[local]_[hash:base64:5]__",
      },
      importLoaders: 2,
    },
  },
  {
    loader: "postcss-loader",
    options: {
      postcssOptions: {
        plugins: function () {
          return [require("autoprefixer")];
        },
      },
    },
  },
  {
    loader: "sass-loader",
    options: {
      implementation: require("sass"),
    },
  },
];

/**
 * @type {webpack.Configuration}
 */
const config = {
  mode: isProduction ? "production" : "development",
  target: isProduction ? ["web", "es5"] : "web",
  entry: {
    index: "./src/index.tsx",
  },
  cache: {
    type: "filesystem",
    buildDependencies: {
      config: [__filename],
    },
  },
  devtool: "eval-source-map",
  output: {
    path: path.join(__dirname, "dist"),
    pathinfo: false,
    publicPath: "/", // for react-router and historyApiFallback
  },
  optimization: {
    minimize: isProduction,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "public/index.html",
      inject: "head",
      scriptLoading: "defer",
      PUBLIC_URL: "AA",
    }),
  ],
  devServer: {
    contentBase: "./dist",
    compress: true,
    port: 3000,
    disableHostCheck: true,
    open: true,
    historyApiFallback: {
      from: /^\/*/,
      to: "/",
    },
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        loader: "ts-loader",
        exclude: [/node_modules/],
        options: {
          configFile: "tsconfig.json",
        },
      },
      {
        test: /\.s?css$/,
        use: [{ loader: "style-loader", options: { esModule: false } }, ...cssLoaders],
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".scss"],
  },
  externals: {
    react: "React",
    "react-dom": "ReactDOM",
  },
};

module.exports = config;
