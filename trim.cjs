const fs = require('fs');
let data = fs.readFileSync('src/sections/SolarSystem.tsx', 'utf8');
let marker = 'export default SolarSystem;';
let index = data.indexOf(marker);
if(index !== -1) {
  fs.writeFileSync('src/sections/SolarSystem.tsx', data.substring(0, index + marker.length) + '\n');
  console.log('Fixed file');
} else {
  console.log('Marker not found');
}
