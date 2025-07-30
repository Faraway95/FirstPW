// 首页 JavaScript - 交互功能和动画

document.addEventListener('DOMContentLoaded', function() {
    // 初始化AOS动画库
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-out-cubic',
            once: true,
            offset: 50
        });
    }

    // 导航栏滚动效果
    initScrollNavbar();
    
    // 平滑滚动
    initSmoothScroll();
    
    // 代码打字机效果
    initCodeAnimation();
    
    // 进度条动画
    initProgressAnimation();
    
    // 浮动元素动画
    initFloatingElements();
    
    // 视差滚动效果
    initParallaxEffect();
    
    // 技能卡片hover效果
    initSkillCardEffects();
    
    // 滚动监听统计动画
    window.addEventListener('scroll', handleStatsAnimation);
    
    // 初始检查
    handleStatsAnimation();
    
    // 图片加载失败处理
    initImageFallback();
    
    // 初始化太阳系行星悬停效果
    initPlanetTooltips();
});

// 导航栏滚动效果
function initScrollNavbar() {
    const header = document.querySelector('.header-transparent');
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = 'none';
        }
        
        // 滚动隐藏/显示导航栏
        if (currentScrollY > lastScrollY && currentScrollY > 200) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollY = currentScrollY;
    });
}

// 平滑滚动
function initSmoothScroll() {
    const scrollLinks = document.querySelectorAll('a[href^="#"]');
    
    scrollLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('.header-transparent').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// 代码打字机效果
function initCodeAnimation() {
    const codeLines = document.querySelectorAll('.code-line');
    
    // 重置所有代码行的可见性
    codeLines.forEach(line => {
        line.style.opacity = '0';
        line.style.transform = 'translateX(-10px)';
    });
    
    // 创建Intersection Observer来触发动画
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const codeContainer = entry.target;
                animateCodeLines(codeContainer);
                observer.unobserve(codeContainer);
            }
        });
    }, { threshold: 0.5 });
    
    const codeContainer = document.querySelector('.code-animation');
    if (codeContainer) {
        observer.observe(codeContainer);
    }
}

function animateCodeLines(container) {
    const lines = container.querySelectorAll('.code-line');
    
    lines.forEach((line, index) => {
        setTimeout(() => {
            line.style.opacity = '1';
            line.style.transform = 'translateX(0)';
            line.style.transition = 'all 0.5s ease-out';
            
            // 添加打字机光标效果
            const cursor = document.createElement('span');
            cursor.textContent = '|';
            cursor.style.opacity = '1';
            cursor.style.animation = 'blink 1s infinite';
            cursor.style.color = '#f8f8f2';
            line.appendChild(cursor);
            
            // 1秒后移除光标
            setTimeout(() => {
                if (cursor.parentNode) {
                    cursor.remove();
                }
            }, 1000);
            
        }, index * 500);
    });
}

// 进度条动画
function initProgressAnimation() {
    const progressBars = document.querySelectorAll('.progress-fill');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target;
                const progress = progressBar.style.getPropertyValue('--progress');
                
                progressBar.style.width = '0%';
                setTimeout(() => {
                    progressBar.style.width = progress;
                }, 100);
                
                observer.unobserve(progressBar);
            }
        });
    }, { threshold: 0.5 });
    
    progressBars.forEach(bar => observer.observe(bar));
}

// 浮动元素动画增强
function initFloatingElements() {
    const floatingDots = document.querySelectorAll('.floating-dot');
    
    floatingDots.forEach((dot, index) => {
        // 随机化动画参数
        const randomDuration = 8 + Math.random() * 6; // 8-14秒
        const randomDelay = Math.random() * 2; // 0-2秒
        
        dot.style.setProperty('--duration', `${randomDuration}s`);
        dot.style.setProperty('--delay', `${randomDelay}s`);
        
        // 添加鼠标互动效果
        dot.addEventListener('mouseenter', () => {
            dot.style.transform = 'scale(1.5)';
            dot.style.opacity = '0.3';
        });
        
        dot.addEventListener('mouseleave', () => {
            dot.style.transform = 'scale(1)';
            dot.style.opacity = '0.1';
        });
    });
}

