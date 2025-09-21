import { useState, useEffect } from "react";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [coordinates, setCoordinates] = useState(null);
  const [theme, setTheme] = useState('auto'); // auto, day, night
  const [unit, setUnit] = useState('metric'); // metric, imperial

  const API_KEY = "35fa9a4bdcf779dc7c5ea8a0786ba950";

  // Auto theme based on time or weather
  useEffect(() => {
    if (theme === 'auto' && weather) {
      const currentHour = new Date().getHours();
      const isNight = currentHour < 6 || currentHour > 20;
      document.documentElement.style.setProperty(
        '--bg-gradient', 
        isNight 
          ? 'linear-gradient(135deg, #1e3c72 0%, #2a5298 50%, #1e3c72 100%)'
          : 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #667eea 100%)'
      );
    }
  }, [weather, theme]);

  // Get coordinates from city name
  const getCoordinates = async (cityName) => {
    try {
      const res = await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${API_KEY}`
      );
      const data = await res.json();
      if (data && data.length > 0) {
        return { lat: data[0].lat, lon: data[0].lon };
      }
      throw new Error("Không tìm thấy thành phố");
    } catch (err) {
      throw new Error("Lỗi khi tìm kiếm thành phố");
    }
  };

  // Get current location
  const getCurrentLocation = () => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error("Trình duyệt không hỗ trợ geolocation"));
        return;
      }
      
      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            lat: position.coords.latitude,
            lon: position.coords.longitude
          });
        },
        (error) => {
          reject(new Error("Không thể lấy vị trí hiện tại"));
        }
      );
    });
  };

  // Fetch weather data
  const fetchWeatherData = async (lat, lon) => {
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${unit}&appid=${API_KEY}&lang=vi`
      );
      const data = await res.json();
      return data;
    } catch (err) {
      throw new Error("Lỗi khi lấy dữ liệu thời tiết");
    }
  };

  const fetchWeather = async () => {
    if (!city.trim()) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const coords = await getCoordinates(city);
      setCoordinates(coords);
      const weatherData = await fetchWeatherData(coords.lat, coords.lon);
      setWeather(weatherData);
    } catch (err) {
      setError(err.message);
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  const fetchCurrentLocationWeather = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const coords = await getCurrentLocation();
      setCoordinates(coords);
      const weatherData = await fetchWeatherData(coords.lat, coords.lon);
      setWeather(weatherData);
      setCity("");
    } catch (err) {
      setError(err.message);
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  const toggleUnit = () => {
    setUnit(unit === 'metric' ? 'imperial' : 'metric');
    if (coordinates) {
      fetchWeatherData(coordinates.lat, coordinates.lon).then(setWeather).catch(console.error);
    }
  };

  const getTemperatureUnit = () => unit === 'metric' ? '°C' : '°F';
  const getSpeedUnit = () => unit === 'metric' ? 'km/h' : 'mph';
  const convertSpeed = (speed) => unit === 'metric' ? Math.round(speed * 3.6) : Math.round(speed * 2.237);

  return (
    <div className="center min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-72 h-72 bg-white/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 right-10 w-96 h-96 bg-blue-300/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-10 left-1/3 w-80 h-80 bg-purple-300/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 p-4 sm:p-6 lg:p-8">
        <div className="max-w-6xl mx-auto">
          {/* Header with Controls */}
          <div className="text-center mb-8">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
              <div className="text-left">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-2 drop-shadow-lg">
                  🌤️ Weather App
                </h1>
                <p className="text-white/80 text-sm sm:text-base">
                  Thông tin thời tiết chi tiết và chính xác
                </p>
              </div>
              
              {/* Theme and Unit Controls */}
              <div className="flex gap-3">
                <button
                  onClick={toggleUnit}
                  className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-xl transition-all duration-200 backdrop-blur-md border border-white/30 text-sm font-medium"
                >
                  {unit === 'metric' ? '°C' : '°F'}
                </button>
                <select 
                  value={theme}
                  onChange={(e) => setTheme(e.target.value)}
                  className="bg-white/20 text-white px-4 py-2 rounded-xl transition-all duration-200 backdrop-blur-md border border-white/30 text-sm font-medium"
                >
                  <option value="auto">Auto</option>
                  <option value="day">Day</option>
                  <option value="night">Night</option>
                </select>
              </div>
            </div>
          </div>
          
          {/* Enhanced Search Section */}
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 sm:p-8 mb-6 shadow-2xl border border-white/20 hover:bg-white/15 transition-all duration-500 group">
            <div className="flex flex-col space-y-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-white/70 group-focus-within:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <input
                    className="w-full pl-12 pr-4 py-4 border-2 border-white/30 bg-white/10 backdrop-blur-sm text-white placeholder-white/70 rounded-2xl focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white/60 transition-all duration-300 text-base shadow-lg"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Nhập tên thành phố (VD: Hồ Chí Minh, Hà Nội...)"
                    onKeyPress={(e) => e.key === 'Enter' && fetchWeather()}
                  />
                </div>
                
                <div className="flex flex-col sm:flex-row gap-3">
                  <button 
                    onClick={fetchWeather} 
                    disabled={loading || !city.trim()}
                    className="bg-gradient-to-r from-blue-500/80 to-purple-600/80 hover:from-blue-600/90 hover:to-purple-700/90 disabled:from-gray-500/50 disabled:to-gray-600/50 text-white px-8 py-4 rounded-2xl transition-all duration-300 font-semibold shadow-xl hover:shadow-2xl transform hover:scale-105 disabled:transform-none disabled:cursor-not-allowed flex items-center justify-center gap-3 min-w-[140px]"
                  >
                    {loading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        <span>Tìm kiếm</span>
                      </>
                    ) : (
                      <>
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        <span>Tìm kiếm</span>
                      </>
                    )}
                  </button>
                  
                  <button 
                    onClick={fetchCurrentLocationWeather}
                    disabled={loading}
                    className="bg-gradient-to-r from-green-500/80 to-teal-600/80 hover:from-green-600/90 hover:to-teal-700/90 disabled:from-gray-500/50 disabled:to-gray-600/50 text-white px-8 py-4 rounded-2xl transition-all duration-300 font-semibold shadow-xl hover:shadow-2xl transform hover:scale-105 disabled:transform-none disabled:cursor-not-allowed flex items-center justify-center gap-3 min-w-[140px]"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span>Vị trí</span>
                  </button>
                </div>
              </div>
              
              {/* Enhanced Quick Search */}
              <div className="flex flex-wrap gap-3 justify-center">
                {['Hồ Chí Minh', 'Hà Nội', 'Đà Nẵng', 'Cần Thơ', 'Nha Trang', 'Đà Lạt'].map((cityName) => (
                  <button
                    key={cityName}
                    onClick={() => {
                      setCity(cityName);
                      setTimeout(() => fetchWeather(), 100);
                    }}
                    disabled={loading}
                    className="bg-white/10 hover:bg-white/25 text-white/90 hover:text-white px-5 py-2.5 rounded-full text-sm transition-all duration-300 border border-white/20 hover:border-white/40 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:transform-none backdrop-blur-md"
                  >
                    {cityName}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Enhanced Error Message */}
          {error && (
            <div className="bg-red-500/20 backdrop-blur-lg border-2 border-red-400/50 text-red-100 p-6 rounded-3xl mb-6 shadow-2xl animate-slideDown">
              <div className="flex items-center gap-4">
                <div className="flex-shrink-0">
                  <svg className="w-8 h-8 text-red-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-red-200 mb-1">Có lỗi xảy ra!</h3>
                  <p className="text-red-300">{error}</p>
                </div>
                <button 
                  onClick={() => setError(null)}
                  className="flex-shrink-0 text-red-200 hover:text-white transition-colors p-2"
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
          )}

          {/* Enhanced Loading State */}
          {loading && (
            <div className="text-center text-white mb-6">
              <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-12 shadow-2xl border border-white/20">
                <div className="flex flex-col items-center space-y-6">
                  <div className="relative">
                    <div className="animate-spin rounded-full h-20 w-20 border-4 border-white/20 border-t-white shadow-lg"></div>
                    <div className="absolute inset-0 rounded-full h-20 w-20 border-4 border-transparent border-r-white/50 animate-pulse"></div>
                  </div>
                  <div className="space-y-3">
                    <div className="text-2xl font-semibold">Đang tải dữ liệu thời tiết...</div>
                    <div className="text-white/70">Vui lòng chờ trong giây lát</div>
                    <div className="flex justify-center space-x-2">
                      <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce delay-75"></div>
                      <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce delay-150"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Enhanced Weather Display */}
          {weather && weather.main && (
            <div className="space-y-8 animate-fadeIn">
              {/* Main Weather Card */}
              <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/20 hover:bg-white/15 transition-all duration-500 transform hover:scale-[1.02]">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-white mb-4 flex items-center justify-center gap-3">
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    </svg>
                    {weather.name}
                    {weather.sys?.country && (
                      <span className="text-xl font-normal text-white/80">({weather.sys.country})</span>
                    )}
                  </h2>
                  
                  {weather.weather && weather.weather[0] && (
                    <div className="space-y-4">
                      <div className="text-8xl animate-bounce-gentle filter drop-shadow-lg">
                        {getWeatherIcon(weather.weather[0].icon)}
                      </div>
                      <div className="text-2xl text-white font-medium capitalize drop-shadow-md">
                        {weather.weather[0].description}
                      </div>
                    </div>
                  )}
                </div>

                {/* Temperature Display */}
                <div className="text-center mb-8">
                  <div className="text-7xl font-bold text-white mb-4 drop-shadow-lg">
                    {Math.round(weather.main.temp)}{getTemperatureUnit()}
                  </div>
                  <div className="text-white/80 text-xl">
                    Cảm giác như {Math.round(weather.main.feels_like)}{getTemperatureUnit()}
                  </div>
                  <div className="text-white/60 text-lg mt-2">
                    {Math.round(weather.main.temp_min)}{getTemperatureUnit()} / {Math.round(weather.main.temp_max)}{getTemperatureUnit()}
                  </div>
                </div>

                {/* Weather Stats Grid */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="bg-white/10 rounded-2xl p-6 text-center hover:bg-white/20 transition-all duration-300 transform hover:scale-105 shadow-lg">
                    <div className="text-4xl mb-4 filter drop-shadow-lg">💧</div>
                    <div className="text-white/80 text-sm mb-2 font-medium">Độ ẩm</div>
                    <div className="text-2xl font-bold text-white mb-3">{weather.main.humidity}%</div>
                    <div className="w-full bg-white/20 rounded-full h-3 overflow-hidden">
                      <div 
                        className="bg-gradient-to-r from-blue-400 to-blue-600 h-3 rounded-full transition-all duration-1000 ease-out shadow-inner"
                        style={{width: `${weather.main.humidity}%`}}
                      ></div>
                    </div>
                  </div>
                  
                  <div className="bg-white/10 rounded-2xl p-6 text-center hover:bg-white/20 transition-all duration-300 transform hover:scale-105 shadow-lg">
                    <div className="text-4xl mb-4 filter drop-shadow-lg">🌬️</div>
                    <div className="text-white/80 text-sm mb-2 font-medium">Gió</div>
                    <div className="text-xl font-bold text-white">{convertSpeed(weather.wind?.speed || 0)} {getSpeedUnit()}</div>
                    {weather.wind?.gust && (
                      <div className="text-white/60 text-sm mt-1">Giật: {convertSpeed(weather.wind.gust)} {getSpeedUnit()}</div>
                    )}
                  </div>
                  
                  <div className="bg-white/10 rounded-2xl p-6 text-center hover:bg-white/20 transition-all duration-300 transform hover:scale-105 shadow-lg">
                    <div className="text-4xl mb-4 filter drop-shadow-lg">👁️</div>
                    <div className="text-white/80 text-sm mb-2 font-medium">Tầm nhìn</div>
                    <div className="text-xl font-bold text-white">{weather.visibility ? (weather.visibility / 1000).toFixed(1) : 'N/A'} km</div>
                    <div className="text-white/60 text-sm mt-1">
                      {weather.visibility >= 10000 ? 'Rất tốt' : 
                       weather.visibility >= 5000 ? 'Tốt' : 
                       weather.visibility >= 1000 ? 'Khá' : 'Kém'}
                    </div>
                  </div>
                  
                  <div className="bg-white/10 rounded-2xl p-6 text-center hover:bg-white/20 transition-all duration-300 transform hover:scale-105 shadow-lg">
                    <div className="text-4xl mb-4 filter drop-shadow-lg">📊</div>
                    <div className="text-white/80 text-sm mb-2 font-medium">Áp suất</div>
                    <div className="text-xl font-bold text-white">{weather.main.pressure} hPa</div>
                    <div className="text-white/60 text-sm mt-1">
                      {weather.main.pressure > 1013 ? 'Cao' : 
                       weather.main.pressure > 1000 ? 'Bình thường' : 'Thấp'}
                    </div>
                  </div>
                </div>
              </div>

              {/* Additional Weather Details */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Sun Info */}
                {weather.sys && (
                  <div className="bg-gradient-to-br from-orange-400/20 to-yellow-500/20 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/20 hover:shadow-3xl transition-all duration-500">
                    <h3 className="text-2xl font-bold text-white mb-6 text-center flex items-center justify-center gap-3">
                      <span className="text-3xl">☀️</span>
                      Bình minh & Hoàng hôn
                    </h3>
                    <div className="grid grid-cols-2 gap-6">
                      <div className="text-center">
                        <div className="text-5xl mb-4 animate-bounce-gentle">🌅</div>
                        <div className="text-white/80 text-sm mb-2">Bình minh</div>
                        <div className="text-xl font-bold text-white">
                          {new Date(weather.sys.sunrise * 1000).toLocaleTimeString('vi-VN', {hour: '2-digit', minute: '2-digit'})}
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-5xl mb-4 animate-bounce-gentle delay-500">🌇</div>
                        <div className="text-white/80 text-sm mb-2">Hoàng hôn</div>
                        <div className="text-xl font-bold text-white">
                          {new Date(weather.sys.sunset * 1000).toLocaleTimeString('vi-VN', {hour: '2-digit', minute: '2-digit'})}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Cloud Cover */}
                {weather.clouds && (
                  <div className="bg-gradient-to-br from-gray-400/20 to-slate-500/20 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/20 hover:shadow-3xl transition-all duration-500">
                    <h3 className="text-2xl font-bold text-white mb-6 text-center flex items-center justify-center gap-3">
                      <span className="text-3xl">☁️</span>
                      Độ che phủ mây
                    </h3>
                    <div className="text-center">
                      <div className="text-6xl font-bold text-white mb-4 drop-shadow-lg">{weather.clouds.all}%</div>
                      <div className="w-full bg-white/20 rounded-full h-6 mb-4 overflow-hidden shadow-inner">
                        <div 
                          className="bg-gradient-to-r from-gray-300 to-gray-500 h-6 rounded-full transition-all duration-1000 ease-out"
                          style={{width: `${weather.clouds.all}%`}}
                        ></div>
                      </div>
                      <div className="text-white/80">
                        {weather.clouds.all > 80 ? 'Rất nhiều mây' :
                         weather.clouds.all > 60 ? 'Nhiều mây' :
                         weather.clouds.all > 40 ? 'Ít mây' :
                         weather.clouds.all > 10 ? 'Mây thưa' : 'Trời quang'}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Precipitation Info */}
              {(weather.rain || weather.snow) && (
                <div className="bg-gradient-to-br from-blue-500/20 to-indigo-600/20 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/20 hover:shadow-3xl transition-all duration-500">
                  <h3 className="text-2xl font-bold text-white mb-8 text-center flex items-center justify-center gap-3">
                    <span className="text-3xl">{weather.rain ? '🌧️' : '❄️'}</span>
                    {weather.rain ? 'Lượng mưa' : 'Lượng tuyết'}
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {weather.rain && (
                      <>
                        {weather.rain['1h'] && (
                          <div className="text-center bg-white/10 rounded-2xl p-6 hover:bg-white/20 transition-all duration-300 transform hover:scale-105 shadow-lg">
                            <div className="text-5xl mb-4 animate-pulse">💧</div>
                            <div className="text-white/80 text-sm mb-2">1 giờ qua</div>
                            <div className="text-3xl font-bold text-white mb-3">{weather.rain['1h']} mm</div>
                            <div className="w-full bg-white/20 rounded-full h-3 overflow-hidden shadow-inner">
                              <div 
                                className="bg-gradient-to-r from-blue-400 to-blue-600 h-3 rounded-full transition-all duration-1000"
                                style={{width: `${Math.min(weather.rain['1h'] * 10, 100)}%`}}
                              ></div>
                            </div>
                          </div>
                        )}
                        {weather.rain['3h'] && (
                          <div className="text-center bg-white/10 rounded-2xl p-6 hover:bg-white/20 transition-all duration-300 transform hover:scale-105 shadow-lg">
                            <div className="text-5xl mb-4 animate-pulse delay-300">💧</div>
                            <div className="text-white/80 text-sm mb-2">3 giờ qua</div>
                            <div className="text-3xl font-bold text-white mb-3">{weather.rain['3h']} mm</div>
                            <div className="w-full bg-white/20 rounded-full h-3 overflow-hidden shadow-inner">
                              <div 
                                className="bg-gradient-to-r from-blue-400 to-blue-600 h-3 rounded-full transition-all duration-1000"
                                style={{width: `${Math.min(weather.rain['3h'] * 5, 100)}%`}}
                              ></div>
                            </div>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </div>
              )}

              {/* Location and Update Info */}
              <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 shadow-2xl border border-white/20 text-center">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-white/80">
                  {weather.coord && (
                    <div>
                      <div className="text-2xl mb-2">🗺️</div>
                      <div className="text-sm font-medium mb-1">Tọa độ</div>
                      <div className="text-white font-bold">
                        {weather.coord.lat.toFixed(2)}, {weather.coord.lon.toFixed(2)}
                      </div>
                    </div>
                  )}
                  
                  {weather.dt && (
                    <div>
                      <div className="text-2xl mb-2">🕒</div>
                      <div className="text-sm font-medium mb-1">Cập nhật lúc</div>
                      <div className="text-white font-bold">
                        {new Date(weather.dt * 1000).toLocaleString('vi-VN', {
                          hour: '2-digit',
                          minute: '2-digit',
                          day: '2-digit',
                          month: '2-digit',
                          year: 'numeric'
                        })}
                      </div>
                    </div>
                  )}
                  
                  {weather.timezone && (
                    <div>
                      <div className="text-2xl mb-2">🌍</div>
                      <div className="text-sm font-medium mb-1">Múi giờ</div>
                      <div className="text-white font-bold">
                        UTC{weather.timezone >= 0 ? '+' : ''}{(weather.timezone / 3600).toFixed(0)}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Footer */}
      <footer className="relative z-10 text-center text-white/60 py-6 border-t border-white/10 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto px-4">
          <p className="text-sm">
            Dữ liệu thời tiết từ OpenWeatherMap • Cập nhật theo thời gian thực
          </p>
          <div className="flex justify-center items-center gap-4 mt-3">
            <span className="text-xs">Độ chính xác cao</span>
            <span className="w-1 h-1 bg-white/40 rounded-full"></span>
            <span className="text-xs">Giao diện thân thiện</span>
            <span className="w-1 h-1 bg-white/40 rounded-full"></span>
            <span className="text-xs">Hỗ trợ đa ngôn ngữ</span>
          </div>
        </div>
      </footer>
    </div>
  );

  // Helper function để lấy icon thời tiết
  function getWeatherIcon(iconCode) {
    const iconMap = {
      '01d': '☀️', '01n': '🌙',
      '02d': '⛅', '02n': '☁️',
      '03d': '☁️', '03n': '☁️',
      '04d': '☁️', '04n': '☁️',
      '09d': '🌧️', '09n': '🌧️',
      '10d': '🌦️', '10n': '🌧️',
      '11d': '⛈️', '11n': '⛈️',
      '13d': '❄️', '13n': '❄️',
      '50d': '🌫️', '50n': '🌫️',
    };
    return iconMap[iconCode] || '🌤️';
  }

  // Helper function để chuyển đổi độ gió thành hướng
  function getWindDirection(degrees) {
    const directions = [
      'Bắc', 'Đông Bắc', 'Đông', 'Đông Nam',
      'Nam', 'Tây Nam', 'Tây', 'Tây Bắc'
    ];
    const index = Math.round(degrees / 45) % 8;
    return directions[index];
  }
}

export default App;