// @TODO currently setup to handle clientside only

module.exports = api => {
  return {
    presets: [
      [
        "@babel/preset-env",
        { modules: false, shippedProposals: true, useBuiltIns: "entry" }
      ],
      [
        "@babel/preset-react",
        { useBuiltIns: true, development: !api.env("production") }
      ]
    ],
    plugins: ["@babel/plugin-syntax-dynamic-import"]
  };
};
