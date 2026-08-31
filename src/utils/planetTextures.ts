import * as THREE from 'three';

export function createPlanetTexture(type: string): THREE.Texture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');
  if (!ctx) return new THREE.Texture();

  // Helper for drawing bands
  const drawBands = (colors: string[]) => {
    const numBands = colors.length;
    for (let i = 0; i < numBands; i++) {
      ctx.fillStyle = colors[i];
      ctx.fillRect(0, (i / numBands) * 256, 512, 256 / numBands);
    }
  };

  switch (type) {
    case 'Sun':
      ctx.fillStyle = '#ffcc00'; ctx.fillRect(0, 0, 512, 256);
      for (let i = 0; i < 50; i++) {
        ctx.fillStyle = i % 2 === 0 ? '#ff8800' : '#ffaa00';
        ctx.beginPath();
        ctx.arc(Math.random() * 512, Math.random() * 256, Math.random() * 20, 0, Math.PI * 2);
        ctx.fill();
      }
      break;
    case 'Mercury':
      ctx.fillStyle = '#9e9e9e'; ctx.fillRect(0, 0, 512, 256);
      ctx.fillStyle = '#757575';
      for (let i = 0; i < 100; i++) {
        ctx.beginPath();
        ctx.arc(Math.random() * 512, Math.random() * 256, Math.random() * 5, 0, Math.PI * 2);
        ctx.fill();
      }
      break;
    case 'Venus':
      drawBands(['#e8cda0', '#d4b57a', '#e8cda0', '#c89f59', '#e8cda0']);
      break;
    case 'Earth':
      ctx.fillStyle = '#1e88e5'; ctx.fillRect(0, 0, 512, 256); // Oceans
      ctx.fillStyle = '#43a047'; // Land
      for (let i = 0; i < 30; i++) {
        ctx.beginPath();
        ctx.arc(Math.random() * 512, Math.random() * 256, Math.random() * 40 + 10, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.fillStyle = '#ffffff'; // Clouds
      for (let i = 0; i < 40; i++) {
        ctx.beginPath();
        ctx.arc(Math.random() * 512, Math.random() * 256, Math.random() * 30, 0, Math.PI * 2);
        ctx.globalAlpha = 0.4;
        ctx.fill();
      }
      ctx.globalAlpha = 1.0;
      break;
    case 'Mars':
      ctx.fillStyle = '#d84315'; ctx.fillRect(0, 0, 512, 256);
      ctx.fillStyle = '#bf360c';
      for (let i = 0; i < 50; i++) {
        ctx.beginPath();
        ctx.arc(Math.random() * 512, Math.random() * 256, Math.random() * 20, 0, Math.PI * 2);
        ctx.fill();
      }
      // Polar caps
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, 512, 15);
      ctx.fillRect(0, 241, 512, 15);
      break;
    case 'Jupiter':
      drawBands(['#a18262', '#c88b3a', '#e3c193', '#8b5a2b', '#c88b3a', '#a18262', '#8b5a2b', '#c88b3a']);
      // Great Red Spot
      ctx.fillStyle = '#b7410e';
      ctx.beginPath();
      ctx.ellipse(300, 160, 40, 20, 0, 0, Math.PI * 2);
      ctx.fill();
      break;
    case 'Saturn':
      drawBands(['#e4d191', '#c7a961', '#e4d191', '#b39045', '#e4d191', '#c7a961']);
      break;
    case 'Uranus':
      ctx.fillStyle = '#b2ebf2'; ctx.fillRect(0, 0, 512, 256);
      drawBands(['#b2ebf2', '#80deea', '#b2ebf2', '#4dd0e1', '#b2ebf2']);
      break;
    case 'Neptune':
      ctx.fillStyle = '#303f9f'; ctx.fillRect(0, 0, 512, 256);
      drawBands(['#303f9f', '#3f51b5', '#283593', '#3949ab', '#1a237e', '#303f9f']);
      // Dark spot
      ctx.fillStyle = '#1a237e';
      ctx.beginPath();
      ctx.ellipse(200, 120, 30, 15, 0, 0, Math.PI * 2);
      ctx.fill();
      break;
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.anisotropy = 16;
  return texture;
}
