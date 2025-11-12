# Lucky Draw Game

A futuristic, neon-themed lucky draw slot machine game built with React and Vite. Features animated number reels with a sci-fi aesthetic, complete with glowing effects, pedestals, and a multi-layered platform.

## Features

- 🎰 Animated number spinning with staggered lottery-style animation
- 🎨 Futuristic neon design with purple, cyan, and fuchsia color scheme
- ✨ Glowing effects, starry backgrounds, and vapor beams
- 🏆 Prize announcement with flashing animation
- 📱 Responsive design

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

## How to Use

1. Click the **SPIN** button to start the lottery animation
2. Watch as each number reel spins with a staggered animation
3. After all reels stop, the result will be displayed with "CONGRATULATIONS" and "1st prize" message
4. Click **SPIN** again to play another round

## Customization

You can customize the game by modifying:
- `SPIN_CONFIG` in `src/components/Spin.jsx` - Animation timing and reel count
- Colors in `src/index.css` - Number text styles
- Platform design in `src/components/Spin.jsx` - Visual elements

## License

This project is open source and available for personal and commercial use.