// 视差滚动效果
function initParallaxEffect() {
    const parallaxElements = document.querySelectorAll('.floating-elements, .hero-visual');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        parallaxElements.forEach(element => {
            element.style.transform = `translateY(${rate}px)`;
        });
    });
}

// 技能卡片hover效果
function initSkillCardEffects() {
    const skillItems = document.querySelectorAll('.skill-item');
    
    skillItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            const icon = item.querySelector('.skill-icon');
            icon.style.transform = 'rotate(10deg) scale(1.1)';
        });
        
        item.addEventListener('mouseleave', () => {
            const icon = item.querySelector('.skill-icon');
            icon.style.transform = 'rotate(0deg) scale(1)';
        });
    });
}

// 添加打字机光标闪烁动画
const style = document.createElement('style');
style.textContent = `
    @keyframes blink {
        0%, 50% { opacity: 1; }
        51%, 100% { opacity: 0; }
    }
`;
document.head.appendChild(style);

// 页面加载完成后的额外初始化
window.addEventListener('load', () => {
    // 确保所有图片加载完成后重新计算AOS
    if (typeof AOS !== 'undefined') {
        AOS.refresh();
    }
    
    // 添加页面加载完成的淡入效果
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease-in-out';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// 窗口大小变化时重新计算
window.addEventListener('resize', () => {
    if (typeof AOS !== 'undefined') {
        AOS.refresh();
    }
});

// 鼠标跟随效果（可选）
function initMouseFollowEffect() {
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    cursor.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        background: linear-gradient(135deg, #667eea, #764ba2);
        border-radius: 50%;
        pointer-events: none;
        z-index: 10000;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;
    document.body.appendChild(cursor);
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX - 10 + 'px';
        cursor.style.top = e.clientY - 10 + 'px';
        cursor.style.opacity = '0.6';
    });
    
    document.addEventListener('mouseenter', () => {
        cursor.style.opacity = '0.6';
    });
    
    document.addEventListener('mouseleave', () => {
        cursor.style.opacity = '0';
    });
}

// 在移动端隐藏鼠标跟随效果
if (window.innerWidth > 768) {
    initMouseFollowEffect();
}

// 滚动进度指示器
function initScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(135deg, #667eea, #764ba2);
        z-index: 10001;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = (window.scrollY / windowHeight) * 100;
        progressBar.style.width = Math.min(progress, 100) + '%';
    });
}

initScrollProgress();

// 数字动画计数功能
function animateNumbers() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    statNumbers.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-target'));
        const increment = target / 50; // 50帧动画
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            stat.textContent = Math.floor(current);
        }, 50);
    });
}

// 检查元素是否在视口中
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// 滚动时检查统计区域是否可见
let statsAnimated = false;
function handleStatsAnimation() {
    const achievementsSection = document.querySelector('.achievements-section');
    if (achievementsSection && isInViewport(achievementsSection) && !statsAnimated) {
        animateNumbers();
        statsAnimated = true;
    }
}

// 图片加载失败处理
function initImageFallback() {
    const images = document.querySelectorAll('.project-image-fallback');
    
    images.forEach(img => {
        img.addEventListener('error', function() {
            this.style.background = 'var(--gradient-primary)';
            this.style.display = 'flex';
            this.style.alignItems = 'center';
            this.style.justifyContent = 'center';
            this.style.fontSize = '3rem';
            this.style.color = 'white';
            this.innerHTML = '🎮';
            this.removeAttribute('src');
        });
        
        // 检查图片是否已经加载失败
        if (img.complete && img.naturalWidth === 0) {
            img.dispatchEvent(new Event('error'));
        }
    });
}

