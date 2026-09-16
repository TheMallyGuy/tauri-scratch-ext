import { lastReceivedData, lastReceivedDataReporter, sendDataToWindow, sendDataToWindowBlock, whenDataReceivedBlock } from "./blocks/messaging";
import { canSendNotif, canSendNotifReport, reqNotifPerm, requestNotifBlock, sendNotif, sendNotifBlock } from "./blocks/notification";
import { archReporter, famliyReporter, getArch, getFamliy, getLocale, getplatform, localeReporter, platformReporter } from "./blocks/os";
import { applyProjectState, applyProjectStateBlock, captureProjectState, captureProjectStateBlock } from "./blocks/projectState";
import {
    closeBlock, closeWindow,
    closeWindowByLabel, closeWindowByLabelBlock,
    createWindow, createWindowBlock,
    evalInWindow, evalInWindowBlock,
    focusWindowByLabel, focusWindowByLabelBlock,
    getWHeight, getWHeightByLabel, getWHeightByLabelReporter,
    getWWidth, getWWidthByLabel, getWWidthByLabelReporter,
    isCloseable,
    isCloseableByLabel, isCloseableByLabelReporter,
    isCloseReporter,
    isFocused,
    isFocusedByLabel, isFocusedByLabelReporter,
    isFocusedReporter,
    isFullscreen,
    isFullscreenByLabel, isFullscreenByLabelReporter,
    isFullscreenReporter,
    isWindowLabel, isWindowLabelReporter,
    myWindowLabel, myWindowLabelReporter,
    restoreWindowState,
    restoreWindowStateBlock,
    saveWindowState,
    saveWindowStateBlock,
    setWindowDecorationsByLabel, setWindowDecorationsByLabelBlock,
    setWindowMaxSize, setWindowMaxSizeBlock,
    setWindowMinSize, setWindowMinSizeBlock,
    setWindowSize,
    setWindowSizeBlock,
    setWindowTitle, setWindowTitleBlock,
    windowHeightReporter, windowLabelMenu, windowWidthReporter
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
                    myWindowLabelReporter,
                    isWindowLabelReporter,
                    createWindowBlock,
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
                        text: "Other Windows"
                    } as unknown as Scratch.Block,
                    isFocusedByLabelReporter,
                    isFullscreenByLabelReporter,
                    isCloseableByLabelReporter,
                    getWWidthByLabelReporter,
                    getWHeightByLabelReporter,
                    focusWindowByLabelBlock,
                    closeWindowByLabelBlock,
                    setWindowDecorationsByLabelBlock,
                    evalInWindowBlock,
                    '---' as const,
                    {
                        blockType: Scratch.BlockType.LABEL,
                        text: "Cross-Window Messaging"
                    } as unknown as Scratch.Block,
                    sendDataToWindowBlock,
                    whenDataReceivedBlock,
                    lastReceivedDataReporter,
                    captureProjectStateBlock,
                    applyProjectStateBlock,
                    {
                        blockType: Scratch.BlockType.LABEL,
                        text: "Notifications"
                    } as unknown as Scratch.Block,
                    canSendNotifReport,
                    requestNotifBlock,
                    sendNotifBlock,
                    '---' as const,
                ],
                menus: {
                    windowLabelMenu: {
                        acceptReporters: true,
                        items: "windowLabelMenu"
                    }
                }
            }
        },
        getFamliy,
        canSendNotif,
        getplatform,
        getArch,
        getLocale,
        getWWidth,
        createWindow,
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
        myWindowLabel,
        isWindowLabel,
        reqNotifPerm,
        windowLabelMenu,
        isFocusedByLabel,
        isFullscreenByLabel,
        isCloseableByLabel,
        getWWidthByLabel,
        getWHeightByLabel,
        focusWindowByLabel,
        closeWindowByLabel,
        setWindowDecorationsByLabel,
        evalInWindow,
        sendDataToWindow,
        lastReceivedData,
        captureProjectState,
        applyProjectState,
    }

    Scratch.extensions.register(extension)
})(Scratch)
