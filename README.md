# Companies Directory – Frontlines Edutech Assessment

A high-performance, responsive React application designed for exploring and managing a global directory of companies. Built as a technical assessment for the **Frontend Developer** role at **Frontlines Edutech**.

## 🚀 Live Demo
**[Live Link Placeholder]** *(Deploy on Vercel/Netlify and update this)*

## ✨ Key Features

### 🔍 Advanced Filtering & Search
- **Universal Search**: Debounced search across company names, industries, and locations.
- **Drill-down Filters**: Filter by Industry, Country, and Operational Status (Active/Inactive).
- **Dynamic Results**: Real-time result counts and a visual progress bar indicating the fraction of data being viewed.

### 📊 Professional Data Views
- **Dual View Modes**: Seamlessly toggle between a modern **Card Grid** and a dense **Table List**.
- **Interactive Details**: Sliding side-drawer providing comprehensive company metadata, corporate overviews, and key metrics.
- **Stats Integration**: Visual indicators for employee count, revenue, and founding year.

### ⚡ Performance & UX
- **Robust Pagination**: Customizable items-per-page (10, 25, 50, 100) and "Show All" options.
- **Glassmorphism UI**: A premium, enterprise-grade aesthetic using Tailwind CSS with backdrop blurs and smooth transitions.
- **Resilient Image Handling**: A 3-stage fallback system for logos (Direct URL → Clearbit API → Google Favicon → Letter Avatar).
- **Graceful States**: Comprehensive loading skeletons and professional error handling with retry options.

## 🛠️ Tech Stack
- **Core**: React.js (v18+)
- **Styling**: Tailwind CSS (Vanilla CSS & Glassmorphism)
- **Language**: TypeScript (Strict typing for robust data handling)
- **Icons/Assets**: Lucide-inspired SVG icons & Gradient avatars
- **Service**: Mocked API with simulated network latency and error probability

## 📖 Approach & Decisions

### 1. Component Architecture
The application follows a modular, atomic structure where components are highly reusable. Logic for filtering, sorting, and pagination is centralized in `App.tsx` using modern React Hooks (`useState`, `useMemo`, `useCallback`) to ensure optimal performance and minimize unnecessary re-renders.

### 2. State Management
I chose a hybrid approach:
- **Local State**: Managed via `useState` for UI-specific toggles (drawers, sidebars).
- **Derived State**: Used `useMemo` extensively for the filtering and sorting pipeline. This ensures that the original dataset is never mutated and that performance remains high even with larger datasets.

### 3. Responsive Strategy
The UI utilizes a mobile-first responsive design. A hidden sidebar is used for filters on mobile devices to preserve screen real estate, while a persistent layout is provided for desktop users.

### 4. Data Reliability
The "Logo Fallback Chain" was a strategic decision to ensure the application never looks "broken" due to missing assets. By chaining multiple external APIs and providing a final CSS-based letter avatar, the professional appearance is maintained regardless of data quality.

## 📦 Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Durgarao9425/Frontlines-Edutech-task.git
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```

4. **Build for production:**
   ```bash
   npm run build
   ```

---
**Developed by Durgarao Goriparthi**
*Frontlines Edutech Technical Assessment*