// 太阳系行星悬停信息
function initPlanetTooltips() {
    const planetInfo = {
        sun: {
            zh: {
                name: '太阳 ☀️',
                description: '太阳系的中心恒星，为地球提供光和热。它是一颗黄矮星，已经燃烧了约46亿年。',
                distance: '距离地球: 1.496亿公里',
                diameter: '直径: 139.2万公里'
            },
            en: {
                name: 'Sun ☀️',
                description: 'The central star of our solar system, providing light and heat to Earth. It\'s a yellow dwarf star that has been burning for about 4.6 billion years.',
                distance: 'Distance from Earth: 149.6 million km',
                diameter: 'Diameter: 1.392 million km'
            }
        },
        mercury: {
            zh: {
                name: '水星 ☿️',
                description: '离太阳最近的行星，白天极热，夜晚极冷。它是太阳系中最小的行星。',
                distance: '距离太阳: 5790万公里',
                diameter: '直径: 4879公里'
            },
            en: {
                name: 'Mercury ☿️',
                description: 'The closest planet to the Sun, extremely hot during the day and extremely cold at night. It\'s the smallest planet in our solar system.',
                distance: 'Distance from Sun: 57.9 million km',
                diameter: 'Diameter: 4,879 km'
            }
        },
        venus: {
            zh: {
                name: '金星 ♀️',
                description: '太阳系中最热的行星，被厚厚的大气层包围。又被称为"启明星"或"长庚星"。',
                distance: '距离太阳: 1.082亿公里',
                diameter: '直径: 12104公里'
            },
            en: {
                name: 'Venus ♀️',
                description: 'The hottest planet in our solar system, wrapped in a thick atmosphere. Also known as the "Morning Star" or "Evening Star".',
                distance: 'Distance from Sun: 108.2 million km',
                diameter: 'Diameter: 12,104 km'
            }
        },
        earth: {
            zh: {
                name: '地球 🌍',
                description: '我们的家园，太阳系中唯一已知有生命的行星。拥有液态水和适宜的大气层。',
                distance: '距离太阳: 1.496亿公里',
                diameter: '直径: 12742公里'
            },
            en: {
                name: 'Earth 🌍',
                description: 'Our home, the only known planet with life in our solar system. It has liquid water and a suitable atmosphere.',
                distance: 'Distance from Sun: 149.6 million km',
                diameter: 'Diameter: 12,742 km'
            }
        },
        mars: {
            zh: {
                name: '火星 ♂️',
                description: '红色星球，因其表面的氧化铁而呈现红色。是人类探索太空的重要目标。',
                distance: '距离太阳: 2.279亿公里',
                diameter: '直径: 6779公里'
            },
            en: {
                name: 'Mars ♂️',
                description: 'The Red Planet, appearing red due to iron oxide on its surface. It\'s an important target for human space exploration.',
                distance: 'Distance from Sun: 227.9 million km',
                diameter: 'Diameter: 6,779 km'
            }
        },
        jupiter: {
            zh: {
                name: '木星 ♃',
                description: '太阳系最大的行星，是一颗气态巨行星。拥有至少79颗卫星，包括著名的木卫四个。',
                distance: '距离太阳: 7.786亿公里',
                diameter: '直径: 139820公里'
            },
            en: {
                name: 'Jupiter ♃',
                description: 'The largest planet in our solar system, a gas giant. It has at least 79 moons, including the famous Galilean moons.',
                distance: 'Distance from Sun: 778.6 million km',
                diameter: 'Diameter: 139,820 km'
            }
        },
        saturn: {
            zh: {
                name: '土星 ♄',
                description: '以其美丽的环系统而闻名的气态巨行星。环主要由冰和岩石颗粒组成。',
                distance: '距离太阳: 14.337亿公里',
                diameter: '直径: 116460公里'
            },
            en: {
                name: 'Saturn ♄',
                description: 'Famous for its beautiful ring system, this gas giant\'s rings are mainly composed of ice and rock particles.',
                distance: 'Distance from Sun: 1.4337 billion km',
                diameter: 'Diameter: 116,460 km'
            }
        }
    };

    const tooltip = document.getElementById('planet-tooltip');
    const planets = document.querySelectorAll('[data-planet]');
    let currentLanguage = 'zh'; // 默认中文

    planets.forEach(planet => {
        planet.addEventListener('mouseenter', (e) => {
            const planetName = e.target.getAttribute('data-planet');
            const info = planetInfo[planetName];
            
            if (info) {
                showTooltip(e, info[currentLanguage]);
            }
        });

        planet.addEventListener('mouseleave', () => {
            hideTooltip();
        });

        planet.addEventListener('click', () => {
            // 点击切换语言
            currentLanguage = currentLanguage === 'zh' ? 'en' : 'zh';
            const planetName = planet.getAttribute('data-planet');
            const info = planetInfo[planetName];
            
            if (info) {
                updateTooltipContent(info[currentLanguage]);
            }
        });
    });

    function showTooltip(event, info) {
        const nameEl = tooltip.querySelector('.planet-name');
        const descEl = tooltip.querySelector('.planet-description');
        const distanceEl = tooltip.querySelector('.planet-distance');
        const diameterEl = tooltip.querySelector('.planet-diameter');

        nameEl.textContent = info.name;
        descEl.textContent = info.description;
        distanceEl.textContent = info.distance;
        diameterEl.textContent = info.diameter;

        // 定位tooltip
        const rect = event.target.getBoundingClientRect();
        tooltip.style.left = (rect.left + rect.width / 2 - 150) + 'px';
        tooltip.style.top = (rect.top - 10) + 'px';

        tooltip.classList.add('show');
    }

    function hideTooltip() {
        tooltip.classList.remove('show');
    }

    function updateTooltipContent(info) {
        const nameEl = tooltip.querySelector('.planet-name');
        const descEl = tooltip.querySelector('.planet-description');
        const distanceEl = tooltip.querySelector('.planet-distance');
        const diameterEl = tooltip.querySelector('.planet-diameter');

        nameEl.textContent = info.name;
        descEl.textContent = info.description;
        distanceEl.textContent = info.distance;
        diameterEl.textContent = info.diameter;
    }
}

