// @TODO currently setup to handle clientside only

module.exports = api => {
  return {
    presets: [
      [
        "@babel/preset-env",
        {
          targets: {
            browsers: [
              "last 1 chrome version",
              "last 1 firefox version",
              "last 1 safari version"
            ]
          },
          modules: false,
          shippedProposals: true,
          useBuiltIns: "usage"
        }
      ],
      [
        "@babel/preset-react",
        { useBuiltIns: true, development: !api.env("production") }
      ]
    ],
    plugins: [
      "babel-plugin-react-require",
      "@babel/plugin-syntax-dynamic-import"
    ]
  };
};
