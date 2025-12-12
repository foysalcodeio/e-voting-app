# E-voting App

A secure and modern electronic voting application built with **React**, **Vite**, and **Tailwind CSS**. This application features a seamless user experience with NID verification, candidate selection, and real-time result visualization.

## Technologies Used
- React.js + Vite
- Tailwind CSS + DaisyUI
- Framer Motion (Animations)
- Three.js / React Three Fiber (3D Backgrounds)
- Puppeteer (for documentation screenshots)

## Application Flow

```mermaid
graph TD
    A[Home Page] -->|Click Start Voting| B[Verify NID Page]
    B -->|Enter Valid NID| C{Verification Success?}
    C -->|Yes| D[Voting Page]
    C -->|No| B
    D -->|Select Candidate| E[Confirm Vote Modal]
    E -->|Confirm| F[Result Page]
    E -->|Cancel| D
    F -->|Go Home| A
```

## Screenshots

### Home Page
![Home Page](docs/screenshots/home.png)

### Verify NID Page
![Verify NID Page](docs/screenshots/verify.png)

### Voting Page
![Voting Page](docs/screenshots/vote.png)

### Result Page
![Result Page](docs/screenshots/result.png)

## Getting Started

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Run Development Server**
   ```bash
   npm run dev
   ```

3. **Build for Production**
   ```bash
   npm run build
   ```
