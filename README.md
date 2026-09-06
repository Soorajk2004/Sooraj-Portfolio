# Sooraj — Personal Portfolio Website

A personal developer portfolio built with the **"Suspended Layers"** design philosophy — a quiet, dark workspace where navigation, project boxes, and metrics rest visibly *above* the background on their own elevated planes, distinguished by multi-layer drop shadows and subtle warm copper/amber rim-lighting.

Live Repository: [https://github.com/Soorajk2004/Sooraj-Portfolio](https://github.com/Soorajk2004/Sooraj-Portfolio)

---

## ✨ Features

- **"Suspended Layers" Visual Identity**:
  - Base background: `#101014` (matte charcoal)
  - Elevation Plane 1: `#1B1B22` (stationary menu card, section eyebrows, skill chips)
  - Elevation Plane 2: `#232330` (project cards, stat cards, contact tiles)
  - Accent Color: `#D9A05B` (warm copper/amber for interactive states and active indicators)
  - Layered cool-toned drop shadows with subtle amber underside rim-lights (`rgba(217,160,91,0.08)` to `0.24`)
- **Stationary Elevated Menu Card**: Fixed top-right control plane with active nav indicator and scroll-deepened shadow spread.
- **Reverse Grid Projects Layout**: Right-to-left layout order with alternating vertical offsets (~30px zigzag pattern) featuring:
  - **LeavEase**: Enterprise Leave & Absence Management Platform (Django, RBAC, FullCalendar.js, Chart.js).
  - **ALAMARAi**: AI-Powered Wardrobe & Fashion Intelligence (Gemini 1.5 Multimodal API).
  - **SmartMart API**: E-Commerce & Inventory Management Microservices (DRF, JWT).
  - **MedVault Records**: Clinical Record & Prescription Audit System (PHP, MySQL).
- **Interactive Deep-Dive Architecture Modals**: View in-depth technical highlights, metrics, and repository links.
- **Skills by Architectural Layer**: Languages, Frameworks, and Databases & Tools.
- **Full In-Browser Edit Mode**:
  - Gated by client-side passkey (default: `admin` or `sooraj`).
  - Inline click-to-edit for all text with zero layout shifts.
  - Add / Edit / Delete / Reorder projects and skill chips.
  - Replace CV via local PDF upload or external cloud link with size safety warning.
  - Add unlimited personal links with custom icons.
  - Persisted to `localStorage` with an **Export JSON** feature to update `src/data/content.json` permanently.

---

## 🛠 Tech Stack

- **Framework**: React 19 + Vite 8
- **Styling**: Tailwind CSS (custom tokens, fonts & box shadows)
- **Typography**: Google Fonts (Fraunces, Inter, IBM Plex Mono)
- **Icons**: Lucide React + custom brand SVGs
- **Animation**: Framer Motion (subtle entrance fades and lift effects)

---

## 🚀 Getting Started

### 1. Clone & Install
```bash
git clone https://github.com/Soorajk2004/Sooraj-Portfolio.git
cd Sooraj-Portfolio
npm install
```

### 2. Run Development Server
```bash
npm run dev
```
Open `http://localhost:5173` in your browser.

### 3. Build for Production
```bash
npm run build
```

---

## 📝 Author

**Sooraj**
- Final-year MCA student at APJ Abdul Kalam Technological University (KTU), Kerala
- Python & Django Developer | Full-Stack Aspirant
- GitHub: [@Soorajk2004](https://github.com/Soorajk2004)