// 太阳系滚动旋转效果
function initSolarSystemScrollRotation() {
    const solarSystem = document.querySelector('.solar-system');
    if (!solarSystem) return;

    let lastScrollY = 0;
    let rotationX = 0;
    let rotationY = 0;
    let rotationZ = 0;

    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        const scrollDelta = scrollY - lastScrollY;
        
        // 根据滚动方向和速度调整旋转
        rotationX += scrollDelta * 0.1;
        rotationY += scrollDelta * 0.05;
        rotationZ += scrollDelta * 0.03;
        
        // 限制旋转角度避免过度旋转
        rotationX = rotationX % 360;
        rotationY = rotationY % 360;
        rotationZ = rotationZ % 360;
        
        // 应用3D变换
        solarSystem.style.transform = `
            translate(-50%, -50%) 
            rotateX(${rotationX}deg) 
            rotateY(${rotationY}deg) 
            rotateZ(${rotationZ}deg)
        `;
        
        lastScrollY = scrollY;
    });

    // 鼠标滚轮事件增强旋转效果
    window.addEventListener('wheel', (e) => {
        const delta = e.deltaY;
        
        rotationX += delta * 0.02;
        rotationY += delta * 0.01;
        rotationZ += delta * 0.005;
        
        rotationX = rotationX % 360;
        rotationY = rotationY % 360;
        rotationZ = rotationZ % 360;
        
        solarSystem.style.transform = `
            translate(-50%, -50%) 
            rotateX(${rotationX}deg) 
            rotateY(${rotationY}deg) 
            rotateZ(${rotationZ}deg)
        `;
    }, { passive: true });
}

// 在页面加载完成后初始化滚动旋转
document.addEventListener('DOMContentLoaded', function() {
    // 其他初始化代码已经在上面...
    
    // 添加太阳系滚动旋转效果
    setTimeout(() => {
        initSolarSystemScrollRotation();
    }, 1000); // 延迟1秒确保元素加载完成
}); 