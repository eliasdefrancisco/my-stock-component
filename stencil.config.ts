import { Config } from '@stencil/core';

// Documentation about this file here: https://stenciljs.com/docs/config

export const config: Config = {
  namespace: 'my-stock-component',
  outputTargets: [
    {
      type: 'dist',
      esmLoaderPath: '../loader'
    },
    {
      type: 'docs-readme'
    },
    // {
    //   type: 'www',
    //   serviceWorker: null // disable service workers
    // }
  ]
};
