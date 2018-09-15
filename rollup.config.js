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
        "node_modules/react/index.js": ["Component"]
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
      ...output,
      format: "esm",
      entryFileNames: "[name].mjs",
      chunkFileNames: "[name]-[hash].mjs"
    }
  },
  // the rest
  { ...defaults, output: { ...output, format: "system" } }
];
