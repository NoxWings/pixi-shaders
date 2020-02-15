import { resolve } from "path";
import { terser } from "rollup-plugin-terser";
import commonjs from "@rollup/plugin-commonjs";
import glslify from "rollup-plugin-glslify";
import glslifyImport from "glslify-import";
import livereload from "rollup-plugin-livereload";
import nodeResolve from "@rollup/plugin-node-resolve";
import serve from "rollup-plugin-serve";
import typescript from "rollup-plugin-typescript2";
import replace from "@rollup/plugin-replace";

import pkg from "./package.json";

const DEV = !!process.env.ROLLUP_WATCH;
const envStr = DEV ? "development" : "production";

export default {
    input: "src/index.tsx",
    plugins: [
        replace({
            "process.env.NODE_ENV": JSON.stringify(envStr)
        }),
        nodeResolve({ preferBuiltins: false }),
        commonjs(),
        glslify({
            transform: [glslifyImport]
        }),
        typescript({
            typescript: require("typescript"),
            cacheRoot: resolve(".cache", "rpt2")
        }),
        !DEV && terser(),
        DEV && serve({
            contentBase: ["dist", "static"],
            host: "0.0.0.0",
            port: 8080
        }),
        DEV && livereload({
            watch: ["dist", "static"]
        })
    ],
    output: [{
        name: pkg.name,
        file: pkg.main,
        format: "iife",
        sourcemap: true
    }]
};
