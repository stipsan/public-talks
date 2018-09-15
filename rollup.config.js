import babel from "rollup-plugin-babel";
import commonjs from "rollup-plugin-commonjs";
import resolve from "rollup-plugin-node-resolve";

export default {
  experimentalCodeSplitting: true,
  input: "client.js",
  output: {
    dir: "public",
    format: "esm"
  },
  plugins: [
    babel({ exclude: "node_modules/**" }),
    resolve({ browser: true }),
    commonjs()
  ]
};
