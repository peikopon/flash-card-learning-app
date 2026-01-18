# AWS Cloud Practitioner Prep App

## Project Overview
A modern, interactive flashcard application designed to help users prepare for the AWS Cloud Practitioner exam. The app features a spaced-repetition inspired mastery system, intuitive gesture controls, and a comprehensive dashboard.


## 🚀 How to Run

### Prerequisites
*   [Node.js](https://nodejs.org/) (v16 or higher recommended)
*   npm (comes with Node.js)

### Installation
1.  Clone the repository or download the source code.
2.  Open your terminal/command prompt in the project folder.
3.  Install dependencies:
    ```bash
    npm install
    ```

### Running Locally
To start the development server:
```bash
npm run dev
```
Then open your browser to the URL shown (usually `http://localhost:5173`).

### Building for Production
To create an optimized build for deployment (e.g., Netlify, Vercel):
```bash
npm run build
```
The output will be in the `dist/` folder.

---

## 📋 Specifications & Features

### 1. Interactive Study Mode
*   **Flashcards**: Double-sided cards with 3D flip animations revealing detailed AWS service descriptions and documentation links.
*   **Gestures**: Swipe right (Thumb Up) for "Correct" and swipe left (Thumb Down) for "Incorrect".
*   **Mastery System**:
    *   **HP Bar**: Visual progress indicator (0/3 notches) on every card.
    *   **3-Strike Rule**: Requires 3 cumulative correct answers to master a card. A single wrong answer resets mastery progress to 0, enforcing strict reinforcement.
    *   **Instant Master**: Gold Star button to immediately mark a known concept as mastered.
*   **Mobile Optimized**: Responsive layout ensuring accessible buttons and progress tracking on smartphone screens.

### 2. Dashboard
*   **Progress Tracking**:
    *   Overall mastery percentage.
    *   Circular progress chart with exact count (e.g., "50 / 150").
    *   Breakdown by AWS Section (Security, Compute, Storage, etc.) with individual progress bars.
*   **Quick Actions**: Start random study sessions or jump into specific sections.

### 3. Mastered Cards Management
*   **List View**: A professional, table-like view of all mastered items.
*   **Advanced Filtering**:
    *   **Search**: Real-time text search by service name or section.
    *   **Smart Chips**: Toggleable pill-badges for each section (e.g., "Compute", "Database") to filter the list quickly.
*   **Management**: Users can "Delist" (un-master) items if they feel they need to review them again.

### 4. Internationalization (i18n)
*   **Multilingual Support**: Full support for **English** and **Japanese** (日本語).
*   **Dynamic Language Toggle**: A floating language switcher allows users to change the language at any time—including during an active flashcard session—without losing progress.
*   **Localized Content**:
    *   **UI Translation**: All headers, buttons, and progress indicators are fully translated.
    *   **Study Content**: Dynamic loading of localized datasets (`data.csv` and `data_jp.csv`) to ensure flashcard content matches the selected language.

## 🛠 Tech Stack
*   **Framework**: React (Vite)
*   **Internationalization**: `react-i18next` & `i18next`
*   **Styling**: Vanilla CSS with CSS Variables for theming.
*   **Animations**: `framer-motion` for fluid interactions.
*   **Data Handling**: `papaparse` for CSV data loading.
*   **Persistence**: `localStorage` (Offline/Local save).
*   **Icons**: `react-icons` (FontAwesome).

## File Structure
*   `src/components/`: UI Components (Card, StudyMode, Dashboard, MasteredList, LanguageToggle).
*   `src/utils/`: Logic for storage, CSV parsing, and theming.
*   `public/`: Static assets (CSV data, logos).
*   `src/i18n.js`: Configuration for internationalization resources and translations.

---
