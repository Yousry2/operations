const { createGlobPatternsForDependencies } = require('@nx/angular/tailwind');
const { join } = require('path');

const sharedTailwindConfig = require('../../libs/shared/tailwind-presets/tailwind.config');

/** @type {import('tailwindcss').Config} */
module.exports = {
     presets: [sharedTailwindConfig],
     content: [
          join(__dirname, 'src/**/!(*.stories|*.spec).{ts,html}'),
          ...createGlobPatternsForDependencies(__dirname),
          'libs/fedex-app/features/fedex-auth/src/**/!(*.stories|*.spec).{ts,html}',
     ],

     theme: {
          extend: {
               fontFamily: {
                    libre: ['LIBRE', 'sans-serif'],
               },
          },
     },
     plugins: [],
};
