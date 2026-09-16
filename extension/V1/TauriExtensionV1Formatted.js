// Generated using Rolldown.js by VOID(0). (https://rolldown.rs/)
// If you want to see the source code, please view: https://github.com/TheMallyGuy/tauri-scratch-ext
// Name: Tauri Extension
// ID: tauriExtensionV1
// Description: Scratch extension for Tauri.
// By: Mally
// License: MPL-2.0
//
//
//
//
//
//
//
//#region src/l10n/index.ts
var l10n_default = {};
//#endregion
//#region node_modules/@tauri-apps/api/external/tslib/tslib.es6.js
function __classPrivateFieldGet(receiver, state, kind, f) {
  if (kind === "a" && !f)
    throw new TypeError("Private accessor was defined without a getter");
  if (
    typeof state === "function"
      ? receiver !== state || !f
      : !state.has(receiver)
  )
    throw new TypeError(
      "Cannot read private member from an object whose class did not declare it"
    );
  return kind === "m"
    ? f
    : kind === "a"
      ? f.call(receiver)
      : f
        ? f.value
        : state.get(receiver);
}
function __classPrivateFieldSet(receiver, state, value, kind, f) {
  if (kind === "m") throw new TypeError("Private method is not writable");
  if (kind === "a" && !f)
    throw new TypeError("Private accessor was defined without a setter");
  if (
    typeof state === "function"
      ? receiver !== state || !f
      : !state.has(receiver)
  )
    throw new TypeError(
      "Cannot write private member to an object whose class did not declare it"
    );
  return (
    kind === "a"
      ? f.call(receiver, value)
      : f
        ? (f.value = value)
        : state.set(receiver, value),
    value
  );
}
var _Resource_rid;
const SERIALIZE_TO_IPC_FN = "__TAURI_TO_IPC_KEY__";
function transformCallback(callback, once = false) {
  return window.__TAURI_INTERNALS__.transformCallback(callback, once);
}
async function invoke(cmd, args = {}, options) {
  return window.__TAURI_INTERNALS__.invoke(cmd, args, options);
}
var Resource = class {
  get rid() {
    return __classPrivateFieldGet(this, _Resource_rid, "f");
  }
  constructor(rid) {
    _Resource_rid.set(this, void 0);
    __classPrivateFieldSet(this, _Resource_rid, rid, "f");
  }
  async close() {
    return invoke("plugin:resources|close", { rid: this.rid });
  }
};
_Resource_rid = new WeakMap();
//#endregion
//#region node_modules/@tauri-apps/api/event.js
var TauriEvent;
(function (TauriEvent) {
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
async function _unlisten(event, eventId) {
  window.__TAURI_EVENT_PLUGIN_INTERNALS__.unregisterListener(event, eventId);
  await invoke("plugin:event|unlisten", {
    event,
    eventId,
  });
}
async function listen(event, handler, options) {
  var _a;
  return invoke("plugin:event|listen", {
    event,
    target:
      typeof (options === null || options === void 0
        ? void 0
        : options.target) === "string"
        ? {
            kind: "AnyLabel",
            label: options.target,
          }
        : (_a =
              options === null || options === void 0
                ? void 0
                : options.target) !== null && _a !== void 0
          ? _a
          : { kind: "Any" },
    handler: transformCallback(handler),
  }).then((eventId) => {
    return async () => _unlisten(event, eventId);
  });
}
async function once(event, handler, options) {
  return listen(
    event,
    (eventData) => {
      _unlisten(event, eventData.id);
      handler(eventData);
    },
    options
  );
}
async function emit(event, payload) {
  await invoke("plugin:event|emit", {
    event,
    payload,
  });
}
async function emitTo(target, event, payload) {
  await invoke("plugin:event|emit_to", {
    target:
      typeof target === "string"
        ? {
            kind: "AnyLabel",
            label: target,
          }
        : target,
    event,
    payload,
  });
}
//#endregion
//#region node_modules/@tauri-apps/api/dpi.js
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
  toPhysical(scaleFactor) {
    return new PhysicalSize(
      this.width * scaleFactor,
      this.height * scaleFactor
    );
  }
  [SERIALIZE_TO_IPC_FN]() {
    return {
      width: this.width,
      height: this.height,
    };
  }
  toJSON() {
    return this[SERIALIZE_TO_IPC_FN]();
  }
};
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
  toLogical(scaleFactor) {
    return new LogicalSize(this.width / scaleFactor, this.height / scaleFactor);
  }
  [SERIALIZE_TO_IPC_FN]() {
    return {
      width: this.width,
      height: this.height,
    };
  }
  toJSON() {
    return this[SERIALIZE_TO_IPC_FN]();
  }
};
var Size = class {
  constructor(size) {
    this.size = size;
  }
  toLogical(scaleFactor) {
    return this.size instanceof LogicalSize
      ? this.size
      : this.size.toLogical(scaleFactor);
  }
  toPhysical(scaleFactor) {
    return this.size instanceof PhysicalSize
      ? this.size
      : this.size.toPhysical(scaleFactor);
  }
  [SERIALIZE_TO_IPC_FN]() {
    return {
      [`${this.size.type}`]: {
        width: this.size.width,
        height: this.size.height,
      },
    };
  }
  toJSON() {
    return this[SERIALIZE_TO_IPC_FN]();
  }
};
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
  toPhysical(scaleFactor) {
    return new PhysicalPosition(this.x * scaleFactor, this.y * scaleFactor);
  }
  [SERIALIZE_TO_IPC_FN]() {
    return {
      x: this.x,
      y: this.y,
    };
  }
  toJSON() {
    return this[SERIALIZE_TO_IPC_FN]();
  }
};
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
  toLogical(scaleFactor) {
    return new LogicalPosition(this.x / scaleFactor, this.y / scaleFactor);
  }
  [SERIALIZE_TO_IPC_FN]() {
    return {
      x: this.x,
      y: this.y,
    };
  }
  toJSON() {
    return this[SERIALIZE_TO_IPC_FN]();
  }
};
var Position = class {
  constructor(position) {
    this.position = position;
  }
  toLogical(scaleFactor) {
    return this.position instanceof LogicalPosition
      ? this.position
      : this.position.toLogical(scaleFactor);
  }
  toPhysical(scaleFactor) {
    return this.position instanceof PhysicalPosition
      ? this.position
      : this.position.toPhysical(scaleFactor);
  }
  [SERIALIZE_TO_IPC_FN]() {
    return {
      [`${this.position.type}`]: {
        x: this.position.x,
        y: this.position.y,
      },
    };
  }
  toJSON() {
    return this[SERIALIZE_TO_IPC_FN]();
  }
};
//#endregion
//#region node_modules/@tauri-apps/api/image.js
var Image = class Image extends Resource {
  constructor(rid) {
    super(rid);
  }
  static async new(rgba, width, height) {
    return invoke("plugin:image|new", {
      rgba: transformImage(rgba),
      width,
      height,
    }).then((rid) => new Image(rid));
  }
  static async fromBytes(bytes) {
    return invoke("plugin:image|from_bytes", {
      bytes: transformImage(bytes),
    }).then((rid) => new Image(rid));
  }
  static async fromPath(path) {
    return invoke("plugin:image|from_path", { path }).then(
      (rid) => new Image(rid)
    );
  }
  async rgba() {
    return invoke("plugin:image|rgba", { rid: this.rid }).then(
      (buffer) => new Uint8Array(buffer)
    );
  }
  async size() {
    return invoke("plugin:image|size", { rid: this.rid });
  }
};
function transformImage(image) {
  return image == null
    ? null
    : typeof image === "string"
      ? image
      : image instanceof Image
        ? image.rid
        : image;
}
//#endregion
//#region node_modules/@tauri-apps/api/window.js
var UserAttentionType;
(function (UserAttentionType) {
  UserAttentionType[(UserAttentionType["Critical"] = 1)] = "Critical";
  UserAttentionType[(UserAttentionType["Informational"] = 2)] = "Informational";
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
(function (ProgressBarStatus) {
  ProgressBarStatus["None"] = "none";
  ProgressBarStatus["Normal"] = "normal";
  ProgressBarStatus["Indeterminate"] = "indeterminate";
  ProgressBarStatus["Paused"] = "paused";
  ProgressBarStatus["Error"] = "error";
})(ProgressBarStatus || (ProgressBarStatus = {}));
function getCurrentWindow() {
  return new Window(window.__TAURI_INTERNALS__.metadata.currentWindow.label, {
    skip: true,
  });
}
async function getAllWindows() {
  return invoke("plugin:window|get_all_windows").then((windows) =>
    windows.map((w) => new Window(w, { skip: true }))
  );
}
const localTauriEvents$1 = ["tauri://created", "tauri://error"];
var Window = class {
  constructor(label, options = {}) {
    var _a;
    this.label = label;
    this.listeners = Object.create(null);
    if (!(options === null || options === void 0 ? void 0 : options.skip))
      invoke("plugin:window|create", {
        options: {
          ...options,
          parent:
            typeof options.parent === "string"
              ? options.parent
              : (_a = options.parent) === null || _a === void 0
                ? void 0
                : _a.label,
          label,
        },
      })
        .then(async () => this.emit("tauri://created"))
        .catch(async (e) => this.emit("tauri://error", e));
  }
  static async getByLabel(label) {
    var _a;
    return (_a = (await getAllWindows()).find((w) => w.label === label)) !==
      null && _a !== void 0
      ? _a
      : null;
  }
  static getCurrent() {
    return getCurrentWindow();
  }
  static async getAll() {
    return getAllWindows();
  }
  static async getFocusedWindow() {
    for (const w of await getAllWindows()) if (await w.isFocused()) return w;
    return null;
  }
  async listen(event, handler) {
    if (this._handleTauriEvent(event, handler))
      return () => {
        const listeners = this.listeners[event];
        listeners.splice(listeners.indexOf(handler), 1);
      };
    return listen(event, handler, {
      target: {
        kind: "Window",
        label: this.label,
      },
    });
  }
  async once(event, handler) {
    if (this._handleTauriEvent(event, handler))
      return () => {
        const listeners = this.listeners[event];
        listeners.splice(listeners.indexOf(handler), 1);
      };
    return once(event, handler, {
      target: {
        kind: "Window",
        label: this.label,
      },
    });
  }
  async emit(event, payload) {
    if (localTauriEvents$1.includes(event)) {
      for (const handler of this.listeners[event] || [])
        handler({
          event,
          id: -1,
          payload,
        });
      return;
    }
    return emit(event, payload);
  }
  async emitTo(target, event, payload) {
    if (localTauriEvents$1.includes(event)) {
      for (const handler of this.listeners[event] || [])
        handler({
          event,
          id: -1,
          payload,
        });
      return;
    }
    return emitTo(target, event, payload);
  }
  _handleTauriEvent(event, handler) {
    if (localTauriEvents$1.includes(event)) {
      if (!(event in this.listeners)) this.listeners[event] = [handler];
      else this.listeners[event].push(handler);
      return true;
    }
    return false;
  }
  async scaleFactor() {
    return invoke("plugin:window|scale_factor", { label: this.label });
  }
  async innerPosition() {
    return invoke("plugin:window|inner_position", { label: this.label }).then(
      (p) => new PhysicalPosition(p)
    );
  }
  async outerPosition() {
    return invoke("plugin:window|outer_position", { label: this.label }).then(
      (p) => new PhysicalPosition(p)
    );
  }
  async innerSize() {
    return invoke("plugin:window|inner_size", { label: this.label }).then(
      (s) => new PhysicalSize(s)
    );
  }
  async outerSize() {
    return invoke("plugin:window|outer_size", { label: this.label }).then(
      (s) => new PhysicalSize(s)
    );
  }
  async isFullscreen() {
    return invoke("plugin:window|is_fullscreen", { label: this.label });
  }
  async isMinimized() {
    return invoke("plugin:window|is_minimized", { label: this.label });
  }
  async isMaximized() {
    return invoke("plugin:window|is_maximized", { label: this.label });
  }
  async isFocused() {
    return invoke("plugin:window|is_focused", { label: this.label });
  }
  async isDecorated() {
    return invoke("plugin:window|is_decorated", { label: this.label });
  }
  async isResizable() {
    return invoke("plugin:window|is_resizable", { label: this.label });
  }
  async isMaximizable() {
    return invoke("plugin:window|is_maximizable", { label: this.label });
  }
  async isMinimizable() {
    return invoke("plugin:window|is_minimizable", { label: this.label });
  }
  async isClosable() {
    return invoke("plugin:window|is_closable", { label: this.label });
  }
  async isVisible() {
    return invoke("plugin:window|is_visible", { label: this.label });
  }
  async title() {
    return invoke("plugin:window|title", { label: this.label });
  }
  async theme() {
    return invoke("plugin:window|theme", { label: this.label });
  }
  async isAlwaysOnTop() {
    return invoke("plugin:window|is_always_on_top", { label: this.label });
  }
  async activityName() {
    return invoke("plugin:window|activity_name", { label: this.label });
  }
  async sceneIdentifier() {
    return invoke("plugin:window|scene_identifier", { label: this.label });
  }
  async center() {
    return invoke("plugin:window|center", { label: this.label });
  }
  async requestUserAttention(requestType) {
    let requestType_ = null;
    if (requestType) {
      if (requestType === UserAttentionType.Critical)
        requestType_ = { type: "Critical" };
      else requestType_ = { type: "Informational" };
    }
    return invoke("plugin:window|request_user_attention", {
      label: this.label,
      value: requestType_,
    });
  }
  async setResizable(resizable) {
    return invoke("plugin:window|set_resizable", {
      label: this.label,
      value: resizable,
    });
  }
  async setEnabled(enabled) {
    return invoke("plugin:window|set_enabled", {
      label: this.label,
      value: enabled,
    });
  }
  async isEnabled() {
    return invoke("plugin:window|is_enabled", { label: this.label });
  }
  async setMaximizable(maximizable) {
    return invoke("plugin:window|set_maximizable", {
      label: this.label,
      value: maximizable,
    });
  }
  async setMinimizable(minimizable) {
    return invoke("plugin:window|set_minimizable", {
      label: this.label,
      value: minimizable,
    });
  }
  async setClosable(closable) {
    return invoke("plugin:window|set_closable", {
      label: this.label,
      value: closable,
    });
  }
  async setTitle(title) {
    return invoke("plugin:window|set_title", {
      label: this.label,
      value: title,
    });
  }
  async maximize() {
    return invoke("plugin:window|maximize", { label: this.label });
  }
  async unmaximize() {
    return invoke("plugin:window|unmaximize", { label: this.label });
  }
  async toggleMaximize() {
    return invoke("plugin:window|toggle_maximize", { label: this.label });
  }
  async minimize() {
    return invoke("plugin:window|minimize", { label: this.label });
  }
  async unminimize() {
    return invoke("plugin:window|unminimize", { label: this.label });
  }
  async show() {
    return invoke("plugin:window|show", { label: this.label });
  }
  async hide() {
    return invoke("plugin:window|hide", { label: this.label });
  }
  async close() {
    return invoke("plugin:window|close", { label: this.label });
  }
  async destroy() {
    return invoke("plugin:window|destroy", { label: this.label });
  }
  async setDecorations(decorations) {
    return invoke("plugin:window|set_decorations", {
      label: this.label,
      value: decorations,
    });
  }
  async setShadow(enable) {
    return invoke("plugin:window|set_shadow", {
      label: this.label,
      value: enable,
    });
  }
  async setEffects(effects) {
    return invoke("plugin:window|set_effects", {
      label: this.label,
      value: effects,
    });
  }
  async clearEffects() {
    return invoke("plugin:window|set_effects", {
      label: this.label,
      value: null,
    });
  }
  async setAlwaysOnTop(alwaysOnTop) {
    return invoke("plugin:window|set_always_on_top", {
      label: this.label,
      value: alwaysOnTop,
    });
  }
  async setAlwaysOnBottom(alwaysOnBottom) {
    return invoke("plugin:window|set_always_on_bottom", {
      label: this.label,
      value: alwaysOnBottom,
    });
  }
  async setContentProtected(protected_) {
    return invoke("plugin:window|set_content_protected", {
      label: this.label,
      value: protected_,
    });
  }
  async setSize(size) {
    return invoke("plugin:window|set_size", {
      label: this.label,
      value: size instanceof Size ? size : new Size(size),
    });
  }
  async setMinSize(size) {
    return invoke("plugin:window|set_min_size", {
      label: this.label,
      value: size instanceof Size ? size : size ? new Size(size) : null,
    });
  }
  async setMaxSize(size) {
    return invoke("plugin:window|set_max_size", {
      label: this.label,
      value: size instanceof Size ? size : size ? new Size(size) : null,
    });
  }
  async setSizeConstraints(constraints) {
    function logical(pixel) {
      return pixel ? { Logical: pixel } : null;
    }
    return invoke("plugin:window|set_size_constraints", {
      label: this.label,
      value: {
        minWidth: logical(
          constraints === null || constraints === void 0
            ? void 0
            : constraints.minWidth
        ),
        minHeight: logical(
          constraints === null || constraints === void 0
            ? void 0
            : constraints.minHeight
        ),
        maxWidth: logical(
          constraints === null || constraints === void 0
            ? void 0
            : constraints.maxWidth
        ),
        maxHeight: logical(
          constraints === null || constraints === void 0
            ? void 0
            : constraints.maxHeight
        ),
      },
    });
  }
  async setPosition(position) {
    return invoke("plugin:window|set_position", {
      label: this.label,
      value: position instanceof Position ? position : new Position(position),
    });
  }
  async setFullscreen(fullscreen) {
    return invoke("plugin:window|set_fullscreen", {
      label: this.label,
      value: fullscreen,
    });
  }
  async setSimpleFullscreen(fullscreen) {
    return invoke("plugin:window|set_simple_fullscreen", {
      label: this.label,
      value: fullscreen,
    });
  }
  async setFocus() {
    return invoke("plugin:window|set_focus", { label: this.label });
  }
  async setFocusable(focusable) {
    return invoke("plugin:window|set_focusable", {
      label: this.label,
      value: focusable,
    });
  }
  async setIcon(icon) {
    return invoke("plugin:window|set_icon", {
      label: this.label,
      value: transformImage(icon),
    });
  }
  async setSkipTaskbar(skip) {
    return invoke("plugin:window|set_skip_taskbar", {
      label: this.label,
      value: skip,
    });
  }
  async setCursorGrab(grab) {
    return invoke("plugin:window|set_cursor_grab", {
      label: this.label,
      value: grab,
    });
  }
  async setCursorVisible(visible) {
    return invoke("plugin:window|set_cursor_visible", {
      label: this.label,
      value: visible,
    });
  }
  async setCursorIcon(icon) {
    return invoke("plugin:window|set_cursor_icon", {
      label: this.label,
      value: icon,
    });
  }
  async setBackgroundColor(color) {
    return invoke("plugin:window|set_background_color", { color });
  }
  async setCursorPosition(position) {
    return invoke("plugin:window|set_cursor_position", {
      label: this.label,
      value: position instanceof Position ? position : new Position(position),
    });
  }
  async setIgnoreCursorEvents(ignore) {
    return invoke("plugin:window|set_ignore_cursor_events", {
      label: this.label,
      value: ignore,
    });
  }
  async startDragging() {
    return invoke("plugin:window|start_dragging", { label: this.label });
  }
  async startResizeDragging(direction) {
    return invoke("plugin:window|start_resize_dragging", {
      label: this.label,
      value: direction,
    });
  }
  async setBadgeCount(count) {
    return invoke("plugin:window|set_badge_count", {
      label: this.label,
      value: count,
    });
  }
  async setBadgeLabel(label) {
    return invoke("plugin:window|set_badge_label", {
      label: this.label,
      value: label,
    });
  }
  async setOverlayIcon(icon) {
    return invoke("plugin:window|set_overlay_icon", {
      label: this.label,
      value: icon ? transformImage(icon) : void 0,
    });
  }
  async setProgressBar(state) {
    return invoke("plugin:window|set_progress_bar", {
      label: this.label,
      value: state,
    });
  }
  async setVisibleOnAllWorkspaces(visible) {
    return invoke("plugin:window|set_visible_on_all_workspaces", {
      label: this.label,
      value: visible,
    });
  }
  async setTitleBarStyle(style) {
    return invoke("plugin:window|set_title_bar_style", {
      label: this.label,
      value: style,
    });
  }
  async setTheme(theme) {
    return invoke("plugin:window|set_theme", {
      label: this.label,
      value: theme,
    });
  }
  async onResized(handler) {
    return this.listen(TauriEvent.WINDOW_RESIZED, (e) => {
      e.payload = new PhysicalSize(e.payload);
      handler(e);
    });
  }
  async onMoved(handler) {
    return this.listen(TauriEvent.WINDOW_MOVED, (e) => {
      e.payload = new PhysicalPosition(e.payload);
      handler(e);
    });
  }
  async onCloseRequested(handler) {
    return this.listen(TauriEvent.WINDOW_CLOSE_REQUESTED, async (event) => {
      const evt = new CloseRequestedEvent(event);
      await handler(evt);
      if (!evt.isPreventDefault()) await this.destroy();
    });
  }
  async onDragDropEvent(handler) {
    const unlistenDrag = await this.listen(TauriEvent.DRAG_ENTER, (event) => {
      handler({
        ...event,
        payload: {
          type: "enter",
          paths: event.payload.paths,
          position: new PhysicalPosition(event.payload.position),
        },
      });
    });
    const unlistenDragOver = await this.listen(
      TauriEvent.DRAG_OVER,
      (event) => {
        handler({
          ...event,
          payload: {
            type: "over",
            position: new PhysicalPosition(event.payload.position),
          },
        });
      }
    );
    const unlistenDrop = await this.listen(TauriEvent.DRAG_DROP, (event) => {
      handler({
        ...event,
        payload: {
          type: "drop",
          paths: event.payload.paths,
          position: new PhysicalPosition(event.payload.position),
        },
      });
    });
    const unlistenCancel = await this.listen(TauriEvent.DRAG_LEAVE, (event) => {
      handler({
        ...event,
        payload: { type: "leave" },
      });
    });
    return () => {
      unlistenDrag();
      unlistenDrop();
      unlistenDragOver();
      unlistenCancel();
    };
  }
  async onFocusChanged(handler) {
    const unlistenFocus = await this.listen(
      TauriEvent.WINDOW_FOCUS,
      (event) => {
        handler({
          ...event,
          payload: true,
        });
      }
    );
    const unlistenBlur = await this.listen(TauriEvent.WINDOW_BLUR, (event) => {
      handler({
        ...event,
        payload: false,
      });
    });
    return () => {
      unlistenFocus();
      unlistenBlur();
    };
  }
  async onScaleChanged(handler) {
    return this.listen(TauriEvent.WINDOW_SCALE_FACTOR_CHANGED, handler);
  }
  async onThemeChanged(handler) {
    return this.listen(TauriEvent.WINDOW_THEME_CHANGED, handler);
  }
};
var BackgroundThrottlingPolicy;
(function (BackgroundThrottlingPolicy) {
  BackgroundThrottlingPolicy["Disabled"] = "disabled";
  BackgroundThrottlingPolicy["Throttle"] = "throttle";
  BackgroundThrottlingPolicy["Suspend"] = "suspend";
})(BackgroundThrottlingPolicy || (BackgroundThrottlingPolicy = {}));
var ScrollBarStyle;
(function (ScrollBarStyle) {
  ScrollBarStyle["Default"] = "default";
  ScrollBarStyle["FluentOverlay"] = "fluentOverlay";
})(ScrollBarStyle || (ScrollBarStyle = {}));
var Effect;
(function (Effect) {
  Effect["AppearanceBased"] = "appearanceBased";
  Effect["Light"] = "light";
  Effect["Dark"] = "dark";
  Effect["MediumLight"] = "mediumLight";
  Effect["UltraDark"] = "ultraDark";
  Effect["Titlebar"] = "titlebar";
  Effect["Selection"] = "selection";
  Effect["Menu"] = "menu";
  Effect["Popover"] = "popover";
  Effect["Sidebar"] = "sidebar";
  Effect["HeaderView"] = "headerView";
  Effect["Sheet"] = "sheet";
  Effect["WindowBackground"] = "windowBackground";
  Effect["HudWindow"] = "hudWindow";
  Effect["FullScreenUI"] = "fullScreenUI";
  Effect["Tooltip"] = "tooltip";
  Effect["ContentBackground"] = "contentBackground";
  Effect["UnderWindowBackground"] = "underWindowBackground";
  Effect["UnderPageBackground"] = "underPageBackground";
  Effect["Mica"] = "mica";
  Effect["Blur"] = "blur";
  Effect["Acrylic"] = "acrylic";
  Effect["Tabbed"] = "tabbed";
  Effect["TabbedDark"] = "tabbedDark";
  Effect["TabbedLight"] = "tabbedLight";
})(Effect || (Effect = {}));
var EffectState;
(function (EffectState) {
  EffectState["FollowsWindowActiveState"] = "followsWindowActiveState";
  EffectState["Active"] = "active";
  EffectState["Inactive"] = "inactive";
})(EffectState || (EffectState = {}));
//#endregion
//#region node_modules/@tauri-apps/api/webview.js
function getCurrentWebview() {
  return new Webview(
    getCurrentWindow(),
    window.__TAURI_INTERNALS__.metadata.currentWebview.label,
    { skip: true }
  );
}
async function getAllWebviews() {
  return invoke("plugin:webview|get_all_webviews").then((webviews) =>
    webviews.map(
      (w) =>
        new Webview(new Window(w.windowLabel, { skip: true }), w.label, {
          skip: true,
        })
    )
  );
}
const localTauriEvents = ["tauri://created", "tauri://error"];
var Webview = class {
  constructor(window, label, options) {
    this.window = window;
    this.label = label;
    this.listeners = Object.create(null);
    if (!(options === null || options === void 0 ? void 0 : options.skip))
      invoke("plugin:webview|create_webview", {
        windowLabel: window.label,
        options: {
          ...options,
          label,
        },
      })
        .then(async () => this.emit("tauri://created"))
        .catch(async (e) => this.emit("tauri://error", e));
  }
  static async getByLabel(label) {
    var _a;
    return (_a = (await getAllWebviews()).find((w) => w.label === label)) !==
      null && _a !== void 0
      ? _a
      : null;
  }
  static getCurrent() {
    return getCurrentWebview();
  }
  static async getAll() {
    return getAllWebviews();
  }
  async listen(event, handler) {
    if (this._handleTauriEvent(event, handler))
      return () => {
        const listeners = this.listeners[event];
        listeners.splice(listeners.indexOf(handler), 1);
      };
    return listen(event, handler, {
      target: {
        kind: "Webview",
        label: this.label,
      },
    });
  }
  async once(event, handler) {
    if (this._handleTauriEvent(event, handler))
      return () => {
        const listeners = this.listeners[event];
        listeners.splice(listeners.indexOf(handler), 1);
      };
    return once(event, handler, {
      target: {
        kind: "Webview",
        label: this.label,
      },
    });
  }
  async emit(event, payload) {
    if (localTauriEvents.includes(event)) {
      for (const handler of this.listeners[event] || [])
        handler({
          event,
          id: -1,
          payload,
        });
      return;
    }
    return emit(event, payload);
  }
  async emitTo(target, event, payload) {
    if (localTauriEvents.includes(event)) {
      for (const handler of this.listeners[event] || [])
        handler({
          event,
          id: -1,
          payload,
        });
      return;
    }
    return emitTo(target, event, payload);
  }
  _handleTauriEvent(event, handler) {
    if (localTauriEvents.includes(event)) {
      if (!(event in this.listeners)) this.listeners[event] = [handler];
      else this.listeners[event].push(handler);
      return true;
    }
    return false;
  }
  async position() {
    return invoke("plugin:webview|webview_position", {
      label: this.label,
    }).then((p) => new PhysicalPosition(p));
  }
  async size() {
    return invoke("plugin:webview|webview_size", { label: this.label }).then(
      (s) => new PhysicalSize(s)
    );
  }
  async close() {
    return invoke("plugin:webview|webview_close", { label: this.label });
  }
  async setSize(size) {
    return invoke("plugin:webview|set_webview_size", {
      label: this.label,
      value: size instanceof Size ? size : new Size(size),
    });
  }
  async setPosition(position) {
    return invoke("plugin:webview|set_webview_position", {
      label: this.label,
      value: position instanceof Position ? position : new Position(position),
    });
  }
  async setFocus() {
    return invoke("plugin:webview|set_webview_focus", { label: this.label });
  }
  async setAutoResize(autoResize) {
    return invoke("plugin:webview|set_webview_auto_resize", {
      label: this.label,
      value: autoResize,
    });
  }
  async hide() {
    return invoke("plugin:webview|webview_hide", { label: this.label });
  }
  async show() {
    return invoke("plugin:webview|webview_show", { label: this.label });
  }
  async setZoom(scaleFactor) {
    return invoke("plugin:webview|set_webview_zoom", {
      label: this.label,
      value: scaleFactor,
    });
  }
  async reparent(window) {
    return invoke("plugin:webview|reparent", {
      label: this.label,
      window: typeof window === "string" ? window : window.label,
    });
  }
  async clearAllBrowsingData() {
    return invoke("plugin:webview|clear_all_browsing_data");
  }
  async setBackgroundColor(color) {
    return invoke("plugin:webview|set_webview_background_color", { color });
  }
  async onDragDropEvent(handler) {
    const unlistenDragEnter = await this.listen(
      TauriEvent.DRAG_ENTER,
      (event) => {
        handler({
          ...event,
          payload: {
            type: "enter",
            paths: event.payload.paths,
            position: new PhysicalPosition(event.payload.position),
          },
        });
      }
    );
    const unlistenDragOver = await this.listen(
      TauriEvent.DRAG_OVER,
      (event) => {
        handler({
          ...event,
          payload: {
            type: "over",
            position: new PhysicalPosition(event.payload.position),
          },
        });
      }
    );
    const unlistenDragDrop = await this.listen(
      TauriEvent.DRAG_DROP,
      (event) => {
        handler({
          ...event,
          payload: {
            type: "drop",
            paths: event.payload.paths,
            position: new PhysicalPosition(event.payload.position),
          },
        });
      }
    );
    const unlistenDragLeave = await this.listen(
      TauriEvent.DRAG_LEAVE,
      (event) => {
        handler({
          ...event,
          payload: { type: "leave" },
        });
      }
    );
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
function getCurrentWebviewWindow() {
  return new WebviewWindow(getCurrentWebview().label, { skip: true });
}
async function getAllWebviewWindows() {
  return invoke("plugin:window|get_all_windows").then((windows) =>
    windows.map((w) => new WebviewWindow(w, { skip: true }))
  );
}
var WebviewWindow = class WebviewWindow {
  constructor(label, options = {}) {
    var _a;
    this.label = label;
    this.listeners = Object.create(null);
    if (!(options === null || options === void 0 ? void 0 : options.skip))
      invoke("plugin:webview|create_webview_window", {
        options: {
          ...options,
          parent:
            typeof options.parent === "string"
              ? options.parent
              : (_a = options.parent) === null || _a === void 0
                ? void 0
                : _a.label,
          label,
        },
      })
        .then(async () => this.emit("tauri://created"))
        .catch(async (e) => this.emit("tauri://error", e));
  }
  static async getByLabel(label) {
    var _a;
    const webview =
      (_a = (await getAllWebviewWindows()).find((w) => w.label === label)) !==
        null && _a !== void 0
        ? _a
        : null;
    if (webview) return new WebviewWindow(webview.label, { skip: true });
    return null;
  }
  static getCurrent() {
    return getCurrentWebviewWindow();
  }
  static async getAll() {
    return getAllWebviewWindows();
  }
  async listen(event, handler) {
    if (this._handleTauriEvent(event, handler))
      return () => {
        const listeners = this.listeners[event];
        listeners.splice(listeners.indexOf(handler), 1);
      };
    return listen(event, handler, {
      target: {
        kind: "WebviewWindow",
        label: this.label,
      },
    });
  }
  async once(event, handler) {
    if (this._handleTauriEvent(event, handler))
      return () => {
        const listeners = this.listeners[event];
        listeners.splice(listeners.indexOf(handler), 1);
      };
    return once(event, handler, {
      target: {
        kind: "WebviewWindow",
        label: this.label,
      },
    });
  }
  async setBackgroundColor(color) {
    return invoke("plugin:window|set_background_color", { color }).then(() => {
      return invoke("plugin:webview|set_webview_background_color", { color });
    });
  }
};
applyMixins(WebviewWindow, [Window, Webview]);
function applyMixins(baseClass, extendedClasses) {
  (Array.isArray(extendedClasses)
    ? extendedClasses
    : [extendedClasses]
  ).forEach((extendedClass) => {
    Object.getOwnPropertyNames(extendedClass.prototype).forEach((name) => {
      var _a;
      if (
        typeof baseClass.prototype === "object" &&
        baseClass.prototype &&
        name in baseClass.prototype
      )
        return;
      Object.defineProperty(
        baseClass.prototype,
        name,
        (_a = Object.getOwnPropertyDescriptor(
          extendedClass.prototype,
          name
        )) !== null && _a !== void 0
          ? _a
          : Object.create(null)
      );
    });
  });
}
//#endregion
//#region node_modules/@tauri-apps/api/path.js
var BaseDirectory;
(function (BaseDirectory) {
  BaseDirectory[(BaseDirectory["Audio"] = 1)] = "Audio";
  BaseDirectory[(BaseDirectory["Cache"] = 2)] = "Cache";
  BaseDirectory[(BaseDirectory["Config"] = 3)] = "Config";
  BaseDirectory[(BaseDirectory["Data"] = 4)] = "Data";
  BaseDirectory[(BaseDirectory["LocalData"] = 5)] = "LocalData";
  BaseDirectory[(BaseDirectory["Document"] = 6)] = "Document";
  BaseDirectory[(BaseDirectory["Download"] = 7)] = "Download";
  BaseDirectory[(BaseDirectory["Picture"] = 8)] = "Picture";
  BaseDirectory[(BaseDirectory["Public"] = 9)] = "Public";
  BaseDirectory[(BaseDirectory["Video"] = 10)] = "Video";
  BaseDirectory[(BaseDirectory["Resource"] = 11)] = "Resource";
  BaseDirectory[(BaseDirectory["Temp"] = 12)] = "Temp";
  BaseDirectory[(BaseDirectory["AppConfig"] = 13)] = "AppConfig";
  BaseDirectory[(BaseDirectory["AppData"] = 14)] = "AppData";
  BaseDirectory[(BaseDirectory["AppLocalData"] = 15)] = "AppLocalData";
  BaseDirectory[(BaseDirectory["AppCache"] = 16)] = "AppCache";
  BaseDirectory[(BaseDirectory["AppLog"] = 17)] = "AppLog";
  BaseDirectory[(BaseDirectory["Desktop"] = 18)] = "Desktop";
  BaseDirectory[(BaseDirectory["Executable"] = 19)] = "Executable";
  BaseDirectory[(BaseDirectory["Font"] = 20)] = "Font";
  BaseDirectory[(BaseDirectory["Home"] = 21)] = "Home";
  BaseDirectory[(BaseDirectory["Runtime"] = 22)] = "Runtime";
  BaseDirectory[(BaseDirectory["Template"] = 23)] = "Template";
})(BaseDirectory || (BaseDirectory = {}));
async function tempDir() {
  return invoke("plugin:path|resolve_directory", {
    directory: BaseDirectory.Temp,
  });
}
async function join(...paths) {
  return invoke("plugin:path|join", { paths });
}
//#endregion
//#region src/blocks/windowControl.ts
const windowWidthReporter = {
  blockType: Scratch.BlockType.REPORTER,
  opcode: "getWWidth",
  text: "Window Width",
};
async function getWWidth() {
  const [width] = await invoke("get_window_size");
  return width;
}
const windowHeightReporter = {
  blockType: Scratch.BlockType.REPORTER,
  opcode: "getWHeight",
  text: "Window Height",
};
async function getWHeight() {
  const [, height] = await invoke("get_window_size");
  return height;
}
const isCloseReporter = {
  blockType: Scratch.BlockType.REPORTER,
  opcode: "isCloseable",
  text: "Is Window Closeable",
};
async function isCloseable() {
  return await getCurrentWebviewWindow().isClosable();
}
const isFocusedReporter = {
  blockType: Scratch.BlockType.REPORTER,
  opcode: "isFocused",
  text: "Is Window Focused",
};
async function isFocused() {
  return await getCurrentWebviewWindow().isFocused();
}
const isFullscreenReporter = {
  blockType: Scratch.BlockType.REPORTER,
  opcode: "isFullscreen",
  text: "Is Window Fullscreened",
};
async function isFullscreen() {
  return await getCurrentWebviewWindow().isFullscreen();
}
const myWindowLabelReporter = {
  blockType: Scratch.BlockType.REPORTER,
  opcode: "myWindowLabel",
  text: "This window's label",
};
function myWindowLabel() {
  return getCurrentWebviewWindow().label;
}
const isWindowLabelReporter = {
  blockType: Scratch.BlockType.BOOLEAN,
  opcode: "isWindowLabel",
  text: "This window is labeled [LABEL]?",
  arguments: {
    LABEL: {
      type: Scratch.ArgumentType.STRING,
      defaultValue: "main",
    },
  },
};
function isWindowLabel(args) {
  return getCurrentWebviewWindow().label === args.LABEL;
}
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
  menu: "windowLabelMenu",
};
async function getWindowByLabel(label) {
  const window = await Window.getByLabel(label);
  if (window == null) throw new Error(`Window with label ${label} not found`);
  return window;
}
const createWindowBlock = {
  blockType: Scratch.BlockType.COMMAND,
  opcode: "createWindow",
  text: "Create window labeled [LABEL] with url [URL] title [TITLE] width [WIDTH] height [HEIGHT] clone current project? [CLONE_PROJECT] auto green flag [AUTO_GREEN_FLAG] hide stage controls [HIDE_STAGE_CONTROLS]",
  arguments: {
    LABEL: {
      type: Scratch.ArgumentType.STRING,
      defaultValue: "new-window",
    },
    URL: {
      type: Scratch.ArgumentType.STRING,
      defaultValue: window.location.href,
    },
    TITLE: {
      type: Scratch.ArgumentType.STRING,
      defaultValue: "New window",
    },
    WIDTH: {
      type: Scratch.ArgumentType.NUMBER,
      defaultValue: 800,
    },
    HEIGHT: {
      type: Scratch.ArgumentType.NUMBER,
      defaultValue: 600,
    },
    CLONE_PROJECT: {
      type: Scratch.ArgumentType.BOOLEAN,
      defaultValue: true,
    },
    AUTO_GREEN_FLAG: {
      type: Scratch.ArgumentType.BOOLEAN,
      defaultValue: true,
    },
    HIDE_STAGE_CONTROLS: {
      type: Scratch.ArgumentType.BOOLEAN,
      defaultValue: true,
    },
  },
};
const AUTO_GREEN_FLAG_PARAM = "tauriAutoGreenFlag";
const CLONE_PROJECT_PARAM = "cloneProjectFile";
if (new URLSearchParams(window.location.search).has(AUTO_GREEN_FLAG_PARAM)) {
  let pressed = false;
  const press = () => {
    if (pressed) return;
    pressed = true;
    Scratch.vm.start();
    Scratch.vm.greenFlag();
  };
  const isReady = () =>
    Scratch.vm.runtime.targets.length > 0 &&
    Scratch.vm.runtime.getOpcodeFunction("tauriExtension_createWindow") !==
      void 0;
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
  style.textContent =
    '[class*="stage-header-wrapper-overlay"] { display: none !important; }[class*="stage-wrapper"][class*="full-screen"] { top: 0 !important; }';
  document.head.appendChild(style);
  const STAGE_HEADER_RESERVED_PX = 56;
  const realInnerHeightDescriptor =
    Object.getOwnPropertyDescriptor(window, "innerHeight") ??
    Object.getOwnPropertyDescriptor(Window.prototype, "innerHeight");
  if (realInnerHeightDescriptor?.get) {
    const getRealInnerHeight = realInnerHeightDescriptor.get.bind(window);
    Object.defineProperty(window, "innerHeight", {
      configurable: true,
      get: () => getRealInnerHeight() + STAGE_HEADER_RESERVED_PX,
    });
  }
  window.dispatchEvent(new Event("resize"));
}
async function createWindow(args) {
  if ((await Window.getByLabel(args.LABEL)) != null)
    throw new Error(`Window with label ${args.LABEL} already exists`);
  const url = new URL(args.URL, window.location.href);
  if (
    url.hostname === window.location.hostname &&
    url.protocol !== window.location.protocol
  )
    url.protocol = window.location.protocol;
  url.searchParams.set("tauriExtWindow", "1");
  if (args.HIDE_STAGE_CONTROLS)
    url.searchParams.set("tauriHideStageControls", "1");
  if (args.CLONE_PROJECT) {
    const blob = await Scratch.vm.saveProjectSb3();
    const bytes = Array.from(new Uint8Array(await blob.arrayBuffer()));
    const filePath = await join(
      await tempDir(),
      `tauri-ext-clone-${args.LABEL}-${Date.now()}.sb3`
    );
    await invoke("write_file", {
      file: filePath,
      contents: bytes,
    });
    url.searchParams.set(CLONE_PROJECT_PARAM, filePath);
  }
  if (args.AUTO_GREEN_FLAG) url.searchParams.set(AUTO_GREEN_FLAG_PARAM, "1");
  const windowOptions = {
    title: args.TITLE,
    width: args.WIDTH,
    height: args.HEIGHT,
  };
  const finalUrl = (await fetch(url.toString(), { method: "GET" })
    .then((response) => {
      response.body?.cancel();
      return response.ok;
    })
    .catch(() => false))
    ? url
    : (() => {
        const fallbackUrl = new URL(window.location.href);
        fallbackUrl.search = url.search;
        return fallbackUrl;
      })();
  await createWebviewWindow(args.LABEL, finalUrl.toString(), windowOptions);
  refreshWindowLabelCache();
}
async function createWebviewWindow(label, url, options) {
  const webview = new WebviewWindow(label, {
    ...options,
    url,
  });
  await new Promise((resolve, reject) => {
    webview.once("tauri://created", () => resolve());
    webview.once("tauri://error", (event) =>
      reject(
        new Error(`Failed to create window: ${JSON.stringify(event.payload)}`)
      )
    );
  });
  return webview;
}
const setWindowTitleBlock = {
  blockType: Scratch.BlockType.COMMAND,
  opcode: "setWindowTitle",
  text: "Set window title to [TITLE] on window labeled [LABEL]",
  arguments: {
    TITLE: { type: Scratch.ArgumentType.STRING },
    LABEL: windowLabelArgument,
  },
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
    HEIGHT: { type: Scratch.ArgumentType.NUMBER },
  },
};
async function setWindowSize(args) {
  await invoke("set_window_size", {
    width: args.WIDTH,
    height: args.HEIGHT,
  });
}
const setWindowMinSizeBlock = {
  blockType: Scratch.BlockType.COMMAND,
  opcode: "setWindowMinSize",
  text: "Set window minimum size to [WIDTH] width [HEIGHT] height",
  arguments: {
    WIDTH: { type: Scratch.ArgumentType.NUMBER },
    HEIGHT: { type: Scratch.ArgumentType.NUMBER },
  },
};
async function setWindowMinSize(args) {
  await invoke("set_window_min_size", {
    width: args.WIDTH,
    height: args.HEIGHT,
  });
}
const setWindowMaxSizeBlock = {
  blockType: Scratch.BlockType.COMMAND,
  opcode: "setWindowMaxSize",
  text: "Set window maximum size to [WIDTH] width [HEIGHT] height",
  arguments: {
    WIDTH: { type: Scratch.ArgumentType.NUMBER },
    HEIGHT: { type: Scratch.ArgumentType.NUMBER },
  },
};
async function setWindowMaxSize(args) {
  await invoke("set_window_max_size", {
    width: args.WIDTH,
    height: args.HEIGHT,
  });
}
const saveWindowStateBlock = {
  blockType: Scratch.BlockType.COMMAND,
  opcode: "saveWindowState",
  text: "Save window state",
};
async function saveWindowState() {
  await invoke("save_window_state");
}
const restoreWindowStateBlock = {
  blockType: Scratch.BlockType.COMMAND,
  opcode: "restoreWindowState",
  text: "Restore window state",
};
async function restoreWindowState() {
  await invoke("restore_window_state");
}
const closeBlock = {
  blockType: Scratch.BlockType.COMMAND,
  opcode: "closeWindow",
  text: "Close Window (THIS WILL CLOSE YOUR SCRATCH PROJECT!)",
};
async function closeWindow() {
  await getCurrentWebviewWindow().close();
}
const isFocusedByLabelReporter = {
  blockType: Scratch.BlockType.REPORTER,
  opcode: "isFocusedByLabel",
  text: "Is window labeled [LABEL] focused?",
  arguments: { LABEL: windowLabelArgument },
};
async function isFocusedByLabel(args) {
  return await (await getWindowByLabel(args.LABEL)).isFocused();
}
const isFullscreenByLabelReporter = {
  blockType: Scratch.BlockType.REPORTER,
  opcode: "isFullscreenByLabel",
  text: "Is window labeled [LABEL] fullscreened?",
  arguments: { LABEL: windowLabelArgument },
};
async function isFullscreenByLabel(args) {
  return await (await getWindowByLabel(args.LABEL)).isFullscreen();
}
const isCloseableByLabelReporter = {
  blockType: Scratch.BlockType.REPORTER,
  opcode: "isCloseableByLabel",
  text: "Is window labeled [LABEL] closeable?",
  arguments: { LABEL: windowLabelArgument },
};
async function isCloseableByLabel(args) {
  return await (await getWindowByLabel(args.LABEL)).isClosable();
}
const getWWidthByLabelReporter = {
  blockType: Scratch.BlockType.REPORTER,
  opcode: "getWWidthByLabel",
  text: "Width of window labeled [LABEL]",
  arguments: { LABEL: windowLabelArgument },
};
async function getWWidthByLabel(args) {
  return (await (await getWindowByLabel(args.LABEL)).innerSize()).width;
}
const getWHeightByLabelReporter = {
  blockType: Scratch.BlockType.REPORTER,
  opcode: "getWHeightByLabel",
  text: "Height of window labeled [LABEL]",
  arguments: { LABEL: windowLabelArgument },
};
async function getWHeightByLabel(args) {
  return (await (await getWindowByLabel(args.LABEL)).innerSize()).height;
}
const focusWindowByLabelBlock = {
  blockType: Scratch.BlockType.COMMAND,
  opcode: "focusWindowByLabel",
  text: "Focus window labeled [LABEL]",
  arguments: { LABEL: windowLabelArgument },
};
async function focusWindowByLabel(args) {
  await (await getWindowByLabel(args.LABEL)).setFocus();
}
const closeWindowByLabelBlock = {
  blockType: Scratch.BlockType.COMMAND,
  opcode: "closeWindowByLabel",
  text: "Close window labeled [LABEL]",
  arguments: { LABEL: windowLabelArgument },
};
async function closeWindowByLabel(args) {
  await (await getWindowByLabel(args.LABEL)).close();
}
const setWindowDecorationsByLabelBlock = {
  blockType: Scratch.BlockType.COMMAND,
  opcode: "setWindowDecorationsByLabel",
  text: "Set window labeled [LABEL] decorations to [DECORATIONS]",
  arguments: {
    LABEL: windowLabelArgument,
    DECORATIONS: {
      type: Scratch.ArgumentType.BOOLEAN,
      defaultValue: true,
    },
  },
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
      defaultValue: "console.log('hi')",
    },
    LABEL: windowLabelArgument,
  },
};
async function evalInWindow(args) {
  await invoke("eval_in_window", {
    label: args.LABEL,
    script: args.SCRIPT,
  });
}
//#endregion
//#region src/blocks/messaging.ts
const MESSAGE_EVENT = "tauriExtension-window-message";
let lastReceivedPayload = "";
listen(
  MESSAGE_EVENT,
  (event) => {
    lastReceivedPayload = event.payload;
    Scratch.vm.runtime.startHats("tauriExtension_whenDataReceived");
  },
  { target: getCurrentWebviewWindow().label }
);
const sendDataToWindowBlock = {
  blockType: Scratch.BlockType.COMMAND,
  opcode: "sendDataToWindow",
  text: "Send data [DATA] to window labeled [LABEL]",
  arguments: {
    DATA: {
      type: Scratch.ArgumentType.STRING,
      defaultValue: "{}",
    },
    LABEL: windowLabelArgument,
  },
};
async function sendDataToWindow(args) {
  await emitTo(args.LABEL, MESSAGE_EVENT, args.DATA);
}
const whenDataReceivedBlock = {
  blockType: Scratch.BlockType.EVENT,
  opcode: "whenDataReceived",
  text: "when data received from another window",
  isEdgeActivated: false,
};
const lastReceivedDataReporter = {
  blockType: Scratch.BlockType.REPORTER,
  opcode: "lastReceivedData",
  text: "last received data",
};
function lastReceivedData() {
  return lastReceivedPayload;
}
//#endregion
//#region node_modules/@tauri-apps/plugin-notification/dist-js/index.js
var ScheduleEvery;
(function (ScheduleEvery) {
  ScheduleEvery["Year"] = "year";
  ScheduleEvery["Month"] = "month";
  ScheduleEvery["TwoWeeks"] = "twoWeeks";
  ScheduleEvery["Week"] = "week";
  ScheduleEvery["Day"] = "day";
  ScheduleEvery["Hour"] = "hour";
  ScheduleEvery["Minute"] = "minute";
  ScheduleEvery["Second"] = "second";
})(ScheduleEvery || (ScheduleEvery = {}));
var Importance;
(function (Importance) {
  Importance[(Importance["None"] = 0)] = "None";
  Importance[(Importance["Min"] = 1)] = "Min";
  Importance[(Importance["Low"] = 2)] = "Low";
  Importance[(Importance["Default"] = 3)] = "Default";
  Importance[(Importance["High"] = 4)] = "High";
})(Importance || (Importance = {}));
var Visibility;
(function (Visibility) {
  Visibility[(Visibility["Secret"] = -1)] = "Secret";
  Visibility[(Visibility["Private"] = 0)] = "Private";
  Visibility[(Visibility["Public"] = 1)] = "Public";
})(Visibility || (Visibility = {}));
async function isPermissionGranted() {
  if (window.Notification.permission !== "default")
    return await Promise.resolve(window.Notification.permission === "granted");
  return await invoke("plugin:notification|is_permission_granted");
}
async function requestPermission() {
  return await window.Notification.requestPermission();
}
function sendNotification(options) {
  if (typeof options === "string") new window.Notification(options);
  else new window.Notification(options.title, options);
}
//#endregion
//#region src/blocks/notification.ts
const canSendNotifReport = {
  blockType: Scratch.BlockType.REPORTER,
  opcode: "canSendNotif",
  text: "Can send notification",
};
async function canSendNotif() {
  return await isPermissionGranted();
}
const requestNotifBlock = {
  blockType: Scratch.BlockType.COMMAND,
  opcode: "reqNotifPerm",
  text: "Request notification permission",
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
      defaultValue: "Tauri",
    },
    DESCRIPTION: {
      type: Scratch.ArgumentType.STRING,
      defaultValue: "Tauri is awesome!",
    },
  },
};
async function sendNotif(args) {
  return await sendNotification({
    title: args.TITLE,
    body: args.DESCRIPTION,
  });
}
//#endregion
//#region node_modules/@tauri-apps/plugin-os/dist-js/index.js
function platform() {
  return window.__TAURI_OS_PLUGIN_INTERNALS__.platform;
}
function family() {
  return window.__TAURI_OS_PLUGIN_INTERNALS__.family;
}
function arch() {
  return window.__TAURI_OS_PLUGIN_INTERNALS__.arch;
}
async function locale() {
  return await invoke("plugin:os|locale");
}
//#endregion
//#region src/blocks/os.ts
const famliyReporter = {
  blockType: Scratch.BlockType.REPORTER,
  opcode: "getFamliy",
  text: "Get Famliy",
};
function getFamliy() {
  return family();
}
const archReporter = {
  blockType: Scratch.BlockType.REPORTER,
  opcode: "getArch",
  text: "Arch",
};
function getArch() {
  return arch();
}
const localeReporter = {
  blockType: Scratch.BlockType.REPORTER,
  opcode: "getLocale",
  text: "System Locale",
};
async function getLocale() {
  return locale();
}
const platformReporter = {
  blockType: Scratch.BlockType.REPORTER,
  opcode: "getplatform",
  text: "Platform",
};
async function getplatform() {
  return platform();
}
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
  text: "capture project state",
};
function captureProjectState() {
  const runtime = Scratch.vm.runtime;
  const state = { targets: {} };
  for (const target of runtime.targets) {
    if (!target.isOriginal) continue;
    const vars = [];
    for (const variable of Object.values(target.variables))
      if (!variable.isCloud && isSerializable(variable.value))
        vars.push([variable.id, variable.value]);
    state.targets[target.id] = {
      x: target.x,
      y: target.y,
      direction: target.direction,
      costume: target.currentCostume,
      visible: target.visible,
      size: target.size,
      vars,
    };
  }
  return JSON.stringify(state);
}
const applyProjectStateBlock = {
  blockType: Scratch.BlockType.COMMAND,
  opcode: "applyProjectState",
  text: "apply project state [STATE]",
  arguments: {
    STATE: {
      type: Scratch.ArgumentType.STRING,
      defaultValue: "{}",
    },
  },
};
function applyProjectState(args) {
  const runtime = Scratch.vm.runtime;
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
    for (const [varId, value] of data.vars)
      if (target.variables[varId]) target.variables[varId].value = value;
  }
  runtime.requestRedraw();
}
//#endregion
//#region src/icon.ts
const icon =
  "data:image/svg+xml;base64,PHN2ZyBmaWxsPSJub25lIiBoZWlnaHQ9IjI1MDAiIHZpZXdCb3g9Ii03LjAxMTE0MjIzIC0uNDg5MDQ4MjQgMjE5LjI0NDkwNzY1IDIzMS45MDAwNjQ5IiB3aWR0aD0iMjQzNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJtMTQzLjEgODRhMjIgMjIgMCAxIDEgLTQ0IDAgMjIgMjIgMCAwIDEgNDQgMHoiIGZpbGw9IiNmZmMxMzEiLz48Y2lyY2xlIGN4PSI4NC4xIiBjeT0iMTQ3IiBmaWxsPSIjMjRjOGRiIiByPSIyMiIgdHJhbnNmb3JtPSJtYXRyaXgoLTEgMCAwIC0xIDE2OC4yIDI5NCkiLz48ZyBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGZpbGwtcnVsZT0iZXZlbm9kZCI+PHBhdGggZD0ibTE2Ni43IDE1NC41YTg0IDg0IDAgMCAxIC0yOSAxMS44IDU5IDU5IDAgMCAwIDIuOS0yNi42IDU5IDU5IDAgMSAwIC02Ny40LTkwLjEgOTggOTggMCAwIDAgLTMyLjIgOS40IDg0IDg0IDAgMSAxIDEyNS43IDk1LjV6bS0xMjQuNy04MC4yIDIwLjYgMi41YTU5IDU5IDAgMCAxIDIuNi0xMS43IDg0IDg0IDAgMCAwIC0yMy4yIDkuMnoiIGZpbGw9IiNmZmMxMzEiLz48cGF0aCBkPSJtMzguNCA3Ni41YTg0IDg0IDAgMCAxIDI5LjItMTEuOSA1OC45IDU4LjkgMCAwIDAgLTMuMyAyNi43IDU5IDU5IDAgMSAwIDY3LjcgOTAgOTggOTggMCAwIDAgMzIuMi05LjMgODQgODQgMCAxIDEgLTEyNS44LTk1LjV6bTEyNC43IDgwLjItLjQuMnoiIGZpbGw9IiMyNGM4ZGIiLz48L2c+PC9zdmc+";
