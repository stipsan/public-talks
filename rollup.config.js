import babel from "rollup-plugin-babel";
import commonjs from "rollup-plugin-commonjs";
import resolve from "rollup-plugin-node-resolve";
import replace from "rollup-plugin-replace";

const output = {
  dir: "public"
};

const defaults = {
  experimentalCodeSplitting: true,
  optimizeChunks: true,
  input: "client.js",
  plugins: [
    babel({ exclude: "node_modules/**" }),
    resolve({ browser: true }),
    commonjs({
      include: /node_modules/,
      namedExports: {
        [require.resolve("react")]: ["Component", "lazy", "Placeholder"],
        [require.resolve("react-dom")]: ["unstable_createRoot"]
      }
    }),
    replace({ "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV) })
  ]
};

export default [
  // bundle for browsers that support dynamic import() natively
  {
    ...defaults,
    output: {
      dir: "public/esm",
      format: "esm"
    }
  },
  // the rest
  { ...defaults, output: { dir: "public/es5", format: "system" } }
];
