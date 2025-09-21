# 🚀 Deployment Guide

Hướng dẫn deploy Weather App lên các platform hosting phổ biến.

## 📋 Prerequisites

- Repository đã được push lên GitHub
- API key từ [OpenWeatherMap](https://openweathermap.org/api)
- Build local thành công (`npm run build`)

## 🔗 Quick Deploy Links

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/your-username/weather-app)

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/your-username/weather-app)

## 🌐 Vercel (Recommended)

### Method 1: One-Click Deploy
1. Click "Deploy with Vercel" button ở trên
2. Authorize GitHub access
3. Set environment variables:
   - `VITE_WEATHER_API_KEY` = your OpenWeatherMap API key
4. Click "Deploy"

### Method 2: Manual Deploy
1. Đăng nhập [Vercel](https://vercel.com)
2. Click "New Project"
3. Import từ GitHub repository
4. Configure Build Settings:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. Add Environment Variables:
   - `VITE_WEATHER_API_KEY` = your API key
6. Click "Deploy"

### Vercel CLI
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy từ project folder
vercel

# Set environment variables
vercel env add VITE_WEATHER_API_KEY production
```

## 🔷 Netlify

### Method 1: Drag & Drop
1. Build project locally: `npm run build`
2. Đi tới [Netlify](https://netlify.com)
3. Drag & drop folder `dist` vào Netlify
4. Set environment variables trong Site Settings

### Method 2: Git Integration
1. Đăng nhập [Netlify](https://netlify.com)
2. Click "New site from Git"
3. Choose GitHub và repository
4. Configure Build Settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
5. Add Environment Variables:
   - `VITE_WEATHER_API_KEY` = your API key
6. Click "Deploy site"

### Netlify CLI
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Build và deploy
npm run build
netlify deploy --prod --dir=dist
```

## ⚡ Firebase Hosting

```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login
firebase login

# Initialize project
firebase init hosting

# Build project
npm run build

# Deploy
firebase deploy
```

Configuration trong `firebase.json`:
```json
{
  "hosting": {
    "public": "dist",
    "ignore": [
      "firebase.json",
      "**/.*",
      "**/node_modules/**"
    ],
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ]
  }
}
```

## 📦 GitHub Pages

```bash
# Install gh-pages
npm install --save-dev gh-pages

# Add to package.json scripts:
# "deploy": "gh-pages -d dist"

# Build và deploy
npm run build
npm run deploy
```

Cập nhật `vite.config.js`:
```javascript
export default defineConfig({
  plugins: [react()],
  base: '/weather-app/', // Repository name
})
```

## 🐳 Docker

Tạo `Dockerfile`:
```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=0 /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

Build và run:
```bash
# Build image
docker build -t weather-app .

# Run container
docker run -p 3000:80 weather-app
```

## 🔐 Environment Variables

Tất cả platforms đều cần set environment variables:

| Variable | Value | Description |
|----------|-------|-------------|
| `VITE_WEATHER_API_KEY` | your-api-key | OpenWeatherMap API key |
| `VITE_DEFAULT_UNITS` | metric | Optional: Default units |
| `VITE_DEFAULT_LANGUAGE` | vi | Optional: Default language |

### Security Notes
- ⚠️ **KHÔNG** commit API keys vào Git
- ✅ Sử dụng environment variables
- ✅ Add `.env*` vào `.gitignore`
- ✅ Rotate API keys định kỳ

## 🔧 Build Optimization

### Vite Config
```javascript
// vite.config.js
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    minify: 'terser',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
        },
      },
    },
  },
})
```

### Performance Tips
- ✅ Enable gzip compression
- ✅ Set proper cache headers
- ✅ Use CDN cho static assets
- ✅ Optimize images
- ✅ Enable tree shaking

## 🌍 Custom Domain

### Vercel
1. Vào Project Settings
2. Domains tab
3. Add your domain
4. Configure DNS records

### Netlify
1. Site Settings → Domain management
2. Add custom domain
3. Configure DNS records

### DNS Records
```
Type: CNAME
Name: www
Value: your-app.vercel.app
```

## 📊 Analytics & Monitoring

### Google Analytics
Add to `index.html`:
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_TRACKING_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_TRACKING_ID');
</script>
```

### Vercel Analytics
```bash
npm install @vercel/analytics
```

```javascript
import { Analytics } from '@vercel/analytics/react';

function App() {
  return (
    <>
      <YourApp />
      <Analytics />
    </>
  );
}
```

## 🔄 CI/CD Pipeline

### GitHub Actions
Tạo `.github/workflows/deploy.yml`:
```yaml
name: Deploy to Production

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Build
      run: npm run build
      env:
        VITE_WEATHER_API_KEY: ${{ secrets.WEATHER_API_KEY }}
    
    - name: Deploy to Vercel
      uses: amondnet/vercel-action@v20
      with:
        vercel-token: ${{ secrets.VERCEL_TOKEN }}
        vercel-org-id: ${{ secrets.ORG_ID }}
        vercel-project-id: ${{ secrets.PROJECT_ID }}
```

## 🐛 Troubleshooting

### Build Errors
```bash
# Clear cache
rm -rf node_modules dist
npm install
npm run build
```

### Environment Variables Not Working
- Kiểm tra prefix `VITE_`
- Restart development server
- Check platform environment settings

### 404 Errors
- Đảm bảo SPA routing configuration
- Check base URL trong vite.config.js
- Verify build output directory

### API Errors in Production
- Verify API key trong environment variables
- Check CORS settings
- Verify API quota limits

---

🎉 **Congratulations! Your Weather App is now live!** 🎉