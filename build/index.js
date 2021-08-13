const { externalGlobalPlugin } = require("esbuild-plugin-external-global");

require('esbuild').build({
    entryPoints: ['src/index.js'],
    bundle: true,
    outfile: 'dist/index.js',
    plugins: [
        externalGlobalPlugin({
          'cross-fetch': 'fetch',
        })
      ],
  })
  .catch(() => process.exit(1))