import * as express from "express";
import * as webpack from "webpack";
import * as webpackDevServer from "webpack-dev-server";
import * as path from "path";
import resolvePkg from "resolve-pkg";

const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

const devServerPort = 3000;
const isProduction = process.env.NODE_ENV === "production";
const isDevServer = process.env.DEV_SERVER === "true";
const publicPath = isProduction ? "/" : `http://localhost:${devServerPort}`;

export const find = (searchPath: string): string => {
  const p = resolvePkg(searchPath);
  if (p) {
    return p;
  }
  throw new Error(`Not found: ${searchPath}`);
};

const devServerPlugins: webpack.Configuration["plugins"] = [
  new HtmlWebpackPlugin({
    template: "public/index.html",
    inject: "head",
    scriptLoading: "defer",
    PUBLIC_URL: "AA",
    React: isProduction ? publicPath + "/scripts/react.production.min.js" : "/scripts/react.development.js",
    ReactDOM: isProduction ? publicPath + "/scripts/react-dom.production.min.js" : "/scripts/react-dom.development.js",
  }),
];

const buildPlugins: webpack.Configuration["plugins"] = [
  new BundleAnalyzerPlugin({
    analyzerMode: "static",
    reportFilename: "../docs/bundle-analyzer.html",
    openAnalyzer: true,
    defaultSizes: "stat",
  }),
  new MiniCssExtractPlugin({
    filename: "[name].css",
  }),
  new CopyPlugin({
    patterns: [
      { from: "node_modules/bootstrap/dist/css/bootstrap.min.css", to: "stylesheets/bootstrap.min.css" },
      { from: "node_modules/react/umd/react.production.min.js", to: "js/react.production.min.js" },
      { from: "node_modules/react-dom/umd/react-dom.production.min.js", to: "js/react-dom.production.min.js" },
    ],
  }),
];

const createCssLoader = (localIdentName: string) => [
  {
    loader: "css-loader",
    options: {
      modules: {
        exportLocalsConvention: "camelCase",
        localIdentName: localIdentName,
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
const config: webpack.Configuration & { devServer?: webpackDevServer.Configuration } = {
  mode: isProduction ? "production" : "development",
  target: isProduction ? ["web", "es5"] : "web",
  entry: {
    index: "./src/index.tsx",
  },
  // cache: {
  //   type: "filesystem",
  //   buildDependencies: {
  //     config: [__filename],
  //   },
  // },
  devtool: "eval-source-map",
  output: {
    path: path.join(__dirname, "dist"),
    clean: true,
    pathinfo: false,
    publicPath: "/", // for react-router and historyApiFallback
  },
  optimization: {
    minimize: false,
    minimizer: ["...", new CssMinimizerPlugin()],
    splitChunks: {
      chunks: "initial",
      cacheGroups: {
        default: false,
        defaultVendors: false,
        vendor: {
          name: "vendor",
          chunks: "initial",
          test: /(?=.*node_modules)/,
          enforce: true,
        },
      },
    },
  },
  plugins: isDevServer ? devServerPlugins : buildPlugins,
  devServer: {
    contentBase: "./dist",
    compress: true,
    port: devServerPort,
    disableHostCheck: true,
    open: true,
    historyApiFallback: {
      from: /^\/*/,
      to: "/",
    },
    before: (app: express.Application, _server: any) => {
      app.use("/favicon.ico", express.static("public/favicon.ico"));
      app.use("/scripts/react.development.js", express.static(find("react/umd/react.development.js")));
      app.use("/scripts/react-dom.development.js", express.static(find("react-dom/umd/react-dom.development.js")));
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
        use: [
          isDevServer
            ? { loader: "style-loader", options: { esModule: false } }
            : {
                loader: MiniCssExtractPlugin.loader,
                options: {
                  esModule: false,
                },
              },
          ...createCssLoader("__[local]_[hash:base64:5]__"),
        ],
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

export default config;