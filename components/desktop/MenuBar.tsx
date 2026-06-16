"use client";

// Mac OS 9 menu bar — flush to the top, flat #DDDDDD, 22px.
// Spec: MACOS9_REFERENCE.md menu-bar. Menus open real Platinum dropdowns
// (components/desktop/Menu.tsx) wired to the window store and the mode toggle.

import { useEffect, useState } from "react";
import { Dropdown, type MenuItemDef } from "@/components/desktop/Menu";
import { DialogBox } from "@/components/desktop/DialogBox";
import { copy, type CopyKey } from "@/lib/copy";
import { APPLE_LOGO_PATH, GHOST_CURSOR_PATH } from "@/lib/icons";
import { ariaLabels, buttonLabels, CHROME_FONT_VAR } from "@/lib/uiLabels";
import { useWindowManager } from "@/lib/useWindowManager";
import { WINDOW_IDS, type WindowId } from "@/lib/windows";

const ICON_LABEL: Record<WindowId, CopyKey> = {
  about: "icon-label-about",
  demo: "icon-label-demo",
  features: "icon-label-features",
  docs: "icon-label-docs",
};

type TopMenu = { id: string; label?: string; bold?: boolean; apple?: boolean; items: MenuItemDef[] };

export function MenuBar({ onSwitchToWebsite }: { onSwitchToWebsite: () => void }) {
  const openWindow = useWindowManager((s) => s.openWindow);
  const closeWindow = useWindowManager((s) => s.closeWindow);
  const focusedId = useWindowManager((s) => s.focusedId);

  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [dialog, setDialog] = useState<null | "about" | "status">(null);

  const close = () => setOpenMenu(null);

  const openWindowItems: MenuItemDef[] = WINDOW_IDS.map((id) => ({
    kind: "action",
    label: copy[ICON_LABEL[id]],
    onSelect: () => openWindow(id),
  }));

  const menus: TopMenu[] = [
    {
      id: "apple",
      apple: true,
      items: [{ kind: "action", label: copy["menu-apple-about"], onSelect: () => setDialog("about") }],
    },
    {
      id: "familiar",
      label: copy["chrome-app-name"],
      bold: true,
      items: [
        { kind: "action", label: copy["menu-familiar-about"], onSelect: () => openWindow("about") },
        { kind: "separator" },
        { kind: "action", label: copy["mode-toggle-to-website"], onSelect: onSwitchToWebsite },
      ],
    },
    {
      id: "file",
      label: copy["menu-file-label"],
      items: [
        { kind: "submenu", label: copy["menu-file-open"], items: openWindowItems },
        { kind: "action", label: copy["menu-file-close"], onSelect: () => focusedId && closeWindow(focusedId), disabled: !focusedId },
      ],
    },
    {
      id: "help",
      label: copy["menu-help-label"],
      items: [{ kind: "action", label: copy["menu-help-item"], onSelect: () => openWindow("docs") }],
    },
  ];

  return (
    <>
      {/* Click-away backdrop while a menu is open. */}
      {openMenu && (
        <div onPointerDown={close} style={{ position: "fixed", inset: 0, zIndex: 9999 }} />
      )}

      <div
        className="fixed top-0 right-0 left-0 flex items-center"
        style={{
          height: 22,
          zIndex: 10000,
          background: "#DDDDDD",
          borderBottom: "1px solid var(--platinum-border-outer)",
          fontFamily: CHROME_FONT_VAR,
          fontSize: 12,
        }}
      >
        {menus.map((m) => (
          <MenuTrigger
            key={m.id}
            menu={m}
            open={openMenu === m.id}
            anyOpen={openMenu !== null}
            onToggle={() => setOpenMenu(openMenu === m.id ? null : m.id)}
            onHoverWhileOpen={() => setOpenMenu(m.id)}
            onClose={close}
          />
        ))}

        <div className="flex-1" />

        <FamiliarStatusItem onClick={() => setDialog("status")} />
        <Clock />
      </div>

      {dialog === "about" && (
        <DialogBox title={copy["menu-apple-about"]} defaultLabel={buttonLabels.ok} onClose={() => setDialog(null)}>
          <div style={{ fontWeight: 700 }}>{copy["about-dialog-version"]}</div>
          <div style={{ marginTop: 4 }}>{copy["about-dialog-line"]}</div>
          <div style={{ marginTop: 12, color: "var(--platinum-text-inactive)" }}>
            {copy["about-dialog-memory"]}
          </div>
        </DialogBox>
      )}
      {dialog === "status" && (
        <DialogBox title={copy["status-familiar-label"]} defaultLabel={buttonLabels.ok} onClose={() => setDialog(null)}>
          {copy["status-familiar-note"]}
        </DialogBox>
      )}
    </>
  );
}

