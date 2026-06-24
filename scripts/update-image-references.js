const fs = require('fs');
const path = require('path');

const SRC_DIR = path.join(__dirname, '..', 'src');

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

function updateReferences() {
  const files = getFilesRecursively(SRC_DIR);
  const codeFiles = files.filter(f => /\.(tsx?|jsx?|css)$/i.test(f));

  console.log(`Scanning ${codeFiles.length} code files for image extension updates...`);

  let replacementCount = 0;

  for (const file of codeFiles) {
    let content = fs.readFileSync(file, 'utf8');
    const originalContent = content;

    // Replace "/images/...jpg/jpeg/png" references to ".webp"
    // Also matches "https://.../images/...png/jpg/jpeg"
    // Matches extensions case-insensitively
    const regex = /(\/images\/[^\s'"`()]+?)\.(png|jpe?g)/gi;
    content = content.replace(regex, (match, p1, p2) => {
      replacementCount++;
      return `${p1}.webp`;
    });

    if (content !== originalContent) {
      console.log(`Updating image references in: ${path.relative(SRC_DIR, file)}`);
      fs.writeFileSync(file, content, 'utf8');
    }
  }

  console.log(`Image extension replacements done! Updated ${replacementCount} references.`);
}

updateReferences();
