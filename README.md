# Morphing Particles

A stunning interactive particle animation that morphs text into beautiful particle formations. Built with React, TypeScript, and HTML5 Canvas.

![Demo](demo.gif)

## Features

 Interactive Particles**: Particles react to mouse movement with physics-based animations
 Text Morphing**: Type any text and watch particles form into letters
 Idle Animation**: Beautiful orbiting particle cluster when no text is displayed
 Glow Effects**: Each particle has a radial glow for a premium visual effect
 Responsive**: Works on all screen sizes with HiDPI/Retina display support
 Smooth Performance**: Optimized rendering with requestAnimationFrame

## Getting Started 
git clone https://github.com/senoldogann/Morphing-Particles-.git

# Navigate to project
cd morphing-particles

# Install dependencies
npm install

# Start development server
npm run dev


 Tech Stack

 React 19** - UI Framework
 TypeScript** - Type Safety
 Vite** - Build Tool
 HTML5 Canvas** - Rendering Engine
 TailwindCSS v4** - Styling

 How It Works

1. Particle System**: Each particle has its own position, velocity, and physics properties
2. Text Sampling**: Text is drawn to an offscreen canvas, then pixel data is sampled to create particle positions
3. Spring Physics**: Particles use spring-based forces for smooth, natural movement
4. Mouse Interaction**: Particles are repelled by the mouse cursor

## Customization

You can customize the particle behavior by modifying these values in `ParticleNetwork.tsx`:

- `colors` - Array of particle colors for idle mode
- `numberOfParticles` - Particle count in idle mode
- `step` - Particle density for text mode
- `maxDistance` - Mouse interaction radius

## License
MIT License - feel free to use this in your projects!

Made with ❤️ by [Şenol Doğan](https://github.com/senoldogann)
