import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { readFileSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Debug logging
console.log('Current working directory:', process.cwd());
console.log('__dirname:', __dirname);
console.log('Node version:', process.version);

// Check if package.json exists
try {
  const packageJson = JSON.parse(readFileSync(path.join(__dirname, 'package.json'), 'utf8'));
  console.log('Package.json found, dependencies:', Object.keys(packageJson.dependencies || {}));
} catch (error) {
  console.log('Error reading package.json:', error.message);
}
const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from the dist directory
app.use(express.static(path.join(__dirname, 'dist')));

// Health check endpoint for Azure
app.get('/robots933456.txt', (req, res) => {
  res.status(200).send('OK');
});

// API proxy - if you need to proxy API calls in production
// Uncomment and modify if needed:
// app.use('/api', (req, res) => {
//   // Proxy to your backend API
//   res.status(502).json({ error: 'API not configured' });
// });

// Handle React Router - send all requests to index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Serving static files from: ${path.join(__dirname, 'dist')}`);
});