const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Ensure sharp is installed
try {
  require.resolve('sharp');
} catch (e) {
  console.log('Installing sharp for image optimization...');
  execSync('npm install -D sharp', { stdio: 'inherit' });
}

const sharp = require('sharp');

const IMAGES_DIR = path.join(__dirname, '..', 'public', 'images');

// Helper to recursively find files
function getFilesRecursively(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      getFilesRecursively(filePath, fileList);
    } else {
      fileList.push(filePath);
    }
  }
  return fileList;
}

async function convertToWebp() {
  console.log('Scanning images directory:', IMAGES_DIR);
  const files = getFilesRecursively(IMAGES_DIR);
  const imageFiles = files.filter(f => /\.(png|jpe?g)$/i.test(f));

  console.log(`Found ${imageFiles.length} images to optimize.`);
  
  let totalBeforeBytes = 0;
  let totalAfterBytes = 0;
  const auditReport = [];

  for (const file of imageFiles) {
    const ext = path.extname(file);
    const webpPath = file.substring(0, file.length - ext.length) + '.webp';
    const beforeStats = fs.statSync(file);
    const beforeSizeKB = (beforeStats.size / 1024).toFixed(2);
    
    totalBeforeBytes += beforeStats.size;

    console.log(`Optimizing: ${path.relative(IMAGES_DIR, file)} (${beforeSizeKB} KB)`);
    
    try {
      // Use sharp to convert to WebP
      // For large images, we also perform basic optimization settings (quality 80)
      await sharp(file)
        .webp({ quality: 80, effort: 6 })
        .toFile(webpPath);

      const afterStats = fs.statSync(webpPath);
      const afterSizeKB = (afterStats.size / 1024).toFixed(2);
      totalAfterBytes += afterStats.size;

      const savingsPercent = ((1 - afterStats.size / beforeStats.size) * 100).toFixed(1);
      console.log(`  -> WebP: ${path.relative(IMAGES_DIR, webpPath)} (${afterSizeKB} KB) [Saved ${savingsPercent}%]`);
      
      auditReport.push({
        file: path.relative(IMAGES_DIR, file),
        webpFile: path.relative(IMAGES_DIR, webpPath),
        beforeSizeKB: parseFloat(beforeSizeKB),
        afterSizeKB: parseFloat(afterSizeKB),
        savingsPercent: parseFloat(savingsPercent),
        action: 'Converted & Optimized'
      });

      // Delete the original file to avoid duplicate copies and clean up public/images
      fs.unlinkSync(file);
    } catch (err) {
      console.error(`Error optimizing ${file}:`, err);
    }
  }

  const beforeTotalMB = (totalBeforeBytes / (1024 * 1024)).toFixed(2);
  const afterTotalMB = (totalAfterBytes / (1024 * 1024)).toFixed(2);
  const totalSavings = ((1 - totalAfterBytes / totalBeforeBytes) * 100).toFixed(1);

  console.log('\n=========================================');
  console.log('IMAGE OPTIMIZATION COMPLETE');
  console.log(`Total Before Size: ${beforeTotalMB} MB`);
  console.log(`Total After Size:  ${afterTotalMB} MB`);
  console.log(`Total Savings:      ${totalSavings}%`);
  console.log('=========================================\n');

  // Save audit report JSON
  const reportPath = path.join(__dirname, 'image-audit-report.json');
  fs.writeFileSync(reportPath, JSON.stringify({
    summary: {
      beforeTotalMB: parseFloat(beforeTotalMB),
      afterTotalMB: parseFloat(afterTotalMB),
      totalSavings: parseFloat(totalSavings)
    },
    details: auditReport
  }, null, 2));
}

convertToWebp().catch(console.error);
