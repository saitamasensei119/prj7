---
version: alpha
name: senda-house
description: Design system specification for Sen Da House e-commerce storefront.
colors:
  primary: "#2d6a4f"
  primary-hover: "#1b4332"
  primary-light: "#d8f3dc"
  accent: "#d97706"
  accent-light: "#fef3c7"
  danger: "#ef4444"
  success: "#10b981"
  info: "#0284c7"
  bg: "#fcfbfa"
  bg-subtle: "#f4f3ee"
  surface: "#ffffff"
  surface-border: "#e6e4dc"
  surface-hover: "#f9f8f5"
  text-main: "#1c2826"
  text-muted: "#65716b"
  text-light: "#94a39b"
typography:
  sans:
    fontFamily: "'Plus Jakarta Sans', system-ui, -apple-system, sans-serif"
  serif:
    fontFamily: "'Playfair Display', Georgia, serif"
rounded:
  sm: "8px"
  md: "14px"
  lg: "20px"
  full: "9999px"
---

## Overview

Sen Đá House is an e-commerce storefront for succulents, cacti, handcrafted pots, and desk plants. The interface uses a botanical zen aesthetic with warm earth tones, deep foliage greens, and high-clarity typography.

## Colors

Primary actions and brand identity use foliage greens (`primary`, `primary-hover`, `primary-light`). Secondary highlights use warm amber (`accent`, `accent-light`). Status badges use semantic alert tokens (`danger`, `success`, `info`).

## Themes

The interface supports both Light and Dark modes via the `[data-theme]` attribute on the `<html>` root.

| Token | Light Value | Dark Value |
| :--- | :--- | :--- |
| `primary` | `#2d6a4f` | `#52b788` |
| `primary-hover` | `#1b4332` | `#74c69d` |
| `primary-light` | `#d8f3dc` | `rgba(82, 183, 136, 0.15)` |
| `bg` | `#fcfbfa` | `#0d1512` |
| `bg-subtle` | `#f4f3ee` | `#14201c` |
| `surface` | `#ffffff` | `#192722` |
| `surface-border` | `#e6e4dc` | `#233731` |
| `text-main` | `#1c2826` | `#f0f4f2` |
| `text-muted` | `#65716b` | `#a3b3ac` |

## Typography

Headings use `Playfair Display` for boutique elegance with `text-wrap: balance`. Body copy and technical specs use `Plus Jakarta Sans` with `text-wrap: pretty`. Numeric and price data enforce `font-variant-numeric: tabular-nums` to ensure column alignment in carts and checkout tables.

## Layout

Fixed-top navigation adheres to `env(safe-area-inset-top)` for mobile displays. The catalog grid employs responsive auto-fill cards with a minimum width of 270px. Floating elements respect `env(safe-area-inset-bottom)`.

## Elevation & Depth

Surfaces employ layered shadows:
- `shadow-sm`: subtle card elevation for idle product items and pills.
- `shadow-md`: active hover states and toast alerts.
- `shadow-lg`: modals and slide-over cart drawer.

## Shapes

Radii follow a four-tier scale:
- `rounded.sm` (`8px`) for compact inputs, thumbnails, and meta pills.
- `rounded.md` (`14px`) for product cards, USP items, and drawer containers.
- `rounded.lg` (`20px`) for hero banner container and modal dialogs.
- `rounded.full` (`9999px`) for pill tags, category buttons, and action pills.

## Components

- **Buttons**: Icon buttons must specify `aria-label`. All focusable elements expose high-contrast `:focus-visible` outlines.
- **Modals & Drawers**: Modals must carry `role="dialog"`, `aria-modal="true"`, and associated `aria-labelledby` headers. All overlays dismiss upon receiving an `Escape` key event.
- **Cart Drawer**: Quantity controls contain explicit action labels and maintain live-region announcements.

## Do's and Don'ts

- **Do** animate only compositor properties (`transform`, `opacity`) with durations $\le 200\text{ms}$.
- **Do** respect `@media (prefers-reduced-motion: reduce)` by disabling non-essential transitions.
- **Don't** use arbitrary letter-spacing or custom easing curves.
- **Don't** animate layout properties (`width`, `height`, `top`, `left`, `margin`, `padding`).
- **Don't** use `backdrop-filter: blur()` or stack fixed blur layers on viewport (causes GPU thrashing).
