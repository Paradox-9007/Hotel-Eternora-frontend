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
    
    // Find dashboard number
    const matchD = content.match(/D(\d)-generate-ai-report-button/);
    if(matchD) {
      const dNum = matchD[1];
      const restoreCode = `
// Restore AI State
setTimeout(() => {
  const savedAi = localStorage.getItem('ai_result_D${dNum}-ai-analysis');
  if (savedAi) {
    const aiContainer = document.getElementById('db${dNum}-ai-container');
    if (aiContainer) aiContainer.style.display = 'block';
    const aiOutput = document.getElementById('D${dNum}-ai-analysis');
    if (aiOutput) aiOutput.innerHTML = savedAi;
    const inputContainer = document.getElementById('D${dNum}-input-container');
    if (inputContainer) inputContainer.style.display = 'flex';
    const btn = document.getElementById('D${dNum}-generate-ai-report-button');
    if (btn) btn.style.display = 'none';
  }
}, 500);
</script>`;
      
      if (!content.includes('// Restore AI State')) {
        // Replace last </script>
        content = content.replace(/<\/script>(?![\s\S]*<\/script>)/, restoreCode);
        fs.writeFileSync(filePath, content);
      }
    }
  }
});
console.log('Restored AI state across dashboards');
