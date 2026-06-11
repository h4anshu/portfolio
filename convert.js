import fs from 'fs/promises';
import path from 'path';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const imagesDir = path.join(__dirname, 'public', 'images');

async function processImages() {
  try {
    const files = await fs.readdir(imagesDir);
    
    for (const file of files) {
      if (file.toLowerCase().endsWith('.png') || file.toLowerCase().endsWith('.jpg') || file.toLowerCase().endsWith('.jpeg')) {
        const filePath = path.join(imagesDir, file);
        const parsed = path.parse(file);
        const newFileName = `${parsed.name}.webp`;
        const newFilePath = path.join(imagesDir, newFileName);
        
        console.log(`Processing: ${file}...`);
        
        await sharp(filePath)
          .resize({ width: 1200, withoutEnlargement: true }) // Max width 1200px
          .webp({ quality: 80, effort: 6 }) // High compression effort
          .toFile(newFilePath);
          
        console.log(`✅ Saved: ${newFileName}`);
        
        // Delete original
        await fs.unlink(filePath);
        console.log(`🗑️ Deleted original: ${file}`);
      }
    }
    console.log("🎉 All images processed successfully!");
  } catch (err) {
    console.error("❌ Error processing images:", err);
  }
}

processImages();
