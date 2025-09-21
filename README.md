# 🌤️ Weather App - Ứng Dụng Thời Tiết

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

## 🚀 Demo

[**Xem Demo Trực Tiếp**](https://your-weather-app-demo.vercel.app) 

## 📱 Screenshots

<div align="center">
  <img src="./screenshots/desktop.png" alt="Desktop View" width="45%">
  <img src="./screenshots/mobile.png" alt="Mobile View" width="35%">
</div>

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
git clone https://github.com/your-username/weather-app.git
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

## ♿ Accessibility Features

- **Keyboard Navigation** support
- **Focus Indicators** rõ ràng
- **High Contrast Mode** support
- **Reduced Motion** support
- **ARIA Labels** cho screen readers
- **Semantic HTML** structure

## 🔧 Customization

### Thêm Thành Phố Mới
Chỉnh sửa array trong component:
```javascript
['Hồ Chí Minh', 'Hà Nội', 'Đà Nẵng', 'Your City']
```

### Thay Đổi Theme Colors
Chỉnh sửa gradient trong `src/App.jsx`:
```javascript
className="bg-gradient-to-br from-purple-400 via-pink-500 to-red-500"
```

### Thêm Animations
Tham khảo các custom animations trong `src/index.css`

## 🐛 Troubleshooting

### Lỗi API Key
- Đảm bảo API key hợp lệ
- Kiểm tra quota limit của API key
- Đảm bảo kết nối internet ổn định

### Lỗi Geolocation
- Cho phép truy cập location trong browser
- Sử dụng HTTPS cho production
- Fallback về tìm kiếm manual

### Performance Issues
- Kiểm tra Network tab trong DevTools
- Đảm bảo không gọi API quá nhiều lần
- Sử dụng caching nếu cần

## 🤝 Contributing

1. Fork repository
2. Tạo feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Mở Pull Request

## 📝 Roadmap

- [ ] Thêm dự báo 5 ngày
- [ ] Implement One Call API 3.0
- [ ] Thêm weather alerts
- [ ] Dark/Light mode toggle
- [ ] Offline support với PWA
- [ ] Multiple locations tracking
- [ ] Weather widgets
- [ ] Push notifications

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

## 👨‍💻 Author

**Your Name**
- GitHub: [@your-username](https://github.com/your-username)
- Email: your.email@example.com
- Portfolio: [your-portfolio.com](https://your-portfolio.com)

## 🙏 Acknowledgments

- [OpenWeatherMap](https://openweathermap.org/) - Weather data API
- [React](https://reactjs.org/) - Frontend framework
- [Vite](https://vitejs.dev/) - Build tool
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [Vercel](https://vercel.com/) - Deployment platform

---

⭐ **Nếu bạn thích project này, hãy star cho repository!** ⭐
