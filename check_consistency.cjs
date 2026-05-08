const fs = require('fs');
for(let i=1; i<=9; i++) {
  const c = fs.readFileSync('dashboards/dashboard-'+i+'.html', 'utf8');
  console.log('D'+i+' has D'+i+'-input-container element: ' + c.includes('id="D'+i+'-input-container"'));
  console.log('D'+i+' has getElementById(D'+i+'-input-container): ' + c.includes("getElementById('D"+i+"-input-container')"));
}
