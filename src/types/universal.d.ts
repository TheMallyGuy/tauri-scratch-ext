// https://github.com/FurryR/scratch-ext/blob/main/types/
/// <reference path="../../node_modules/@turbowarp/types/index.d.ts" />

interface MessageObject {
  id?: string
  default: string
  description?: string
}

type Message = string | MessageObject

interface TranslateFn {
  (message: Message): string
  setup(newTranslations: Record<string, Record<string, string>>): void
}

declare namespace Scratch {
  const translate: TranslateFn
}

// Derives the runtime shape of a block's `arguments` from its own
// definition, so a handler's parameter type can't drift out of sync
// with the block it belongs to. scratch-vm casts each argument to the
// matching JS primitive before invoking the block function, so these
// mappings reflect what actually arrives at runtime, not the schema type.
type ScratchArgumentValue<T extends Scratch.Argument> = T extends {
  type: 'string' | 'color' | 'matrix'
}
  ? string
  : T extends { type: 'number' | 'angle' | 'note' }
    ? number
    : T extends { type: 'Boolean' }
      ? boolean
      : never

type ScratchBlockArgs<
  T extends { arguments?: Record<string, Scratch.Argument> }
> = T['arguments'] extends Record<string, Scratch.Argument>
  ? { [K in keyof T['arguments']]: ScratchArgumentValue<T['arguments'][K]> }
  : Record<string, never>
