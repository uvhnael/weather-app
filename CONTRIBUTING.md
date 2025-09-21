# Contributing to Weather App

Cảm ơn bạn đã quan tâm đến việc đóng góp cho Weather App! 🎉

## 🤝 Cách Đóng Góp

### Báo Cáo Bug

Nếu bạn phát hiện bug, vui lòng tạo issue với các thông tin sau:

1. **Mô tả bug** - Mô tả chi tiết về vấn đề
2. **Các bước tái tạo** - Liệt kê các bước để tái tạo bug
3. **Kết quả mong đợi** - Mô tả kết quả bạn mong đợi
4. **Kết quả thực tế** - Mô tả những gì thực sự xảy ra
5. **Screenshots** - Nếu có thể, hãy đính kèm ảnh chụp màn hình
6. **Môi trường** - Browser, OS, screen size, etc.

### Đề Xuất Tính Năng

Chúng tôi hoan nghênh các ý tưởng mới! Khi đề xuất tính năng:

1. **Mô tả tính năng** - Giải thích rõ ràng tính năng bạn muốn
2. **Lý do** - Tại sao tính năng này hữu ích?
3. **Mockup/Wireframe** - Nếu có thể, hãy cung cấp thiết kế visual
4. **Độ ưu tiên** - Low/Medium/High

### Pull Request Process

1. **Fork** repository
2. **Clone** fork của bạn về máy local
3. **Tạo branch** cho feature/bugfix:

   ```bash
   git checkout -b feature/amazing-feature
   # hoặc
   git checkout -b bugfix/fix-something
   ```

4. **Commit** changes với message rõ ràng:

   ```bash
   git commit -m "feat: add weather alerts functionality"
   # hoặc
   git commit -m "fix: resolve API timeout issues"
   ```

5. **Push** lên fork của bạn:

   ```bash
   git push origin feature/amazing-feature
   ```

6. **Tạo Pull Request** với mô tả chi tiết

## 📝 Commit Message Guidelines

Chúng tôi sử dụng [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` - Tính năng mới
- `fix:` - Sửa bug
- `docs:` - Cập nhật documentation
- `style:` - Code formatting, missing semicolons, etc.
- `refactor:` - Code refactoring
- `test:` - Thêm hoặc sửa tests
- `chore:` - Cập nhật build tasks, package manager configs, etc.

### Ví dụ:

```
feat: add weather forecast for 7 days
fix: resolve geolocation permission issue
docs: update installation instructions
style: format code with prettier
refactor: optimize weather data fetching
test: add unit tests for weather service
chore: update dependencies
```

## 🧪 Testing

Trước khi submit PR, hãy đảm bảo:

1. **Code chạy được** - Test locally
2. **Không có lỗi console** - Check browser DevTools
3. **Responsive** - Test trên mobile/tablet/desktop
4. **Performance** - Kiểm tra loading times
5. **Accessibility** - Test keyboard navigation

### Chạy Tests

```bash
npm run test        # Run unit tests
npm run test:e2e    # Run end-to-end tests
npm run lint        # Check code style
npm run build       # Test production build
```

## 🎨 Code Style

### JavaScript/React

- Sử dụng **ES6+ syntax**
- **Functional components** với hooks
- **Destructuring** khi có thể
- **Meaningful variable names**
- **Comments** cho logic phức tạp

### CSS/Styling

- Sử dụng **Tailwind CSS classes**
- **Mobile-first** approach
- **Consistent naming** cho custom classes
- **Responsive design** principles

### File Organization

```
src/
├── components/     # Reusable components
├── hooks/         # Custom hooks
├── utils/         # Utility functions
├── services/      # API services
└── assets/        # Images, icons, etc.
```

## 🚀 Development Setup

1. **Clone repository:**

   ```bash
   git clone https://github.com/uvhnael/weather-app.git
   cd weather-app
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set up API key:**

   - Đăng ký tại [OpenWeatherMap](https://openweathermap.org/api)
   - Tạo file `.env.local`:
     ```
     VITE_WEATHER_API_KEY=your-api-key-here
     ```

4. **Start development server:**
   ```bash
   npm run dev
   ```

## 📋 Code Review Checklist

Khi review PR, chúng tôi sẽ kiểm tra:

- [ ] Code follows style guidelines
- [ ] Changes are well-documented
- [ ] No console errors or warnings
- [ ] Responsive design works correctly
- [ ] Performance impact is minimal
- [ ] Accessibility standards are met
- [ ] Tests pass (if applicable)
- [ ] No breaking changes

## 🏷️ Issue Labels

- `bug` - Something isn't working
- `enhancement` - New feature or request
- `documentation` - Documentation needs update
- `good first issue` - Good for newcomers
- `help wanted` - Extra attention is needed
- `priority: high` - High priority issue
- `priority: low` - Low priority issue

## 💬 Hỗ Trợ

Nếu bạn cần hỗ trợ:

1. Kiểm tra [Issues](https://github.com/uvhnael/weather-app/issues) existing
2. Đọc [README.md](./README.md)
3. Tạo issue mới với label `question`

## 🙏 Cảm Ơn

Cảm ơn tất cả những người đóng góp cho dự án này! ❤️

Mọi đóng góp, dù lớn hay nhỏ, đều được đánh giá cao và sẽ được ghi nhận trong danh sách contributors.

---

**Happy coding!** 🚀
