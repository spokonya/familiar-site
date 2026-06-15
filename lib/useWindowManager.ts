// Zustand window manager store.
// Contract: ARCHITECTURE.md window-manager-contract + state-architecture.
// Persists to sessionStorage (not localStorage) so a refresh within a tab keeps
// the layout, but every new visit gets the designed default layout.

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import {
  buildDefaultWindows,
  MIN_WINDOW_SIZE,
  type WindowId,
  type WindowState,
} from "./windows";

type Breakpoint = "desktop" | "tablet";

type WindowManagerStore = {
  windows: Record<WindowId, WindowState>;
  nextZ: number; // monotonically incrementing z-index counter
  focusedId: WindowId | null;
  initialized: boolean;

  // Initialize from the default layout for a breakpoint. No-op once initialized
  // (so a sessionStorage rehydrate is not clobbered on mount).
  initLayout: (breakpoint: Breakpoint) => void;

  focusWindow: (id: WindowId) => void;
  moveWindow: (id: WindowId, pos: { x: number; y: number }) => void;
  resizeWindow: (id: WindowId, size: { width: number; height: number }) => void;
  minimizeWindow: (id: WindowId) => void; // windowshade collapse
  restoreWindow: (id: WindowId) => void;
  openWindow: (id: WindowId) => void; // reopen + restore + focus
  closeWindow: (id: WindowId) => void; // only if isCloseable
};

export const useWindowManager = create<WindowManagerStore>()(
  persist(
    (set, get) => ({
      windows: buildDefaultWindows("desktop"),
      nextZ: 5,
      focusedId: null,
      initialized: false,

      initLayout: (breakpoint) => {
        if (get().initialized) return;
        const windows = buildDefaultWindows(breakpoint);
        set({ windows, nextZ: 5, focusedId: null, initialized: true });
      },

      focusWindow: (id) =>
        set((s) => {
          const z = s.nextZ;
          return {
            nextZ: z + 1,
            focusedId: id,
            windows: { ...s.windows, [id]: { ...s.windows[id], zIndex: z } },
          };
        }),

      moveWindow: (id, pos) =>
        set((s) => ({
          windows: { ...s.windows, [id]: { ...s.windows[id], position: pos } },
        })),

      resizeWindow: (id, size) =>
        set((s) => ({
          windows: {
            ...s.windows,
            [id]: {
              ...s.windows[id],
              size: {
                width: Math.max(MIN_WINDOW_SIZE.width, size.width),
                height: Math.max(MIN_WINDOW_SIZE.height, size.height),
              },
            },
          },
        })),

      minimizeWindow: (id) =>
        set((s) => ({
          windows: { ...s.windows, [id]: { ...s.windows[id], isMinimized: true } },
        })),

      restoreWindow: (id) =>
        set((s) => ({
          windows: { ...s.windows, [id]: { ...s.windows[id], isMinimized: false } },
        })),

      openWindow: (id) =>
        set((s) => {
          const z = s.nextZ;
          return {
            nextZ: z + 1,
            focusedId: id,
            windows: {
              ...s.windows,
              [id]: { ...s.windows[id], isOpen: true, isMinimized: false, zIndex: z },
            },
          };
        }),

      closeWindow: (id) =>
        set((s) => {
          if (!s.windows[id].isCloseable) return s;
          const focusedId = s.focusedId === id ? null : s.focusedId;
          return {
            focusedId,
            windows: { ...s.windows, [id]: { ...s.windows[id], isOpen: false } },
          };
        }),
    }),
    {
      name: "familiar-windows",
      storage: createJSONStorage(() => sessionStorage),
      // Avoid SSR/client hydration mismatch — rehydrate manually on the client.
      skipHydration: true,
    },
  ),
);
