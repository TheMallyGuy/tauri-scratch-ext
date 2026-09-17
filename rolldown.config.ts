import { defineConfig } from 'rolldown'

const banner = '// If you want to see the source code, please view: https://github.com/TheMallyGuy/tauri-scratch-ext\n' +
      '// Do not modify this extension for malicious uses.\n' +
      '// Generated using Rolldown.rs by VOID(0). (https://rolldown.rs/)\n' +
      '// Name: Tauri Extension\n' +
      '// ID: tauriExtension\n' +
      '// Description: Scratch extension for Tauri.\n' +
      '// By: Mally\n' +
      '// License: MPL-2.0\n'

export default defineConfig({
      input: 'src/withL10n.ts',
      treeshake: true,
      output: [{
            file: 'output/extensionSmall.js',
            format: 'es',
            minify: true,
            sourcemap: false,
            externalLiveBindings: false,
            postBanner: banner
      }, {
            file: 'output/extension.js',
            format: 'es',
            sourcemap: false,
            postBanner: banner
      }],
})