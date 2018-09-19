import babel from "rollup-plugin-babel";
import commonjs from "rollup-plugin-commonjs";
import resolve from "rollup-plugin-node-resolve";
import replace from "rollup-plugin-replace";
import { terser } from "rollup-plugin-terser";

const plugins = [
  resolve({ browser: true }),
  commonjs({
    include: /node_modules/,
    namedExports: {
      [require.resolve("react")]: [
        "Component",
        "lazy",
        "Placeholder",
        "cloneElement",
        "createContext",
        "createElement",
        "PureComponent"
      ],
      [require.resolve("react-dom")]: ["unstable_createRoot"],
      [require.resolve("react-is")]: ["isValidElementType"],
      [require.resolve("schedule")]: ["unstable_scheduleWork"]
    }
  }),
  replace({
    "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
    // reach/router is trying to use this API but it got removed in react 16.5
    "ReactDOM.unstable_deferredUpdates":
      "typeof requestIdleCallback != 'undefined' ? requestIdleCallback : requestAnimationFrame"
  }),
  babel({ exclude: "node_modules/**" })
];
// Minify the JS when in production
if (process.env.NODE_ENV === "production") {
  plugins.push(terser());
}

const config = { experimentalCodeSplitting: true, input: "client.js", plugins };

export default [
  // bundle for browsers that support dynamic import() natively
  // @TODO babel config should avoid transpiling features that these browsers support natively
  { ...config, output: { dir: "public/esm", format: "esm" } },
  // the rest
  { ...config, output: { dir: "public/es5", format: "system" } }
];
