const plugins = [
  // Transpile newer CSS features to the target browserslist depending on the env (stage)
  require("postcss-preset-env")({ stage: 1 })
];

// Minify the CSS in production
if (process.env.NODE_ENV === "production") {
  plugins.push(require("cssnano")({ preset: "default" }));
}

module.exports = { map: { inline: false }, plugins };
