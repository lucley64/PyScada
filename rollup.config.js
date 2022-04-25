import resolve from '@rollup/plugin-node-resolve';

export default {
    input: 'pyscada/hmi/static/pyscada/js/pyscada/bim3dmodelsrc.js',
    output: [
        {
            format: 'esm',
            file: 'pyscada/hmi/static/pyscada/js/pyscada/bim3dmodelbundle.js'
        },
    ],
    plugins: [
        resolve(),
    ],
}