// 图片占位符生成器
document.addEventListener('DOMContentLoaded', function() {
    initImagePlaceholders();
});

// 初始化图片占位符
function initImagePlaceholders() {
    // 为所有图片添加错误处理
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        // 如果图片已经加载失败，直接处理
        if (img.complete && img.naturalWidth === 0) {
            handleImageError(img);
        } else {
            // 添加错误事件监听器
            img.addEventListener('error', function() {
                handleImageError(this);
            });
        }
    });
}

// 处理图片加载错误
function handleImageError(img) {
    const placeholder = generatePlaceholder(img);
    img.src = placeholder;
    img.classList.add('placeholder-image');
}

// 生成占位符
function generatePlaceholder(img) {
    const width = img.width || img.getAttribute('width') || 300;
    const height = img.height || img.getAttribute('height') || 200;
    const alt = img.alt || '图片';
    
    // 根据图片类型生成不同的占位符
    const placeholderType = getPlaceholderType(img);
    
    return generateSVGPlaceholder(width, height, alt, placeholderType);
}

// 获取占位符类型
function getPlaceholderType(img) {
    const className = img.className;
    const src = img.src;
    const alt = img.alt;
    
    if (className.includes('profile') || alt.includes('个人') || alt.includes('头像')) {
        return 'profile';
    } else if (className.includes('project') || alt.includes('项目')) {
        return 'project';
    } else if (className.includes('creative') || alt.includes('创意')) {
        return 'creative';
    } else if (src.includes('bg') || className.includes('bg')) {
        return 'background';
    } else {
        return 'default';
    }
}

// 生成SVG占位符
function generateSVGPlaceholder(width, height, text, type) {
    const colors = getPlaceholderColors(type);
    
    const svg = `
        <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="${width}" height="${height}" fill="${colors.background}"/>
            ${generatePlaceholderContent(width, height, text, type, colors)}
        </svg>
    `;
    
    return 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svg)));
}

// 获取占位符颜色
function getPlaceholderColors(type) {
    const colorSchemes = {
        profile: {
            background: '#f0f7ff',
            primary: '#3b82f6',
            secondary: '#60a5fa',
            text: '#1f2937'
        },
        project: {
            background: '#fef3c7',
            primary: '#f59e0b',
            secondary: '#fbbf24',
            text: '#92400e'
        },
        creative: {
            background: '#f3e8ff',
            primary: '#8b5cf6',
            secondary: '#a78bfa',
            text: '#5b21b6'
        },
        background: {
            background: '#f9fafb',
            primary: '#6b7280',
            secondary: '#9ca3af',
            text: '#374151'
        },
        default: {
            background: '#f0f7ff',
            primary: '#3b82f6',
            secondary: '#60a5fa',
            text: '#1f2937'
        }
    };
    
    return colorSchemes[type] || colorSchemes.default;
}

