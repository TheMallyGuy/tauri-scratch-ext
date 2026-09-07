<<<<<<< HEAD
import type * as TauriAPI from '@tauri-apps/api';
=======
import type TauriAPI from '@tauri-apps/api';
>>>>>>> fc3f3b3937d91b6435550cc20420ac3e4fd6b0f1

declare global {
    interface Window {
        __TAURI__?: typeof TauriAPI;
    }
}