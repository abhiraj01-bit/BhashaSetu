# Theme System Guide

## Overview
BhashaSetu supports three theme modes:
- **Light Mode** (Default) - Clean, bright interface
- **Dark Mode** - Dark interface for low-light environments  
- **System Mode** - Automatically follows your OS theme preference

## Theme Settings

### Default Theme
The application starts in **Light Mode** by default. This can be changed by:

1. Clicking the theme toggle button in the header (sun/moon/monitor icon)
2. Selecting your preferred theme from the dropdown:
   - ☀️ Light - Bright, clean interface
   - 🌙 Dark - Dark interface for reduced eye strain
   - 🖥️ System - Follows your operating system's theme

### Theme Persistence
Your theme preference is automatically saved to localStorage and will be remembered across browser sessions.

### System Theme Detection
When "System" mode is selected:
- The app automatically detects your OS theme preference
- It responds to real-time changes in your system theme
- No manual switching needed when your OS theme changes

## Technical Implementation

### CSS Variables
Themes are implemented using CSS custom properties (variables) defined in `client/global.css`:

- Light mode variables are defined in `:root`
- Dark mode overrides are defined in `.dark` class
- System mode dynamically applies the appropriate class

### Components
- `ThemeProvider.tsx` - Manages theme state and system detection
- `ThemeToggle.tsx` - UI component for theme selection
- Theme context is available throughout the app via `useTheme()` hook

### Storage
Theme preference is stored in localStorage with key: `bhashasetu-theme`

## Customization

To modify theme colors, edit the CSS variables in `client/global.css`:

```css
:root {
  /* Light mode colors */
  --background: 0 0% 100%;
  --foreground: 220 24% 12%;
  /* ... other variables */
}

.dark {
  /* Dark mode colors */
  --background: 220 18% 10%;
  --foreground: 0 0% 100%;
  /* ... other variables */
}
```

All colors use HSL format for better manipulation and consistency.