const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

const distPath = path.join(__dirname, '..', 'node_modules', 'allure-commandline', 'dist');
const libPath = path.join(distPath, 'lib');
const configPath = path.join(distPath, 'lib', 'config');

// Build classpath
const libFiles = fs.readdirSync(libPath)
  .filter(file => file.endsWith('.jar'))
  .map(file => path.join(libPath, file));

const classpath = [
  ...libFiles,
  configPath
].join(path.delimiter);

const args = process.argv.slice(2);
const cwd = path.resolve(__dirname, '..');

// Find Java executable
let javaExe = 'java';
if (process.env.JAVA_HOME) {
  const javaHome = process.env.JAVA_HOME.replace(/\\/g, '/');
  // Remove /bin if present
  const baseJavaHome = javaHome.endsWith('/bin') ? javaHome.slice(0, -4) : javaHome;
  javaExe = path.join(baseJavaHome, 'bin', 'java.exe');
}

// Prepare command
const javaArgs = [
  '-classpath', classpath,
  'io.qameta.allure.CommandLine',
  ...args
];

const child = spawn(javaExe, javaArgs, {
  cwd: cwd,
  env: process.env,
  stdio: 'inherit',
  shell: false
});

child.on('close', (code) => {
  process.exit(code || 0);
});

child.on('error', (err) => {
  console.error('Failed to start Allure:', err.message);
  console.error('Make sure Java is installed and JAVA_HOME is set correctly.');
  process.exit(1);
});

