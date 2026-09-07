<<<<<<< HEAD
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
    setWindowMaxSize, setWindowMaxSizeBlock,
    setWindowMinSize, setWindowMinSizeBlock,
    setWindowTitle, setWindowTitleBlock,
    windowHeightReporter, windowWidthReporter
} from "./blocks/windowControl";
=======
>>>>>>> fc3f3b3937d91b6435550cc20420ac3e4fd6b0f1
import { icon } from "./icon";

; (function (Scratch) {
    if (!Scratch.extensions.unsandboxed) {
        throw new Error("Please run Tauri Extension without sandbox!")
    }

<<<<<<< HEAD
    const extension = {
=======

    const tauri = (window as any).__TAURI__;
    if (!tauri) {
        throw new Error("Tauri globals not found - is this running inside the desktop app?");
    }

    const setWindowTitleBlock = {
        blockType: Scratch.BlockType.COMMAND,
        opcode: "setWindowTitle",
        text: "Set window title to [TITLE]",
        arguments: {
            TITLE: {
                type: Scratch.ArgumentType.STRING
            }
        }
    } as const

    const setWindowMinSizeBlock = {
        blockType: Scratch.BlockType.COMMAND,
        opcode: "setWindowMinSize",
        text: "Set window minimum size to [WIDTH] width [HEIGHT] height",
        arguments: {
            WIDTH: {
                type: Scratch.ArgumentType.NUMBER
            },
            HEIGHT: {
                type: Scratch.ArgumentType.NUMBER
            }
        }
    } as const

    const setWindowMaxSizeBlock = {
        blockType: Scratch.BlockType.COMMAND,
        opcode: "setWindowMaxSize",
        text: "Set window maximum size to [WIDTH] width [HEIGHT] height",
        arguments: {
            WIDTH: {
                type: Scratch.ArgumentType.NUMBER
            },
            HEIGHT: {
                type: Scratch.ArgumentType.NUMBER
            }
        }
    } as const

    class TauriExtension implements Scratch.Extension {
>>>>>>> fc3f3b3937d91b6435550cc20420ac3e4fd6b0f1
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
<<<<<<< HEAD
                    famliyReporter,
                    platformReporter,
                    archReporter,
                    localeReporter,
=======
                    {
                        blockType: Scratch.BlockType.REPORTER,
                        opcode: "getOS",
                        text: "Operating System"
                    },
                    {
                        blockType: Scratch.BlockType.REPORTER,
                        opcode: "getArch",
                        text: "Arch"
                    },
                    {
                        blockType: Scratch.BlockType.REPORTER,
                        opcode: "getLocal",
                        text: "System Local Locale"
                    },
>>>>>>> fc3f3b3937d91b6435550cc20420ac3e4fd6b0f1
                    '---' as const,
                    {
                        blockType: Scratch.BlockType.LABEL,
                        text: "Window"
                    } as unknown as Scratch.Block,
<<<<<<< HEAD
                    windowWidthReporter,
                    windowHeightReporter,
                    isFocusedReporter,
                    isFullscreenReporter,
                    isCloseReporter,
                    setWindowTitleBlock,
                    setWindowMinSizeBlock,
                    setWindowMaxSizeBlock,
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
        isFocused,
        isFullscreen,
    }

    Scratch.extensions.register(extension)
})(Scratch)
=======
                    {
                        blockType: Scratch.BlockType.REPORTER,
                        opcode: "getWWidth",
                        text: "Window Width"
                    },
                    {
                        blockType: Scratch.BlockType.REPORTER,
                        opcode: "getWHeight",
                        text: "Window Height"
                    },
                    setWindowTitleBlock,
                    setWindowMinSizeBlock,
                    setWindowMaxSizeBlock,
                    {
                        blockType: Scratch.BlockType.COMMAND,
                        opcode: "closeWindow",
                        text: "Close Window (THIS WILL CLOSE YOUR SCRATCH PROJECT!)",
                    },
                ]
            }
        }

        getOS() {
            return window.__TAURI__.os.family();
        }

        getArch() {
            return window.__TAURI__.os.arch();
        }

        async getLocal() {
            return window.__TAURI__.os.locale();
        }

        async setWindowTitle(args: ScratchBlockArgs<typeof setWindowTitleBlock>) {
            const currentWindow = await window.__TAURI__.webviewWindow.getCurrentWebviewWindow()

            await currentWindow.setTitle(args.TITLE)
        }

        async getWWidth() {
            const windowSize = await window.__TAURI__.core.invoke("get_window_size")
            return windowSize[0]
        }

        async getWHeight() {
            const windowSize = await window.__TAURI__.core.invoke("get_window_size")
            return windowSize[1]
        }

        async closeWindow() {
            await window.__TAURI__.webviewWindow.getCurrentWebviewWindow().close()
        }

        async setWindowSize(args: ScratchBlockArgs<typeof setWindowMinSizeBlock>) {
            await window.__TAURI__.core.invoke("set_window_size", { "width": args.WIDTH, "height": args.HEIGHT })
        }

        async setWindowMinSize(args: ScratchBlockArgs<typeof setWindowMinSizeBlock>) {
            await window.__TAURI__.core.invoke("set_window_min_size", { "width": args.WIDTH, "height": args.HEIGHT })
        }

        async setWindowMaxSize(args: ScratchBlockArgs<typeof setWindowMaxSizeBlock>) {
            await window.__TAURI__.core.invoke("set_window_max_size", { "width": args.WIDTH, "height": args.HEIGHT })
        }
    }

    Scratch.extensions.register(new TauriExtension())
})(Scratch)
>>>>>>> fc3f3b3937d91b6435550cc20420ac3e4fd6b0f1