// 生成占位符内容
function generatePlaceholderContent(width, height, text, type, colors) {
    const centerX = width / 2;
    const centerY = height / 2;
    
    let content = '';
    
    switch (type) {
        case 'profile':
            content = `
                <circle cx="${centerX}" cy="${centerY - 20}" r="30" fill="${colors.primary}"/>
                <path d="M${centerX - 40} ${centerY + 30}C${centerX - 40} ${centerY + 20} ${centerX - 30} ${centerY + 10} ${centerX} ${centerY + 10}S${centerX + 40} ${centerY + 20} ${centerX + 40} ${centerY + 30}V${centerY + 50}H${centerX - 40}V${centerY + 30}Z" fill="${colors.primary}"/>
                <text x="${centerX}" y="${height - 20}" font-family="Arial, sans-serif" font-size="14" fill="${colors.text}" text-anchor="middle">${text}</text>
            `;
            break;
            
        case 'project':
            content = `
                <rect x="${centerX - 40}" y="${centerY - 30}" width="80" height="50" rx="8" fill="${colors.primary}"/>
                <rect x="${centerX - 30}" y="${centerY - 20}" width="20" height="20" rx="4" fill="${colors.secondary}"/>
                <rect x="${centerX - 5}" y="${centerY - 15}" width="30" height="4" rx="2" fill="${colors.secondary}"/>
                <rect x="${centerX - 5}" y="${centerY - 5}" width="25" height="4" rx="2" fill="${colors.secondary}"/>
                <rect x="${centerX - 5}" y="${centerY + 5}" width="20" height="4" rx="2" fill="${colors.secondary}"/>
                <text x="${centerX}" y="${height - 20}" font-family="Arial, sans-serif" font-size="14" fill="${colors.text}" text-anchor="middle">${text}</text>
            `;
            break;
            
        case 'creative':
            content = `
                <polygon points="${centerX},${centerY - 35} ${centerX - 30},${centerY + 15} ${centerX + 30},${centerY + 15}" fill="${colors.primary}"/>
                <circle cx="${centerX}" cy="${centerY}" r="15" fill="${colors.secondary}"/>
                <path d="M${centerX - 10},${centerY - 5} Q${centerX},${centerY - 15} ${centerX + 10},${centerY - 5}" fill="${colors.background}"/>
                <text x="${centerX}" y="${height - 20}" font-family="Arial, sans-serif" font-size="14" fill="${colors.text}" text-anchor="middle">${text}</text>
            `;
            break;
            
        case 'background':
            content = `
                <pattern id="diagonalHatch" patternUnits="userSpaceOnUse" width="20" height="20">
                    <path d="M0,20 L20,0" stroke="${colors.secondary}" stroke-width="1" opacity="0.3"/>
                </pattern>
                <rect width="${width}" height="${height}" fill="url(#diagonalHatch)"/>
                <text x="${centerX}" y="${centerY}" font-family="Arial, sans-serif" font-size="16" fill="${colors.text}" text-anchor="middle" opacity="0.7">${text}</text>
            `;
            break;
            
        default:
            content = `
                <rect x="${centerX - 50}" y="${centerY - 35}" width="100" height="70" rx="8" fill="${colors.primary}" opacity="0.2"/>
                <path d="M${centerX - 30} ${centerY - 15} L${centerX - 10} ${centerY + 5} L${centerX + 10} ${centerY - 10} L${centerX + 30} ${centerY + 10}" stroke="${colors.primary}" stroke-width="3" fill="none"/>
                <circle cx="${centerX - 20}" cy="${centerY - 20}" r="8" fill="${colors.secondary}"/>
                <text x="${centerX}" y="${centerY + 35}" font-family="Arial, sans-serif" font-size="14" fill="${colors.text}" text-anchor="middle">${text}</text>
            `;
    }
    
    return content;
}

// 预加载关键图片
function preloadCriticalImages() {
    const criticalImages = [
        'images/profile.jpg',
        'images/hero-bg.jpg',
        'images/about-bg.jpg'
    ];
    
    criticalImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

// 懒加载图片
function initLazyLoading() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        observer.unobserve(img);
                    }
                }
            });
        });
        
        const lazyImages = document.querySelectorAll('img[data-src]');
        lazyImages.forEach(img => imageObserver.observe(img));
    }
}

// 图片优化
function optimizeImages() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        // 添加loading属性
        if (!img.hasAttribute('loading')) {
            img.setAttribute('loading', 'lazy');
        }
        
        // 添加decoding属性
        if (!img.hasAttribute('decoding')) {
            img.setAttribute('decoding', 'async');
        }
        
        // 确保有alt属性
        if (!img.hasAttribute('alt')) {
            img.setAttribute('alt', '图片');
        }
    });
}

// 初始化所有图片优化功能
function initImageOptimization() {
    preloadCriticalImages();
    initLazyLoading();
    optimizeImages();
    initImagePlaceholders();
}

// 导出功能
window.ImagePlaceholders = {
    init: initImageOptimization,
    generatePlaceholder: generatePlaceholder,
    handleImageError: handleImageError
}; 