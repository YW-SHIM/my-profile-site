# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Bucket List App** - A simple Vanilla JavaScript web application for recording, managing, and tracking personal life goals. No build tools, frameworks, or dependencies (except Tailwind CSS via CDN).

**Tech Stack**: HTML5, CSS3, ES6+ JavaScript, Tailwind CSS (CDN), LocalStorage API

## Getting Started

### Run the App
No build step required. Choose one of these methods:

1. **Direct browser** - Double-click `bucket-list-main/index.html` to open in browser
2. **VS Code Live Server** - Right-click `index.html` → "Open with Live Server"
3. **Python HTTP server** - From project root:
   ```bash
   python -m http.server 8000
   # Then open http://localhost:8000/bucket-list-main
   ```

## Architecture

### High-Level Design
Two separate concerns, clean separation:

- **`BucketListApp` class** (`js/app.js`) - Handles UI logic, event binding, and rendering
- **`BucketStorage` object** (`js/storage.js`) - Handles all data persistence via LocalStorage

**Data Flow**: User action → BucketListApp event handler → calls BucketStorage method → updates LocalStorage → `render()` refreshes UI

### File Responsibilities

| File | Purpose |
|------|---------|
| `index.html` | DOM structure, Tailwind CSS CDN, loads JS modules |
| `js/app.js` | `BucketListApp` class: DOM caching, event handling, rendering, filtering |
| `js/storage.js` | `BucketStorage` object: load/save from LocalStorage, CRUD operations, filtering, stats |
| `css/styles.css` | Custom animations (slideIn, fadeIn, scaleIn) and filter button styles |

### Data Structure
All items stored as a single JSON array in `localStorage['bucketList']`:
```javascript
{
  id: "1730880000000",              // Unique ID (timestamp)
  title: "Learn to code",           // User input
  completed: false,                 // Boolean status
  createdAt: "2025-11-06T...",     // ISO date string
  completedAt: null                 // ISO date (null if not completed)
}
```

## Key Design Patterns

1. **Event-driven**: All user interactions go through `BucketListApp.bindEvents()`
2. **Immutable loads**: `BucketStorage.load()` always reads fresh from LocalStorage
3. **XSS prevention**: `BucketListApp.escapeHtml()` sanitizes user input before rendering
4. **Filter separation**: Filter state (`currentFilter`) lives in `BucketListApp`; filtering logic in `BucketStorage.getFilteredList()`

## Common Tasks

### Add a New Feature
1. Add HTML structure to `index.html` (cache element reference in `cacheElements()`)
2. Add event handler in `BucketListApp.bindEvents()`
3. Add storage method to `BucketStorage` if data persistence needed
4. Call `this.render()` to update UI

### Modify Styling
- Tailwind classes inline in `index.html` (takes effect immediately)
- Custom CSS (animations, overrides) in `css/styles.css`
- Test responsiveness at 640px breakpoint (mobile)

### Debug Data Issues
Use browser DevTools Console:
```javascript
// View all stored data
JSON.parse(localStorage.getItem('bucketList'))

// Clear data (testing)
localStorage.removeItem('bucketList')

// Inspect app state
app.currentFilter
```

## Important Notes

- **No TypeScript/build**: Changes are live; refresh browser to test
- **Browser-only**: No server-side code; all data stored locally on device
- **Timestamps as IDs**: `Date.now().toString()` ensures uniqueness and natural chronological order
- **Modal state**: `editingId` tracks which item is being edited; stored in `BucketListApp` only
- **Responsive**: Mobile-first design; Tailwind handles breakpoints

## Before Editing

- Always escape user input with `escapeHtml()` to prevent XSS
- Call `render()` after any data mutation to keep UI in sync
- Verify LocalStorage key (`'bucketList'`) is consistent across modules
- Test on mobile (640px) to ensure responsive layout doesn't break
