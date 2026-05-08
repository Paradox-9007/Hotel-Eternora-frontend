const fs = require('fs');

for(let i=1; i<=9; i++) {
  const file = 'dashboards/dashboard-'+i+'.html';
  if (!fs.existsSync(file)) continue;
  let c = fs.readFileSync(file, 'utf8');
  c = c.replace(/inputTaker\.style\.display\s*=\s*'flex';/g, "inputTaker.style.setProperty('display', 'flex', 'important');");
  fs.writeFileSync(file, c);
}
