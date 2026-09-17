import { Window } from "@tauri-apps/api/window"

let cachedWindowLabels: string[] = ["main"]

export function refreshWindowLabelCache() {
    Window.getAll().then(windows => {
        cachedWindowLabels = windows.map(w => w.label)
    })
}
refreshWindowLabelCache()

export function windowLabelMenu() {
    refreshWindowLabelCache()
    return cachedWindowLabels
}

export const windowLabelArgument = {
    type: Scratch.ArgumentType.STRING,
    defaultValue: "main",
    menu: "windowLabelMenu"
} as const

export async function getWindowByLabel(label: string) {
    const window = await Window.getByLabel(label)
    if (window == null) {
        throw new Error(`Window with label ${label} not found`)
    }
    return window
}
