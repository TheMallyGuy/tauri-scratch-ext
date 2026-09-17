import { WebviewWindow } from "@tauri-apps/api/webviewWindow";

export const createWebviewWindow = async (
    label: string,
    url: string,
    options: Omit<ConstructorParameters<typeof WebviewWindow>[1], "url">
) => {
    const webview = new WebviewWindow(label, { ...options, url })
    await new Promise<void>((resolve, reject) => {
        webview.once("tauri://created", () => resolve())
        webview.once("tauri://error", (event) => reject(new Error(`Failed to create window: ${JSON.stringify(event.payload)}`)))
    })
    return webview
}