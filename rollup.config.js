import babel from "rollup-plugin-babel";
import commonjs from "rollup-plugin-commonjs";
import resolve from "rollup-plugin-node-resolve";
import replace from "rollup-plugin-replace";

export default {
  // inlineDynamicImports: true,
  experimentalCodeSplitting: true,
  optimizeChunks: true,
  input: "client.js",
  output: {
    dir: "public",
    format: "amd"
  },
  plugins: [
    babel({ exclude: "node_modules/**" }),
    resolve({ browser: true }),
    commonjs({
      include: /node_modules/,
      namedExports: {
        "node_modules/react/index.js": ["Component"]
      }
    }),
    replace({ "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV) })
  ]
};
