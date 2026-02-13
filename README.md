# 🧩 Google Sheets Web Viewer

## 📌 Overview

This repository contains a **static front-end web application** built with **HTML, CSS, and JavaScript** that fetches, processes, and displays **Google Sheets data** in real time via a public CSV endpoint.

The application is designed to be **lightweight, responsive, and serverless**, making it easy to deploy on any static hosting platform. It is implemented as a **single-page web application** that automatically handles data retrieval and rendering on page load by performing the following actions:

* Fetches cloud-based spreadsheet data
* Parses CSV content on the client side
* Renders structured tables directly in the browser

All operations are performed **entirely on the client**, with **no backend services required**.

---

## 🏗️ Application Architecture

### 1. Initialization Flow

* Runs on page load (`DOMContentLoaded`)
* Automatically triggers the initialization routine
* Displays a full-screen loader during data retrieval

### 2. User Interaction

* **Refresh Button**
  Reloads the latest data from the spreadsheet
* **Redirect Button**
  Opens the source Google Sheets document in a new browser tab

---

## 🌐 Google Sheets Data Integration

### Data Source

* Uses a **public Google Sheets CSV export endpoint**
* No API keys or authentication required
* Supports near real-time data updates

### Advantages

* Zero backend infrastructure
* Easy maintenance
* Ideal for lightweight dashboards and internal reports

---

## 📥 Data Acquisition Layer

* Uses the native `fetch()` API
* Fully asynchronous (async/await)
* Error handling behavior:

  * Loader is hidden automatically
  * User-facing alert is displayed
  * Technical details are logged to the console

---

## 📄 Client-Side CSV Parsing

* Implemented using **PapaParse**
* CSV parsing is performed directly in the browser
* Converts raw CSV into structured JavaScript arrays
* Suitable for small to medium-sized datasets

---

## 🧱 DOM Rendering Logic

* Rendering is handled using **Vanilla JavaScript**
* No external frameworks required
* Rendering process:

  1. Clear previously rendered content
  2. Generate new table elements
  3. Inject content into the DOM

---

## 📄 License

This project is released as open-source software.

Built with precision.  
Designed with restraint.
