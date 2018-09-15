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
    commonjs({
      include: /node_modules/,
      namedExports: {
        // left-hand side can be an absolute path, a path
        // relative to the current directory, or the name
        // of a module in node_modules
        "node_modules/react/index.js": ["Component"]
      }
    })
  ]
};
