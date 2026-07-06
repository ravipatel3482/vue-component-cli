#!/usr/bin/env node

import fs from 'fs';
import path from 'path';

// 1. Grab all command line arguments
const args = process.argv.slice(2);

if (args.length === 0) {
  console.error('\x1b[31m%s\x1b[0m', 'Error: Please provide a component path or name.');
  console.log('Usage: make-vue-comp [optional/path/] <ComponentName>');
  process.exit(1);
}

// 2. Join arguments to form the input path string
const rawInputPath = args.join('/');

// 3. Separate component name and target subfolder directory 
const componentName = path.basename(rawInputPath);
const targetSubFolder = path.dirname(rawInputPath);

// 4. Smart Base Path: Navigate into 'src' folder if present
let baseDir = process.cwd();
if (fs.existsSync(path.join(baseDir, 'src'))) {
  baseDir = path.join(baseDir, 'src');
}

// 5. Construct final folder destination path
const folderName = componentName.charAt(0).toUpperCase() + componentName.slice(1) + 'Component';
const fileBaseName = componentName.charAt(0).toLowerCase() + componentName.slice(1);

const finalFolderDir = targetSubFolder !== '.'
  ? path.join(baseDir, targetSubFolder, folderName)
  : path.join(baseDir, folderName);

// Only 3 file paths defined now
const vuePath = path.join(finalFolderDir, `${fileBaseName}.vue`);
const htmlPath = path.join(finalFolderDir, `${fileBaseName}.html`);
const cssPath = path.join(finalFolderDir, `${fileBaseName}.css`);

try {
  // 6. Create directories recursively if they don't exist
  if (!fs.existsSync(finalFolderDir)) {
    fs.mkdirSync(finalFolderDir, { recursive: true });
  } else {
    console.error('\x1b[31m%s\x1b[0m', `Error: A folder named "${folderName}" already exists at:\n${finalFolderDir}`);
    process.exit(1);
  }

  // Helper value for CSS class styling (e.g. MyComponent -> my-component)
  const kebabCaseName = componentName
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .toLowerCase();

  // 7. Define the 3 boilerplate templates

  // Custom structured Vue file: template references src, script block houses code, style section follows script
  const vueTemplate = `<template src="./${fileBaseName}.html"></template>\n\n<script lang="ts">\nimport { defineComponent } from 'vue';\n\nexport default defineComponent({\n  name: '${componentName}',\n  data() {\n    return {\n      componentTitle: '${componentName} Content',\n      isActive: true\n    };\n  },\n  mounted() {\n    console.log('${componentName} initialized successfully.');\n  }\n});\n</script>\n\n<style src="./${fileBaseName}.css" scoped></style>\n`;

  const htmlTemplate = `<div class="${kebabCaseName}-container" id="${componentName}">\n  <h1>${componentName} component is working perfectly!</h1>\n</div>\n`;

  const cssTemplate = `.${kebabCaseName}-container {\n  padding: 20px;\n}\n`;

  // 8. Write the 3 files to disk
  fs.writeFileSync(vuePath, vueTemplate);
  fs.writeFileSync(htmlPath, htmlTemplate);
  fs.writeFileSync(cssPath, cssTemplate);

  const relativeDisplayPath = path.relative(process.cwd(), finalFolderDir);
  console.log('\x1b[32m%s\x1b[0m', `🚀 Success! Created 3-file component ${folderName} inside: ${relativeDisplayPath}`);

} catch (error) {
  console.error('\x1b[31m%s\x1b[0m', `An error occurred: ${error.message}`);
  process.exit(1);
}