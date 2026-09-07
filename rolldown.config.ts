import { defineConfig } from 'rolldown'

export default defineConfig({
      input: 'src/withL10n.ts',
      output: {
            file: 'output/extension.js',
            format: 'esm',
            // https://github.com/FurryR/scratch-ext/blob/main/tsup.config.ts
            banner:
                  '// Generated using Rolldown.js by VOID(0). (https://rolldown.rs/)\n' +
                  '// https://github.com/TheMallyGuy/tauri-scratch-ext \n' +
                  '// Name: Tauri Extension\n' +
                  '// ID: tauriExtension\n' +
                  '// Description: Scratch extension for Tauri.\n' +
                  '// By: Mally\n' +
                  '// License: MPL-2.0\n'
      }
})
