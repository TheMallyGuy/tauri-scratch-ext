// Central collector so each blocks/*.ts file can register its own blocks and
// handlers as a side effect of being imported, instead of index.ts having to
// list every block and method by hand. Section order in the palette follows
// the order sections are first seen, which follows import order in index.ts
// and call order within each file.

type BlockHandler = (...args: any[]) => any

interface Entry {
    block: Scratch.Block
    handler?: BlockHandler
}

const sectionOrder: string[] = []
const sections = new Map<string, Entry[]>()
const methods: Record<string, BlockHandler> = {}
const menus: Record<string, Scratch.Menu> = {}

export function registerBlock<T extends { opcode: string; func?: string }>(
    section: string,
    block: T,
    handler?: BlockHandler
) {
    if (!sections.has(section)) {
        sections.set(section, [])
        sectionOrder.push(section)
    }
    sections.get(section)!.push({ block: block as unknown as Scratch.Block, handler })

    if (handler) {
        methods[block.func ?? block.opcode] = handler
    }
}

export function registerMenu(name: string, menu: Scratch.Menu, handler?: BlockHandler) {
    menus[name] = menu
    if (handler) {
        methods[name] = handler
    }
}

export function buildExtensionBlocks(): (Scratch.Block | Scratch.Separator)[] {
    const result: (Scratch.Block | Scratch.Separator)[] = []

    for (const section of sectionOrder) {
        if (result.length > 0) {
            result.push('---')
        }
        result.push({ blockType: Scratch.BlockType.LABEL, text: section } as unknown as Scratch.Block)
        for (const { block } of sections.get(section)!) {
            result.push(block)
        }
    }

    return result
}

export function getMethods(): Record<string, BlockHandler> {
    return methods
}

export function getMenus(): Record<string, Scratch.Menu> {
    return menus
}
