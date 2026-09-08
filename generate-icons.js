import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const svgPath = path.resolve('./public/icon.svg');
const svgBuffer = fs.readFileSync(svgPath);

async function generateIcons() {
  try {
    console.log('Generating PWA icons for iOS and Android...');
    
    // Apple Touch Icon (iOS requires 180x180 PNG)
    await sharp(svgBuffer)
      .resize(180, 180)
      .png()
      .toFile('./public/apple-touch-icon.png');
    console.log('✅ Created apple-touch-icon.png (180x180)');

    // Standard PWA Icon (192x192)
    await sharp(svgBuffer)
      .resize(192, 192)
      .png()
      .toFile('./public/pwa-192x192.png');
    console.log('✅ Created pwa-192x192.png');

    // Standard PWA Icon (512x512)
    await sharp(svgBuffer)
      .resize(512, 512)
      .png()
      .toFile('./public/pwa-512x512.png');
    console.log('✅ Created pwa-512x512.png');

    // Maskable PWA Icon (Android)
    // The current SVG has a solid dark blue background with the icon centered,
    // which naturally acts as a perfect maskable safe-zone.
    await sharp(svgBuffer)
      .resize(512, 512)
      .png()
      .toFile('./public/pwa-maskable-512x512.png');
    console.log('✅ Created pwa-maskable-512x512.png');

    console.log('🎉 All icons generated successfully!');
  } catch (error) {
    console.error('Error generating icons:', error);
  }
}

generateIcons();