//#endregion
//#region src/index.ts
(function (Scratch) {
  if (!Scratch.extensions.unsandboxed)
    throw new Error("Please run Tauri Extension without sandbox!");
  const extension = {
    getInfo() {
      return {
        id: "tauriExtension",
        name: "Tauri extension",
        color1: "#f1b62b",
        blockIconURI: icon,
        blocks: [
          {
            blockType: Scratch.BlockType.LABEL,
            text: "OS",
          },
          famliyReporter,
          platformReporter,
          archReporter,
          localeReporter,
          "---",
          {
            blockType: Scratch.BlockType.LABEL,
            text: "Window",
          },
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
          "---",
          {
            blockType: Scratch.BlockType.LABEL,
            text: "Other Windows",
          },
          isFocusedByLabelReporter,
          isFullscreenByLabelReporter,
          isCloseableByLabelReporter,
          getWWidthByLabelReporter,
          getWHeightByLabelReporter,
          focusWindowByLabelBlock,
          closeWindowByLabelBlock,
          setWindowDecorationsByLabelBlock,
          evalInWindowBlock,
          "---",
          {
            blockType: Scratch.BlockType.LABEL,
            text: "Cross-Window Messaging",
          },
          sendDataToWindowBlock,
          whenDataReceivedBlock,
          lastReceivedDataReporter,
          captureProjectStateBlock,
          applyProjectStateBlock,
          {
            blockType: Scratch.BlockType.LABEL,
            text: "Notifications",
          },
          canSendNotifReport,
          requestNotifBlock,
          sendNotifBlock,
          "---",
        ],
        menus: {
          windowLabelMenu: {
            acceptReporters: true,
            items: "windowLabelMenu",
          },
        },
      };
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
  };
  Scratch.extensions.register(extension);
})(Scratch);
//#endregion
//#region src/withL10n.ts
(function (Scratch) {
  Scratch.translate.setup(l10n_default);
})(Scratch);
//#endregion
