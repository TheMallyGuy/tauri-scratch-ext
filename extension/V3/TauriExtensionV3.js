// If you want to see the source code, please view: https://github.com/TheMallyGuy/tauri-scratch-ext
// Do not modify this extension for malicious uses.
// Generated using Rolldown.rs by VOID(0). (https://rolldown.rs/)
// Name: Tauri Extension
// ID: tauriExtensionV3
// Description: Scratch extension for Tauri.
// By: Mally
// License: MPL-2.0

//#region src/l10n/index.ts
var l10n_default = {};
//#endregion
//#region node_modules/@tauri-apps/api/external/tslib/tslib.es6.js
/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
function __classPrivateFieldGet(receiver, state, kind, f) {
	if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
	if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
	return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
}
function __classPrivateFieldSet(receiver, state, value, kind, f) {
	if (kind === "m") throw new TypeError("Private method is not writable");
	if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
	if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
	return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
}
var _Resource_rid;
/**
* Invoke your custom commands.
*
* This package is also accessible with `window.__TAURI__.core` when [`app.withGlobalTauri`](https://v2.tauri.app/reference/config/#withglobaltauri) in `tauri.conf.json` is set to `true`.
* @module
*/
/**
* A key to be used to implement a special function
* on your types that define how your type should be serialized
* when passing across the IPC.
* @example
* Given a type in Rust that looks like this
* ```rs
* #[derive(serde::Serialize, serde::Deserialize)
* enum UserId {
*   String(String),
*   Number(u32),
* }
* ```
* `UserId::String("id")` would be serialized into `{ String: "id" }`
* and so we need to pass the same structure back to Rust
* ```ts
* import { SERIALIZE_TO_IPC_FN } from "@tauri-apps/api/core"
*
* class UserIdString {
*   id
*   constructor(id) {
*     this.id = id
*   }
*
*   [SERIALIZE_TO_IPC_FN]() {
*     return { String: this.id }
*   }
* }
*
* class UserIdNumber {
*   id
*   constructor(id) {
*     this.id = id
*   }
*
*   [SERIALIZE_TO_IPC_FN]() {
*     return { Number: this.id }
*   }
* }
*
* type UserId = UserIdString | UserIdNumber
* ```
*
*/
const SERIALIZE_TO_IPC_FN = "__TAURI_TO_IPC_KEY__";
/**
* Stores the callback in a known location, and returns an identifier that can be passed to the backend.
* The backend uses the identifier to `eval()` the callback.
*
* @return An unique identifier associated with the callback function.
*
* @since 1.0.0
*/
function transformCallback(callback, once = false) {
	return window.__TAURI_INTERNALS__.transformCallback(callback, once);
}
/**
* Sends a message to the backend.
* @example
* ```typescript
* import { invoke } from '@tauri-apps/api/core';
* await invoke('login', { user: 'tauri', password: 'poiwe3h4r5ip3yrhtew9ty' });
* ```
*
* @param cmd The command name.
* @param args The optional arguments to pass to the command.
* @param options The request options.
* @return A promise resolving or rejecting to the backend response.
*
* @since 1.0.0
*/
async function invoke(cmd, args = {}, options) {
	return window.__TAURI_INTERNALS__.invoke(cmd, args, options);
}
/**
* A rust-backed resource stored through `tauri::Manager::resources_table` API.
*
* The resource lives in the main process and does not exist
* in the Javascript world, and thus will not be cleaned up automatically
* except on application exit. If you want to clean it up early, call {@linkcode Resource.close}
*
* @example
* ```typescript
* import { Resource, invoke } from '@tauri-apps/api/core';
* export class DatabaseHandle extends Resource {
*   static async open(path: string): Promise<DatabaseHandle> {
*     const rid: number = await invoke('open_db', { path });
*     return new DatabaseHandle(rid);
*   }
*
*   async execute(sql: string): Promise<void> {
*     await invoke('execute_sql', { rid: this.rid, sql });
*   }
* }
* ```
*/
var Resource = class {
	get rid() {
		return __classPrivateFieldGet(this, _Resource_rid, "f");
	}
	constructor(rid) {
		_Resource_rid.set(this, void 0);
		__classPrivateFieldSet(this, _Resource_rid, rid, "f");
	}
	/**
	* Destroys and cleans up this resource from memory.
	* **You should not call any method on this object anymore and should drop any reference to it.**
	*/
	async close() {
		return invoke("plugin:resources|close", { rid: this.rid });
	}
};
_Resource_rid = /* @__PURE__ */ new WeakMap();
//#endregion
//#region node_modules/@tauri-apps/plugin-os/dist-js/index.js
/**
* Returns a string describing the specific operating system in use.
* The value is set at compile time. Possible values are `'linux'`, `'macos'`, `'ios'`, `'freebsd'`, `'dragonfly'`, `'netbsd'`, `'openbsd'`, `'solaris'`, `'android'`, `'windows'`
*
* @example
* ```typescript
* import { platform } from '@tauri-apps/plugin-os';
* const platformName = platform();
* ```
*
* @since 2.0.0
*
*/
function platform() {
	return window.__TAURI_OS_PLUGIN_INTERNALS__.platform;
}
/**
* Returns the current operating system family. Possible values are `'unix'`, `'windows'`.
* @example
* ```typescript
* import { family } from '@tauri-apps/plugin-os';
* const family = family();
* ```
*
* @since 2.0.0
*/
function family() {
	return window.__TAURI_OS_PLUGIN_INTERNALS__.family;
}
/**
* Returns the current operating system architecture.
* Possible values are `'x86'`, `'x86_64'`, `'arm'`, `'aarch64'`, `'mips'`, `'mips64'`, `'powerpc'`, `'powerpc64'`, `'riscv64'`, `'s390x'`, `'sparc64'`.
* @example
* ```typescript
* import { arch } from '@tauri-apps/plugin-os';
* const archName = arch();
* ```
*
* @since 2.0.0
*/
function arch() {
	return window.__TAURI_OS_PLUGIN_INTERNALS__.arch;
}
/**
* Returns a String with a `BCP-47` language tag inside. If the locale couldn’t be obtained, `null` is returned instead.
* @example
* ```typescript
* import { locale } from '@tauri-apps/plugin-os';
* const locale = await locale();
* if (locale) {
*    // use the locale string here
* }
* ```
*
* @since 2.0.0
*/
async function locale() {
	return await invoke("plugin:os|locale");
}
//#endregion
//#region src/registry.ts
const sectionOrder = [];
const sections = /* @__PURE__ */ new Map();
const methods = {};
const menus = {};
function registerBlock(section, block, handler) {
	if (!sections.has(section)) {
		sections.set(section, []);
		sectionOrder.push(section);
	}
	sections.get(section).push({
		block,
		handler
	});
	if (handler) methods[block.func ?? block.opcode] = handler;
}
function registerMenu(name, menu, handler) {
	menus[name] = menu;
	if (handler) methods[name] = handler;
}
function buildExtensionBlocks() {
	const result = [];
	for (const section of sectionOrder) {
		if (result.length > 0) result.push("---");
		result.push({
			blockType: Scratch.BlockType.LABEL,
			text: section
		});
		for (const { block } of sections.get(section)) result.push(block);
	}
	return result;
}
function getMethods() {
	return methods;
}
function getMenus() {
	return menus;
}
//#endregion
//#region src/blocks/os.ts
const famliyReporter = {
	blockType: Scratch.BlockType.REPORTER,
	opcode: "getFamliy",
	text: "Get Famliy"
};
function getFamliy() {
	return family();
}
const archReporter = {
	blockType: Scratch.BlockType.REPORTER,
	opcode: "getArch",
	text: "Arch"
};
function getArch() {
	return arch();
}
const localeReporter = {
	blockType: Scratch.BlockType.REPORTER,
	opcode: "getLocale",
	text: "System Locale"
};
async function getLocale() {
	return locale();
}
const platformReporter = {
	blockType: Scratch.BlockType.REPORTER,
	opcode: "getplatform",
	text: "Platform"
};
async function getplatform() {
	return platform();
}
registerBlock("OS", famliyReporter, getFamliy);
registerBlock("OS", platformReporter, getplatform);
registerBlock("OS", archReporter, getArch);
registerBlock("OS", localeReporter, getLocale);
//#endregion
//#region node_modules/@tauri-apps/api/dpi.js
/**
* A size represented in logical pixels.
* Logical pixels are scaled according to the window's DPI scale.
* Most browser APIs (i.e. `MouseEvent`'s `clientX`) will return logical pixels.
*
* For logical-pixel-based position, see {@linkcode LogicalPosition}.
*
* @since 2.0.0
*/
var LogicalSize = class {
	constructor(...args) {
		this.type = "Logical";
		if (args.length === 1) {
			if ("Logical" in args[0]) {
				this.width = args[0].Logical.width;
				this.height = args[0].Logical.height;
			} else {
				this.width = args[0].width;
				this.height = args[0].height;
			}
		} else {
			this.width = args[0];
			this.height = args[1];
		}
	}
	/**
	* Converts the logical size to a physical one.
	* @example
	* ```typescript
	* import { LogicalSize } from '@tauri-apps/api/dpi';
	* import { getCurrentWindow } from '@tauri-apps/api/window';
	*
	* const appWindow = getCurrentWindow();
	* const factor = await appWindow.scaleFactor();
	* const size = new LogicalSize(400, 500);
	* const physical = size.toPhysical(factor);
	* ```
	*
	* @since 2.0.0
	*/
	toPhysical(scaleFactor) {
		return new PhysicalSize(this.width * scaleFactor, this.height * scaleFactor);
	}
	[SERIALIZE_TO_IPC_FN]() {
		return {
			width: this.width,
			height: this.height
		};
	}
	toJSON() {
		return this[SERIALIZE_TO_IPC_FN]();
	}
};
/**
* A size represented in physical pixels.
*
* Physical pixels represent actual screen pixels, and are DPI-independent.
* For high-DPI windows, this means that any point in the window on the screen
* will have a different position in logical pixels {@linkcode LogicalSize}.
*
* For physical-pixel-based position, see {@linkcode PhysicalPosition}.
*
* @since 2.0.0
*/
var PhysicalSize = class {
	constructor(...args) {
		this.type = "Physical";
		if (args.length === 1) {
			if ("Physical" in args[0]) {
				this.width = args[0].Physical.width;
				this.height = args[0].Physical.height;
			} else {
				this.width = args[0].width;
				this.height = args[0].height;
			}
		} else {
			this.width = args[0];
			this.height = args[1];
		}
	}
	/**
	* Converts the physical size to a logical one.
	* @example
	* ```typescript
	* import { getCurrentWindow } from '@tauri-apps/api/window';
	* const appWindow = getCurrentWindow();
	* const factor = await appWindow.scaleFactor();
	* const size = await appWindow.innerSize(); // PhysicalSize
	* const logical = size.toLogical(factor);
	* ```
	*/
	toLogical(scaleFactor) {
		return new LogicalSize(this.width / scaleFactor, this.height / scaleFactor);
	}
	[SERIALIZE_TO_IPC_FN]() {
		return {
			width: this.width,
			height: this.height
		};
	}
	toJSON() {
		return this[SERIALIZE_TO_IPC_FN]();
	}
};
/**
* A size represented either in physical or in logical pixels.
*
* This type is basically a union type of {@linkcode LogicalSize} and {@linkcode PhysicalSize}
* but comes in handy when using `tauri::Size` in Rust as an argument to a command, as this class
* automatically serializes into a valid format so it can be deserialized correctly into `tauri::Size`
*
* So instead of
* ```typescript
* import { invoke } from '@tauri-apps/api/core';
* import { LogicalSize, PhysicalSize } from '@tauri-apps/api/dpi';
*
* const size: LogicalSize | PhysicalSize = someFunction(); // where someFunction returns either LogicalSize or PhysicalSize
* const validSize = size instanceof LogicalSize
*   ? { Logical: { width: size.width, height: size.height } }
*   : { Physical: { width: size.width, height: size.height } }
* await invoke("do_something_with_size", { size: validSize });
* ```
*
* You can just use {@linkcode Size}
* ```typescript
* import { invoke } from '@tauri-apps/api/core';
* import { LogicalSize, PhysicalSize, Size } from '@tauri-apps/api/dpi';
*
* const size: LogicalSize | PhysicalSize = someFunction(); // where someFunction returns either LogicalSize or PhysicalSize
* const validSize = new Size(size);
* await invoke("do_something_with_size", { size: validSize });
* ```
*
* @since 2.1.0
*/
var Size = class {
	constructor(size) {
		this.size = size;
	}
	toLogical(scaleFactor) {
		return this.size instanceof LogicalSize ? this.size : this.size.toLogical(scaleFactor);
	}
	toPhysical(scaleFactor) {
		return this.size instanceof PhysicalSize ? this.size : this.size.toPhysical(scaleFactor);
	}
	[SERIALIZE_TO_IPC_FN]() {
		return { [`${this.size.type}`]: {
			width: this.size.width,
			height: this.size.height
		} };
	}
	toJSON() {
		return this[SERIALIZE_TO_IPC_FN]();
	}
};
/**
* A position represented in logical pixels.
* For an explanation of what logical pixels are, see description of {@linkcode LogicalSize}.
*
* @since 2.0.0
*/
var LogicalPosition = class {
	constructor(...args) {
		this.type = "Logical";
		if (args.length === 1) {
			if ("Logical" in args[0]) {
				this.x = args[0].Logical.x;
				this.y = args[0].Logical.y;
			} else {
				this.x = args[0].x;
				this.y = args[0].y;
			}
		} else {
			this.x = args[0];
			this.y = args[1];
		}
	}
	/**
	* Converts the logical position to a physical one.
	* @example
	* ```typescript
	* import { LogicalPosition } from '@tauri-apps/api/dpi';
	* import { getCurrentWindow } from '@tauri-apps/api/window';
	*
	* const appWindow = getCurrentWindow();
	* const factor = await appWindow.scaleFactor();
	* const position = new LogicalPosition(400, 500);
	* const physical = position.toPhysical(factor);
	* ```
	*
	* @since 2.0.0
	*/
	toPhysical(scaleFactor) {
		return new PhysicalPosition(this.x * scaleFactor, this.y * scaleFactor);
	}
	[SERIALIZE_TO_IPC_FN]() {
		return {
			x: this.x,
			y: this.y
		};
	}
	toJSON() {
		return this[SERIALIZE_TO_IPC_FN]();
	}
};
/**
* A position represented in physical pixels.
*
* For an explanation of what physical pixels are, see description of {@linkcode PhysicalSize}.
*
* @since 2.0.0
*/
var PhysicalPosition = class {
	constructor(...args) {
		this.type = "Physical";
		if (args.length === 1) {
			if ("Physical" in args[0]) {
				this.x = args[0].Physical.x;
				this.y = args[0].Physical.y;
			} else {
				this.x = args[0].x;
				this.y = args[0].y;
			}
		} else {
			this.x = args[0];
			this.y = args[1];
		}
	}
	/**
	* Converts the physical position to a logical one.
	* @example
	* ```typescript
	* import { PhysicalPosition } from '@tauri-apps/api/dpi';
	* import { getCurrentWindow } from '@tauri-apps/api/window';
	*
	* const appWindow = getCurrentWindow();
	* const factor = await appWindow.scaleFactor();
	* const position = new PhysicalPosition(400, 500);
	* const physical = position.toLogical(factor);
	* ```
	*
	* @since 2.0.0
	*/
	toLogical(scaleFactor) {
		return new LogicalPosition(this.x / scaleFactor, this.y / scaleFactor);
	}
	[SERIALIZE_TO_IPC_FN]() {
		return {
			x: this.x,
			y: this.y
		};
	}
	toJSON() {
		return this[SERIALIZE_TO_IPC_FN]();
	}
};
/**
* A position represented either in physical or in logical pixels.
*
* This type is basically a union type of {@linkcode LogicalSize} and {@linkcode PhysicalSize}
* but comes in handy when using `tauri::Position` in Rust as an argument to a command, as this class
* automatically serializes into a valid format so it can be deserialized correctly into `tauri::Position`
*
* So instead of
* ```typescript
* import { invoke } from '@tauri-apps/api/core';
* import { LogicalPosition, PhysicalPosition } from '@tauri-apps/api/dpi';
*
* const position: LogicalPosition | PhysicalPosition = someFunction(); // where someFunction returns either LogicalPosition or PhysicalPosition
* const validPosition = position instanceof LogicalPosition
*   ? { Logical: { x: position.x, y: position.y } }
*   : { Physical: { x: position.x, y: position.y } }
* await invoke("do_something_with_position", { position: validPosition });
* ```
*
* You can just use {@linkcode Position}
* ```typescript
* import { invoke } from '@tauri-apps/api/core';
* import { LogicalPosition, PhysicalPosition, Position } from '@tauri-apps/api/dpi';
*
* const position: LogicalPosition | PhysicalPosition = someFunction(); // where someFunction returns either LogicalPosition or PhysicalPosition
* const validPosition = new Position(position);
* await invoke("do_something_with_position", { position: validPosition });
* ```
*
* @since 2.1.0
*/
var Position = class {
	constructor(position) {
		this.position = position;
	}
	toLogical(scaleFactor) {
		return this.position instanceof LogicalPosition ? this.position : this.position.toLogical(scaleFactor);
	}
	toPhysical(scaleFactor) {
		return this.position instanceof PhysicalPosition ? this.position : this.position.toPhysical(scaleFactor);
	}
	[SERIALIZE_TO_IPC_FN]() {
		return { [`${this.position.type}`]: {
			x: this.position.x,
			y: this.position.y
		} };
	}
	toJSON() {
		return this[SERIALIZE_TO_IPC_FN]();
	}
};
//#endregion
//#region node_modules/@tauri-apps/api/event.js
/**
* The event system allows you to emit events to the backend and listen to events from it.
*
* This package is also accessible with `window.__TAURI__.event` when [`app.withGlobalTauri`](https://v2.tauri.app/reference/config/#withglobaltauri) in `tauri.conf.json` is set to `true`.
* @module
*/
/**
* @since 1.1.0
*/
var TauriEvent;
(function(TauriEvent) {
	TauriEvent["WINDOW_RESIZED"] = "tauri://resize";
	TauriEvent["WINDOW_MOVED"] = "tauri://move";
	TauriEvent["WINDOW_CLOSE_REQUESTED"] = "tauri://close-requested";
	TauriEvent["WINDOW_DESTROYED"] = "tauri://destroyed";
	TauriEvent["WINDOW_FOCUS"] = "tauri://focus";
	TauriEvent["WINDOW_BLUR"] = "tauri://blur";
	TauriEvent["WINDOW_SCALE_FACTOR_CHANGED"] = "tauri://scale-change";
	TauriEvent["WINDOW_THEME_CHANGED"] = "tauri://theme-changed";
	TauriEvent["WINDOW_CREATED"] = "tauri://window-created";
	TauriEvent["WINDOW_SUSPENDED"] = "tauri://suspended";
	TauriEvent["WINDOW_RESUMED"] = "tauri://resumed";
	TauriEvent["WEBVIEW_CREATED"] = "tauri://webview-created";
	TauriEvent["DRAG_ENTER"] = "tauri://drag-enter";
	TauriEvent["DRAG_OVER"] = "tauri://drag-over";
	TauriEvent["DRAG_DROP"] = "tauri://drag-drop";
	TauriEvent["DRAG_LEAVE"] = "tauri://drag-leave";
})(TauriEvent || (TauriEvent = {}));
/**
* Unregister the event listener associated with the given name and id.
*
* @ignore
* @param event The event name
* @param eventId Event identifier
* @returns
*/
async function _unlisten(event, eventId) {
	window.__TAURI_EVENT_PLUGIN_INTERNALS__.unregisterListener(event, eventId);
	await invoke("plugin:event|unlisten", {
		event,
		eventId
	});
}
/**
* Listen to an emitted event to any {@link EventTarget|target}.
*
* @example
* ```typescript
* import { listen } from '@tauri-apps/api/event';
* const unlisten = await listen<string>('error', (event) => {
*   console.log(`Got error, payload: ${event.payload}`);
* });
*
* // you need to call unlisten if your handler goes out of scope e.g. the component is unmounted
* unlisten();
* ```
*
* @param event Event name. Must include only alphanumeric characters, `-`, `/`, `:` and `_`.
* @param handler Event handler callback.
* @param options Event listening options.
* @returns A promise resolving to a function to unlisten to the event.
* Note that removing the listener is required if your listener goes out of scope e.g. the component is unmounted.
*
* @since 1.0.0
*/
async function listen(event, handler, options) {
	var _a;
	return invoke("plugin:event|listen", {
		event,
		target: typeof (options === null || options === void 0 ? void 0 : options.target) === "string" ? {
			kind: "AnyLabel",
			label: options.target
		} : (_a = options === null || options === void 0 ? void 0 : options.target) !== null && _a !== void 0 ? _a : { kind: "Any" },
		handler: transformCallback(handler)
	}).then((eventId) => {
		return async () => _unlisten(event, eventId);
	});
}
/**
* Listens once to an emitted event to any {@link EventTarget|target}.
*
* @example
* ```typescript
* import { once } from '@tauri-apps/api/event';
* interface LoadedPayload {
*   loggedIn: boolean,
*   token: string
* }
* const unlisten = await once<LoadedPayload>('loaded', (event) => {
*   console.log(`App is loaded, loggedIn: ${event.payload.loggedIn}, token: ${event.payload.token}`);
* });
*
* // you need to call unlisten if your handler goes out of scope e.g. the component is unmounted
* unlisten();
* ```
*
* @param event Event name. Must include only alphanumeric characters, `-`, `/`, `:` and `_`.
* @param handler Event handler callback.
* @param options Event listening options.
* @returns A promise resolving to a function to unlisten to the event.
* Note that removing the listener is required if your listener goes out of scope e.g. the component is unmounted.
*
* @since 1.0.0
*/
async function once(event, handler, options) {
	return listen(event, (eventData) => {
		_unlisten(event, eventData.id);
		handler(eventData);
	}, options);
}
/**
* Emits an event to all {@link EventTarget|targets}.
*
* @example
* ```typescript
* import { emit } from '@tauri-apps/api/event';
* await emit('frontend-loaded', { loggedIn: true, token: 'authToken' });
* ```
*
* @param event Event name. Must include only alphanumeric characters, `-`, `/`, `:` and `_`.
* @param payload Event payload.
*
* @since 1.0.0
*/
async function emit(event, payload) {
	await invoke("plugin:event|emit", {
		event,
		payload
	});
}
/**
* Emits an event to all {@link EventTarget|targets} matching the given target.
*
* @example
* ```typescript
* import { emitTo } from '@tauri-apps/api/event';
* await emitTo('main', 'frontend-loaded', { loggedIn: true, token: 'authToken' });
* ```
*
* @param target Label of the target Window/Webview/WebviewWindow or raw {@link EventTarget} object.
* @param event Event name. Must include only alphanumeric characters, `-`, `/`, `:` and `_`.
* @param payload Event payload.
*
* @since 2.0.0
*/
async function emitTo(target, event, payload) {
	await invoke("plugin:event|emit_to", {
		target: typeof target === "string" ? {
			kind: "AnyLabel",
			label: target
		} : target,
		event,
		payload
	});
}
//#endregion
//#region node_modules/@tauri-apps/api/image.js
/** An RGBA Image in row-major order from top to bottom. */
var Image = class Image extends Resource {
	/**
	* Creates an Image from a resource ID. For internal use only.
	*
	* @ignore
	*/
	constructor(rid) {
		super(rid);
	}
	/** Creates a new Image using RGBA data, in row-major order from top to bottom, and with specified width and height. */
	static async new(rgba, width, height) {
		return invoke("plugin:image|new", {
			rgba: transformImage(rgba),
			width,
			height
		}).then((rid) => new Image(rid));
	}
	/**
	* Creates a new image using the provided bytes by inferring the file format.
	* If the format is known, prefer [@link Image.fromPngBytes] or [@link Image.fromIcoBytes].
	*
	* Only `ico` and `png` are supported (based on activated feature flag).
	*
	* Note that you need the `image-ico` or `image-png` Cargo features to use this API.
	* To enable it, change your Cargo.toml file:
	* ```toml
	* [dependencies]
	* tauri = { version = "...", features = ["...", "image-png"] }
	* ```
	*/
	static async fromBytes(bytes) {
		return invoke("plugin:image|from_bytes", { bytes: transformImage(bytes) }).then((rid) => new Image(rid));
	}
	/**
	* Creates a new image using the provided path.
	*
	* Only `ico` and `png` are supported (based on activated feature flag).
	*
	* Note that you need the `image-ico` or `image-png` Cargo features to use this API.
	* To enable it, change your Cargo.toml file:
	* ```toml
	* [dependencies]
	* tauri = { version = "...", features = ["...", "image-png"] }
	* ```
	*/
	static async fromPath(path) {
		return invoke("plugin:image|from_path", { path }).then((rid) => new Image(rid));
	}
	/** Returns the RGBA data for this image, in row-major order from top to bottom.  */
	async rgba() {
		return invoke("plugin:image|rgba", { rid: this.rid }).then((buffer) => new Uint8Array(buffer));
	}
	/** Returns the size of this image.  */
	async size() {
		return invoke("plugin:image|size", { rid: this.rid });
	}
};
/**
* Transforms image from various types into a type acceptable by Rust.
*
* See [tauri::image::JsImage](https://docs.rs/tauri/2/tauri/image/enum.JsImage.html) for more information.
* Note the API signature is not stable and might change.
*/
function transformImage(image) {
	return image == null ? null : typeof image === "string" ? image : image instanceof Image ? image.rid : image;
}
//#endregion
//#region node_modules/@tauri-apps/api/window.js
/**
* Provides APIs to create windows, communicate with other windows and manipulate the current window.
*
* #### Window events
*
* Events can be listened to using {@link Window.listen}:
* ```typescript
* import { getCurrentWindow } from "@tauri-apps/api/window";
* getCurrentWindow().listen("my-window-event", ({ event, payload }) => { });
* ```
*
* @module
*/
/**
* Attention type to request on a window.
*
* @since 1.0.0
*/
var UserAttentionType;
(function(UserAttentionType) {
	/**
	* #### Platform-specific
	* - **macOS:** Bounces the dock icon until the application is in focus.
	* - **Windows:** Flashes both the window and the taskbar button until the application is in focus.
	*/
	UserAttentionType[UserAttentionType["Critical"] = 1] = "Critical";
	/**
	* #### Platform-specific
	* - **macOS:** Bounces the dock icon once.
	* - **Windows:** Flashes the taskbar button until the application is in focus.
	*/
	UserAttentionType[UserAttentionType["Informational"] = 2] = "Informational";
})(UserAttentionType || (UserAttentionType = {}));
var CloseRequestedEvent = class {
	constructor(event) {
		this._preventDefault = false;
		this.event = event.event;
		this.id = event.id;
	}
	preventDefault() {
		this._preventDefault = true;
	}
	isPreventDefault() {
		return this._preventDefault;
	}
};
var ProgressBarStatus;
(function(ProgressBarStatus) {
	/**
	* Hide progress bar.
	*/
	ProgressBarStatus["None"] = "none";
	/**
	* Normal state.
	*/
	ProgressBarStatus["Normal"] = "normal";
	/**
	* Indeterminate state. **Treated as Normal on Linux and macOS**
	*/
	ProgressBarStatus["Indeterminate"] = "indeterminate";
	/**
	* Paused state. **Treated as Normal on Linux**
	*/
	ProgressBarStatus["Paused"] = "paused";
	/**
	* Error state. **Treated as Normal on linux**
	*/
	ProgressBarStatus["Error"] = "error";
})(ProgressBarStatus || (ProgressBarStatus = {}));
/**
* Get an instance of `Window` for the current window.
*
* @since 1.0.0
*/
function getCurrentWindow() {
	return new Window(window.__TAURI_INTERNALS__.metadata.currentWindow.label, { skip: true });
}
/**
* Gets a list of instances of `Window` for all available windows.
*
* @since 1.0.0
*/
async function getAllWindows() {
	return invoke("plugin:window|get_all_windows").then((windows) => windows.map((w) => new Window(w, { skip: true })));
}
/** @ignore */
const localTauriEvents$1 = ["tauri://created", "tauri://error"];
/**
* Create new window or get a handle to an existing one.
*
* Windows are identified by a *label*  a unique identifier that can be used to reference it later.
* It may only contain alphanumeric characters `a-zA-Z` plus the following special characters `-`, `/`, `:` and `_`.
*
* @example
* ```typescript
* import { Window } from "@tauri-apps/api/window"
*
* const appWindow = new Window('theUniqueLabel');
*
* appWindow.once('tauri://created', function () {
*  // window successfully created
* });
* appWindow.once('tauri://error', function (e) {
*  // an error happened creating the window
* });
*
* // emit an event to the backend
* await appWindow.emit("some-event", "data");
* // listen to an event from the backend
* const unlisten = await appWindow.listen("event-name", e => {});
* unlisten();
* ```
*
* @since 2.0.0
*/
var Window = class {
	/**
	* Creates a new Window.
	* @example
	* ```typescript
	* import { Window } from '@tauri-apps/api/window';
	* const appWindow = new Window('my-label');
	* appWindow.once('tauri://created', function () {
	*  // window successfully created
	* });
	* appWindow.once('tauri://error', function (e) {
	*  // an error happened creating the window
	* });
	* ```
	*
	* @param label The unique window label. Must be alphanumeric: `a-zA-Z-/:_`.
	* @returns The {@link Window} instance to communicate with the window.
	*/
	constructor(label, options = {}) {
		var _a;
		this.label = label;
		this.listeners = Object.create(null);
		if (!(options === null || options === void 0 ? void 0 : options.skip)) invoke("plugin:window|create", { options: {
			...options,
			parent: typeof options.parent === "string" ? options.parent : (_a = options.parent) === null || _a === void 0 ? void 0 : _a.label,
			label
		} }).then(async () => this.emit("tauri://created")).catch(async (e) => this.emit("tauri://error", e));
	}
	/**
	* Gets the Window associated with the given label.
	* @example
	* ```typescript
	* import { Window } from '@tauri-apps/api/window';
	* const mainWindow = Window.getByLabel('main');
	* ```
	*
	* @param label The window label.
	* @returns The Window instance to communicate with the window or null if the window doesn't exist.
	*/
	static async getByLabel(label) {
		var _a;
		return (_a = (await getAllWindows()).find((w) => w.label === label)) !== null && _a !== void 0 ? _a : null;
	}
	/**
	* Get an instance of `Window` for the current window.
	*/
	static getCurrent() {
		return getCurrentWindow();
	}
	/**
	* Gets a list of instances of `Window` for all available windows.
	*/
	static async getAll() {
		return getAllWindows();
	}
	/**
	*  Gets the focused window.
	* @example
	* ```typescript
	* import { Window } from '@tauri-apps/api/window';
	* const focusedWindow = Window.getFocusedWindow();
	* ```
	*
	* @returns The Window instance or `undefined` if there is not any focused window.
	*/
	static async getFocusedWindow() {
		for (const w of await getAllWindows()) if (await w.isFocused()) return w;
		return null;
	}
	/**
	* Listen to an emitted event on this window.
	*
	* @example
	* ```typescript
	* import { getCurrentWindow } from '@tauri-apps/api/window';
	* const unlisten = await getCurrentWindow().listen<string>('state-changed', (event) => {
	*   console.log(`Got error: ${payload}`);
	* });
	*
	* // you need to call unlisten if your handler goes out of scope e.g. the component is unmounted
	* unlisten();
	* ```
	*
	* @param event Event name. Must include only alphanumeric characters, `-`, `/`, `:` and `_`.
	* @param handler Event handler.
	* @returns A promise resolving to a function to unlisten to the event.
	* Note that removing the listener is required if your listener goes out of scope e.g. the component is unmounted.
	*/
	async listen(event, handler) {
		if (this._handleTauriEvent(event, handler)) return () => {
			const listeners = this.listeners[event];
			listeners.splice(listeners.indexOf(handler), 1);
		};
		return listen(event, handler, { target: {
			kind: "Window",
			label: this.label
		} });
	}
	/**
	* Listen to an emitted event on this window only once.
	*
	* @example
	* ```typescript
	* import { getCurrentWindow } from '@tauri-apps/api/window';
	* const unlisten = await getCurrentWindow().once<null>('initialized', (event) => {
	*   console.log(`Window initialized!`);
	* });
	*
	* // you need to call unlisten if your handler goes out of scope e.g. the component is unmounted
	* unlisten();
	* ```
	*
	* @param event Event name. Must include only alphanumeric characters, `-`, `/`, `:` and `_`.
	* @param handler Event handler.
	* @returns A promise resolving to a function to unlisten to the event.
	* Note that removing the listener is required if your listener goes out of scope e.g. the component is unmounted.
	*/
	async once(event, handler) {
		if (this._handleTauriEvent(event, handler)) return () => {
			const listeners = this.listeners[event];
			listeners.splice(listeners.indexOf(handler), 1);
		};
		return once(event, handler, { target: {
			kind: "Window",
			label: this.label
		} });
	}
	/**
	* Emits an event to all {@link EventTarget|targets}.
	* @example
	* ```typescript
	* import { getCurrentWindow } from '@tauri-apps/api/window';
	* await getCurrentWindow().emit('window-loaded', { loggedIn: true, token: 'authToken' });
	* ```
	*
	* @param event Event name. Must include only alphanumeric characters, `-`, `/`, `:` and `_`.
	* @param payload Event payload.
	*/
	async emit(event, payload) {
		if (localTauriEvents$1.includes(event)) {
			for (const handler of this.listeners[event] || []) handler({
				event,
				id: -1,
				payload
			});
			return;
		}
		return emit(event, payload);
	}
	/**
	* Emits an event to all {@link EventTarget|targets} matching the given target.
	*
	* @example
	* ```typescript
	* import { getCurrentWindow } from '@tauri-apps/api/window';
	* await getCurrentWindow().emit('main', 'window-loaded', { loggedIn: true, token: 'authToken' });
	* ```
	* @param target Label of the target Window/Webview/WebviewWindow or raw {@link EventTarget} object.
	* @param event Event name. Must include only alphanumeric characters, `-`, `/`, `:` and `_`.
	* @param payload Event payload.
	*/
	async emitTo(target, event, payload) {
		if (localTauriEvents$1.includes(event)) {
			for (const handler of this.listeners[event] || []) handler({
				event,
				id: -1,
				payload
			});
			return;
		}
		return emitTo(target, event, payload);
	}
	/** @ignore */
	_handleTauriEvent(event, handler) {
		if (localTauriEvents$1.includes(event)) {
			if (!(event in this.listeners)) this.listeners[event] = [handler];
			else this.listeners[event].push(handler);
			return true;
		}
		return false;
	}
	/**
	* The scale factor that can be used to map physical pixels to logical pixels.
	* @example
	* ```typescript
	* import { getCurrentWindow } from '@tauri-apps/api/window';
	* const factor = await getCurrentWindow().scaleFactor();
	* ```
	*
	* @returns The window's monitor scale factor.
	*/
	async scaleFactor() {
		return invoke("plugin:window|scale_factor", { label: this.label });
	}
	/**
	* The position of the top-left hand corner of the window's client area relative to the top-left hand corner of the desktop.
	* @example
	* ```typescript
	* import { getCurrentWindow } from '@tauri-apps/api/window';
	* const position = await getCurrentWindow().innerPosition();
	* ```
	*
	* @returns The window's inner position.
	*/
	async innerPosition() {
		return invoke("plugin:window|inner_position", { label: this.label }).then((p) => new PhysicalPosition(p));
	}
	/**
	* The position of the top-left hand corner of the window relative to the top-left hand corner of the desktop.
	* @example
	* ```typescript
	* import { getCurrentWindow } from '@tauri-apps/api/window';
	* const position = await getCurrentWindow().outerPosition();
	* ```
	*
	* @returns The window's outer position.
	*/
	async outerPosition() {
		return invoke("plugin:window|outer_position", { label: this.label }).then((p) => new PhysicalPosition(p));
	}
	/**
	* The physical size of the window's client area.
	* The client area is the content of the window, excluding the title bar and borders.
	* @example
	* ```typescript
	* import { getCurrentWindow } from '@tauri-apps/api/window';
	* const size = await getCurrentWindow().innerSize();
	* ```
	*
	* @returns The window's inner size.
	*/
	async innerSize() {
		return invoke("plugin:window|inner_size", { label: this.label }).then((s) => new PhysicalSize(s));
	}
	/**
	* The physical size of the entire window.
	* These dimensions include the title bar and borders. If you don't want that (and you usually don't), use inner_size instead.
	* @example
	* ```typescript
	* import { getCurrentWindow } from '@tauri-apps/api/window';
	* const size = await getCurrentWindow().outerSize();
	* ```
	*
	* @returns The window's outer size.
	*/
	async outerSize() {
		return invoke("plugin:window|outer_size", { label: this.label }).then((s) => new PhysicalSize(s));
	}
	/**
	* Gets the window's current fullscreen state.
	* @example
	* ```typescript
	* import { getCurrentWindow } from '@tauri-apps/api/window';
	* const fullscreen = await getCurrentWindow().isFullscreen();
	* ```
	*
	* @returns Whether the window is in fullscreen mode or not.
	*/
	async isFullscreen() {
		return invoke("plugin:window|is_fullscreen", { label: this.label });
	}
	/**
	* Gets the window's current minimized state.
	* @example
	* ```typescript
	* import { getCurrentWindow } from '@tauri-apps/api/window';
	* const minimized = await getCurrentWindow().isMinimized();
	* ```
	*/
	async isMinimized() {
		return invoke("plugin:window|is_minimized", { label: this.label });
	}
	/**
	* Gets the window's current maximized state.
	* @example
	* ```typescript
	* import { getCurrentWindow } from '@tauri-apps/api/window';
	* const maximized = await getCurrentWindow().isMaximized();
	* ```
	*
	* @returns Whether the window is maximized or not.
	*/
	async isMaximized() {
		return invoke("plugin:window|is_maximized", { label: this.label });
	}
	/**
	* Gets the window's current focus state.
	* @example
	* ```typescript
	* import { getCurrentWindow } from '@tauri-apps/api/window';
	* const focused = await getCurrentWindow().isFocused();
	* ```
	*
	* @returns Whether the window is focused or not.
	*/
	async isFocused() {
		return invoke("plugin:window|is_focused", { label: this.label });
	}
	/**
	* Gets the window's current decorated state.
	* @example
	* ```typescript
	* import { getCurrentWindow } from '@tauri-apps/api/window';
	* const decorated = await getCurrentWindow().isDecorated();
	* ```
	*
	* @returns Whether the window is decorated or not.
	*/
	async isDecorated() {
		return invoke("plugin:window|is_decorated", { label: this.label });
	}
	/**
	* Gets the window's current resizable state.
	* @example
	* ```typescript
	* import { getCurrentWindow } from '@tauri-apps/api/window';
	* const resizable = await getCurrentWindow().isResizable();
	* ```
	*
	* @returns Whether the window is resizable or not.
	*/
	async isResizable() {
		return invoke("plugin:window|is_resizable", { label: this.label });
	}
	/**
	* Gets the window's native maximize button state.
	*
	* #### Platform-specific
	*
	* - **Linux / iOS / Android:** Unsupported.
	*
	* @example
	* ```typescript
	* import { getCurrentWindow } from '@tauri-apps/api/window';
	* const maximizable = await getCurrentWindow().isMaximizable();
	* ```
	*
	* @returns Whether the window's native maximize button is enabled or not.
	*/
	async isMaximizable() {
		return invoke("plugin:window|is_maximizable", { label: this.label });
	}
	/**
	* Gets the window's native minimize button state.
	*
	* #### Platform-specific
	*
	* - **Linux / iOS / Android:** Unsupported.
	*
	* @example
	* ```typescript
	* import { getCurrentWindow } from '@tauri-apps/api/window';
	* const minimizable = await getCurrentWindow().isMinimizable();
	* ```
	*
	* @returns Whether the window's native minimize button is enabled or not.
	*/
	async isMinimizable() {
		return invoke("plugin:window|is_minimizable", { label: this.label });
	}
	/**
	* Gets the window's native close button state.
	*
	* #### Platform-specific
	*
	* - **iOS / Android:** Unsupported.
	*
	* @example
	* ```typescript
	* import { getCurrentWindow } from '@tauri-apps/api/window';
	* const closable = await getCurrentWindow().isClosable();
	* ```
	*
	* @returns Whether the window's native close button is enabled or not.
	*/
	async isClosable() {
		return invoke("plugin:window|is_closable", { label: this.label });
	}
	/**
	* Gets the window's current visible state.
	* @example
	* ```typescript
	* import { getCurrentWindow } from '@tauri-apps/api/window';
	* const visible = await getCurrentWindow().isVisible();
	* ```
	*
	* @returns Whether the window is visible or not.
	*/
	async isVisible() {
		return invoke("plugin:window|is_visible", { label: this.label });
	}
	/**
	* Gets the window's current title.
	* @example
	* ```typescript
	* import { getCurrentWindow } from '@tauri-apps/api/window';
	* const title = await getCurrentWindow().title();
	* ```
	*/
	async title() {
		return invoke("plugin:window|title", { label: this.label });
	}
	/**
	* Gets the window's current theme.
	*
	* #### Platform-specific
	*
	* - **macOS:** Theme was introduced on macOS 10.14. Returns `light` on macOS 10.13 and below.
	*
	* @example
	* ```typescript
	* import { getCurrentWindow } from '@tauri-apps/api/window';
	* const theme = await getCurrentWindow().theme();
	* ```
	*
	* @returns The window theme.
	*/
	async theme() {
		return invoke("plugin:window|theme", { label: this.label });
	}
	/**
	* Whether the window is configured to be always on top of other windows or not.
	* @example
	* ```typescript
	* import { getCurrentWindow } from '@tauri-apps/api/window';
	* const alwaysOnTop = await getCurrentWindow().isAlwaysOnTop();
	* ```
	*
	* @returns Whether the window is visible or not.
	*/
	async isAlwaysOnTop() {
		return invoke("plugin:window|is_always_on_top", { label: this.label });
	}
	async activityName() {
		return invoke("plugin:window|activity_name", { label: this.label });
	}
	async sceneIdentifier() {
		return invoke("plugin:window|scene_identifier", { label: this.label });
	}
	/**
	* Centers the window.
	* @example
	* ```typescript
	* import { getCurrentWindow } from '@tauri-apps/api/window';
	* await getCurrentWindow().center();
	* ```
	*
	* @returns A promise indicating the success or failure of the operation.
	*/
	async center() {
		return invoke("plugin:window|center", { label: this.label });
	}
	/**
	*  Requests user attention to the window, this has no effect if the application
	* is already focused. How requesting for user attention manifests is platform dependent,
	* see `UserAttentionType` for details.
	*
	* Providing `null` will unset the request for user attention. Unsetting the request for
	* user attention might not be done automatically by the WM when the window receives input.
	*
	* #### Platform-specific
	*
	* - **macOS:** `null` has no effect.
	* - **Linux:** Urgency levels have the same effect.
	* @example
	* ```typescript
	* import { getCurrentWindow } from '@tauri-apps/api/window';
	* await getCurrentWindow().requestUserAttention();
	* ```
	*
	* @returns A promise indicating the success or failure of the operation.
	*/
	async requestUserAttention(requestType) {
		let requestType_ = null;
		if (requestType) {
			if (requestType === UserAttentionType.Critical) requestType_ = { type: "Critical" };
			else requestType_ = { type: "Informational" };
		}
		return invoke("plugin:window|request_user_attention", {
			label: this.label,
			value: requestType_
		});
	}
	/**
	* Updates the window resizable flag.
	* @example
	* ```typescript
	* import { getCurrentWindow } from '@tauri-apps/api/window';
	* await getCurrentWindow().setResizable(false);
	* ```
	*
	* @returns A promise indicating the success or failure of the operation.
	*/
	async setResizable(resizable) {
		return invoke("plugin:window|set_resizable", {
			label: this.label,
			value: resizable
		});
	}
	/**
	* Enable or disable the window.
	* @example
	* ```typescript
	* import { getCurrentWindow } from '@tauri-apps/api/window';
	* await getCurrentWindow().setEnabled(false);
	* ```
	*
	* @returns A promise indicating the success or failure of the operation.
	*
	* @since 2.0.0
	*/
	async setEnabled(enabled) {
		return invoke("plugin:window|set_enabled", {
			label: this.label,
			value: enabled
		});
	}
	/**
	* Whether the window is enabled or disabled.
	* @example
	* ```typescript
	* import { getCurrentWindow } from '@tauri-apps/api/window';
	* await getCurrentWindow().setEnabled(false);
	* ```
	*
	* @returns A promise indicating the success or failure of the operation.
	*
	* @since 2.0.0
	*/
	async isEnabled() {
		return invoke("plugin:window|is_enabled", { label: this.label });
	}
	/**
	* Sets whether the window's native maximize button is enabled or not.
	* If resizable is set to false, this setting is ignored.
	*
	* #### Platform-specific
	*
	* - **macOS:** Disables the "zoom" button in the window titlebar, which is also used to enter fullscreen mode.
	* - **Linux / iOS / Android:** Unsupported.
	*
	* @example
	* ```typescript
	* import { getCurrentWindow } from '@tauri-apps/api/window';
	* await getCurrentWindow().setMaximizable(false);
	* ```
	*
	* @returns A promise indicating the success or failure of the operation.
	*/
	async setMaximizable(maximizable) {
		return invoke("plugin:window|set_maximizable", {
			label: this.label,
			value: maximizable
		});
	}
	/**
	* Sets whether the window's native minimize button is enabled or not.
	*
	* #### Platform-specific
	*
	* - **Linux / iOS / Android:** Unsupported.
	*
	* @example
	* ```typescript
	* import { getCurrentWindow } from '@tauri-apps/api/window';
	* await getCurrentWindow().setMinimizable(false);
	* ```
	*
	* @returns A promise indicating the success or failure of the operation.
	*/
	async setMinimizable(minimizable) {
		return invoke("plugin:window|set_minimizable", {
			label: this.label,
			value: minimizable
		});
	}
	/**
	* Sets whether the window's native close button is enabled or not.
	*
	* #### Platform-specific
	*
	* - **Linux:** GTK+ will do its best to convince the window manager not to show a close button. Depending on the system, this function may not have any effect when called on a window that is already visible
	* - **iOS / Android:** Unsupported.
	*
	* @example
	* ```typescript
	* import { getCurrentWindow } from '@tauri-apps/api/window';
	* await getCurrentWindow().setClosable(false);
	* ```
	*
	* @returns A promise indicating the success or failure of the operation.
	*/
	async setClosable(closable) {
		return invoke("plugin:window|set_closable", {
			label: this.label,
			value: closable
		});
	}
	/**
	* Sets the window title.
	* @example
	* ```typescript
	* import { getCurrentWindow } from '@tauri-apps/api/window';
	* await getCurrentWindow().setTitle('Tauri');
	* ```
	*
	* @param title The new title
	* @returns A promise indicating the success or failure of the operation.
	*/
	async setTitle(title) {
		return invoke("plugin:window|set_title", {
			label: this.label,
			value: title
		});
	}
	/**
	* Maximizes the window.
	* @example
	* ```typescript
	* import { getCurrentWindow } from '@tauri-apps/api/window';
	* await getCurrentWindow().maximize();
	* ```
	*
	* @returns A promise indicating the success or failure of the operation.
	*/
	async maximize() {
		return invoke("plugin:window|maximize", { label: this.label });
	}
	/**
	* Unmaximizes the window.
	* @example
	* ```typescript
	* import { getCurrentWindow } from '@tauri-apps/api/window';
	* await getCurrentWindow().unmaximize();
	* ```
	*
	* @returns A promise indicating the success or failure of the operation.
	*/
	async unmaximize() {
		return invoke("plugin:window|unmaximize", { label: this.label });
	}
	/**
	* Toggles the window maximized state.
	* @example
	* ```typescript
	* import { getCurrentWindow } from '@tauri-apps/api/window';
	* await getCurrentWindow().toggleMaximize();
	* ```
	*
	* @returns A promise indicating the success or failure of the operation.
	*/
	async toggleMaximize() {
		return invoke("plugin:window|toggle_maximize", { label: this.label });
	}
	/**
	* Minimizes the window.
	* @example
	* ```typescript
	* import { getCurrentWindow } from '@tauri-apps/api/window';
	* await getCurrentWindow().minimize();
	* ```
	*
	* @returns A promise indicating the success or failure of the operation.
	*/
	async minimize() {
		return invoke("plugin:window|minimize", { label: this.label });
	}
	/**
	* Unminimizes the window.
	* @example
	* ```typescript
	* import { getCurrentWindow } from '@tauri-apps/api/window';
	* await getCurrentWindow().unminimize();
	* ```
	*
	* @returns A promise indicating the success or failure of the operation.
	*/
	async unminimize() {
		return invoke("plugin:window|unminimize", { label: this.label });
	}
	/**
	* Sets the window visibility to true.
	* @example
	* ```typescript
	* import { getCurrentWindow } from '@tauri-apps/api/window';
	* await getCurrentWindow().show();
	* ```
	*
	* @returns A promise indicating the success or failure of the operation.
	*/
	async show() {
		return invoke("plugin:window|show", { label: this.label });
	}
	/**
	* Sets the window visibility to false.
	* @example
	* ```typescript
	* import { getCurrentWindow } from '@tauri-apps/api/window';
	* await getCurrentWindow().hide();
	* ```
	*
	* @returns A promise indicating the success or failure of the operation.
	*/
	async hide() {
		return invoke("plugin:window|hide", { label: this.label });
	}
	/**
	* Closes the window.
	*
	* Note this emits a closeRequested event so you can intercept it. To force window close, use {@link Window.destroy}.
	* @example
	* ```typescript
	* import { getCurrentWindow } from '@tauri-apps/api/window';
	* await getCurrentWindow().close();
	* ```
	*
	* @returns A promise indicating the success or failure of the operation.
	*/
	async close() {
		return invoke("plugin:window|close", { label: this.label });
	}
	/**
	* Destroys the window. Behaves like {@link Window.close} but forces the window close instead of emitting a closeRequested event.
	* @example
	* ```typescript
	* import { getCurrentWindow } from '@tauri-apps/api/window';
	* await getCurrentWindow().destroy();
	* ```
	*
	* @returns A promise indicating the success or failure of the operation.
	*/
	async destroy() {
		return invoke("plugin:window|destroy", { label: this.label });
	}
	/**
	* Whether the window should have borders and bars.
	* @example
	* ```typescript
	* import { getCurrentWindow } from '@tauri-apps/api/window';
	* await getCurrentWindow().setDecorations(false);
	* ```
	*
	* @param decorations Whether the window should have borders and bars.
	* @returns A promise indicating the success or failure of the operation.
	*/
	async setDecorations(decorations) {
		return invoke("plugin:window|set_decorations", {
			label: this.label,
			value: decorations
		});
	}
	/**
	* Whether or not the window should have shadow.
	*
	* #### Platform-specific
	*
	* - **Windows:**
	*   - `false` has no effect on decorated window, shadows are always ON.
	*   - `true` will make undecorated window have a 1px white border,
	* and on Windows 11, it will have a rounded corners.
	* - **Linux:** Unsupported.
	*
	* @example
	* ```typescript
	* import { getCurrentWindow } from '@tauri-apps/api/window';
	* await getCurrentWindow().setShadow(false);
	* ```
	*
	* @returns A promise indicating the success or failure of the operation.
	*/
	async setShadow(enable) {
		return invoke("plugin:window|set_shadow", {
			label: this.label,
			value: enable
		});
	}
	/**
	* Set window effects.
	*/
	async setEffects(effects) {
		return invoke("plugin:window|set_effects", {
			label: this.label,
			value: effects
		});
	}
	/**
	* Clear any applied effects if possible.
	*/
	async clearEffects() {
		return invoke("plugin:window|set_effects", {
			label: this.label,
			value: null
		});
	}
	/**
	* Whether the window should always be on top of other windows.
	* @example
	* ```typescript
	* import { getCurrentWindow } from '@tauri-apps/api/window';
	* await getCurrentWindow().setAlwaysOnTop(true);
	* ```
	*
	* @param alwaysOnTop Whether the window should always be on top of other windows or not.
	* @returns A promise indicating the success or failure of the operation.
	*/
	async setAlwaysOnTop(alwaysOnTop) {
		return invoke("plugin:window|set_always_on_top", {
			label: this.label,
			value: alwaysOnTop
		});
	}
	/**
	* Whether the window should always be below other windows.
	* @example
	* ```typescript
	* import { getCurrentWindow } from '@tauri-apps/api/window';
	* await getCurrentWindow().setAlwaysOnBottom(true);
	* ```
	*
	* @param alwaysOnBottom Whether the window should always be below other windows or not.
	* @returns A promise indicating the success or failure of the operation.
	*/
	async setAlwaysOnBottom(alwaysOnBottom) {
		return invoke("plugin:window|set_always_on_bottom", {
			label: this.label,
			value: alwaysOnBottom
		});
	}
	/**
	* Prevents the window contents from being captured by other apps.
	* @example
	* ```typescript
	* import { getCurrentWindow } from '@tauri-apps/api/window';
	* await getCurrentWindow().setContentProtected(true);
	* ```
	*
	* @returns A promise indicating the success or failure of the operation.
	*/
	async setContentProtected(protected_) {
		return invoke("plugin:window|set_content_protected", {
			label: this.label,
			value: protected_
		});
	}
	/**
	* Resizes the window with a new inner size.
	* @example
	* ```typescript
	* import { getCurrentWindow, LogicalSize } from '@tauri-apps/api/window';
	* await getCurrentWindow().setSize(new LogicalSize(600, 500));
	* ```
	*
	* @param size The logical or physical inner size.
	* @returns A promise indicating the success or failure of the operation.
	*/
	async setSize(size) {
		return invoke("plugin:window|set_size", {
			label: this.label,
			value: size instanceof Size ? size : new Size(size)
		});
	}
	/**
	* Sets the window minimum inner size. If the `size` argument is not provided, the constraint is unset.
	* @example
	* ```typescript
	* import { getCurrentWindow, PhysicalSize } from '@tauri-apps/api/window';
	* await getCurrentWindow().setMinSize(new PhysicalSize(600, 500));
	* ```
	*
	* @param size The logical or physical inner size, or `null` to unset the constraint.
	* @returns A promise indicating the success or failure of the operation.
	*/
	async setMinSize(size) {
		return invoke("plugin:window|set_min_size", {
			label: this.label,
			value: size instanceof Size ? size : size ? new Size(size) : null
		});
	}
	/**
	* Sets the window maximum inner size. If the `size` argument is undefined, the constraint is unset.
	* @example
	* ```typescript
	* import { getCurrentWindow, LogicalSize } from '@tauri-apps/api/window';
	* await getCurrentWindow().setMaxSize(new LogicalSize(600, 500));
	* ```
	*
	* @param size The logical or physical inner size, or `null` to unset the constraint.
	* @returns A promise indicating the success or failure of the operation.
	*/
	async setMaxSize(size) {
		return invoke("plugin:window|set_max_size", {
			label: this.label,
			value: size instanceof Size ? size : size ? new Size(size) : null
		});
	}
	/**
	* Sets the window inner size constraints.
	* @example
	* ```typescript
	* import { getCurrentWindow } from '@tauri-apps/api/window';
	* await getCurrentWindow().setSizeConstraints({ minWidth: 300 });
	* ```
	*
	* @param constraints The logical or physical inner size, or `null` to unset the constraint.
	* @returns A promise indicating the success or failure of the operation.
	*/
	async setSizeConstraints(constraints) {
		function logical(pixel) {
			return pixel ? { Logical: pixel } : null;
		}
		return invoke("plugin:window|set_size_constraints", {
			label: this.label,
			value: {
				minWidth: logical(constraints === null || constraints === void 0 ? void 0 : constraints.minWidth),
				minHeight: logical(constraints === null || constraints === void 0 ? void 0 : constraints.minHeight),
				maxWidth: logical(constraints === null || constraints === void 0 ? void 0 : constraints.maxWidth),
				maxHeight: logical(constraints === null || constraints === void 0 ? void 0 : constraints.maxHeight)
			}
		});
	}
	/**
	* Sets the window outer position.
	* @example
	* ```typescript
	* import { getCurrentWindow, LogicalPosition } from '@tauri-apps/api/window';
	* await getCurrentWindow().setPosition(new LogicalPosition(600, 500));
	* ```
	*
	* @param position The new position, in logical or physical pixels.
	* @returns A promise indicating the success or failure of the operation.
	*/
	async setPosition(position) {
		return invoke("plugin:window|set_position", {
			label: this.label,
			value: position instanceof Position ? position : new Position(position)
		});
	}
	/**
	* Sets the window fullscreen state.
	* @example
	* ```typescript
	* import { getCurrentWindow } from '@tauri-apps/api/window';
	* await getCurrentWindow().setFullscreen(true);
	* ```
	*
	* @param fullscreen Whether the window should go to fullscreen or not.
	* @returns A promise indicating the success or failure of the operation.
	*/
	async setFullscreen(fullscreen) {
		return invoke("plugin:window|set_fullscreen", {
			label: this.label,
			value: fullscreen
		});
	}
	/**
	* On macOS, Toggles a fullscreen mode that doesn’t require a new macOS space. Returns a boolean indicating whether the transition was successful (this won’t work if the window was already in the native fullscreen).
	* This is how fullscreen used to work on macOS in versions before Lion. And allows the user to have a fullscreen window without using another space or taking control over the entire monitor.
	*
	* On other platforms, this is the same as {@link Window.setFullscreen}.
	*
	* @param fullscreen Whether the window should go to simple fullscreen or not.
	* @returns A promise indicating the success or failure of the operation.
	*/
	async setSimpleFullscreen(fullscreen) {
		return invoke("plugin:window|set_simple_fullscreen", {
			label: this.label,
			value: fullscreen
		});
	}
	/**
	* Bring the window to front and focus.
	* @example
	* ```typescript
	* import { getCurrentWindow } from '@tauri-apps/api/window';
	* await getCurrentWindow().setFocus();
	* ```
	*
	* @returns A promise indicating the success or failure of the operation.
	*/
	async setFocus() {
		return invoke("plugin:window|set_focus", { label: this.label });
	}
	/**
	* Sets whether the window can be focused.
	*
	* #### Platform-specific
	*
	* - **macOS**: If the window is already focused, it is not possible to unfocus it after calling `set_focusable(false)`.
	*   In this case, you might consider calling {@link Window.setFocus} but it will move the window to the back i.e. at the bottom in terms of z-order.
	*
	* @example
	* ```typescript
	* import { getCurrentWindow } from '@tauri-apps/api/window';
	* await getCurrentWindow().setFocusable(true);
	* ```
	*
	* @param focusable Whether the window can be focused.
	* @returns A promise indicating the success or failure of the operation.
	*/
	async setFocusable(focusable) {
		return invoke("plugin:window|set_focusable", {
			label: this.label,
			value: focusable
		});
	}
	/**
	* Sets the window icon.
	* @example
	* ```typescript
	* import { getCurrentWindow } from '@tauri-apps/api/window';
	* await getCurrentWindow().setIcon('/tauri/awesome.png');
	* ```
	*
	* Note that you may need the `image-ico` or `image-png` Cargo features to use this API.
	* To enable it, change your Cargo.toml file:
	* ```toml
	* [dependencies]
	* tauri = { version = "...", features = ["...", "image-png"] }
	* ```
	*
	* @param icon Icon bytes or path to the icon file.
	* @returns A promise indicating the success or failure of the operation.
	*/
	async setIcon(icon) {
		return invoke("plugin:window|set_icon", {
			label: this.label,
			value: transformImage(icon)
		});
	}
	/**
	* Whether the window icon should be hidden from the taskbar or not.
	*
	* #### Platform-specific
	*
	* - **macOS:** Unsupported.
	* @example
	* ```typescript
	* import { getCurrentWindow } from '@tauri-apps/api/window';
	* await getCurrentWindow().setSkipTaskbar(true);
	* ```
	*
	* @param skip true to hide window icon, false to show it.
	* @returns A promise indicating the success or failure of the operation.
	*/
	async setSkipTaskbar(skip) {
		return invoke("plugin:window|set_skip_taskbar", {
			label: this.label,
			value: skip
		});
	}
	/**
	* Grabs the cursor, preventing it from leaving the window.
	*
	* There's no guarantee that the cursor will be hidden. You should
	* hide it by yourself if you want so.
	*
	* #### Platform-specific
	*
	* - **Linux:** Unsupported.
	* - **macOS:** This locks the cursor in a fixed location, which looks visually awkward.
	* @example
	* ```typescript
	* import { getCurrentWindow } from '@tauri-apps/api/window';
	* await getCurrentWindow().setCursorGrab(true);
	* ```
	*
	* @param grab `true` to grab the cursor icon, `false` to release it.
	* @returns A promise indicating the success or failure of the operation.
	*/
	async setCursorGrab(grab) {
		return invoke("plugin:window|set_cursor_grab", {
			label: this.label,
			value: grab
		});
	}
	/**
	* Modifies the cursor's visibility.
	*
	* #### Platform-specific
	*
	* - **Windows:** The cursor is only hidden within the confines of the window.
	* - **macOS:** The cursor is hidden as long as the window has input focus, even if the cursor is
	*   outside of the window.
	* @example
	* ```typescript
	* import { getCurrentWindow } from '@tauri-apps/api/window';
	* await getCurrentWindow().setCursorVisible(false);
	* ```
	*
	* @param visible If `false`, this will hide the cursor. If `true`, this will show the cursor.
	* @returns A promise indicating the success or failure of the operation.
	*/
	async setCursorVisible(visible) {
		return invoke("plugin:window|set_cursor_visible", {
			label: this.label,
			value: visible
		});
	}
	/**
	* Modifies the cursor icon of the window.
	* @example
	* ```typescript
	* import { getCurrentWindow } from '@tauri-apps/api/window';
	* await getCurrentWindow().setCursorIcon('help');
	* ```
	*
	* @param icon The new cursor icon.
	* @returns A promise indicating the success or failure of the operation.
	*/
	async setCursorIcon(icon) {
		return invoke("plugin:window|set_cursor_icon", {
			label: this.label,
			value: icon
		});
	}
	/**
	* Sets the window background color.
	*
	* #### Platform-specific:
	*
	* - **Windows:** alpha channel is ignored.
	* - **iOS / Android:** Unsupported.
	*
	* @returns A promise indicating the success or failure of the operation.
	*
	* @since 2.1.0
	*/
	async setBackgroundColor(color) {
		return invoke("plugin:window|set_background_color", { color });
	}
	/**
	* Changes the position of the cursor in window coordinates.
	* @example
	* ```typescript
	* import { getCurrentWindow, LogicalPosition } from '@tauri-apps/api/window';
	* await getCurrentWindow().setCursorPosition(new LogicalPosition(600, 300));
	* ```
	*
	* @param position The new cursor position.
	* @returns A promise indicating the success or failure of the operation.
	*/
	async setCursorPosition(position) {
		return invoke("plugin:window|set_cursor_position", {
			label: this.label,
			value: position instanceof Position ? position : new Position(position)
		});
	}
	/**
	* Changes the cursor events behavior.
	*
	* @example
	* ```typescript
	* import { getCurrentWindow } from '@tauri-apps/api/window';
	* await getCurrentWindow().setIgnoreCursorEvents(true);
	* ```
	*
	* @param ignore `true` to ignore the cursor events; `false` to process them as usual.
	* @returns A promise indicating the success or failure of the operation.
	*/
	async setIgnoreCursorEvents(ignore) {
		return invoke("plugin:window|set_ignore_cursor_events", {
			label: this.label,
			value: ignore
		});
	}
	/**
	* Starts dragging the window.
	* @example
	* ```typescript
	* import { getCurrentWindow } from '@tauri-apps/api/window';
	* await getCurrentWindow().startDragging();
	* ```
	*
	* @return A promise indicating the success or failure of the operation.
	*/
	async startDragging() {
		return invoke("plugin:window|start_dragging", { label: this.label });
	}
	/**
	* Starts resize-dragging the window.
	* @example
	* ```typescript
	* import { getCurrentWindow } from '@tauri-apps/api/window';
	* await getCurrentWindow().startResizeDragging();
	* ```
	*
	* @return A promise indicating the success or failure of the operation.
	*/
	async startResizeDragging(direction) {
		return invoke("plugin:window|start_resize_dragging", {
			label: this.label,
			value: direction
		});
	}
	/**
	* Sets the badge count. It is app wide and not specific to this window.
	*
	* #### Platform-specific
	*
	* - **Windows**: Unsupported. Use @{linkcode Window.setOverlayIcon} instead.
	*
	* @example
	* ```typescript
	* import { getCurrentWindow } from '@tauri-apps/api/window';
	* await getCurrentWindow().setBadgeCount(5);
	* ```
	*
	* @param count The badge count. Use `undefined` to remove the badge.
	* @return A promise indicating the success or failure of the operation.
	*/
	async setBadgeCount(count) {
		return invoke("plugin:window|set_badge_count", {
			label: this.label,
			value: count
		});
	}
	/**
	* Sets the badge cont **macOS only**.
	*
	* @example
	* ```typescript
	* import { getCurrentWindow } from '@tauri-apps/api/window';
	* await getCurrentWindow().setBadgeLabel("Hello");
	* ```
	*
	* @param label The badge label. Use `undefined` to remove the badge.
	* @return A promise indicating the success or failure of the operation.
	*/
	async setBadgeLabel(label) {
		return invoke("plugin:window|set_badge_label", {
			label: this.label,
			value: label
		});
	}
	/**
	* Sets the overlay icon. **Windows only**
	* The overlay icon can be set for every window.
	*
	*
	* Note that you may need the `image-ico` or `image-png` Cargo features to use this API.
	* To enable it, change your Cargo.toml file:
	*
	* ```toml
	* [dependencies]
	* tauri = { version = "...", features = ["...", "image-png"] }
	* ```
	*
	* @example
	* ```typescript
	* import { getCurrentWindow } from '@tauri-apps/api/window';
	* await getCurrentWindow().setOverlayIcon("/tauri/awesome.png");
	* ```
	*
	* @param icon Icon bytes or path to the icon file. Use `undefined` to remove the overlay icon.
	* @return A promise indicating the success or failure of the operation.
	*/
	async setOverlayIcon(icon) {
		return invoke("plugin:window|set_overlay_icon", {
			label: this.label,
			value: icon ? transformImage(icon) : void 0
		});
	}
	/**
	* Sets the taskbar progress state.
	*
	* #### Platform-specific
	*
	* - **Linux / macOS**: Progress bar is app-wide and not specific to this window.
	* - **Linux**: Only supported desktop environments with `libunity` (e.g. GNOME).
	*
	* @example
	* ```typescript
	* import { getCurrentWindow, ProgressBarStatus } from '@tauri-apps/api/window';
	* await getCurrentWindow().setProgressBar({
	*   status: ProgressBarStatus.Normal,
	*   progress: 50,
	* });
	* ```
	*
	* @return A promise indicating the success or failure of the operation.
	*/
	async setProgressBar(state) {
		return invoke("plugin:window|set_progress_bar", {
			label: this.label,
			value: state
		});
	}
	/**
	* Sets whether the window should be visible on all workspaces or virtual desktops.
	*
	* #### Platform-specific
	*
	* - **Windows / iOS / Android:** Unsupported.
	*
	* @since 2.0.0
	*/
	async setVisibleOnAllWorkspaces(visible) {
		return invoke("plugin:window|set_visible_on_all_workspaces", {
			label: this.label,
			value: visible
		});
	}
	/**
	* Sets the title bar style. **macOS only**.
	*
	* @since 2.0.0
	*/
	async setTitleBarStyle(style) {
		return invoke("plugin:window|set_title_bar_style", {
			label: this.label,
			value: style
		});
	}
	/**
	* Set window theme, pass in `null` or `undefined` to follow system theme
	*
	* #### Platform-specific
	*
	* - **Linux / macOS**: Theme is app-wide and not specific to this window.
	* - **iOS / Android:** Unsupported.
	*
	* @since 2.0.0
	*/
	async setTheme(theme) {
		return invoke("plugin:window|set_theme", {
			label: this.label,
			value: theme
		});
	}
	/**
	* Listen to window resize.
	*
	* @example
	* ```typescript
	* import { getCurrentWindow } from "@tauri-apps/api/window";
	* const unlisten = await getCurrentWindow().onResized(({ payload: size }) => {
	*  console.log('Window resized', size);
	* });
	*
	* // you need to call unlisten if your handler goes out of scope e.g. the component is unmounted
	* unlisten();
	* ```
	*
	* @returns A promise resolving to a function to unlisten to the event.
	* Note that removing the listener is required if your listener goes out of scope e.g. the component is unmounted.
	*/
	async onResized(handler) {
		return this.listen(TauriEvent.WINDOW_RESIZED, (e) => {
			e.payload = new PhysicalSize(e.payload);
			handler(e);
		});
	}
	/**
	* Listen to window move.
	*
	* @example
	* ```typescript
	* import { getCurrentWindow } from "@tauri-apps/api/window";
	* const unlisten = await getCurrentWindow().onMoved(({ payload: position }) => {
	*  console.log('Window moved', position);
	* });
	*
	* // you need to call unlisten if your handler goes out of scope e.g. the component is unmounted
	* unlisten();
	* ```
	*
	* @returns A promise resolving to a function to unlisten to the event.
	* Note that removing the listener is required if your listener goes out of scope e.g. the component is unmounted.
	*/
	async onMoved(handler) {
		return this.listen(TauriEvent.WINDOW_MOVED, (e) => {
			e.payload = new PhysicalPosition(e.payload);
			handler(e);
		});
	}
	/**
	* Listen to window close requested. Emitted when the user requests to closes the window.
	*
	* @example
	* ```typescript
	* import { getCurrentWindow } from "@tauri-apps/api/window";
	* import { confirm } from '@tauri-apps/api/dialog';
	* const unlisten = await getCurrentWindow().onCloseRequested(async (event) => {
	*   const confirmed = await confirm('Are you sure?');
	*   if (!confirmed) {
	*     // user did not confirm closing the window; let's prevent it
	*     event.preventDefault();
	*   }
	* });
	*
	* // you need to call unlisten if your handler goes out of scope e.g. the component is unmounted
	* unlisten();
	* ```
	*
	* @returns A promise resolving to a function to unlisten to the event.
	* Note that removing the listener is required if your listener goes out of scope e.g. the component is unmounted.
	*/
	async onCloseRequested(handler) {
		return this.listen(TauriEvent.WINDOW_CLOSE_REQUESTED, async (event) => {
			const evt = new CloseRequestedEvent(event);
			await handler(evt);
			if (!evt.isPreventDefault()) await this.destroy();
		});
	}
	/**
	* Listen to a file drop event.
	* The listener is triggered when the user hovers the selected files on the webview,
	* drops the files or cancels the operation.
	*
	* @example
	* ```typescript
	* import { getCurrentWindow } from "@tauri-apps/api/webview";
	* const unlisten = await getCurrentWindow().onDragDropEvent((event) => {
	*  if (event.payload.type === 'over') {
	*    console.log('User hovering', event.payload.position);
	*  } else if (event.payload.type === 'drop') {
	*    console.log('User dropped', event.payload.paths);
	*  } else {
	*    console.log('File drop cancelled');
	*  }
	* });
	*
	* // you need to call unlisten if your handler goes out of scope e.g. the component is unmounted
	* unlisten();
	* ```
	*
	* @returns A promise resolving to a function to unlisten to the event.
	* Note that removing the listener is required if your listener goes out of scope e.g. the component is unmounted.
	*/
	async onDragDropEvent(handler) {
		const unlistenDrag = await this.listen(TauriEvent.DRAG_ENTER, (event) => {
			handler({
				...event,
				payload: {
					type: "enter",
					paths: event.payload.paths,
					position: new PhysicalPosition(event.payload.position)
				}
			});
		});
		const unlistenDragOver = await this.listen(TauriEvent.DRAG_OVER, (event) => {
			handler({
				...event,
				payload: {
					type: "over",
					position: new PhysicalPosition(event.payload.position)
				}
			});
		});
		const unlistenDrop = await this.listen(TauriEvent.DRAG_DROP, (event) => {
			handler({
				...event,
				payload: {
					type: "drop",
					paths: event.payload.paths,
					position: new PhysicalPosition(event.payload.position)
				}
			});
		});
		const unlistenCancel = await this.listen(TauriEvent.DRAG_LEAVE, (event) => {
			handler({
				...event,
				payload: { type: "leave" }
			});
		});
		return () => {
			unlistenDrag();
			unlistenDrop();
			unlistenDragOver();
			unlistenCancel();
		};
	}
	/**
	* Listen to window focus change.
	*
	* @example
	* ```typescript
	* import { getCurrentWindow } from "@tauri-apps/api/window";
	* const unlisten = await getCurrentWindow().onFocusChanged(({ payload: focused }) => {
	*  console.log('Focus changed, window is focused? ' + focused);
	* });
	*
	* // you need to call unlisten if your handler goes out of scope e.g. the component is unmounted
	* unlisten();
	* ```
	*
	* @returns A promise resolving to a function to unlisten to the event.
	* Note that removing the listener is required if your listener goes out of scope e.g. the component is unmounted.
	*/
	async onFocusChanged(handler) {
		const unlistenFocus = await this.listen(TauriEvent.WINDOW_FOCUS, (event) => {
			handler({
				...event,
				payload: true
			});
		});
		const unlistenBlur = await this.listen(TauriEvent.WINDOW_BLUR, (event) => {
			handler({
				...event,
				payload: false
			});
		});
		return () => {
			unlistenFocus();
			unlistenBlur();
		};
	}
	/**
	* Listen to window scale change. Emitted when the window's scale factor has changed.
	* The following user actions can cause DPI changes:
	* - Changing the display's resolution.
	* - Changing the display's scale factor (e.g. in Control Panel on Windows).
	* - Moving the window to a display with a different scale factor.
	*
	* @example
	* ```typescript
	* import { getCurrentWindow } from "@tauri-apps/api/window";
	* const unlisten = await getCurrentWindow().onScaleChanged(({ payload }) => {
	*  console.log('Scale changed', payload.scaleFactor, payload.size);
	* });
	*
	* // you need to call unlisten if your handler goes out of scope e.g. the component is unmounted
	* unlisten();
	* ```
	*
	* @returns A promise resolving to a function to unlisten to the event.
	* Note that removing the listener is required if your listener goes out of scope e.g. the component is unmounted.
	*/
	async onScaleChanged(handler) {
		return this.listen(TauriEvent.WINDOW_SCALE_FACTOR_CHANGED, handler);
	}
	/**
	* Listen to the system theme change.
	*
	* @example
	* ```typescript
	* import { getCurrentWindow } from "@tauri-apps/api/window";
	* const unlisten = await getCurrentWindow().onThemeChanged(({ payload: theme }) => {
	*  console.log('New theme: ' + theme);
	* });
	*
	* // you need to call unlisten if your handler goes out of scope e.g. the component is unmounted
	* unlisten();
	* ```
	*
	* @returns A promise resolving to a function to unlisten to the event.
	* Note that removing the listener is required if your listener goes out of scope e.g. the component is unmounted.
	*/
	async onThemeChanged(handler) {
		return this.listen(TauriEvent.WINDOW_THEME_CHANGED, handler);
	}
};
/**
* Background throttling policy
*
* @since 2.0.0
*/
var BackgroundThrottlingPolicy;
(function(BackgroundThrottlingPolicy) {
	BackgroundThrottlingPolicy["Disabled"] = "disabled";
	BackgroundThrottlingPolicy["Throttle"] = "throttle";
	BackgroundThrottlingPolicy["Suspend"] = "suspend";
})(BackgroundThrottlingPolicy || (BackgroundThrottlingPolicy = {}));
/**
* The scrollbar style to use in the webview.
*
* ## Platform-specific
*
* **Windows**: This option must be given the same value for all webviews.
*
* @since 2.8.0
*/
var ScrollBarStyle;
(function(ScrollBarStyle) {
	/**
	* The default scrollbar style for the webview.
	*/
	ScrollBarStyle["Default"] = "default";
	/**
	* Fluent UI style overlay scrollbars. **Windows Only**
	*
	* Requires WebView2 Runtime version 125.0.2535.41 or higher, does nothing on older versions,
	* see https://learn.microsoft.com/en-us/microsoft-edge/webview2/release-notes/?tabs=dotnetcsharp#10253541
	*/
	ScrollBarStyle["FluentOverlay"] = "fluentOverlay";
})(ScrollBarStyle || (ScrollBarStyle = {}));
/**
* Platform-specific window effects
*
* @since 2.0.0
*/
var Effect;
(function(Effect) {
	/**
	* A default material appropriate for the view's effectiveAppearance.  **macOS 10.14-**
	*
	* @deprecated since macOS 10.14. You should instead choose an appropriate semantic material.
	*/
	Effect["AppearanceBased"] = "appearanceBased";
	/**
	*  **macOS 10.14-**
	*
	* @deprecated since macOS 10.14. Use a semantic material instead.
	*/
	Effect["Light"] = "light";
	/**
	*  **macOS 10.14-**
	*
	* @deprecated since macOS 10.14. Use a semantic material instead.
	*/
	Effect["Dark"] = "dark";
	/**
	*  **macOS 10.14-**
	*
	* @deprecated since macOS 10.14. Use a semantic material instead.
	*/
	Effect["MediumLight"] = "mediumLight";
	/**
	*  **macOS 10.14-**
	*
	* @deprecated since macOS 10.14. Use a semantic material instead.
	*/
	Effect["UltraDark"] = "ultraDark";
	/**
	*  **macOS 10.10+**
	*/
	Effect["Titlebar"] = "titlebar";
	/**
	*  **macOS 10.10+**
	*/
	Effect["Selection"] = "selection";
	/**
	*  **macOS 10.11+**
	*/
	Effect["Menu"] = "menu";
	/**
	*  **macOS 10.11+**
	*/
	Effect["Popover"] = "popover";
	/**
	*  **macOS 10.11+**
	*/
	Effect["Sidebar"] = "sidebar";
	/**
	*  **macOS 10.14+**
	*/
	Effect["HeaderView"] = "headerView";
	/**
	*  **macOS 10.14+**
	*/
	Effect["Sheet"] = "sheet";
	/**
	*  **macOS 10.14+**
	*/
	Effect["WindowBackground"] = "windowBackground";
	/**
	*  **macOS 10.14+**
	*/
	Effect["HudWindow"] = "hudWindow";
	/**
	*  **macOS 10.14+**
	*/
	Effect["FullScreenUI"] = "fullScreenUI";
	/**
	*  **macOS 10.14+**
	*/
	Effect["Tooltip"] = "tooltip";
	/**
	*  **macOS 10.14+**
	*/
	Effect["ContentBackground"] = "contentBackground";
	/**
	*  **macOS 10.14+**
	*/
	Effect["UnderWindowBackground"] = "underWindowBackground";
	/**
	*  **macOS 10.14+**
	*/
	Effect["UnderPageBackground"] = "underPageBackground";
	/**
	*  **Windows 11 Only**
	*/
	Effect["Mica"] = "mica";
	/**
	* **Windows 7/10/11(22H1) Only**
	*
	* #### Notes
	*
	* This effect has bad performance when resizing/dragging the window on Windows 11 build 22621.
	*/
	Effect["Blur"] = "blur";
	/**
	* **Windows 10/11**
	*
	* #### Notes
	*
	* This effect has bad performance when resizing/dragging the window on Windows 10 v1903+ and Windows 11 build 22000.
	*/
	Effect["Acrylic"] = "acrylic";
	/**
	* Tabbed effect that matches the system dark preference **Windows 11 Only**
	*/
	Effect["Tabbed"] = "tabbed";
	/**
	* Tabbed effect with dark mode but only if dark mode is enabled on the system **Windows 11 Only**
	*/
	Effect["TabbedDark"] = "tabbedDark";
	/**
	* Tabbed effect with light mode **Windows 11 Only**
	*/
	Effect["TabbedLight"] = "tabbedLight";
})(Effect || (Effect = {}));
/**
* Window effect state **macOS only**
*
* @see https://developer.apple.com/documentation/appkit/nsvisualeffectview/state
*
* @since 2.0.0
*/
var EffectState;
(function(EffectState) {
	/**
	*  Make window effect state follow the window's active state **macOS only**
	*/
	EffectState["FollowsWindowActiveState"] = "followsWindowActiveState";
	/**
	*  Make window effect state always active **macOS only**
	*/
	EffectState["Active"] = "active";
	/**
	*  Make window effect state always inactive **macOS only**
	*/
	EffectState["Inactive"] = "inactive";
})(EffectState || (EffectState = {}));
function mapMonitor(m) {
	return m === null ? null : {
		name: m.name,
		scaleFactor: m.scaleFactor,
		position: new PhysicalPosition(m.position),
		size: new PhysicalSize(m.size),
		workArea: {
			position: new PhysicalPosition(m.workArea.position),
			size: new PhysicalSize(m.workArea.size)
		}
	};
}
/**
* Returns the monitor on which the window currently resides.
* Returns `null` if current monitor can't be detected.
* @example
* ```typescript
* import { currentMonitor } from '@tauri-apps/api/window';
* const monitor = await currentMonitor();
* ```
*
* @since 1.0.0
*/
async function currentMonitor() {
	return invoke("plugin:window|current_monitor").then(mapMonitor);
}
/**
* Returns the monitor that contains the given point. Returns `null` if can't find any.
* @example
* ```typescript
* import { monitorFromPoint } from '@tauri-apps/api/window';
* const monitor = await monitorFromPoint(100.0, 200.0);
* ```
*
* @since 1.0.0
*/
async function monitorFromPoint(x, y) {
	return invoke("plugin:window|monitor_from_point", {
		x,
		y
	}).then(mapMonitor);
}
/**
* Returns the list of all the monitors available on the system.
* @example
* ```typescript
* import { availableMonitors } from '@tauri-apps/api/window';
* const monitors = await availableMonitors();
* ```
*
* @since 1.0.0
*/
async function availableMonitors() {
	return invoke("plugin:window|available_monitors").then((ms) => ms.map(mapMonitor));
}
/**
* Get the cursor position relative to the top-left hand corner of the desktop.
*
* Note that the top-left hand corner of the desktop is not necessarily the same as the screen.
* If the user uses a desktop with multiple monitors,
* the top-left hand corner of the desktop is the top-left hand corner of the main monitor on Windows and macOS
* or the top-left of the leftmost monitor on X11.
*
* The coordinates can be negative if the top-left hand corner of the window is outside of the visible screen region.
*/
async function cursorPosition() {
	return invoke("plugin:window|cursor_position").then((v) => new PhysicalPosition(v));
}
//#endregion
//#region src/blocks/screen.ts
const screenSizeReporter = {
	blockType: Scratch.BlockType.REPORTER,
	opcode: "screenSize",
	text: "Get screen size",
	func: "getScreenSize"
};
async function getScreenSize() {
	const monitors = await currentMonitor();
	return JSON.stringify(monitors?.size);
}
const availableMonitorsReporter = {
	blockType: Scratch.BlockType.REPORTER,
	opcode: "availableMonitors",
	text: "Get available monitors",
	func: "getAvailableMonitors"
};
async function getAvailableMonitors() {
	const monitors = await availableMonitors();
	return JSON.stringify(monitors);
}
registerBlock("Screen", screenSizeReporter, getScreenSize);
registerBlock("Screen", availableMonitorsReporter, getAvailableMonitors);
//#endregion
//#region src/blocks/pointer.ts
const cursorPositionReporter = {
	blockType: Scratch.BlockType.REPORTER,
	opcode: "cursorPosition",
	text: "Get cursor position",
	func: "getCursorPosition"
};
async function getCursorPosition() {
	const position = await cursorPosition();
	return JSON.stringify(position);
}
const monitorFromPointReporter = {
	blockType: Scratch.BlockType.REPORTER,
	opcode: "monitorFromPoint",
	text: "Get monitor from point x: [X] y: [Y]",
	func: "getMonitorFromPoint",
	arguments: {
		X: {
			type: Scratch.ArgumentType.NUMBER,
			defaultValue: 0
		},
		Y: {
			type: Scratch.ArgumentType.NUMBER,
			defaultValue: 0
		}
	}
};
async function getMonitorFromPoint(args) {
	const monitor = await monitorFromPoint(args.X, args.Y);
	return JSON.stringify(monitor);
}
registerBlock("Cursor", cursorPositionReporter, getCursorPosition);
registerBlock("Cursor", monitorFromPointReporter, getMonitorFromPoint);
//#endregion
//#region src/blocks/window/shared.ts
let cachedWindowLabels = ["main"];
function refreshWindowLabelCache() {
	Window.getAll().then((windows) => {
		cachedWindowLabels = windows.map((w) => w.label);
	});
}
refreshWindowLabelCache();
function windowLabelMenu() {
	refreshWindowLabelCache();
	return cachedWindowLabels;
}
const windowLabelArgument = {
	type: Scratch.ArgumentType.STRING,
	defaultValue: "main",
	menu: "windowLabelMenu"
};
async function getWindowByLabel(label) {
	const window = await Window.getByLabel(label);
	if (window == null) throw new Error(`Window with label ${label} not found`);
	return window;
}
//#endregion
//#region node_modules/@tauri-apps/api/webview.js
/**
* Provides APIs to create webviews, communicate with other webviews and manipulate the current webview.
*
* #### Webview events
*
* Events can be listened to using {@link Webview.listen}:
* ```typescript
* import { getCurrentWebview } from "@tauri-apps/api/webview";
* getCurrentWebview().listen("my-webview-event", ({ event, payload }) => { });
* ```
*
* @module
*/
/**
* Get an instance of `Webview` for the current webview.
*
* @since 2.0.0
*/
function getCurrentWebview() {
	return new Webview(getCurrentWindow(), window.__TAURI_INTERNALS__.metadata.currentWebview.label, { skip: true });
}
/**
* Gets a list of instances of `Webview` for all available webviews.
*
* @since 2.0.0
*/
async function getAllWebviews() {
	return invoke("plugin:webview|get_all_webviews").then((webviews) => webviews.map((w) => new Webview(new Window(w.windowLabel, { skip: true }), w.label, { skip: true })));
}
/** @ignore */
const localTauriEvents = ["tauri://created", "tauri://error"];
/**
* Create new webview or get a handle to an existing one.
*
* Webviews are identified by a *label*  a unique identifier that can be used to reference it later.
* It may only contain alphanumeric characters `a-zA-Z` plus the following special characters `-`, `/`, `:` and `_`.
*
* @example
* ```typescript
* import { Window } from "@tauri-apps/api/window"
* import { Webview } from "@tauri-apps/api/webview"
*
* const appWindow = new Window('uniqueLabel');
*
* appWindow.once('tauri://created', async function () {
*   // `new Webview` Should be called after the window is successfully created,
*   // or webview may not be attached to the window since window is not created yet.
*
*   // loading embedded asset:
*   const webview = new Webview(appWindow, 'theUniqueLabel', {
*     url: 'path/to/page.html',
*
*     // create a webview with specific logical position and size
*     x: 0,
*     y: 0,
*     width: 800,
*     height: 600,
*   });
*   // alternatively, load a remote URL:
*   const webview = new Webview(appWindow, 'theUniqueLabel', {
*     url: 'https://github.com/tauri-apps/tauri',
*
*     // create a webview with specific logical position and size
*     x: 0,
*     y: 0,
*     width: 800,
*     height: 600,
*   });
*
*   webview.once('tauri://created', function () {
*     // webview successfully created
*   });
*   webview.once('tauri://error', function (e) {
*     // an error happened creating the webview
*   });
*
*
*   // emit an event to the backend
*   await webview.emit("some-event", "data");
*   // listen to an event from the backend
*   const unlisten = await webview.listen("event-name", e => { });
*   unlisten();
* });
* ```
*
* @since 2.0.0
*/
var Webview = class {
	/**
	* Creates a new Webview.
	* @example
	* ```typescript
	* import { Window } from '@tauri-apps/api/window'
	* import { Webview } from '@tauri-apps/api/webview'
	* const appWindow = new Window('my-label')
	*
	* appWindow.once('tauri://created', async function() {
	*   const webview = new Webview(appWindow, 'my-label', {
	*     url: 'https://github.com/tauri-apps/tauri',
	*
	*     // create a webview with specific logical position and size
	*     x: 0,
	*     y: 0,
	*     width: 800,
	*     height: 600,
	*   });
	*
	*   webview.once('tauri://created', function () {
	*     // webview successfully created
	*   });
	*   webview.once('tauri://error', function (e) {
	*     // an error happened creating the webview
	*   });
	* });
	* ```
	*
	* @param window the window to add this webview to.
	* @param label The unique webview label. Must be alphanumeric: `a-zA-Z-/:_`.
	* @returns The {@link Webview} instance to communicate with the webview.
	*/
	constructor(window, label, options) {
		this.window = window;
		this.label = label;
		this.listeners = Object.create(null);
		if (!(options === null || options === void 0 ? void 0 : options.skip)) invoke("plugin:webview|create_webview", {
			windowLabel: window.label,
			options: {
				...options,
				label
			}
		}).then(async () => this.emit("tauri://created")).catch(async (e) => this.emit("tauri://error", e));
	}
	/**
	* Gets the Webview for the webview associated with the given label.
	* @example
	* ```typescript
	* import { Webview } from '@tauri-apps/api/webview';
	* const mainWebview = Webview.getByLabel('main');
	* ```
	*
	* @param label The webview label.
	* @returns The Webview instance to communicate with the webview or null if the webview doesn't exist.
	*/
	static async getByLabel(label) {
		var _a;
		return (_a = (await getAllWebviews()).find((w) => w.label === label)) !== null && _a !== void 0 ? _a : null;
	}
	/**
	* Get an instance of `Webview` for the current webview.
	*/
	static getCurrent() {
		return getCurrentWebview();
	}
	/**
	* Gets a list of instances of `Webview` for all available webviews.
	*/
	static async getAll() {
		return getAllWebviews();
	}
	/**
	* Listen to an emitted event on this webview.
	*
	* @example
	* ```typescript
	* import { getCurrentWebview } from '@tauri-apps/api/webview';
	* const unlisten = await getCurrentWebview().listen<string>('state-changed', (event) => {
	*   console.log(`Got error: ${payload}`);
	* });
	*
	* // you need to call unlisten if your handler goes out of scope e.g. the component is unmounted
	* unlisten();
	* ```
	*
	* @param event Event name. Must include only alphanumeric characters, `-`, `/`, `:` and `_`.
	* @param handler Event handler.
	* @returns A promise resolving to a function to unlisten to the event.
	* Note that removing the listener is required if your listener goes out of scope e.g. the component is unmounted.
	*/
	async listen(event, handler) {
		if (this._handleTauriEvent(event, handler)) return () => {
			const listeners = this.listeners[event];
			listeners.splice(listeners.indexOf(handler), 1);
		};
		return listen(event, handler, { target: {
			kind: "Webview",
			label: this.label
		} });
	}
	/**
	* Listen to an emitted event on this webview only once.
	*
	* @example
	* ```typescript
	* import { getCurrentWebview } from '@tauri-apps/api/webview';
	* const unlisten = await getCurrent().once<null>('initialized', (event) => {
	*   console.log(`Webview initialized!`);
	* });
	*
	* // you need to call unlisten if your handler goes out of scope e.g. the component is unmounted
	* unlisten();
	* ```
	*
	* @param event Event name. Must include only alphanumeric characters, `-`, `/`, `:` and `_`.
	* @param handler Event handler.
	* @returns A promise resolving to a function to unlisten to the event.
	* Note that removing the listener is required if your listener goes out of scope e.g. the component is unmounted.
	*/
	async once(event, handler) {
		if (this._handleTauriEvent(event, handler)) return () => {
			const listeners = this.listeners[event];
			listeners.splice(listeners.indexOf(handler), 1);
		};
		return once(event, handler, { target: {
			kind: "Webview",
			label: this.label
		} });
	}
	/**
	* Emits an event to all {@link EventTarget|targets}.
	*
	* @example
	* ```typescript
	* import { getCurrentWebview } from '@tauri-apps/api/webview';
	* await getCurrentWebview().emit('webview-loaded', { loggedIn: true, token: 'authToken' });
	* ```
	*
	* @param event Event name. Must include only alphanumeric characters, `-`, `/`, `:` and `_`.
	* @param payload Event payload.
	*/
	async emit(event, payload) {
		if (localTauriEvents.includes(event)) {
			for (const handler of this.listeners[event] || []) handler({
				event,
				id: -1,
				payload
			});
			return;
		}
		return emit(event, payload);
	}
	/**
	* Emits an event to all {@link EventTarget|targets} matching the given target.
	*
	* @example
	* ```typescript
	* import { getCurrentWebview } from '@tauri-apps/api/webview';
	* await getCurrentWebview().emitTo('main', 'webview-loaded', { loggedIn: true, token: 'authToken' });
	* ```
	*
	* @param target Label of the target Window/Webview/WebviewWindow or raw {@link EventTarget} object.
	* @param event Event name. Must include only alphanumeric characters, `-`, `/`, `:` and `_`.
	* @param payload Event payload.
	*/
	async emitTo(target, event, payload) {
		if (localTauriEvents.includes(event)) {
			for (const handler of this.listeners[event] || []) handler({
				event,
				id: -1,
				payload
			});
			return;
		}
		return emitTo(target, event, payload);
	}
	/** @ignore */
	_handleTauriEvent(event, handler) {
		if (localTauriEvents.includes(event)) {
			if (!(event in this.listeners)) this.listeners[event] = [handler];
			else this.listeners[event].push(handler);
			return true;
		}
		return false;
	}
	/**
	* The position of the top-left hand corner of the webview's client area relative to the top-left hand corner of the desktop.
	* @example
	* ```typescript
	* import { getCurrentWebview } from '@tauri-apps/api/webview';
	* const position = await getCurrentWebview().position();
	* ```
	*
	* @returns The webview's position.
	*/
	async position() {
		return invoke("plugin:webview|webview_position", { label: this.label }).then((p) => new PhysicalPosition(p));
	}
	/**
	* The physical size of the webview's client area.
	* The client area is the content of the webview, excluding the title bar and borders.
	* @example
	* ```typescript
	* import { getCurrentWebview } from '@tauri-apps/api/webview';
	* const size = await getCurrentWebview().size();
	* ```
	*
	* @returns The webview's size.
	*/
	async size() {
		return invoke("plugin:webview|webview_size", { label: this.label }).then((s) => new PhysicalSize(s));
	}
	/**
	* Closes the webview.
	* @example
	* ```typescript
	* import { getCurrentWebview } from '@tauri-apps/api/webview';
	* await getCurrentWebview().close();
	* ```
	*
	* @returns A promise indicating the success or failure of the operation.
	*/
	async close() {
		return invoke("plugin:webview|webview_close", { label: this.label });
	}
	/**
	* Resizes the webview.
	* @example
	* ```typescript
	* import { getCurrent, LogicalSize } from '@tauri-apps/api/webview';
	* await getCurrentWebview().setSize(new LogicalSize(600, 500));
	* ```
	*
	* @param size The logical or physical size.
	* @returns A promise indicating the success or failure of the operation.
	*/
	async setSize(size) {
		return invoke("plugin:webview|set_webview_size", {
			label: this.label,
			value: size instanceof Size ? size : new Size(size)
		});
	}
	/**
	* Sets the webview position.
	* @example
	* ```typescript
	* import { getCurrent, LogicalPosition } from '@tauri-apps/api/webview';
	* await getCurrentWebview().setPosition(new LogicalPosition(600, 500));
	* ```
	*
	* @param position The new position, in logical or physical pixels.
	* @returns A promise indicating the success or failure of the operation.
	*/
	async setPosition(position) {
		return invoke("plugin:webview|set_webview_position", {
			label: this.label,
			value: position instanceof Position ? position : new Position(position)
		});
	}
	/**
	* Bring the webview to front and focus.
	* @example
	* ```typescript
	* import { getCurrentWebview } from '@tauri-apps/api/webview';
	* await getCurrentWebview().setFocus();
	* ```
	*
	* @returns A promise indicating the success or failure of the operation.
	*/
	async setFocus() {
		return invoke("plugin:webview|set_webview_focus", { label: this.label });
	}
	/**
	* Sets whether the webview should automatically grow and shrink its size and position when the parent window resizes.
	* @example
	* ```typescript
	* import { getCurrentWebview } from '@tauri-apps/api/webview';
	* await getCurrentWebview().setAutoResize(true);
	* ```
	*
	* @returns A promise indicating the success or failure of the operation.
	*/
	async setAutoResize(autoResize) {
		return invoke("plugin:webview|set_webview_auto_resize", {
			label: this.label,
			value: autoResize
		});
	}
	/**
	* Hide the webview.
	* @example
	* ```typescript
	* import { getCurrentWebview } from '@tauri-apps/api/webview';
	* await getCurrentWebview().hide();
	* ```
	*
	* @returns A promise indicating the success or failure of the operation.
	*/
	async hide() {
		return invoke("plugin:webview|webview_hide", { label: this.label });
	}
	/**
	* Show the webview.
	* @example
	* ```typescript
	* import { getCurrentWebview } from '@tauri-apps/api/webview';
	* await getCurrentWebview().show();
	* ```
	*
	* @returns A promise indicating the success or failure of the operation.
	*/
	async show() {
		return invoke("plugin:webview|webview_show", { label: this.label });
	}
	/**
	* Set webview zoom level.
	* @example
	* ```typescript
	* import { getCurrentWebview } from '@tauri-apps/api/webview';
	* await getCurrentWebview().setZoom(1.5);
	* ```
	*
	* @returns A promise indicating the success or failure of the operation.
	*/
	async setZoom(scaleFactor) {
		return invoke("plugin:webview|set_webview_zoom", {
			label: this.label,
			value: scaleFactor
		});
	}
	/**
	* Moves this webview to the given label.
	* @example
	* ```typescript
	* import { getCurrentWebview } from '@tauri-apps/api/webview';
	* await getCurrentWebview().reparent('other-window');
	* ```
	*
	* @returns A promise indicating the success or failure of the operation.
	*/
	async reparent(window) {
		return invoke("plugin:webview|reparent", {
			label: this.label,
			window: typeof window === "string" ? window : window.label
		});
	}
	/**
	* Clears all browsing data for this webview.
	* @example
	* ```typescript
	* import { getCurrentWebview } from '@tauri-apps/api/webview';
	* await getCurrentWebview().clearAllBrowsingData();
	* ```
	*
	* @returns A promise indicating the success or failure of the operation.
	*/
	async clearAllBrowsingData() {
		return invoke("plugin:webview|clear_all_browsing_data");
	}
	/**
	* Specify the webview background color.
	*
	* #### Platfrom-specific:
	*
	* - **macOS / iOS**: Not implemented.
	* - **Windows**:
	*   - On Windows 7, transparency is not supported and the alpha value will be ignored.
	*   - On Windows higher than 7: translucent colors are not supported so any alpha value other than `0` will be replaced by `255`
	*
	* @returns A promise indicating the success or failure of the operation.
	*
	* @since 2.1.0
	*/
	async setBackgroundColor(color) {
		return invoke("plugin:webview|set_webview_background_color", { color });
	}
	/**
	* Listen to a file drop event.
	* The listener is triggered when the user hovers the selected files on the webview,
	* drops the files or cancels the operation.
	*
	* @example
	* ```typescript
	* import { getCurrentWebview } from "@tauri-apps/api/webview";
	* const unlisten = await getCurrentWebview().onDragDropEvent((event) => {
	*  if (event.payload.type === 'over') {
	*    console.log('User hovering', event.payload.position);
	*  } else if (event.payload.type === 'drop') {
	*    console.log('User dropped', event.payload.paths);
	*  } else {
	*    console.log('File drop cancelled');
	*  }
	* });
	*
	* // you need to call unlisten if your handler goes out of scope e.g. the component is unmounted
	* unlisten();
	* ```
	*
	* When the debugger panel is open, the drop position of this event may be inaccurate due to a known limitation.
	* To retrieve the correct drop position, please detach the debugger.
	*
	* @returns A promise resolving to a function to unlisten to the event.
	* Note that removing the listener is required if your listener goes out of scope e.g. the component is unmounted.
	*/
	async onDragDropEvent(handler) {
		const unlistenDragEnter = await this.listen(TauriEvent.DRAG_ENTER, (event) => {
			handler({
				...event,
				payload: {
					type: "enter",
					paths: event.payload.paths,
					position: new PhysicalPosition(event.payload.position)
				}
			});
		});
		const unlistenDragOver = await this.listen(TauriEvent.DRAG_OVER, (event) => {
			handler({
				...event,
				payload: {
					type: "over",
					position: new PhysicalPosition(event.payload.position)
				}
			});
		});
		const unlistenDragDrop = await this.listen(TauriEvent.DRAG_DROP, (event) => {
			handler({
				...event,
				payload: {
					type: "drop",
					paths: event.payload.paths,
					position: new PhysicalPosition(event.payload.position)
				}
			});
		});
		const unlistenDragLeave = await this.listen(TauriEvent.DRAG_LEAVE, (event) => {
			handler({
				...event,
				payload: { type: "leave" }
			});
		});
		return () => {
			unlistenDragEnter();
			unlistenDragDrop();
			unlistenDragOver();
			unlistenDragLeave();
		};
	}
};
//#endregion
//#region node_modules/@tauri-apps/api/webviewWindow.js
/**
* Get an instance of `Webview` for the current webview window.
*
* @since 2.0.0
*/
function getCurrentWebviewWindow() {
	return new WebviewWindow(getCurrentWebview().label, { skip: true });
}
/**
* Gets a list of instances of `Webview` for all available webview windows.
*
* @since 2.0.0
*/
async function getAllWebviewWindows() {
	return invoke("plugin:window|get_all_windows").then((windows) => windows.map((w) => new WebviewWindow(w, { skip: true })));
}
var WebviewWindow = class WebviewWindow {
	/**
	* Creates a new {@link Window} hosting a {@link Webview}.
	* @example
	* ```typescript
	* import { WebviewWindow } from '@tauri-apps/api/webviewWindow'
	* const webview = new WebviewWindow('my-label', {
	*   url: 'https://github.com/tauri-apps/tauri'
	* });
	* webview.once('tauri://created', function () {
	*  // webview successfully created
	* });
	* webview.once('tauri://error', function (e) {
	*  // an error happened creating the webview
	* });
	* ```
	*
	* @param label The unique webview label. Must be alphanumeric: `a-zA-Z-/:_`.
	* @returns The {@link WebviewWindow} instance to communicate with the window and webview.
	*/
	constructor(label, options = {}) {
		var _a;
		this.label = label;
		this.listeners = Object.create(null);
		if (!(options === null || options === void 0 ? void 0 : options.skip)) invoke("plugin:webview|create_webview_window", { options: {
			...options,
			parent: typeof options.parent === "string" ? options.parent : (_a = options.parent) === null || _a === void 0 ? void 0 : _a.label,
			label
		} }).then(async () => this.emit("tauri://created")).catch(async (e) => this.emit("tauri://error", e));
	}
	/**
	* Gets the Webview for the webview associated with the given label.
	* @example
	* ```typescript
	* import { WebviewWindow } from '@tauri-apps/api/webviewWindow';
	* const mainWebview = WebviewWindow.getByLabel('main');
	* ```
	*
	* @param label The webview label.
	* @returns The Webview instance to communicate with the webview or null if the webview doesn't exist.
	*/
	static async getByLabel(label) {
		var _a;
		const webview = (_a = (await getAllWebviewWindows()).find((w) => w.label === label)) !== null && _a !== void 0 ? _a : null;
		if (webview) return new WebviewWindow(webview.label, { skip: true });
		return null;
	}
	/**
	* Get an instance of `Webview` for the current webview.
	*/
	static getCurrent() {
		return getCurrentWebviewWindow();
	}
	/**
	* Gets a list of instances of `Webview` for all available webviews.
	*/
	static async getAll() {
		return getAllWebviewWindows();
	}
	/**
	* Listen to an emitted event on this webview window.
	*
	* @example
	* ```typescript
	* import { WebviewWindow } from '@tauri-apps/api/webviewWindow';
	* const unlisten = await WebviewWindow.getCurrent().listen<string>('state-changed', (event) => {
	*   console.log(`Got error: ${payload}`);
	* });
	*
	* // you need to call unlisten if your handler goes out of scope e.g. the component is unmounted
	* unlisten();
	* ```
	*
	* @param event Event name. Must include only alphanumeric characters, `-`, `/`, `:` and `_`.
	* @param handler Event handler.
	* @returns A promise resolving to a function to unlisten to the event.
	* Note that removing the listener is required if your listener goes out of scope e.g. the component is unmounted.
	*/
	async listen(event, handler) {
		if (this._handleTauriEvent(event, handler)) return () => {
			const listeners = this.listeners[event];
			listeners.splice(listeners.indexOf(handler), 1);
		};
		return listen(event, handler, { target: {
			kind: "WebviewWindow",
			label: this.label
		} });
	}
	/**
	* Listen to an emitted event on this webview window only once.
	*
	* @example
	* ```typescript
	* import { WebviewWindow } from '@tauri-apps/api/webviewWindow';
	* const unlisten = await WebviewWindow.getCurrent().once<null>('initialized', (event) => {
	*   console.log(`Webview initialized!`);
	* });
	*
	* // you need to call unlisten if your handler goes out of scope e.g. the component is unmounted
	* unlisten();
	* ```
	*
	* @param event Event name. Must include only alphanumeric characters, `-`, `/`, `:` and `_`.
	* @param handler Event handler.
	* @returns A promise resolving to a function to unlisten to the event.
	* Note that removing the listener is required if your listener goes out of scope e.g. the component is unmounted.
	*/
	async once(event, handler) {
		if (this._handleTauriEvent(event, handler)) return () => {
			const listeners = this.listeners[event];
			listeners.splice(listeners.indexOf(handler), 1);
		};
		return once(event, handler, { target: {
			kind: "WebviewWindow",
			label: this.label
		} });
	}
	/**
	* Set the window and webview background color.
	*
	* #### Platform-specific:
	*
	* - **Android / iOS:** Unsupported for the window layer.
	* - **macOS / iOS**: Not implemented for the webview layer.
	* - **Windows**:
	*   - alpha channel is ignored for the window layer.
	*   - On Windows 7, alpha channel is ignored for the webview layer.
	*   - On Windows 8 and newer, if alpha channel is not `0`, it will be ignored.
	*
	* @returns A promise indicating the success or failure of the operation.
	*
	* @since 2.1.0
	*/
	async setBackgroundColor(color) {
		return invoke("plugin:window|set_background_color", { color }).then(() => {
			return invoke("plugin:webview|set_webview_background_color", { color });
		});
	}
};
applyMixins(WebviewWindow, [Window, Webview]);
/** Extends a base class by other specified classes, without overriding existing properties */
function applyMixins(baseClass, extendedClasses) {
	(Array.isArray(extendedClasses) ? extendedClasses : [extendedClasses]).forEach((extendedClass) => {
		Object.getOwnPropertyNames(extendedClass.prototype).forEach((name) => {
			var _a;
			if (typeof baseClass.prototype === "object" && baseClass.prototype && name in baseClass.prototype) return;
			Object.defineProperty(baseClass.prototype, name, (_a = Object.getOwnPropertyDescriptor(extendedClass.prototype, name)) !== null && _a !== void 0 ? _a : Object.create(null));
		});
	});
}
//#endregion
//#region src/blocks/window/reporters.ts
const windowWidthReporter = {
	blockType: Scratch.BlockType.REPORTER,
	opcode: "getWWidth",
	text: "Window Width"
};
async function getWWidth() {
	const [width] = await invoke("get_window_size");
	return width;
}
const windowHeightReporter = {
	blockType: Scratch.BlockType.REPORTER,
	opcode: "getWHeight",
	text: "Window Height"
};
async function getWHeight() {
	const [, height] = await invoke("get_window_size");
	return height;
}
const isCloseReporter = {
	blockType: Scratch.BlockType.REPORTER,
	opcode: "isCloseable",
	text: "Is Window Closeable"
};
async function isCloseable() {
	return await getCurrentWebviewWindow().isClosable();
}
const isFocusedReporter = {
	blockType: Scratch.BlockType.REPORTER,
	opcode: "isFocused",
	text: "Is Window Focused"
};
async function isFocused() {
	return await getCurrentWebviewWindow().isFocused();
}
const isFullscreenReporter = {
	blockType: Scratch.BlockType.REPORTER,
	opcode: "isFullscreen",
	text: "Is Window Fullscreened"
};
async function isFullscreen() {
	return await getCurrentWebviewWindow().isFullscreen();
}
const myWindowLabelReporter = {
	blockType: Scratch.BlockType.REPORTER,
	opcode: "myWindowLabel",
	text: "This window's label"
};
function myWindowLabel() {
	return getCurrentWebviewWindow().label;
}
const isWindowLabelReporter = {
	blockType: Scratch.BlockType.BOOLEAN,
	opcode: "isWindowLabel",
	text: "This window is labeled [LABEL]?",
	arguments: { LABEL: {
		type: Scratch.ArgumentType.STRING,
		defaultValue: "main"
	} }
};
function isWindowLabel(args) {
	return getCurrentWebviewWindow().label === args.LABEL;
}
registerBlock("Window", windowWidthReporter, getWWidth);
registerBlock("Window", windowHeightReporter, getWHeight);
registerBlock("Window", isFocusedReporter, isFocused);
registerBlock("Window", isFullscreenReporter, isFullscreen);
registerBlock("Window", isCloseReporter, isCloseable);
registerBlock("Window", myWindowLabelReporter, myWindowLabel);
registerBlock("Window", isWindowLabelReporter, isWindowLabel);
//#endregion
//#region node_modules/@tauri-apps/api/path.js
/**
* The path module provides utilities for working with file and directory paths.
*
* This package is also accessible with `window.__TAURI__.path` when [`app.withGlobalTauri`](https://v2.tauri.app/reference/config/#withglobaltauri) in `tauri.conf.json` is set to `true`.
*
* It is recommended to allowlist only the APIs you use for optimal bundle size and security.
* @module
*/
/**
* @since 2.0.0
*/
var BaseDirectory;
(function(BaseDirectory) {
	/**
	* @see {@link audioDir} for more information.
	*/
	BaseDirectory[BaseDirectory["Audio"] = 1] = "Audio";
	/**
	* @see {@link cacheDir} for more information.
	*/
	BaseDirectory[BaseDirectory["Cache"] = 2] = "Cache";
	/**
	* @see {@link configDir} for more information.
	*/
	BaseDirectory[BaseDirectory["Config"] = 3] = "Config";
	/**
	* @see {@link dataDir} for more information.
	*/
	BaseDirectory[BaseDirectory["Data"] = 4] = "Data";
	/**
	* @see {@link localDataDir} for more information.
	*/
	BaseDirectory[BaseDirectory["LocalData"] = 5] = "LocalData";
	/**
	* @see {@link documentDir} for more information.
	*/
	BaseDirectory[BaseDirectory["Document"] = 6] = "Document";
	/**
	* @see {@link downloadDir} for more information.
	*/
	BaseDirectory[BaseDirectory["Download"] = 7] = "Download";
	/**
	* @see {@link pictureDir} for more information.
	*/
	BaseDirectory[BaseDirectory["Picture"] = 8] = "Picture";
	/**
	* @see {@link publicDir} for more information.
	*/
	BaseDirectory[BaseDirectory["Public"] = 9] = "Public";
	/**
	* @see {@link videoDir} for more information.
	*/
	BaseDirectory[BaseDirectory["Video"] = 10] = "Video";
	/**
	* @see {@link resourceDir} for more information.
	*/
	BaseDirectory[BaseDirectory["Resource"] = 11] = "Resource";
	/**
	* @see {@link tempDir} for more information.
	*/
	BaseDirectory[BaseDirectory["Temp"] = 12] = "Temp";
	/**
	* @see {@link appConfigDir} for more information.
	*/
	BaseDirectory[BaseDirectory["AppConfig"] = 13] = "AppConfig";
	/**
	* @see {@link appDataDir} for more information.
	*/
	BaseDirectory[BaseDirectory["AppData"] = 14] = "AppData";
	/**
	* @see {@link appLocalDataDir} for more information.
	*/
	BaseDirectory[BaseDirectory["AppLocalData"] = 15] = "AppLocalData";
	/**
	* @see {@link appCacheDir} for more information.
	*/
	BaseDirectory[BaseDirectory["AppCache"] = 16] = "AppCache";
	/**
	* @see {@link appLogDir} for more information.
	*/
	BaseDirectory[BaseDirectory["AppLog"] = 17] = "AppLog";
	/**
	* @see {@link desktopDir} for more information.
	*/
	BaseDirectory[BaseDirectory["Desktop"] = 18] = "Desktop";
	/**
	* @see {@link executableDir} for more information.
	*/
	BaseDirectory[BaseDirectory["Executable"] = 19] = "Executable";
	/**
	* @see {@link fontDir} for more information.
	*/
	BaseDirectory[BaseDirectory["Font"] = 20] = "Font";
	/**
	* @see {@link homeDir} for more information.
	*/
	BaseDirectory[BaseDirectory["Home"] = 21] = "Home";
	/**
	* @see {@link runtimeDir} for more information.
	*/
	BaseDirectory[BaseDirectory["Runtime"] = 22] = "Runtime";
	/**
	* @see {@link templateDir} for more information.
	*/
	BaseDirectory[BaseDirectory["Template"] = 23] = "Template";
})(BaseDirectory || (BaseDirectory = {}));
/**
* Returns a temporary directory.
* @example
* ```typescript
* import { tempDir } from '@tauri-apps/api/path';
* const temp = await tempDir();
* ```
*
* @since 2.0.0
*/
async function tempDir() {
	return invoke("plugin:path|resolve_directory", { directory: BaseDirectory.Temp });
}
/**
*  Joins all given `path` segments together using the platform-specific separator as a delimiter, then normalizes the resulting path.
* @example
* ```typescript
* import { join, appDataDir } from '@tauri-apps/api/path';
* const appDataDirPath = await appDataDir();
* const path = await join(appDataDirPath, 'users', 'tauri', 'avatar.png');
* ```
*
* @since 1.0.0
*/
async function join(...paths) {
	return invoke("plugin:path|join", { paths });
}
//#endregion
//#region node_modules/@tauri-apps/plugin-fs/dist-js/index.js
/**
* Access the file system.
*
* ## iOS security-scoped resources
*
* On iOS, the `fs` plugin automatically manages access to security-scoped resources when a file URL is accessed.
* This is required for files outside the app's sandbox (e.g., from file picker).
*
* @example
* ```typescript
* import { open } from '@tauri-apps/plugin-fs';
*
* const file = await open('file:///path/to/file.txt');
* await file.close();
* ```
*
* ## Security
*
* This module prevents path traversal, not allowing parent directory accessors to be used
* (i.e. "/usr/path/to/../file" or "../path/to/file" paths are not allowed).
* Paths accessed with this API must be either relative to one of the {@link BaseDirectory | base directories}
* or created with the {@link https://v2.tauri.app/reference/javascript/api/namespacepath/ | path API}.
*
* The API has a scope configuration that forces you to restrict the paths that can be accessed using glob patterns.
*
* The scope configuration is an array of glob patterns describing file/directory paths that are allowed.
* For instance, this scope configuration allows **all** enabled `fs` APIs to (only) access files in the
* *databases* directory of the {@link https://v2.tauri.app/reference/javascript/api/namespacepath/#appdatadir | `$APPDATA` directory}:
* ```json
* {
*   "permissions": [
*     {
*       "identifier": "fs:scope",
*       "allow": [{ "path": "$APPDATA/databases/*" }]
*     }
*   ]
* }
* ```
*
* Scopes can also be applied to specific `fs` APIs by using the API's identifier instead of `fs:scope`:
* ```json
* {
*   "permissions": [
*     {
*       "identifier": "fs:allow-exists",
*       "allow": [{ "path": "$APPDATA/databases/*" }]
*     }
*   ]
* }
* ```
*
* Notice the use of the `$APPDATA` variable. The value is injected at runtime, resolving to the {@link https://v2.tauri.app/reference/javascript/api/namespacepath/#appdatadir | app data directory}.
*
* The available variables are:
* {@linkcode https://v2.tauri.app/reference/javascript/api/namespacepath/#appconfigdir | $APPCONFIG},
* {@linkcode https://v2.tauri.app/reference/javascript/api/namespacepath/#appdatadir | $APPDATA},
* {@linkcode https://v2.tauri.app/reference/javascript/api/namespacepath/#applocaldatadir | $APPLOCALDATA},
* {@linkcode https://v2.tauri.app/reference/javascript/api/namespacepath/#appcachedir | $APPCACHE},
* {@linkcode https://v2.tauri.app/reference/javascript/api/namespacepath/#applogdir | $APPLOG},
* {@linkcode https://v2.tauri.app/reference/javascript/api/namespacepath/#audiodir | $AUDIO},
* {@linkcode https://v2.tauri.app/reference/javascript/api/namespacepath/#cachedir | $CACHE},
* {@linkcode https://v2.tauri.app/reference/javascript/api/namespacepath/#configdir | $CONFIG},
* {@linkcode https://v2.tauri.app/reference/javascript/api/namespacepath/#datadir | $DATA},
* {@linkcode https://v2.tauri.app/reference/javascript/api/namespacepath/#localdatadir | $LOCALDATA},
* {@linkcode https://v2.tauri.app/reference/javascript/api/namespacepath/#desktopdir | $DESKTOP},
* {@linkcode https://v2.tauri.app/reference/javascript/api/namespacepath/#documentdir | $DOCUMENT},
* {@linkcode https://v2.tauri.app/reference/javascript/api/namespacepath/#downloaddir | $DOWNLOAD},
* {@linkcode https://v2.tauri.app/reference/javascript/api/namespacepath/#executabledir | $EXE},
* {@linkcode https://v2.tauri.app/reference/javascript/api/namespacepath/#fontdir | $FONT},
* {@linkcode https://v2.tauri.app/reference/javascript/api/namespacepath/#homedir | $HOME},
* {@linkcode https://v2.tauri.app/reference/javascript/api/namespacepath/#picturedir | $PICTURE},
* {@linkcode https://v2.tauri.app/reference/javascript/api/namespacepath/#publicdir | $PUBLIC},
* {@linkcode https://v2.tauri.app/reference/javascript/api/namespacepath/#runtimedir | $RUNTIME},
* {@linkcode https://v2.tauri.app/reference/javascript/api/namespacepath/#templatedir | $TEMPLATE},
* {@linkcode https://v2.tauri.app/reference/javascript/api/namespacepath/#videodir | $VIDEO},
* {@linkcode https://v2.tauri.app/reference/javascript/api/namespacepath/#resourcedir | $RESOURCE},
* {@linkcode https://v2.tauri.app/reference/javascript/api/namespacepath/#tempdir | $TEMP}.
*
* Trying to execute any API with a URL not configured on the scope results in a promise rejection due to denied access.
*
* @module
*/
var SeekMode;
(function(SeekMode) {
	SeekMode[SeekMode["Start"] = 0] = "Start";
	SeekMode[SeekMode["Current"] = 1] = "Current";
	SeekMode[SeekMode["End"] = 2] = "End";
})(SeekMode || (SeekMode = {}));
function parseFileInfo(r) {
	return {
		isFile: r.isFile,
		isDirectory: r.isDirectory,
		isSymlink: r.isSymlink,
		size: r.size,
		mtime: r.mtime !== null ? new Date(r.mtime) : null,
		atime: r.atime !== null ? new Date(r.atime) : null,
		birthtime: r.birthtime !== null ? new Date(r.birthtime) : null,
		readonly: r.readonly,
		fileAttributes: r.fileAttributes,
		dev: r.dev,
		ino: r.ino,
		mode: r.mode,
		nlink: r.nlink,
		uid: r.uid,
		gid: r.gid,
		rdev: r.rdev,
		blksize: r.blksize,
		blocks: r.blocks
	};
}
/** Converts a big-endian eight byte array to number  */
function fromBytes(buffer) {
	const bytes = new Uint8ClampedArray(buffer);
	const size = bytes.byteLength;
	let x = 0;
	for (let i = 0; i < size; i++) {
		const byte = bytes[i];
		x *= 256;
		x += byte;
	}
	return x;
}
/**
*  The Tauri abstraction for reading and writing files.
*
* @since 2.0.0
*/
var FileHandle = class extends Resource {
	/**
	* Reads up to `p.byteLength` bytes into `p`. It resolves to the number of
	* bytes read (`0` < `n` <= `p.byteLength`) and rejects if any error
	* encountered. Even if `read()` resolves to `n` < `p.byteLength`, it may
	* use all of `p` as scratch space during the call. If some data is
	* available but not `p.byteLength` bytes, `read()` conventionally resolves
	* to what is available instead of waiting for more.
	*
	* When `read()` encounters end-of-file condition, it resolves to EOF
	* (`null`).
	*
	* When `read()` encounters an error, it rejects with an error.
	*
	* Callers should always process the `n` > `0` bytes returned before
	* considering the EOF (`null`). Doing so correctly handles I/O errors that
	* happen after reading some bytes and also both of the allowed EOF
	* behaviors.
	*
	* @example
	* ```typescript
	* import { open, BaseDirectory } from "@tauri-apps/plugin-fs"
	* // if "$APPCONFIG/foo/bar.txt" contains the text "hello world":
	* const file = await open("foo/bar.txt", { baseDir: BaseDirectory.AppConfig });
	* const buf = new Uint8Array(100);
	* const numberOfBytesRead = await file.read(buf); // 11 bytes
	* const text = new TextDecoder().decode(buf);  // "hello world"
	* await file.close();
	* ```
	*
	* @since 2.0.0
	*/
	async read(buffer) {
		if (buffer.byteLength === 0) return 0;
		const data = await invoke("plugin:fs|read", {
			rid: this.rid,
			len: buffer.byteLength
		});
		const nread = fromBytes(data.slice(-8));
		const bytes = data instanceof ArrayBuffer ? new Uint8Array(data) : data;
		buffer.set(bytes.slice(0, bytes.length - 8));
		return nread === 0 ? null : nread;
	}
	/**
	* Seek sets the offset for the next `read()` or `write()` to offset,
	* interpreted according to `whence`: `Start` means relative to the
	* start of the file, `Current` means relative to the current offset,
	* and `End` means relative to the end. Seek resolves to the new offset
	* relative to the start of the file.
	*
	* Seeking to an offset before the start of the file is an error. Seeking to
	* any positive offset is legal, but the behavior of subsequent I/O
	* operations on the underlying object is implementation-dependent.
	* It returns the number of cursor position.
	*
	* @example
	* ```typescript
	* import { open, SeekMode, BaseDirectory } from '@tauri-apps/plugin-fs';
	*
	* // Given hello.txt pointing to file with "Hello world", which is 11 bytes long:
	* const file = await open('hello.txt', { read: true, write: true, truncate: true, create: true, baseDir: BaseDirectory.AppLocalData });
	* await file.write(new TextEncoder().encode("Hello world"));
	*
	* // Seek 6 bytes from the start of the file
	* console.log(await file.seek(6, SeekMode.Start)); // "6"
	* // Seek 2 more bytes from the current position
	* console.log(await file.seek(2, SeekMode.Current)); // "8"
	* // Seek backwards 2 bytes from the end of the file
	* console.log(await file.seek(-2, SeekMode.End)); // "9" (e.g. 11-2)
	*
	* await file.close();
	* ```
	*
	* @since 2.0.0
	*/
	async seek(offset, whence) {
		return await invoke("plugin:fs|seek", {
			rid: this.rid,
			offset,
			whence
		});
	}
	/**
	* Returns a {@linkcode FileInfo } for this file.
	*
	* @example
	* ```typescript
	* import { open, BaseDirectory } from '@tauri-apps/plugin-fs';
	* const file = await open("file.txt", { read: true, baseDir: BaseDirectory.AppLocalData });
	* const fileInfo = await file.stat();
	* console.log(fileInfo.isFile); // true
	* await file.close();
	* ```
	*
	* @since 2.0.0
	*/
	async stat() {
		return parseFileInfo(await invoke("plugin:fs|fstat", { rid: this.rid }));
	}
	/**
	* Truncates or extends this file, to reach the specified `len`.
	* If `len` is not specified then the entire file contents are truncated.
	*
	* @example
	* ```typescript
	* import { open, BaseDirectory } from '@tauri-apps/plugin-fs';
	*
	* // truncate the entire file
	* const file = await open("my_file.txt", { read: true, write: true, create: true, baseDir: BaseDirectory.AppLocalData });
	* await file.truncate();
	*
	* // truncate part of the file
	* const file = await open("my_file.txt", { read: true, write: true, create: true, baseDir: BaseDirectory.AppLocalData });
	* await file.write(new TextEncoder().encode("Hello World"));
	* await file.truncate(7);
	* const data = new Uint8Array(32);
	* await file.read(data);
	* console.log(new TextDecoder().decode(data)); // Hello W
	* await file.close();
	* ```
	*
	* @since 2.0.0
	*/
	async truncate(len) {
		await invoke("plugin:fs|ftruncate", {
			rid: this.rid,
			len
		});
	}
	/**
	* Writes `data.byteLength` bytes from `data` to the underlying data stream. It
	* resolves to the number of bytes written from `data` (`0` <= `n` <=
	* `data.byteLength`) or reject with the error encountered that caused the
	* write to stop early. `write()` must reject with a non-null error if
	* would resolve to `n` < `data.byteLength`. `write()` must not modify the
	* slice data, even temporarily.
	*
	* @example
	* ```typescript
	* import { open, write, BaseDirectory } from '@tauri-apps/plugin-fs';
	* const encoder = new TextEncoder();
	* const data = encoder.encode("Hello world");
	* const file = await open("bar.txt", { write: true, baseDir: BaseDirectory.AppLocalData });
	* const bytesWritten = await file.write(data); // 11
	* await file.close();
	* ```
	*
	* @since 2.0.0
	*/
	async write(data) {
		return await invoke("plugin:fs|write", {
			rid: this.rid,
			data
		});
	}
};
/**
* Open a file and resolve to an instance of {@linkcode FileHandle}. The
* file does not need to previously exist if using the `create` or `createNew`
* open options. It is the callers responsibility to close the file when finished
* with it.
*
* @example
* ```typescript
* import { open, BaseDirectory } from "@tauri-apps/plugin-fs"
* const file = await open("foo/bar.txt", { read: true, write: true, baseDir: BaseDirectory.AppLocalData });
* // Do work with file
* await file.close();
* ```
*
* @since 2.0.0
*/
async function open(path, options) {
	if (path instanceof URL && path.protocol !== "file:") throw new TypeError("Must be a file URL.");
	return new FileHandle(await invoke("plugin:fs|open", {
		path: path instanceof URL ? path.toString() : path,
		options
	}));
}
/**
* Write `data` to the given `path`, by default creating a new file if needed, else overwriting.
* @example
* ```typescript
* import { writeFile, BaseDirectory } from '@tauri-apps/plugin-fs';
*
* let encoder = new TextEncoder();
* let data = encoder.encode("Hello World");
* await writeFile('file.txt', data, { baseDir: BaseDirectory.AppLocalData });
* ```
*
* @since 2.0.0
*/
async function writeFile(path, data, options) {
	if (path instanceof URL && path.protocol !== "file:") throw new TypeError("Must be a file URL.");
	if (data instanceof ReadableStream) {
		const file = await open(path, {
			read: false,
			create: true,
			write: true,
			...options
		});
		const reader = data.getReader();
		try {
			while (true) {
				const { done, value } = await reader.read();
				if (done) break;
				await file.write(value);
			}
		} finally {
			reader.releaseLock();
			await file.close();
		}
	} else await invoke("plugin:fs|write_file", data, { headers: {
		path: encodeURIComponent(path instanceof URL ? path.toString() : path),
		options: JSON.stringify(options)
	} });
}
//#endregion
//#region src/tauri/webivew.ts
const createWebviewWindow = async (label, url, options) => {
	const webview = new WebviewWindow(label, {
		...options,
		url
	});
	await new Promise((resolve, reject) => {
		webview.once("tauri://created", () => resolve());
		webview.once("tauri://error", (event) => reject(/* @__PURE__ */ new Error(`Failed to create window: ${JSON.stringify(event.payload)}`)));
	});
	return webview;
};
//#endregion
//#region src/blocks/window/blocks.ts
const createWindowBlock = {
	blockType: Scratch.BlockType.COMMAND,
	opcode: "createWindow",
	text: "Create window labeled [LABEL] with url [URL] title [TITLE] width [WIDTH] height [HEIGHT] clone current project? [CLONE_PROJECT] auto green flag [AUTO_GREEN_FLAG] hide stage controls [HIDE_STAGE_CONTROLS]",
	arguments: {
		LABEL: {
			type: Scratch.ArgumentType.STRING,
			defaultValue: "new-window"
		},
		URL: {
			type: Scratch.ArgumentType.STRING,
			defaultValue: window.location.href
		},
		TITLE: {
			type: Scratch.ArgumentType.STRING,
			defaultValue: "New window"
		},
		WIDTH: {
			type: Scratch.ArgumentType.NUMBER,
			defaultValue: 800
		},
		HEIGHT: {
			type: Scratch.ArgumentType.NUMBER,
			defaultValue: 600
		},
		CLONE_PROJECT: {
			type: Scratch.ArgumentType.BOOLEAN,
			defaultValue: true
		},
		AUTO_GREEN_FLAG: {
			type: Scratch.ArgumentType.BOOLEAN,
			defaultValue: true
		},
		HIDE_STAGE_CONTROLS: {
			type: Scratch.ArgumentType.BOOLEAN,
			defaultValue: true
		}
	}
};
const AUTO_GREEN_FLAG_PARAM = "tauriAutoGreenFlag";
const CLONE_PROJECT_PARAM = "cloneProjectFile";
const SECURITY_BYPASS_PARAM = "tauriExtSecureBypass";
const SECURITY_BYPASS_TOKEN = "tw-ext-scratch-9f3a1c";
if (new URLSearchParams(window.location.search).has(AUTO_GREEN_FLAG_PARAM)) {
	let pressed = false;
	const press = () => {
		if (pressed) return;
		pressed = true;
		Scratch.vm.start();
		Scratch.vm.greenFlag();
	};
	const isReady = () => Scratch.vm.runtime.targets.length > 0 && Scratch.vm.runtime.getOpcodeFunction("tauriExtension_createWindow") !== void 0;
	const pressWhenReady = () => {
		if (pressed || !isReady()) return;
		press();
	};
	Scratch.vm.runtime.once("PROJECT_LOADED", pressWhenReady);
	pressWhenReady();
	const timer = setInterval(() => {
		if (pressed) {
			clearInterval(timer);
			return;
		}
		pressWhenReady();
	}, 200);
}
if (new URLSearchParams(window.location.search).has("tauriHideStageControls")) {
	const style = document.createElement("style");
	style.textContent = "[class*=\"stage-header-wrapper-overlay\"] { display: none !important; }[class*=\"stage-wrapper\"][class*=\"full-screen\"] { top: 0 !important; }";
	document.head.appendChild(style);
	const STAGE_HEADER_RESERVED_PX = 56;
	const realInnerHeightDescriptor = Object.getOwnPropertyDescriptor(window, "innerHeight") ?? Object.getOwnPropertyDescriptor(Window.prototype, "innerHeight");
	if (realInnerHeightDescriptor?.get) {
		const getRealInnerHeight = realInnerHeightDescriptor.get.bind(window);
		Object.defineProperty(window, "innerHeight", {
			configurable: true,
			get: () => getRealInnerHeight() + STAGE_HEADER_RESERVED_PX
		});
	}
	window.dispatchEvent(new Event("resize"));
}
async function createWindow(args) {
	if (await Window.getByLabel(args.LABEL) != null) throw new Error(`Window with label ${args.LABEL} already exists`);
	const url = new URL(args.URL, window.location.href);
	if (url.hostname === window.location.hostname && url.protocol !== window.location.protocol) url.protocol = window.location.protocol;
	url.searchParams.set("tauriExtWindow", "1");
	url.searchParams.set(SECURITY_BYPASS_PARAM, SECURITY_BYPASS_TOKEN);
	if (args.HIDE_STAGE_CONTROLS) url.searchParams.set("tauriHideStageControls", "1");
	if (args.AUTO_GREEN_FLAG) url.searchParams.set(AUTO_GREEN_FLAG_PARAM, "1");
	const cloneProject = args.CLONE_PROJECT ? (async () => {
		const blob = await Scratch.vm.saveProjectSb3();
		const bytes = new Uint8Array(await blob.arrayBuffer());
		const filePath = await join(await tempDir(), `tauri-ext-clone-${args.LABEL}-${Date.now()}.sb3`);
		await writeFile(filePath, bytes);
		return filePath;
	})() : Promise.resolve(null);
	const pathExistsCheck = url.origin === window.location.origin ? Promise.resolve(true) : fetch(url.toString(), { method: "GET" }).then((response) => {
		response.body?.cancel();
		return response.ok;
	}).catch(() => true);
	const [clonedFilePath, pathExists] = await Promise.all([cloneProject, pathExistsCheck]);
	if (clonedFilePath != null) url.searchParams.set(CLONE_PROJECT_PARAM, clonedFilePath);
	const windowOptions = {
		title: args.TITLE,
		width: args.WIDTH,
		height: args.HEIGHT
	};
	const finalUrl = pathExists ? url : (() => {
		const fallbackUrl = new URL(window.location.href);
		fallbackUrl.search = url.search;
		return fallbackUrl;
	})();
	await createWebviewWindow(args.LABEL, finalUrl.toString(), windowOptions);
	refreshWindowLabelCache();
}
const setWindowTitleBlock = {
	blockType: Scratch.BlockType.COMMAND,
	opcode: "setWindowTitle",
	text: "Set window title to [TITLE] on window labeled [LABEL]",
	arguments: {
		TITLE: { type: Scratch.ArgumentType.STRING },
		LABEL: windowLabelArgument
	}
};
async function setWindowTitle(args) {
	await (await getWindowByLabel(args.LABEL)).setTitle(args.TITLE);
}
const setWindowSizeBlock = {
	blockType: Scratch.BlockType.COMMAND,
	opcode: "setWindowSize",
	text: "Set window size to [WIDTH] width [HEIGHT] height",
	arguments: {
		WIDTH: { type: Scratch.ArgumentType.NUMBER },
		HEIGHT: { type: Scratch.ArgumentType.NUMBER }
	}
};
async function setWindowSize(args) {
	await invoke("set_window_size", {
		width: args.WIDTH,
		height: args.HEIGHT
	});
}
const setWindowMinSizeBlock = {
	blockType: Scratch.BlockType.COMMAND,
	opcode: "setWindowMinSize",
	text: "Set window minimum size to [WIDTH] width [HEIGHT] height",
	arguments: {
		WIDTH: { type: Scratch.ArgumentType.NUMBER },
		HEIGHT: { type: Scratch.ArgumentType.NUMBER }
	}
};
async function setWindowMinSize(args) {
	await invoke("set_window_min_size", {
		width: args.WIDTH,
		height: args.HEIGHT
	});
}
const setWindowMaxSizeBlock = {
	blockType: Scratch.BlockType.COMMAND,
	opcode: "setWindowMaxSize",
	text: "Set window maximum size to [WIDTH] width [HEIGHT] height",
	arguments: {
		WIDTH: { type: Scratch.ArgumentType.NUMBER },
		HEIGHT: { type: Scratch.ArgumentType.NUMBER }
	}
};
async function setWindowMaxSize(args) {
	await invoke("set_window_max_size", {
		width: args.WIDTH,
		height: args.HEIGHT
	});
}
const minimizeWindowBlock = {
	blockType: Scratch.BlockType.COMMAND,
	opcode: "minimizeCurrentWindow",
	text: "Minimize Current window",
	func: "minimizeWindow"
};
async function minimizeWindow() {
	await getCurrentWindow().minimize();
}
const focusWindowBlock = {
	blockType: Scratch.BlockType.COMMAND,
	opcode: "focusWindowCurrentWindow",
	text: "Focus Current window",
	func: "focusWindow"
};
async function focusWindow() {
	await getCurrentWindow().setFocus();
}
const saveWindowStateBlock = {
	blockType: Scratch.BlockType.COMMAND,
	opcode: "saveWindowState",
	text: "Save window state"
};
async function saveWindowState() {
	await invoke("save_window_state");
}
const restoreWindowStateBlock = {
	blockType: Scratch.BlockType.COMMAND,
	opcode: "restoreWindowState",
	text: "Restore window state"
};
async function restoreWindowState() {
	await invoke("restore_window_state");
}
const closeBlock = {
	blockType: Scratch.BlockType.COMMAND,
	opcode: "closeWindow",
	text: "Close Window (THIS WILL CLOSE YOUR SCRATCH PROJECT!)"
};
async function closeWindow() {
	await getCurrentWebviewWindow().close();
}
registerBlock("Window", createWindowBlock, createWindow);
registerBlock("Window", setWindowTitleBlock, setWindowTitle);
registerBlock("Window", setWindowSizeBlock, setWindowSize);
registerBlock("Window", minimizeWindowBlock, minimizeWindow);
registerBlock("Window", focusWindowBlock, focusWindow);
registerBlock("Window", setWindowMinSizeBlock, setWindowMinSize);
registerBlock("Window", setWindowMaxSizeBlock, setWindowMaxSize);
registerBlock("Window", saveWindowStateBlock, saveWindowState);
registerBlock("Window", restoreWindowStateBlock, restoreWindowState);
registerBlock("Window", closeBlock, closeWindow);
//#endregion
//#region src/blocks/window/otherWindow/reporters.ts
const isFocusedByLabelReporter = {
	blockType: Scratch.BlockType.REPORTER,
	opcode: "isFocusedByLabel",
	text: "Is window labeled [LABEL] focused?",
	arguments: { LABEL: windowLabelArgument }
};
async function isFocusedByLabel(args) {
	return await (await getWindowByLabel(args.LABEL)).isFocused();
}
const isFullscreenByLabelReporter = {
	blockType: Scratch.BlockType.REPORTER,
	opcode: "isFullscreenByLabel",
	text: "Is window labeled [LABEL] fullscreened?",
	arguments: { LABEL: windowLabelArgument }
};
async function isFullscreenByLabel(args) {
	return await (await getWindowByLabel(args.LABEL)).isFullscreen();
}
const isCloseableByLabelReporter = {
	blockType: Scratch.BlockType.REPORTER,
	opcode: "isCloseableByLabel",
	text: "Is window labeled [LABEL] closeable?",
	arguments: { LABEL: windowLabelArgument }
};
async function isCloseableByLabel(args) {
	return await (await getWindowByLabel(args.LABEL)).isClosable();
}
const getWWidthByLabelReporter = {
	blockType: Scratch.BlockType.REPORTER,
	opcode: "getWWidthByLabel",
	text: "Width of window labeled [LABEL]",
	arguments: { LABEL: windowLabelArgument }
};
async function getWWidthByLabel(args) {
	return (await (await getWindowByLabel(args.LABEL)).innerSize()).width;
}
const getWHeightByLabelReporter = {
	blockType: Scratch.BlockType.REPORTER,
	opcode: "getWHeightByLabel",
	text: "Height of window labeled [LABEL]",
	arguments: { LABEL: windowLabelArgument }
};
async function getWHeightByLabel(args) {
	return (await (await getWindowByLabel(args.LABEL)).innerSize()).height;
}
registerBlock("Other Windows", isFocusedByLabelReporter, isFocusedByLabel);
registerBlock("Other Windows", isFullscreenByLabelReporter, isFullscreenByLabel);
registerBlock("Other Windows", isCloseableByLabelReporter, isCloseableByLabel);
registerBlock("Other Windows", getWWidthByLabelReporter, getWWidthByLabel);
registerBlock("Other Windows", getWHeightByLabelReporter, getWHeightByLabel);
//#endregion
//#region src/blocks/window/otherWindow/blocks.ts
const focusWindowByLabelBlock = {
	blockType: Scratch.BlockType.COMMAND,
	opcode: "focusWindowByLabel",
	text: "Focus window labeled [LABEL]",
	arguments: { LABEL: windowLabelArgument }
};
async function focusWindowByLabel(args) {
	await (await getWindowByLabel(args.LABEL)).setFocus();
}
const closeWindowByLabelBlock = {
	blockType: Scratch.BlockType.COMMAND,
	opcode: "closeWindowByLabel",
	text: "Close window labeled [LABEL]",
	arguments: { LABEL: windowLabelArgument }
};
async function closeWindowByLabel(args) {
	await (await getWindowByLabel(args.LABEL)).close();
}
const setOtherWindowSizeBlock = {
	blockType: Scratch.BlockType.COMMAND,
	opcode: "setOtherWindowSize",
	text: "Set width [WIDTH] height [HEIGHT] of window labeled [LABEL]",
	arguments: {
		LABEL: windowLabelArgument,
		HEIGHT: { type: Scratch.ArgumentType.NUMBER },
		WIDTH: { type: Scratch.ArgumentType.NUMBER }
	}
};
async function setOtherWindowSizeLabel(args) {
	await (await getWindowByLabel(args.LABEL)).setSize(new LogicalSize(args.WIDTH, args.HEIGHT));
}
const setOtherWindowSizeMinBlock = {
	blockType: Scratch.BlockType.COMMAND,
	opcode: "setOtherWindowMinSize",
	text: "Set minimum width [WIDTH] height [HEIGHT] of window labeled [LABEL]",
	arguments: {
		LABEL: windowLabelArgument,
		HEIGHT: { type: Scratch.ArgumentType.NUMBER },
		WIDTH: { type: Scratch.ArgumentType.NUMBER }
	}
};
async function setOtherWindowMinSize(args) {
	await (await getWindowByLabel(args.LABEL)).setMinSize(new LogicalSize(args.WIDTH, args.WIDTH));
}
const setWindowDecorationsByLabelBlock = {
	blockType: Scratch.BlockType.COMMAND,
	opcode: "setWindowDecorationsByLabel",
	text: "Set window labeled [LABEL] decorations to [DECORATIONS]",
	arguments: {
		LABEL: windowLabelArgument,
		DECORATIONS: {
			type: Scratch.ArgumentType.BOOLEAN,
			defaultValue: true
		}
	}
};
async function setWindowDecorationsByLabel(args) {
	await (await getWindowByLabel(args.LABEL)).setDecorations(args.DECORATIONS);
}
const evalInWindowBlock = {
	blockType: Scratch.BlockType.COMMAND,
	opcode: "evalInWindow",
	text: "Run javascript (or eval) [SCRIPT] in window labeled [LABEL]",
	arguments: {
		SCRIPT: {
			type: Scratch.ArgumentType.STRING,
			defaultValue: "console.log('hi')"
		},
		LABEL: windowLabelArgument
	}
};
async function evalInWindow(args) {
	await invoke("eval_in_window", {
		label: args.LABEL,
		script: args.SCRIPT
	});
}
registerBlock("Other Windows", setOtherWindowSizeMinBlock, setOtherWindowMinSize);
registerBlock("Other Windows", setOtherWindowSizeBlock, setOtherWindowSizeLabel);
registerBlock("Other Windows", focusWindowByLabelBlock, focusWindowByLabel);
registerBlock("Other Windows", closeWindowByLabelBlock, closeWindowByLabel);
registerBlock("Other Windows", setWindowDecorationsByLabelBlock, setWindowDecorationsByLabel);
registerBlock("Other Windows", evalInWindowBlock, evalInWindow);
//#endregion
//#region src/blocks/window/index.ts
registerMenu("windowLabelMenu", {
	acceptReporters: true,
	items: "windowLabelMenu"
}, windowLabelMenu);
//#endregion
//#region src/blocks/messaging.ts
const MESSAGE_EVENT = "tauriExtension-window-message";
let lastReceivedPayload = "";
listen(MESSAGE_EVENT, (event) => {
	lastReceivedPayload = event.payload;
	Scratch.vm.runtime.startHats("tauriExtension_whenDataReceived");
}, { target: getCurrentWebviewWindow().label });
const sendDataToWindowBlock = {
	blockType: Scratch.BlockType.COMMAND,
	opcode: "sendDataToWindow",
	text: "Send data [DATA] to window labeled [LABEL]",
	arguments: {
		DATA: {
			type: Scratch.ArgumentType.STRING,
			defaultValue: "{}"
		},
		LABEL: windowLabelArgument
	}
};
async function sendDataToWindow(args) {
	await emitTo(args.LABEL, MESSAGE_EVENT, args.DATA);
}
const whenDataReceivedBlock = {
	blockType: Scratch.BlockType.EVENT,
	opcode: "whenDataReceived",
	text: "when data received from another window",
	isEdgeActivated: false
};
const lastReceivedDataReporter = {
	blockType: Scratch.BlockType.REPORTER,
	opcode: "lastReceivedData",
	text: "last received data"
};
function lastReceivedData() {
	return lastReceivedPayload;
}
const waitUntilEventBlock = {
	blockType: Scratch.BlockType.COMMAND,
	opcode: "waitUntilEvent",
	text: "Wait until [EVENT] event is emitted",
	arguments: { EVENT: {
		type: Scratch.ArgumentType.STRING,
		defaultValue: MESSAGE_EVENT
	} }
};
async function waitUntilEvent(args) {
	await new Promise((resolve) => {
		once(args.EVENT, () => resolve());
	});
}
registerBlock("Cross-Window Messaging", sendDataToWindowBlock, sendDataToWindow);
registerBlock("Cross-Window Messaging", waitUntilEventBlock, waitUntilEvent);
registerBlock("Cross-Window Messaging", whenDataReceivedBlock);
registerBlock("Cross-Window Messaging", lastReceivedDataReporter, lastReceivedData);
//#endregion
//#region src/blocks/projectState.ts
function isSerializable(value) {
	try {
		structuredClone(value);
		return true;
	} catch {
		return false;
	}
}
const captureProjectStateBlock = {
	blockType: Scratch.BlockType.REPORTER,
	opcode: "captureProjectState",
	text: "capture project state"
};
function captureProjectState() {
	const runtime = Scratch.vm?.runtime;
	if (!runtime) return JSON.stringify({ targets: {} });
	const state = { targets: {} };
	for (const target of runtime.targets) {
		if (!target.isOriginal) continue;
		const vars = [];
		for (const variable of Object.values(target.variables)) if (!variable.isCloud && isSerializable(variable.value)) vars.push([variable.id, variable.value]);
		state.targets[target.id] = {
			x: target.x,
			y: target.y,
			direction: target.direction,
			costume: target.currentCostume,
			visible: target.visible,
			size: target.size,
			vars
		};
	}
	return JSON.stringify(state);
}
const applyProjectStateBlock = {
	blockType: Scratch.BlockType.COMMAND,
	opcode: "applyProjectState",
	text: "apply project state [STATE]",
	arguments: { STATE: {
		type: Scratch.ArgumentType.STRING,
		defaultValue: "{}"
	} }
};
function applyProjectState(args) {
	const runtime = Scratch.vm?.runtime;
	if (!runtime) return;
	const state = JSON.parse(args.STATE);
	for (const target of runtime.targets) {
		if (!target.isOriginal) continue;
		const data = state.targets[target.id];
		if (!data) continue;
		target.setXY(data.x, data.y);
		target.setDirection(data.direction);
		target.setCostume(data.costume);
		target.setVisible(data.visible);
		target.setSize(data.size);
		for (const [varId, value] of data.vars) if (target.variables[varId]) target.variables[varId].value = value;
	}
	runtime.requestRedraw();
}
registerBlock("Cross-Window Messaging", captureProjectStateBlock, captureProjectState);
registerBlock("Cross-Window Messaging", applyProjectStateBlock, applyProjectState);
//#endregion
//#region node_modules/@tauri-apps/plugin-notification/dist-js/index.js
/**
* Send toast notifications (brief auto-expiring OS window element) to your user.
* Can also be used with the Notification Web API.
*
* @module
*/
var ScheduleEvery;
(function(ScheduleEvery) {
	ScheduleEvery["Year"] = "year";
	ScheduleEvery["Month"] = "month";
	ScheduleEvery["TwoWeeks"] = "twoWeeks";
	ScheduleEvery["Week"] = "week";
	ScheduleEvery["Day"] = "day";
	ScheduleEvery["Hour"] = "hour";
	ScheduleEvery["Minute"] = "minute";
	/**
	* Not supported on iOS.
	*/
	ScheduleEvery["Second"] = "second";
})(ScheduleEvery || (ScheduleEvery = {}));
var Importance;
(function(Importance) {
	Importance[Importance["None"] = 0] = "None";
	Importance[Importance["Min"] = 1] = "Min";
	Importance[Importance["Low"] = 2] = "Low";
	Importance[Importance["Default"] = 3] = "Default";
	Importance[Importance["High"] = 4] = "High";
})(Importance || (Importance = {}));
var Visibility;
(function(Visibility) {
	Visibility[Visibility["Secret"] = -1] = "Secret";
	Visibility[Visibility["Private"] = 0] = "Private";
	Visibility[Visibility["Public"] = 1] = "Public";
})(Visibility || (Visibility = {}));
/**
* Checks if the permission to send notifications is granted.
* @example
* ```typescript
* import { isPermissionGranted } from '@tauri-apps/plugin-notification';
* const permissionGranted = await isPermissionGranted();
* ```
*
* @since 2.0.0
*/
async function isPermissionGranted() {
	if (window.Notification.permission !== "default") return await Promise.resolve(window.Notification.permission === "granted");
	return await invoke("plugin:notification|is_permission_granted");
}
/**
* Requests the permission to send notifications.
* @example
* ```typescript
* import { isPermissionGranted, requestPermission } from '@tauri-apps/plugin-notification';
* let permissionGranted = await isPermissionGranted();
* if (!permissionGranted) {
*   const permission = await requestPermission();
*   permissionGranted = permission === 'granted';
* }
* ```
*
* @returns A promise resolving to whether the user granted the permission or not.
*
* @since 2.0.0
*/
async function requestPermission() {
	return await window.Notification.requestPermission();
}
/**
* Sends a notification to the user.
* @example
* ```typescript
* import { isPermissionGranted, requestPermission, sendNotification } from '@tauri-apps/plugin-notification';
* let permissionGranted = await isPermissionGranted();
* if (!permissionGranted) {
*   const permission = await requestPermission();
*   permissionGranted = permission === 'granted';
* }
* if (permissionGranted) {
*   sendNotification('Tauri is awesome!');
*   sendNotification({ title: 'TAURI', body: 'Tauri is awesome!' });
* }
* ```
*
* @since 2.0.0
*/
function sendNotification(options) {
	if (typeof options === "string") new window.Notification(options);
	else new window.Notification(options.title, options);
}
//#endregion
//#region src/blocks/notification.ts
const canSendNotifReport = {
	blockType: Scratch.BlockType.REPORTER,
	opcode: "canSendNotif",
	text: "Can send notification"
};
async function canSendNotif() {
	return await isPermissionGranted();
}
const requestNotifBlock = {
	blockType: Scratch.BlockType.COMMAND,
	opcode: "reqNotifPerm",
	text: "Request notification permission"
};
async function reqNotifPerm() {
	return await requestPermission();
}
const sendNotifBlock = {
	blockType: Scratch.BlockType.COMMAND,
	opcode: "sendNotif",
	text: "Notification send [TITLE] title with description [DESCRIPTION]",
	arguments: {
		TITLE: {
			type: Scratch.ArgumentType.STRING,
			defaultValue: "Tauri"
		},
		DESCRIPTION: {
			type: Scratch.ArgumentType.STRING,
			defaultValue: "Tauri is awesome!"
		}
	}
};
async function sendNotif(args) {
	return await sendNotification({
		title: args.TITLE,
		body: args.DESCRIPTION
	});
}
registerBlock("Notifications", canSendNotifReport, canSendNotif);
registerBlock("Notifications", requestNotifBlock, reqNotifPerm);
registerBlock("Notifications", sendNotifBlock, sendNotif);
//#endregion
//#region src/icon.ts
const icon = "data:image/svg+xml;base64,PHN2ZyBmaWxsPSJub25lIiBoZWlnaHQ9IjI1MDAiIHZpZXdCb3g9Ii03LjAxMTE0MjIzIC0uNDg5MDQ4MjQgMjE5LjI0NDkwNzY1IDIzMS45MDAwNjQ5IiB3aWR0aD0iMjQzNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJtMTQzLjEgODRhMjIgMjIgMCAxIDEgLTQ0IDAgMjIgMjIgMCAwIDEgNDQgMHoiIGZpbGw9IiNmZmMxMzEiLz48Y2lyY2xlIGN4PSI4NC4xIiBjeT0iMTQ3IiBmaWxsPSIjMjRjOGRiIiByPSIyMiIgdHJhbnNmb3JtPSJtYXRyaXgoLTEgMCAwIC0xIDE2OC4yIDI5NCkiLz48ZyBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGZpbGwtcnVsZT0iZXZlbm9kZCI+PHBhdGggZD0ibTE2Ni43IDE1NC41YTg0IDg0IDAgMCAxIC0yOSAxMS44IDU5IDU5IDAgMCAwIDIuOS0yNi42IDU5IDU5IDAgMSAwIC02Ny40LTkwLjEgOTggOTggMCAwIDAgLTMyLjIgOS40IDg0IDg0IDAgMSAxIDEyNS43IDk1LjV6bS0xMjQuNy04MC4yIDIwLjYgMi41YTU5IDU5IDAgMCAxIDIuNi0xMS43IDg0IDg0IDAgMCAwIC0yMy4yIDkuMnoiIGZpbGw9IiNmZmMxMzEiLz48cGF0aCBkPSJtMzguNCA3Ni41YTg0IDg0IDAgMCAxIDI5LjItMTEuOSA1OC45IDU4LjkgMCAwIDAgLTMuMyAyNi43IDU5IDU5IDAgMSAwIDY3LjcgOTAgOTggOTggMCAwIDAgMzIuMi05LjMgODQgODQgMCAxIDEgLTEyNS44LTk1LjV6bTEyNC43IDgwLjItLjQuMnoiIGZpbGw9IiMyNGM4ZGIiLz48L2c+PC9zdmc+";
//#endregion
//#region src/index.ts
(async function(Scratch) {
	if (!Scratch.extensions.unsandboxed) throw new Error("Please run Tauri Extension without sandbox!");
	if (!window.__TAURI__) (await ScratchBlocks.customPrompt({ title: "Error" }, { content: { width: "500px" } }, [{
		name: "OK",
		role: "ok",
		callback: () => console.log("Confirmed")
	}, {
		name: "Cancel",
		role: "close",
		callback: () => console.log("Cancelled")
	}])).appendChild(document.createTextNode("Please run this extension in PenguinDesktop.\nhttps://github.com/TheMallyGuy/penguin-desktop"));
	const extension = {
		getInfo() {
			return {
				id: "tauriExtension",
				name: "Tauri extension",
				color1: "#f1b62b",
				blockIconURI: icon,
				blocks: buildExtensionBlocks(),
				menus: getMenus()
			};
		},
		...getMethods()
	};
	Scratch.extensions.register(extension);
})(Scratch);
//#endregion
//#region src/withL10n.ts
(function(Scratch) {
	Scratch.translate.setup(l10n_default);
})(Scratch);
//#endregion
