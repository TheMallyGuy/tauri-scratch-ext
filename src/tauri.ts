export function getTauri() {
    const tauri = window.__TAURI__
    if (!tauri) {
        throw new Error("Tauri globals not found - is this running inside the desktop app?")
    }
    return tauri
}
