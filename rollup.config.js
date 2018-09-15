import commonjs from "rollup-plugin-commonjs";
import resolve from "rollup-plugin-node-resolve";

export default {
  input: "client.js",
  output: {
    file: "public/app.js",
    format: "esm"
  },
  plugins: [resolve({ browser: true }), commonjs()]
};
