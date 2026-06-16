"use client";

// Mac OS 9 Platinum dropdown menu.
// Spec: MACOS9_REFERENCE.md dropdown-menus (white bg, 1px #808080 border, flat
// 2px offset shadow, 18px items, 8px padding, #378ADD/#FFFFFF hover, 1px
// separators, ✓ checkmark prefix) + menu-item states.
// Keyboard: ↑/↓ move, Enter/→ activate (→ opens a submenu), Esc closes,
// ← backs out of a submenu.

import { useEffect, useRef, useState } from "react";
import { CHROME_FONT_VAR } from "@/lib/uiLabels";

export type MenuItemDef =
  | { kind: "action"; label: string; onSelect: () => void; checked?: boolean; disabled?: boolean }
  | { kind: "submenu"; label: string; items: MenuItemDef[] }
  | { kind: "separator" };

const ITEM_H = 18;

export function Dropdown({
  items,
  onClose,
  onBack,
}: {
  items: MenuItemDef[];
  onClose: () => void; // close the whole menu tree (action selected / Escape)
  onBack?: () => void; // submenu only: ← closes just this submenu
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<number>(() => firstSelectable(items));
  const [openSub, setOpenSub] = useState<number | null>(null);

  useEffect(() => {
    ref.current?.focus();
  }, []);

  const selectableIdxs = items.map((it, i) => (isSelectable(it) ? i : -1)).filter((i) => i >= 0);

  const move = (dir: 1 | -1) => {
    if (selectableIdxs.length === 0) return;
    const pos = selectableIdxs.indexOf(active);
    const next = selectableIdxs[(pos + dir + selectableIdxs.length) % selectableIdxs.length];
    setActive(next);
    setOpenSub(null);
  };

  const activate = (i: number) => {
    const it = items[i];
    if (!it || !isSelectable(it)) return;
    if (it.kind === "action") {
      it.onSelect();
      onClose();
    } else if (it.kind === "submenu") {
      setOpenSub(i);
    }
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case "ArrowDown": e.preventDefault(); move(1); break;
      case "ArrowUp": e.preventDefault(); move(-1); break;
      case "ArrowRight": e.preventDefault(); if (items[active]?.kind === "submenu") setOpenSub(active); break;
      case "ArrowLeft": e.preventDefault(); (onBack ?? onClose)(); break;
      case "Enter": case " ": e.preventDefault(); activate(active); break;
      case "Escape": e.preventDefault(); onClose(); break;
    }
  };

  return (
    <div
      ref={ref}
      tabIndex={-1}
      role="menu"
      onKeyDown={onKeyDown}
      style={{
        position: "absolute",
        top: "100%",
        left: 0,
        minWidth: 168,
        background: "#FFFFFF",
        border: "1px solid var(--platinum-border-outer)",
        boxShadow: "2px 2px 0 #404040",
        padding: "2px 0",
        fontFamily: CHROME_FONT_VAR,
        fontSize: 12,
        outline: "none",
        zIndex: 15000,
      }}
    >
      {items.map((it, i) =>
        it.kind === "separator" ? (
          <div key={i} style={{ height: 1, background: "#C0C0C0", margin: "3px 0" }} />
        ) : (
          <MenuRow
            key={i}
            item={it}
            active={active === i}
            submenuOpen={openSub === i}
            onHover={() => {
              setActive(i);
              setOpenSub(it.kind === "submenu" ? i : null);
            }}
            onActivate={() => activate(i)}
            onCloseAll={onClose}
            onCloseSub={() => {
              setOpenSub(null);
              ref.current?.focus();
            }}
          />
        ),
      )}
    </div>
  );
}

function MenuRow({
  item,
  active,
  submenuOpen,
  onHover,
  onActivate,
  onCloseAll,
  onCloseSub,
}: {
  item: Exclude<MenuItemDef, { kind: "separator" }>;
  active: boolean;
  submenuOpen: boolean;
  onHover: () => void;
  onActivate: () => void;
  onCloseAll: () => void;
  onCloseSub: () => void;
}) {
  const disabled = item.kind === "action" && item.disabled;
  const isSubmenu = item.kind === "submenu";
  const checked = item.kind === "action" && item.checked;

  return (
    <div style={{ position: "relative" }}>
      <button
        type="button"
        role="menuitem"
        disabled={disabled}
        aria-haspopup={isSubmenu || undefined}
        onPointerEnter={() => !disabled && onHover()}
        onClick={(e) => {
          e.stopPropagation();
          if (!disabled) onActivate();
        }}
        style={{
          display: "flex",
          alignItems: "center",
          width: "100%",
          height: ITEM_H,
          padding: "0 8px",
          gap: 6,
          textAlign: "left",
          background: active && !disabled ? "var(--platinum-highlight)" : "transparent",
          color: disabled ? "#999999" : active ? "#FFFFFF" : "var(--platinum-text)",
          cursor: "default",
          whiteSpace: "nowrap",
        }}
      >
        <span style={{ width: 10, textAlign: "center" }}>{checked ? "✓" : ""}</span>
        <span style={{ flex: 1 }}>{item.label}</span>
        {isSubmenu && <span style={{ marginLeft: 12 }}>▸</span>}
      </button>

      {isSubmenu && submenuOpen && (
        <div style={{ position: "absolute", top: -3, left: "100%" }}>
          <Dropdown items={item.items} onClose={onCloseAll} onBack={onCloseSub} />
        </div>
      )}
    </div>
  );
}

const isSelectable = (it: MenuItemDef) =>
  it.kind !== "separator" && !(it.kind === "action" && it.disabled);
const firstSelectable = (items: MenuItemDef[]) => {
  const i = items.findIndex(isSelectable);
  return i < 0 ? 0 : i;
};
