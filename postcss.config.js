// VCとCCで共通して使うPostCSS設定

module.exports = {
  plugins: [
    require("autoprefixer")({
      grid: true,
    }),
  ],
};
