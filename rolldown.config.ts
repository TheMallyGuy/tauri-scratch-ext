import { defineConfig } from 'rolldown'

export default defineConfig({
  input: 'src/withL10n.ts',
  output: {
    file: 'output/extension.js',
    format: 'esm',
    // https://github.com/FurryR/scratch-ext/blob/main/tsup.config.ts
    banner:
<<<<<<< HEAD
      '// Generated using Rolldown.js by VOID(0). (https://rolldown.rs/)\n' +
      '// https://github.com/TheMallyGuy/tauri-scratch-ext \n' +
=======
      '// Generated using Rolldown.js by VOID(0). (https://rolldown.rs/)' +
      '// https://github.com/TheMallyGuy/tauri-scratch-ext' +
>>>>>>> fc3f3b3937d91b6435550cc20420ac3e4fd6b0f1
      '// Name: Tauri Extension\n' +
      '// ID: tauriExtension\n' +
      '// Description: Scratch extension for Tauri.\n' +
      '// By: Mally\n' +
      '// License: MPL-2.0\n'
  }
})
