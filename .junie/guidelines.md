# Neo-Miami Project Guidelines

*For JetBrains AI Agent (Junie)*

## 1. Project Overview

This project is a futuristic “Neo-Miami IoT Dashboard” built with:

* **React 18**
* **Chakra UI 3 (token-based system)**
* **Three.js** for the 3D “Neon City Digital Twin”
* **Framer Motion**
* **Vite**
* **Bun**

The app renders an animated smart-city digital twin and telemetry cards updating every ~3.2s.

AI Agents should treat the project as a **Chakra UI v3 application**, **not v2**, and must follow Chakra v3 component APIs, theme APIs, and imports.

---

## 2. Technology Rules

### ✔ React

* Do not create class components — **always use functional components + hooks**.
* Respect existing component patterns: `MetricCard`, `SensorCard`, `ThreeScene`, etc.
* Maintain strict JSX correctness and avoid generating invalid React elements.

### ✔ Chakra UI v3 (Important)

The project uses the **v3 system**, not the deprecated v2 theming model.

### Required v3 APIs:

* `createSystem`
* `defineConfig`
* `defaultConfig`
* `ChakraProvider` with:

  ```jsx
  <ChakraProvider value={system}>
  ```

### Never use (v2 APIs):

* `extendTheme`
* `ColorModeScript`
* `ColorModeProvider`
* `useColorMode`
* `StatValueText`
* `StatValueUnit`
* Any component moved/removed in v3

If unsure, always check Chakra UI’s v3 docs.

---

## 3. Theme System (This Project)

The theme is defined using Chakra’s **token-based system**.

### Token Colors Used:

```js
neon.50-900
miami.pink
miami.teal
miami.purple
miami.blue
```

### Fonts:

* `heading`: Orbitron
* `body`: Inter

### Semantic Tokens:

* `bg`: #030016
* `text`: #E2E8F0

### Global Style Rule:

```jsx
body {
  bg: bg;
  color: text;
}
```

AI Agents must **preserve the theme’s palette and structure**.

---

## 4. Component Rules

### ### MetricCard

Uses Chakra `Stat`, but only valid v3 components:

Allowed:

* `Stat`
* `StatNumber`
* `StatLabel`
* `StatHelpText`

Never generate or import:

* `StatValueText`
* `StatValueUnit`
  (these do not exist in v3)

### SensorCard

Simple content card using Box, Badge, Progress, etc.
Keep Chakra props consistent (`bg`, `rounded`, `colorScheme`, etc.)

### ThreeScene

* Keep WebGL renderer initialization as-is.
* Ensure cleanup logic remains intact (`dispose()`, remove event listeners).
* Avoid heavy per-frame logic — keep animations lightweight and GPU-friendly.

---

## 5. UI Style Rules

This project has a defined visual style:

* **Neon/Miami Vaporwave aesthetic**
* Colors from `miami.*` and `neon.*`
* Semi-transparent backgrounds using rgba
* Rounded corners (`rounded="lg"` or `xl`)
* Soft glowing shadows (pink/cyan)
* Gradients as seen in main layout

Agents must keep design changes **consistent with this theme.**

---

## 6. Architecture Conventions

### Components

* All components live in `src/`
* Never mix theme creation inside components — keep theme solely in `main.jsx`
* Favor small, focused UI components

### State Updates

* Metrics update via intervals (every 3200ms)
* Sensor health/value update logic must maintain clamped values (`min`, `max`)
* Don’t change generation patterns unless explicitly requested

### Files to respect:

* `App.jsx`
* `main.jsx`
* `styles.css`
* `index.html`
* `theme configuration in main.jsx`

---

## 7. Coding Standards for AI-Generated Code

* Use Chakra UI for all layout/composition.
* Prefer: `Flex`, `Box`, `Grid`, `HStack`, `VStack`.
* Favor system props instead of inline CSS, except when necessary (Three.js canvas).
* Follow existing color palette and spacing conventions.
* Must be compatible with **React 18** + **Vite**.

---

## 8. Forbidden / Deprecated

AI must **not** generate:

### ❌ Legacy Chakra v2 APIs

* `extendTheme`
* `theme={theme}`
* `ColorModeScript` or color-mode imports
* Legacy variants system for styles

### ❌ Wrong imports

Avoid importing components that don’t exist in v3:

* `StatValueText`
* `StatValueUnit`
* Any Chakra component not present in documentation

### ❌ Mixing JSX with Three.js DOM manipulation

All DOM modifications happen in Three.js renderer only.

---

## 9. When Modifying or Creating Code

Junie should always:

* Respect the existing theme system
* Use Chakra UI v3 token API
* Keep design consistency
* Avoid adding unnecessary dependencies
* Keep React components functional and clean
* Maintain readable and idiomatic Chakra usage
* Preserve all 3D scene behavior

---

## 10. References

These rules override external documentation unless the user requests otherwise.

* Chakra UI v3 docs
* Project code inside this repository
* AI should prefer **project conventions over generic examples**

---

# END OF GUIDELINES

---

If you'd like, I can also:

✅ generate a **separate architecture.md**
✅ generate a **component standards file**
✅ generate a **Junie task templates file**
✅ generate a **debugging instructions file**

Just tell me **what additional files you want**.
