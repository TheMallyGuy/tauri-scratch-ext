import { arch, family, locale, platform } from "@tauri-apps/plugin-os"

export const famliyReporter = {
    blockType: Scratch.BlockType.REPORTER,
    opcode: "getFamliy",
    text: "Get Famliy"
}

export function getFamliy() {
    return family()
}

export const archReporter = {
    blockType: Scratch.BlockType.REPORTER,
    opcode: "getArch",
    text: "Arch"
}

export function getArch() {
    return arch()
}

export const localeReporter = {
    blockType: Scratch.BlockType.REPORTER,
    opcode: "getLocale",
    text: "System Locale"
}

export async function getLocale() {
    return locale()
}


export const platformReporter = {
    blockType: Scratch.BlockType.REPORTER,
    opcode: "getplatform",
    text: "Platform"
}

export async function getplatform() {
    return platform()
}
