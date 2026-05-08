const fs = require('fs');
const path = require('path');

const files = [
  'dashboard.html',
  ...Array.from({length: 9}, (_, i) => `dashboards/dashboard-${i+1}.html`)
];

files.forEach(file => {
  const filePath = path.join('d:/CiMSO/Real/frontend', file);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Remove the display block assignment for the input container inside the button click listener
    content = content.replace(/document\.getElementById\('D\d-generate-ai-report-button'\)\.addEventListener\('click', \(\) => \{[\s\S]*?\}\);/g, (match) => {
      return match.replace(/document\.getElementById\('D\d-input-container'\)\.style\.display\s*=\s*['\"].*?['\"];\s*/g, '');
    });

    // Also we need to make sure updateAIAnalysis() sets it to display: flex
    // Let's check updateAIAnalysis and ensure inputTaker.style.display = 'flex'; is there on success
    
    fs.writeFileSync(filePath, content);
  }
});
console.log('Fixed button listeners');
