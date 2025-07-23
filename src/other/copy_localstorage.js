// Cross-Domain localStorage Manager
// This creates a popup to help you copy data between domains

// Create the interface
const container = document.createElement('div');
container.style.cssText = `
  position: fixed; top: 20px; right: 20px; z-index: 99999;
  background: #1a1a1a; color: #fff; padding: 20px; border-radius: 10px;
  font-family: monospace; font-size: 14px; box-shadow: 0 10px 30px rgba(0,0,0,0.5);
  max-width: 500px; max-height: 80vh; overflow-y: auto;
`;

const title = document.createElement('h3');
title.textContent = 'Cross-Domain localStorage Manager';
title.style.cssText = 'margin: 0 0 15px 0; color: #4fc3f7;';
container.appendChild(title);

// Current domain info
const currentDomain = document.createElement('div');
currentDomain.style.cssText = 'background: #2a2a2a; padding: 10px; border-radius: 5px; margin-bottom: 15px;';
currentDomain.innerHTML = `
  <strong>Current Domain:</strong><br>
  <span style="color: #4caf50;">${window.location.origin}</span><br>
  <small>Keys found: ${localStorage.length}</small>
`;
container.appendChild(currentDomain);

// Export current domain data
const exportCurrentBtn = document.createElement('button');
exportCurrentBtn.textContent = `Export All from ${window.location.hostname}`;
exportCurrentBtn.style.cssText = `
  width: 100%; background: #4caf50; color: white; border: none; padding: 12px;
  border-radius: 5px; cursor: pointer; margin-bottom: 15px; font-weight: bold;
`;
exportCurrentBtn.addEventListener('click', () => {
  const data = {};
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    data[key] = localStorage.getItem(key);
  }
  
  const json = JSON.stringify(data, null, 2);
  navigator.clipboard.writeText(json).then(() => {
    exportCurrentBtn.textContent = '✓ Copied to Clipboard!';
    setTimeout(() => {
      exportCurrentBtn.textContent = `Export All from ${window.location.hostname}`;
    }, 2000);
  });
  
  console.log('Exported localStorage:', json);
});
container.appendChild(exportCurrentBtn);

// Import section
const importSection = document.createElement('div');
importSection.style.cssText = 'border-top: 1px solid #333; padding-top: 15px;';

const importTitle = document.createElement('h4');
importTitle.textContent = 'Import Data';
importTitle.style.cssText = 'margin: 0 0 10px 0; color: #ff9800;';
importSection.appendChild(importTitle);

const importTextarea = document.createElement('textarea');
importTextarea.placeholder = 'Paste exported JSON data here...';
importTextarea.style.cssText = `
  width: 100%; height: 100px; background: #333; color: #fff; border: 1px solid #555;
  border-radius: 5px; padding: 10px; font-family: monospace; font-size: 12px;
  resize: vertical; margin-bottom: 10px;
`;
importSection.appendChild(importTextarea);

const importBtn = document.createElement('button');
importBtn.textContent = 'Import Data to This Domain';
importBtn.style.cssText = `
  width: 100%; background: #2196f3; color: white; border: none; padding: 10px;
  border-radius: 5px; cursor: pointer; font-weight: bold;
`;
importBtn.addEventListener('click', () => {
  try {
    const data = JSON.parse(importTextarea.value);
    let imported = 0;
    
    Object.keys(data).forEach(key => {
      localStorage.setItem(key, data[key]);
      imported++;
    });
    
    importBtn.textContent = `✓ Imported ${imported} keys!`;
    importBtn.style.background = '#4caf50';
    
    setTimeout(() => {
      importBtn.textContent = 'Import Data to This Domain';
      importBtn.style.background = '#2196f3';
    }, 3000);
    
    console.log(`Imported ${imported} localStorage keys:`, Object.keys(data));
  } catch (error) {
    importBtn.textContent = '✗ Invalid JSON data';
    importBtn.style.background = '#f44336';
    setTimeout(() => {
      importBtn.textContent = 'Import Data to This Domain';
      importBtn.style.background = '#2196f3';
    }, 3000);
  }
});
importSection.appendChild(importBtn);
container.appendChild(importSection);

// Clear data option
const clearBtn = document.createElement('button');
clearBtn.textContent = 'Clear All localStorage (Danger!)';
clearBtn.style.cssText = `
  width: 100%; background: #f44336; color: white; border: none; padding: 8px;
  border-radius: 5px; cursor: pointer; margin-top: 10px; font-size: 12px;
`;
clearBtn.addEventListener('click', () => {
  if (confirm('Are you sure? This will delete ALL localStorage data on this domain!')) {
    localStorage.clear();
    clearBtn.textContent = '✓ Cleared!';
    setTimeout(() => {
      clearBtn.textContent = 'Clear All localStorage (Danger!)';
    }, 2000);
  }
});
container.appendChild(clearBtn);

// Close button
const closeBtn = document.createElement('button');
closeBtn.textContent = '×';
closeBtn.style.cssText = `
  position: absolute; top: 10px; right: 15px; background: none; border: none;
  color: #fff; font-size: 24px; cursor: pointer; width: 30px; height: 30px;
`;
closeBtn.addEventListener('click', () => {
  document.body.removeChild(container);
});
container.appendChild(closeBtn);

document.body.appendChild(container);