function MenuTrigger({
  menu,
  open,
  anyOpen,
  onToggle,
  onHoverWhileOpen,
  onClose,
}: {
  menu: TopMenu;
  open: boolean;
  anyOpen: boolean;
  onToggle: () => void;
  onHoverWhileOpen: () => void;
  onClose: () => void;
}) {
  return (
    <div style={{ position: "relative", height: "100%" }}>
      <button
        type="button"
        aria-label={menu.apple ? ariaLabels.appleMenu : undefined}
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={onToggle}
        onPointerEnter={() => anyOpen && onHoverWhileOpen()}
        className="flex h-full items-center"
        style={{
          paddingInline: menu.apple ? 10 : 8,
          fontWeight: menu.bold ? 700 : 400,
          background: open ? "var(--platinum-highlight)" : "transparent",
          color: open ? "#FFFFFF" : "var(--platinum-text)",
          cursor: "default",
        }}
      >
        {menu.apple ? <RainbowApple /> : menu.label}
      </button>
      {open && <Dropdown items={menu.items} onClose={onClose} />}
    </div>
  );
}

function FamiliarStatusItem({ onClick }: { onClick: () => void }) {
  const [hover, setHover] = useState(false);
  return (
    <button
      type="button"
      aria-label={ariaLabels.familiarStatus}
      onClick={onClick}
      onPointerEnter={() => setHover(true)}
      onPointerLeave={() => setHover(false)}
      className="flex h-full items-center"
      style={{
        gap: 5,
        paddingInline: 8,
        background: hover ? "var(--platinum-highlight)" : "transparent",
        color: hover ? "#FFFFFF" : "var(--platinum-text)",
        cursor: "default",
      }}
    >
      <svg width="11" height="13" viewBox="0 0 18 26" aria-hidden style={{ filter: "drop-shadow(0 0 3px rgba(55,138,221,0.6))" }}>
        <path
          d={GHOST_CURSOR_PATH}
          fill={hover ? "#FFFFFF" : "#378ADD"}
          stroke={hover ? "#378ADD" : "#1D4E87"}
          strokeWidth="1"
          strokeLinejoin="round"
        />
      </svg>
      {copy["status-familiar-label"]}
    </button>
  );
}

function RainbowApple() {
  const id = "apple-clip";
  return (
    <svg width="13" height="15" viewBox="0 0 26 30" aria-hidden role="img">
      <defs>
        <clipPath id={id}>
          <path d={APPLE_LOGO_PATH} />
        </clipPath>
      </defs>
      <g clipPath={`url(#${id})`}>
        <rect x="0" y="0" width="26" height="5" fill="#5EBD46" />
        <rect x="0" y="5" width="26" height="5" fill="#F9D616" />
        <rect x="0" y="10" width="26" height="5" fill="#F08C00" />
        <rect x="0" y="15" width="26" height="5" fill="#CD202A" />
        <rect x="0" y="20" width="26" height="5" fill="#6E2C8B" />
        <rect x="0" y="25" width="26" height="5" fill="#1B9CD8" />
      </g>
    </svg>
  );
}

function Clock() {
  const [now, setNow] = useState<string | null>(null);
  useEffect(() => {
    const tick = () => setNow(new Date().toLocaleTimeString([], { hour: "numeric", minute: "2-digit" }));
    tick();
    const t = setInterval(tick, 1000 * 30);
    return () => clearInterval(t);
  }, []);
  return (
    <span style={{ paddingInline: 12, color: "var(--platinum-text)" }} suppressHydrationWarning>
      {now ?? ""}
    </span>
  );
}
