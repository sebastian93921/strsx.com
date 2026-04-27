# Design System & Style Guidelines (strsx.com)

This document serves as the single source of truth for the styling standards, color palettes, and UI components used across the strsx.com website. Following these guidelines ensures a consistent, cohesive, and visually appealing experience.

## 1. Core Theme
The website features a **Dark Hacker / Cyberpunk** aesthetic. It blends terminal-like interfaces with modern glassmorphism, pulsing animations, neon accents, and a primarily dark background. 

## 2. Color Palette

### 2.1 Backgrounds & Neutral Colors
- **Main Background (`--bg`)**: `#13121d` - Deep dark, almost black with a subtle indigo tint.
- **Background Light (`--bgLight`)**: Radial gradient from `--bg` to transparent with `--purple` at the edges.
- **Light Text / Standard (`--light`, `--std-color`)**: `#dbdbdb` - Soft white for high readability without harsh contrast.
- **Muted Text / Comments (`--gray`, `--comment`)**: `#808080` / `#555555` - Used for secondary text, timestamps, and decorative "code" comments.

### 2.2 Accent Colors
These are used for interactive elements, highlights, glowing effects, and warnings:
- **Purple (`--purple`)**: `#682AE9` - Used for primary accents, links on hover, and subtitles.
- **Red (`--red`)**: `#e60000` - Used for the chatbot, the cursor blink animation, the vertical spine target, and critical system alerts.
- **Yellow (`--yellow`)**: `#e6e600` - Used for warnings or highlighted challenge text.
- **Green (Terminal/Success)**: `#3cb878` - Used extensively in the terminal interface (`ResumeConsole.vue`), job timeline dots (`Experience.vue`), and successful command outputs.

### 2.3 Terminal Specific Colors (macOS window dots)
- **Close (Red)**: `#ff5f56`
- **Minimize (Yellow)**: `#ffbd2e`
- **Maximize (Green)**: `#27c93f`

## 3. Typography
- **Primary Font**: `'Maven Pro', sans-serif`
  - Used for standard body text, headers, and general UI elements.
- **Monospace Font**: `'Roboto Mono', 'Consolas', 'Monaco', monospace`
  - Used extensively in the Terminal (`ResumeConsole.vue`), HTTP request animations (`Experience.vue`), and code snippets to reinforce the hacker theme.

## 4. UI Components & Patterns

### 4.1 Chatbot (`Chatbot.vue`)
- **Theme**: Red gradients.
- **Toggle Button**: `linear-gradient(135deg, #e60000 0%, #ff4d4d 100%)`.
- **Icon**: Star icon (`<polygon points="...">`).
- **Animations**: Soft floating animations with a pulsing ring (`pulseRing`) when closed to attract user attention.

### 4.2 Terminal / Console (`ResumeConsole.vue`)
- **Background**: `#0c0c0c` with a subtle green glow `box-shadow: 0 0 30px rgba(60, 184, 120, 0.2)`.
- **Prompt**: Green `#3cb878` with `user@host:~$` format.
- **Outputs**: Differentiated by color (info: `#888`, system: `#3498db`, error: `#ff5f56`, success: `#27c93f`).

### 4.3 The Spine & Navigation
- **Spine Target**: A fixed visual element on the left side featuring a pulsing red dot (`#e60000` or `red`), rotating 45 degrees, combined with a dotted red border (`border-right: 4px dotted red`).
- **Mail Wrapper**: Fixed vertical text on the right side. Color transitions from faded red to solid white on hover.

## 5. Animations & Effects
- **Blinking Cursor**: Created using `@keyframes cursorBlink`, alternating opacity/color to mimic a terminal cursor.
- **Glow & Box-Shadows**: Interactive elements (like the Chatbot button and terminal window) should use large, highly transparent `box-shadow` layers to create a "neon glow" effect.
- **Typewriter / AutoType**: Text rendering progressively to look like a live terminal executing a script.

## 6. CSS Variables Setup (`app.scss`)
When adding new components, always reference the established CSS variables from `:root`:
```scss
:root {
    --purple: #682AE9;
    --light: #dbdbdb;
    --yellow: #e6e600;
    --red: #e60000;
    --header-link: #dbdbdb;
    --header-link-hover: #682AE9;
    --header-link-hover-icon: #dbdbdb;
    --header-link-active: rgba(85,85,85,1);
    --std-color: #dbdbdb;
    --bg: #13121d;
    --gray: #808080;
    --comment: #555;
}
```

## 7. Best Practices for Future Development
1. **Stay within the palette**: Avoid introducing new bright colors outside of Red, Purple, Green, and Yellow. If you must, ensure they fit the neon/dark theme.
2. **Glassmorphism**: When laying elements over the background (like the chatbot window), use `rgba()` backgrounds with `backdrop-filter: blur(20px)` to maintain depth.
3. **Responsive**: Ensure that complex UI elements (like the terminal) gracefully scale down using `@media screen and (max-width: 568px)`.
4. **Consistency**: Use `.std` class for standard text formatting and `.title` for primary headings.
