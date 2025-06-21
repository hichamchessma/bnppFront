const fs = require('fs');
const path = require('path');

const componentsDir = path.join(__dirname, 'src/app');

// Liste des composants à mettre à jour
const components = [
  'home',
  'kpi',
  'bundles',
  'bundle',
  'requests',
  'kpi-requests',
  'sso',
  'sso-callback',
  'identities',
  'habilitations',
  'rights-extraction',
  'tables',
  'reports',
  'certification-rapport',
  'interface-certification',
  'certification-bilan',
  'assets',
  'tasks',
  'retrieve-users',
  'retrieve-users-rights',
  'perimeters',
  'ecart-myaccess',
  'sod',
  'myreport',
  'certification-hors-myaccess',
  'certification-hors-myaccess/rapport'
];

components.forEach(componentPath => {
  const pathParts = componentPath.split('/');
  const componentName = pathParts[pathParts.length - 1].split('-').map(part => 
    part.charAt(0).toUpperCase() + part.slice(1)
  ).join('');
  
  const componentDir = path.join(componentsDir, componentPath);
  const baseName = path.basename(componentPath);
  const tsFile = path.join(componentDir, `${baseName}.component.ts`);
  const htmlFile = path.join(componentDir, `${baseName}.component.html`);
  const cssFile = path.join(componentDir, `${baseName}.component.css`);
  
  // Créer le fichier TypeScript
  if (!fs.existsSync(tsFile) || fs.readFileSync(tsFile, 'utf8').trim() === '') {
    const tsContent = `import { Component } from '@angular/core';

@Component({
  selector: 'app-${componentName.toLowerCase()}',
  templateUrl: './${componentName.toLowerCase()}.component.html',
  styleUrls: ['./${componentName.toLowerCase()}.component.css']
})
export class ${componentName}Component {
  title = '${componentName}';
  
  constructor() { }
  
  ngOnInit(): void {
  }
}`;
    
    fs.writeFileSync(tsFile, tsContent);
    console.log(`Created/Updated: ${tsFile}`);
  }
  
  // Créer le fichier HTML s'il n'existe pas
  if (!fs.existsSync(htmlFile)) {
    const htmlContent = `<div class="${componentName.toLowerCase()}-container">
  <h2>${componentName} Component</h2>
  <p>This is the ${componentName} component.</p>
</div>`;
    
    fs.writeFileSync(htmlFile, htmlContent);
    console.log(`Created: ${htmlFile}`);
  }
  
  // Créer le fichier CSS s'il n'existe pas
  if (!fs.existsSync(cssFile)) {
    const cssContent = `.${componentName.toLowerCase()}-container {
  padding: 20px;
}`;
    
    fs.writeFileSync(cssFile, cssContent);
    console.log(`Created: ${cssFile}`);
  }
});

console.log('Component update completed!');
