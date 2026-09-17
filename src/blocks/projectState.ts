import { registerBlock } from "../registry"

interface CapturedTargetState {
    x: number
    y: number
    direction: number
    costume: number
    visible: boolean
    size: number
    vars: Array<[string, VM.VariableValue]>
}

interface CapturedProjectState {
    targets: Record<string, CapturedTargetState>
}

function isSerializable(value: unknown): boolean {
    try {
        structuredClone(value)
        return true
    } catch {
        return false
    }
}

export const captureProjectStateBlock = {
    blockType: Scratch.BlockType.REPORTER,
    opcode: "captureProjectState",
    text: "capture project state"
} as const

export function captureProjectState() {
    const runtime = Scratch.vm.runtime
    const state: CapturedProjectState = { targets: {} }

    for (const target of runtime.targets) {
        if (!target.isOriginal) continue

        const vars: Array<[string, VM.VariableValue]> = []
        for (const variable of Object.values(target.variables)) {
            if (!variable.isCloud && isSerializable(variable.value)) {
                vars.push([variable.id, variable.value])
            }
        }

        state.targets[target.id] = {
            x: target.x,
            y: target.y,
            direction: target.direction,
            costume: target.currentCostume,
            visible: target.visible,
            size: target.size,
            vars
        }
    }

    return JSON.stringify(state)
}

export const applyProjectStateBlock = {
    blockType: Scratch.BlockType.COMMAND,
    opcode: "applyProjectState",
    text: "apply project state [STATE]",
    arguments: {
        STATE: {
            type: Scratch.ArgumentType.STRING,
            defaultValue: "{}"
        }
    }
} as const

export function applyProjectState(args: ScratchBlockArgs<typeof applyProjectStateBlock>) {
    const runtime = Scratch.vm.runtime
    const state = JSON.parse(args.STATE) as CapturedProjectState

    for (const target of runtime.targets) {
        if (!target.isOriginal) continue
        const data = state.targets[target.id]
        if (!data) continue

        target.setXY(data.x, data.y)
        target.setDirection(data.direction)
        target.setCostume(data.costume)
        target.setVisible(data.visible)
        target.setSize(data.size)

        for (const [varId, value] of data.vars) {
            if (target.variables[varId]) {
                target.variables[varId].value = value
            }
        }
    }

    runtime.requestRedraw()
}

registerBlock("Cross-Window Messaging", captureProjectStateBlock, captureProjectState)
registerBlock("Cross-Window Messaging", applyProjectStateBlock, applyProjectState)
