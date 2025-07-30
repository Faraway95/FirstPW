// 天气背景和动效控制
class WeatherBackground {
    constructor() {
        this.weatherContainer = null;
        this.weatherDisplay = null;
        this.weatherInfo = null;
        this.particlesContainer = null;
        this.apiKey = ''; // 可以设置为空，使用模拟数据
        this.init();
    }

    init() {
        this.createWeatherContainer();
        this.getWeatherData();
        this.createParticleEffects();
    }

    createWeatherContainer() {
        // 创建天气背景容器
        this.weatherContainer = document.createElement('div');
        this.weatherContainer.className = 'weather-background';
        
        // 创建天气显示层
        this.weatherDisplay = document.createElement('div');
        this.weatherDisplay.className = 'weather-display';
        
        // 创建液态玻璃层
        const glassLayer = document.createElement('div');
        glassLayer.className = 'glass-layer';
        
        // 创建光效层
        const glassReflection = document.createElement('div');
        glassReflection.className = 'glass-reflection';
        
        // 创建天气信息显示
        this.weatherInfo = document.createElement('div');
        this.weatherInfo.className = 'weather-info';
        this.weatherInfo.innerHTML = `
            <div class="weather-loading">
                <i class="fas fa-spinner fa-spin"></i>
                <div>获取天气信息中...</div>
            </div>
        `;
        
        // 创建粒子容器
        this.particlesContainer = document.createElement('div');
        this.particlesContainer.className = 'weather-particles';
        
        // 组装结构
        glassLayer.appendChild(glassReflection);
        this.weatherDisplay.appendChild(glassLayer);
        this.weatherContainer.appendChild(this.weatherDisplay);
        this.weatherContainer.appendChild(this.particlesContainer);
        this.weatherContainer.appendChild(this.weatherInfo);
        
        // 插入到页面
        document.body.insertBefore(this.weatherContainer, document.body.firstChild);
    }

