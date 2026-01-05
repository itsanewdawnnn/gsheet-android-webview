# Simple Android WebView

A lightweight WebView container for Android that hosts web applications with state preservation, pull-to-refresh, and error handling.

---

## Overview

This Android application serves as a dedicated WebView container that loads and displays external web content. It implements intelligent lifecycle management, adaptive refresh behavior, and seamless navigation patterns for an optimal mobile experience.

### Key Features

- **State Preservation** — WebView state persists across configuration changes
- **Pull-to-Refresh** — SwipeRefreshLayout with smart scroll detection
- **Error Handling** — Custom error page with JavaScript-based retry mechanism
- **Navigation** — Intelligent back button behavior with history management
- **JavaScript Bridge** — Native-web communication via JavascriptInterface

---

## Architecture

### WebView Configuration
- JavaScript enabled with DOM storage support
- Responsive viewport scaling and gesture-based zoom
- Default cache mode with secure file system access
- Modern web content compatibility

### Lifecycle Management
- Custom `WebViewClient` handles page load events and errors
- Automatic state save/restore on configuration changes
- Smart initial load prevention on activity recreation

### Refresh Logic
- Pull-to-refresh only enabled at scroll position zero
- Prevents gesture conflicts with web content scrolling
- Distinguishes between error recovery and page reload

### Error Recovery
- Loads custom error page from assets on network failure
- JavaScript interface exposes `retryConnection()` method
- Graceful fallback for main frame request errors

---

## Configuration

### Target URL
Modify the URL constant in `MainActivity.kt`:
```kotlin
private val url = "https://your-website.com/"
```
**Note:** URL must begin with `https://` for security compliance.

### Application Name
Update `res/values/strings.xml`:
```xml
<string name="app_name">Your App Name</string>
```

### Package Name
1. Update package in `MainActivity.kt`
2. Synchronize with Build Gradle configuration

### Application Icon
Right-click `res` folder → New → Image Asset

---

## Deployment

1. Update target URL in `MainActivity.kt`
2. Ensure hosted site uses HTTPS
3. Place `error.html` in `src/main/assets/`
4. Build and deploy

---

## License

Open-source and available for educational and development purposes.
