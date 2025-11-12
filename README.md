# Lucky Draw Game
## Prerequisites

- Node.js (v16 or higher)
- npm or yarn

## Installation

1. Clone the repository or navigate to the project directory:
```bash
cd luckydraw
```

2. Install dependencies:
```bash
npm install
```

## Running the Project

### Development Mode

Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173` (or the port shown in the terminal).

### Build for Production

Build the project for production:
```bash
npm run build
```

The optimized files will be in the `dist` directory.

### Preview Production Build

Preview the production build locally:
```bash
npm run preview
```

## Project Structure

```
luckydraw/
├── src/
│   ├── components/
│   │   └── Spin.jsx          # Main spin component with lottery animation
│   ├── assets/
│   │   ├── bottom.png        # Bottom HUD image
│   │   └── spinbutton.png   # Spin button image
│   ├── App.jsx              # Main app component
│   ├── index.css            # Global styles and animations
│   └── main.jsx             # Entry point
├── public/                  # Static assets
└── package.json            # Dependencies and scripts
```

## Technologies Used

- **React** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **Orbitron Font** - Futuristic font family


- Colors in `src/index.css` - Number text styles
- Platform design in `src/components/Spin.jsx` - Visual elements

## License

This project is open source and available for personal and commercial use.
