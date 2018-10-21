// @TODO currently setup to handle clientside only

module.exports = api => {
  return {
    presets: [
      [
        "@babel/preset-env",
        {
          loose: true,
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
      "@babel/plugin-syntax-dynamic-import",
      [
        "@babel/plugin-proposal-class-properties",
        { loose: true, pure: true, transpileTemplateLiterals: false }
      ],
      [
        "babel-plugin-styled-components",
        { displayName: !api.env("production"), pure: api.env("production") }
      ]
    ]
  };
};
