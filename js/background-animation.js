/* 首页背景动画增强 */

document.addEventListener('DOMContentLoaded', function() {
    // 创建并初始化动态背景
    createDynamicBackground();
    
    // 为首页卡片添加悬停效果
    enhanceCardHoverEffects();
    
    // 处理首页和其他页面的显示逻辑
    handlePageDisplayLogic();
});

/**
 * 创建动态背景效果
 * 添加缓慢移动的彩色形状作为背景元素
 */
function createDynamicBackground() {
    const hero = document.getElementById('hero');
    const particles = document.querySelector('.particles');
    
    if (!hero || !particles) return;
    
    // 清空现有内容
    particles.innerHTML = '';
    
    // 创建不同形状的背景元素
    const shapes = ['circle', 'square', 'triangle', 'rectangle', 'hexagon'];
    const colors = ['#1e3a8a', '#3b82f6', '#60a5fa', '#93c5fd', '#1e40af'];
    
    // 创建多个形状
    for (let i = 0; i < 15; i++) {
        const shape = document.createElement('div');
        const shapeType = shapes[Math.floor(Math.random() * shapes.length)];
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        // 设置基本样式
        shape.className = `particle particle-${shapeType}`;
        shape.style.backgroundColor = color;
        shape.style.opacity = (Math.random() * 0.5 + 0.1).toFixed(2); // 0.1-0.6的透明度
        
        // 随机大小
        const size = Math.floor(Math.random() * 80) + 40; // 40-120px
        shape.style.width = `${size}px`;
        shape.style.height = `${size}px`;
        
        // 随机位置
        const posX = Math.floor(Math.random() * 100);
        const posY = Math.floor(Math.random() * 100);
        shape.style.left = `${posX}%`;
        shape.style.top = `${posY}%`;
        
        // 随机旋转
        const rotation = Math.floor(Math.random() * 360);
        shape.style.transform = `rotate(${rotation}deg)`;
        
        // 随机动画延迟和持续时间
        const delay = Math.random() * 5;
        const duration = Math.random() * 15 + 15; // 15-30秒
        shape.style.animationDelay = `${delay}s`;
        shape.style.animationDuration = `${duration}s`;
        
        // 添加到容器
        particles.appendChild(shape);
    }
    
    // 添加动画效果
    addAnimationStyles();
}

/**
 * 添加动画样式到页面
 */
function addAnimationStyles() {
    // 检查是否已存在动画样式
    if (document.getElementById('dynamic-animation-styles')) return;
    
    // 创建样式元素
    const styleElement = document.createElement('style');
    styleElement.id = 'dynamic-animation-styles';
    
    // 定义动画
    const animationCSS = `
        @keyframes float {
            0% {
                transform: translate(0, 0) rotate(0deg);
            }
            25% {
                transform: translate(5%, 10%) rotate(5deg);
            }
            50% {
                transform: translate(-5%, 15%) rotate(-5deg);
            }
            75% {
                transform: translate(-10%, 5%) rotate(-10deg);
            }
            100% {
                transform: translate(0, 0) rotate(0deg);
            }
        }
        
        @keyframes pulse {
            0% {
                transform: scale(1);
                opacity: 0.3;
            }
            50% {
                transform: scale(1.05);
                opacity: 0.5;
            }
            100% {
                transform: scale(1);
                opacity: 0.3;
            }
        }
        
        .particle {
            position: absolute;
            z-index: 1;
            animation: float linear infinite;
            filter: blur(3px);
        }
        
        .particle-circle {
            border-radius: 50%;
        }
        
        .particle-square {
            border-radius: 5px;
        }
        
        .particle-triangle {
            clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
        }
        
        .particle-rectangle {
            border-radius: 5px;
            height: 50% !important;
        }
        
        .particle-hexagon {
            clip-path: polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%);
        }
        
        /* 卡片悬停动画 */
        .card {
            transition: transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275),
                        box-shadow 0.5s ease;
        }
        
        .card:hover {
            transform: translateY(-10px) scale(1.03);
            box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
            z-index: 10;
        }
        
        .card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: radial-gradient(circle at center, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 70%);
            opacity: 0;
            transition: opacity 0.5s ease;
            z-index: 2;
            pointer-events: none;
        }
        
        .card:hover::before {
            opacity: 1;
        }
    `;
    
    // 添加样式到页面
    styleElement.textContent = animationCSS;
    document.head.appendChild(styleElement);
}

/**
 * 增强卡片悬停效果
 */
function enhanceCardHoverEffects() {
    const cards = document.querySelectorAll('.card');
    
    cards.forEach(card => {
        // 添加3D倾斜效果
        card.addEventListener('mousemove', function(e) {
            const cardRect = this.getBoundingClientRect();
            const cardCenterX = cardRect.left + cardRect.width / 2;
            const cardCenterY = cardRect.top + cardRect.height / 2;
            
            // 计算鼠标位置相对于卡片中心的偏移
            const offsetX = (e.clientX - cardCenterX) / (cardRect.width / 2);
            const offsetY = (e.clientY - cardCenterY) / (cardRect.height / 2);
            
            // 应用倾斜效果，最大倾斜角度为5度
            this.style.transform = `perspective(1000px) rotateY(${offsetX * 5}deg) rotateX(${-offsetY * 5}deg) translateY(-10px) scale(1.03)`;
        });
        
        // 鼠标离开时重置效果
        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
        
        // 点击卡片时的效果
        card.addEventListener('click', function() {
            // 获取卡片对应的部分
            const section = this.getAttribute('data-section');
            
            // 如果是外部链接，直接导航
            if (section === 'about' || section === 'projects' || 
                section === 'creative' || section === 'contact') {
                window.location.href = `${section}.html`;
            }
        });
    });
}

/**
 * 处理首页和其他页面的显示逻辑
 * 在非首页时，直接显示内容而不显示"探索我的世界"部分
 */
function handlePageDisplayLogic() {
    // 获取当前页面URL
    const currentPage = window.location.pathname.split('/').pop();
    
    // 如果不是首页，隐藏英雄部分
    if (currentPage && currentPage !== 'index.html' && currentPage !== '') {
        const heroSection = document.getElementById('hero');
        if (heroSection) {
            heroSection.style.display = 'none';
        }
        
        // 直接显示相关内容
        const contentSection = document.querySelector('main > section:not(#hero)');
        if (contentSection) {
            contentSection.classList.remove('section-hidden');
        }
    }
}
