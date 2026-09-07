import { canSendNotif, canSendNotifReport, reqNotifPerm, requestNotifBlock, sendNotif, sendNotifBlock } from "./blocks/notification";
import { archReporter, famliyReporter, getArch, getFamliy, getLocale, getplatform, localeReporter, platformReporter } from "./blocks/os";
import {
    closeBlock, closeWindow,
    getWHeight, getWWidth,
    isCloseable,
    isCloseReporter,
    isFocused,
    isFocusedReporter,
    isFullscreen,
    isFullscreenReporter,
    restoreWindowState,
    restoreWindowStateBlock,
    saveWindowState,
    saveWindowStateBlock,
    setWindowMaxSize, setWindowMaxSizeBlock,
    setWindowMinSize, setWindowMinSizeBlock,
    setWindowSize,
    setWindowSizeBlock,
    setWindowTitle, setWindowTitleBlock,
    windowHeightReporter, windowWidthReporter
} from "./blocks/windowControl";
import { icon } from "./icon";


; (function (Scratch) {
    if (!Scratch.extensions.unsandboxed) {
        throw new Error("Please run Tauri Extension without sandbox!")
    }

    const extension = {
        getInfo() {
            return {
                id: 'tauriExtension',
                name: "Tauri extension",
                color1: "#f1b62b",
                blockIconURI: icon,
                blocks: [
                    {
                        blockType: Scratch.BlockType.LABEL,
                        text: "OS"
                    } as unknown as Scratch.Block,
                    famliyReporter,
                    platformReporter,
                    archReporter,
                    localeReporter,
                    '---' as const,
                    {
                        blockType: Scratch.BlockType.LABEL,
                        text: "Window"
                    } as unknown as Scratch.Block,
                    windowWidthReporter,
                    windowHeightReporter,
                    isFocusedReporter,
                    isFullscreenReporter,
                    isCloseReporter,
                    setWindowTitleBlock,
                    setWindowSizeBlock,
                    setWindowMinSizeBlock,
                    setWindowMaxSizeBlock,
                    saveWindowStateBlock,
                    restoreWindowStateBlock,
                    closeBlock,
                    '---' as const,
                    {
                        blockType: Scratch.BlockType.LABEL,
                        text: "Notifications"
                    } as unknown as Scratch.Block,
                    canSendNotifReport,
                    requestNotifBlock,
                    sendNotifBlock
                ]
            }
        },
        getFamliy,
        canSendNotif,
        getplatform,
        getArch,
        getLocale,
        getWWidth,
        setWindowSize,
        getWHeight,
        setWindowTitle,
        sendNotif,
        setWindowMinSize,
        setWindowMaxSize,
        closeWindow,
        isCloseable,
        restoreWindowState,
        saveWindowState,
        isFocused,
        isFullscreen,
        reqNotifPerm,
    }

    Scratch.extensions.register(extension)
})(Scratch)
