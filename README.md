# 🌤️ Weather App - Ứng Dụng Thời Tiết

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/React-19.1.1-blue.svg)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-7.1.6-646CFF.svg)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-000000?style=flat&logo=vercel&logoColor=white)](https://weather-app-uvhnael.vercel.app)

Một ứng dụng thời tiết hiện đại, responsive và thân thiện được xây dựng với React + Vite. Ứng dụng cung cấp thông tin thời tiết chi tiết, chính xác với giao diện đẹp mắt và trải nghiệm người dùng tuyệt vời.

![Weather App Preview](./public/preview.png)

## ✨ Tính Năng

### 🔍 **Tìm Kiếm Thông Minh**

- Tìm kiếm thời tiết theo tên thành phố
- Gợi ý tìm kiếm nhanh cho các thành phố phổ biến
- Hỗ trợ geolocation để lấy thời tiết vị trí hiện tại

### 🌡️ **Thông Tin Thời Tiết Chi Tiết**

- Nhiệt độ hiện tại và cảm giác như
- Độ ẩm không khí với thanh progress
- Tốc độ gió và hướng gió
- Tầm nhìn và chất lượng không khí
- Áp suất khí quyển
- Độ che phủ mây
- Thông tin mưa/tuyết (nếu có)

### 🌅 **Thông Tin Mặt Trời**

- Thời gian bình minh và hoàng hôn
- Múi giờ địa phương
- Thời gian cập nhật dữ liệu

### 🎨 **Giao Diện Hiện Đại**

- **Glass Morphism Design** với backdrop blur
- **Responsive Layout** hoạt động tốt trên mọi thiết bị
- **Smooth Animations** và micro-interactions
- **Dark Theme** với gradient backgrounds đẹp mắt
- **Progressive Loading** với loading states

### ⚙️ **Tùy Chỉnh**

- Chuyển đổi đơn vị nhiệt độ (°C / °F)
- Tự động theme theo thời gian trong ngày
- Hỗ trợ nhiều ngôn ngữ (Tiếng Việt)

## 🛠️ Công Nghệ Sử Dụng

- **React 19.1.1** - Frontend framework
- **Vite 7.1.6** - Build tool và dev server
- **Tailwind CSS** - Utility-first CSS framework
- **OpenWeatherMap API** - Dữ liệu thời tiết
- **Modern CSS** - Animations, Backdrop Filter, Grid/Flexbox

## 📦 Cài Đặt và Chạy

### Prerequisites

- Node.js 16+
- npm hoặc yarn
- API key từ [OpenWeatherMap](https://openweathermap.org/api)

### Clone Repository

```bash
git clone https://github.com/uvhnael/weather-app.git
cd weather-app
```

### Cài Đặt Dependencies

```bash
npm install
# hoặc
yarn install
```

### Cấu Hình API Key

1. Đăng ký tài khoản tại [OpenWeatherMap](https://openweathermap.org/api)
2. Lấy API key miễn phí
3. Thay thế API key trong file `src/App.jsx`:

```javascript
const API_KEY = "your-api-key-here";
```

### Chạy Development Server

```bash
npm run dev
# hoặc
yarn dev
```

Ứng dụng sẽ chạy tại `http://localhost:5173`

### Build cho Production

```bash
npm run build
# hoặc
yarn build
```

### Preview Production Build

```bash
npm run preview
# hoặc
yarn preview
```

## 🌐 API Reference

Ứng dụng sử dụng các API endpoints sau từ OpenWeatherMap:

### Current Weather Data

```
GET https://api.openweathermap.org/data/2.5/weather
```

### Geocoding API

```
GET https://api.openweathermap.org/geo/1.0/direct
```

## 📂 Cấu Trúc Project

```
weather-app/
├── public/
│   ├── vite.svg
│   └── index.html
├── src/
│   ├── App.jsx          # Main component
│   ├── main.jsx         # Entry point
│   └── index.css        # Global styles với Tailwind
├── package.json
├── vite.config.js
├── tailwind.config.js
├── eslint.config.js
└── README.md
```

## 🎯 Responsive Design

- **Mobile**: < 640px - Stack layout, larger touch targets
- **Tablet**: 641px - 1024px - 2-column grids
- **Desktop**: > 1024px - 4-column grids, hover effects
