/*jshint esversion: 6*/
import resolve from "@rollup/plugin-node-resolve";

export default {
    input: 'pyscada/hmi/static/pyscada/js/admin/admin_model3dsrc.js', 
    output: [
        {
            format: 'esm',
            file: 'pyscada/hmi/static/pyscada/js/admin/admin_model3dbundle.js',
        },
    ],
    plugins: [
        resolve(),
    ],
};