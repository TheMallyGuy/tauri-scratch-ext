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
                    setWindowMinSizeBlock,
                    setWindowMaxSizeBlock,
                    saveWindowStateBlock,
                    restoreWindowStateBlock,
                    closeBlock,
                ]
            }
        },
        getFamliy,
        getplatform,
        getArch,
        getLocale,
        getWWidth,
        getWHeight,
        setWindowTitle,
        setWindowMinSize,
        setWindowMaxSize,
        closeWindow,
        isCloseable,
        restoreWindowState,
        saveWindowState,
        isFocused,
        isFullscreen,
    }

    Scratch.extensions.register(extension)
})(Scratch)