    async getWeatherData() {
        try {
            // 优先使用真实天气API
            if (this.apiKey) {
                const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=Shanghai&appid=${this.apiKey}&units=metric&lang=zh_cn`);
                const data = await response.json();
                this.updateWeatherDisplay(data);
            } else {
                // 使用模拟数据
                this.simulateWeatherData();
            }
        } catch (error) {
            console.log('天气API请求失败，使用模拟数据');
            this.simulateWeatherData();
        }
    }

    simulateWeatherData() {
        // 模拟上海天气数据
        const weatherConditions = [
            {
                condition: 'sunny',
                temp: 22,
                description: '晴朗',
                humidity: 60,
                windSpeed: 5,
                icon: '☀️'
            },
            {
                condition: 'cloudy',
                temp: 18,
                description: '多云',
                humidity: 75,
                windSpeed: 8,
                icon: '☁️'
            },
            {
                condition: 'rainy',
                temp: 15,
                description: '小雨',
                humidity: 90,
                windSpeed: 12,
                icon: '🌧️'
            },
            {
                condition: 'clear',
                temp: 25,
                description: '晴天',
                humidity: 55,
                windSpeed: 3,
                icon: '🌤️'
            }
        ];

        // 根据当前时间选择天气
        const hour = new Date().getHours();
        let weatherIndex;
        if (hour >= 6 && hour < 12) {
            weatherIndex = 0; // 早上晴朗
        } else if (hour >= 12 && hour < 18) {
            weatherIndex = Math.random() > 0.5 ? 1 : 3; // 下午多云或晴天
        } else {
            weatherIndex = Math.random() > 0.7 ? 2 : 1; // 晚上可能下雨或多云
        }

        const weather = weatherConditions[weatherIndex];
        this.updateWeatherDisplay({
            main: {
                temp: weather.temp,
                humidity: weather.humidity
            },
            weather: [{
                main: weather.condition,
                description: weather.description,
                icon: weather.icon
            }],
            wind: {
                speed: weather.windSpeed
            },
            name: '上海'
        });
    }

    updateWeatherDisplay(data) {
        // 更新背景样式
        const condition = data.weather[0].main.toLowerCase();
        this.weatherDisplay.className = `weather-display ${condition}`;
        
        // 更新天气信息显示
        this.weatherInfo.innerHTML = `
            <div class="weather-location">
                <i class="fas fa-map-marker-alt"></i> ${data.name}
            </div>
            <div class="weather-temp">${Math.round(data.main.temp)}°</div>
            <div class="weather-condition">
                <span>${data.weather[0].icon || '🌤️'}</span> ${data.weather[0].description}
            </div>
            <div class="weather-details">
                <span><i class="fas fa-eye"></i> ${data.main.humidity}%</span>
                <span><i class="fas fa-wind"></i> ${Math.round(data.wind.speed)} m/s</span>
            </div>
        `;

        // 创建对应的粒子效果
        this.createParticleEffects(condition);
    }

    createParticleEffects(condition = 'clear') {
        // 清除现有粒子
        this.particlesContainer.innerHTML = '';

        switch (condition) {
            case 'rain':
            case 'rainy':
                this.createRainEffect();
                break;
            case 'snow':
            case 'snowy':
                this.createSnowEffect();
                break;
            case 'clouds':
            case 'cloudy':
                this.createCloudEffect();
                break;
            default:
                // 晴天或其他天气的微妙粒子效果
                this.createLightParticles();
                break;
        }
    }

    createRainEffect() {
        const rainCount = 100;
        for (let i = 0; i < rainCount; i++) {
            const rainDrop = document.createElement('div');
            rainDrop.className = 'rain-drop';
            rainDrop.style.left = Math.random() * 100 + '%';
            rainDrop.style.animationDuration = (Math.random() * 1 + 0.5) + 's';
            rainDrop.style.animationDelay = Math.random() * 2 + 's';
            this.particlesContainer.appendChild(rainDrop);
        }
    }

    createSnowEffect() {
        const snowCount = 50;
        for (let i = 0; i < snowCount; i++) {
            const snowFlake = document.createElement('div');
            snowFlake.className = 'snow-flake';
            snowFlake.innerHTML = '❄';
            snowFlake.style.left = Math.random() * 100 + '%';
            snowFlake.style.fontSize = (Math.random() * 20 + 10) + 'px';
            snowFlake.style.animationDuration = (Math.random() * 3 + 5) + 's';
            snowFlake.style.animationDelay = Math.random() * 5 + 's';
            this.particlesContainer.appendChild(snowFlake);
        }
    }

    createCloudEffect() {
        const cloudCount = 3;
        for (let i = 0; i < cloudCount; i++) {
            const cloud = document.createElement('div');
            cloud.className = 'cloud';
            cloud.style.width = (Math.random() * 100 + 80) + 'px';
            cloud.style.height = (Math.random() * 40 + 30) + 'px';
            cloud.style.top = (Math.random() * 30 + 10) + '%';
            cloud.style.animationDuration = (Math.random() * 20 + 30) + 's';
            cloud.style.animationDelay = Math.random() * 10 + 's';
            this.particlesContainer.appendChild(cloud);
        }
    }

    createLightParticles() {
        // 创建轻微的光点效果
        const particleCount = 20;
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.style.position = 'absolute';
            particle.style.width = '2px';
            particle.style.height = '2px';
            particle.style.background = 'rgba(255, 255, 255, 0.6)';
            particle.style.borderRadius = '50%';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            particle.style.animation = `float ${Math.random() * 10 + 10}s infinite ease-in-out`;
            particle.style.animationDelay = Math.random() * 5 + 's';
            this.particlesContainer.appendChild(particle);
        }
    }

    // 定期更新天气（每30分钟）
    startPeriodicUpdate() {
        setInterval(() => {
            this.getWeatherData();
        }, 30 * 60 * 1000);
    }
}

// 页面加载完成后初始化天气背景
document.addEventListener('DOMContentLoaded', function() {
    const weatherBg = new WeatherBackground();
    weatherBg.startPeriodicUpdate();
});

// 添加浮动动画关键帧
const style = document.createElement('style');
style.textContent = `
    @keyframes float {
        0%, 100% {
            transform: translateY(0px) translateX(0px);
            opacity: 0.6;
        }
        50% {
            transform: translateY(-20px) translateX(10px);
            opacity: 1;
        }
    }
`;
document.head.appendChild(style); 