// https://github.com/FurryR/scratch-ext/blob/main/types/
/// <reference path="../../node_modules/@turbowarp/types/index.d.ts" />

declare namespace Scratch {
  const vm: VM
  const runtime: VM.Runtime
  const renderer: RenderWebGL
  const gui: {
    getBlockly(): Promise<typeof ScratchBlocks>
  }

  // @turbowarp/types doesn't model label blocks yet, even though
  // TurboWarp supports them: https://docs.turbowarp.org/development/extensions/label
  namespace BlockType {
    const LABEL: 'label'
  }
  interface LabelBlock {
    blockType: 'label'
    text: string | string[]
  }
}
