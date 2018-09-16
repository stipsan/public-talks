import babel from "rollup-plugin-babel";
import commonjs from "rollup-plugin-commonjs";
import resolve from "rollup-plugin-node-resolve";
import replace from "rollup-plugin-replace";

export default {
  experimentalCodeSplitting: true,
  input: "client.js",
  plugins: [
    resolve({ browser: true }),
    commonjs({
      include: /node_modules/,
      namedExports: {
        [require.resolve("react")]: ["Component", "lazy", "Placeholder"],
        [require.resolve("react-dom")]: ["unstable_createRoot"]
      }
    }),
    replace({
      "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
      // reach/router is trying to use this API but it got removed in react 16.5
      "ReactDOM.unstable_deferredUpdates":
        "typeof requestIdleCallback != 'undefined' ? requestIdleCallback : requestAnimationFrame"
    }),
    babel({ exclude: "node_modules/**" })
  ],
  output: [
    // bundle for browsers that support dynamic import() natively
    { dir: "public/esm", format: "esm" },
    // the rest
    { dir: "public/es5", format: "system" }
  ]
};
