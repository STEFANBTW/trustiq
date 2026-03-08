const { execSync } = require('child_process');
try {
  const output = execSync('git log -p src/pages/Home.tsx').toString();
  console.log(output.substring(0, 5000));
} catch (e) {
  console.error(e);
}
