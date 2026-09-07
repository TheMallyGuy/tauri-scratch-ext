import { watch } from "node:fs";
import { readFile, writeFile } from "node:fs/promises";
import prettier from "prettier";

const SRC = "output/extension.js";
const OUT = "output/extension.formatted.js";
const CONFIG_PATH = "turbowarp/.prettierrc";

let pending = false;
let running = false;

async function format() {
    if (running) {
        pending = true;
        return;
    }
    running = true;
    try {
        const [code, config] = await Promise.all([
            readFile(SRC, "utf8"),
            prettier.resolveConfig(CONFIG_PATH),
        ]);
        const formatted = await prettier.format(code, {
            ...config,
            parser: "acorn",
        });
        await writeFile(OUT, formatted);
        console.log(`[prettier] formatted -> ${OUT}`);
    } catch (err) {
        console.error("[prettier] error:", err.message);
    } finally {
        running = false;
        if (pending) {
            pending = false;
            format();
        }
    }
}

format();

let timer;
watch(SRC, () => {
    clearTimeout(timer);
    timer = setTimeout(format, 50);
});

console.log(`[prettier] watching ${SRC}...`);