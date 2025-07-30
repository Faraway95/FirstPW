// 创建卡片框架图像
document.addEventListener('DOMContentLoaded', function() {
    // 创建卡片框架图像
    createCardFrames();
    
    // 修复卡片导航链接
    fixCardNavigationLinks();
    
    // 添加页面过渡动画
    setupPageTransitions();
});

/**
 * 创建卡片框架图像
 * 由于无法下载外部图像，我们使用Canvas API动态生成卡片框架
 */
function createCardFrames() {
    // 创建炉石传说风格框架
    createHearthstoneFrame();
    
    // 创建昆特牌风格框架
    createGwentFrame();
    
    // 创建塔罗牌风格框架
    createTarotFrame();
}

/**
 * 创建炉石传说风格框架
 */
function createHearthstoneFrame() {
    const canvas = document.createElement('canvas');
    canvas.width = 320;
    canvas.height = 470;
    const ctx = canvas.getContext('2d');
    
    // 外框
    ctx.lineWidth = 12;
    ctx.strokeStyle = '#D4AF37'; // 金色
    ctx.shadowColor = '#FFD700';
    ctx.shadowBlur = 15;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
    
    // 圆角矩形
    roundRect(ctx, 12, 12, canvas.width - 24, canvas.height - 24, 15, false, true);
    
    // 内框
    ctx.lineWidth = 4;
    ctx.strokeStyle = '#FFF8DC'; // 奶油色
    ctx.shadowBlur = 5;
    roundRect(ctx, 20, 20, canvas.width - 40, canvas.height - 40, 10, false, true);
    
    // 顶部宝石
    ctx.shadowBlur = 10;
    ctx.fillStyle = '#FF0000'; // 红色宝石
    ctx.beginPath();
    ctx.arc(canvas.width / 2, 25, 15, 0, Math.PI * 2);
    ctx.fill();
    
    // 宝石高光
    ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
    ctx.beginPath();
    ctx.arc(canvas.width / 2 - 5, 20, 5, 0, Math.PI * 2);
    ctx.fill();
    
    // 装饰花纹
    ctx.strokeStyle = '#D4AF37';
    ctx.lineWidth = 2;
    ctx.shadowBlur = 3;
    
    // 左上角花纹
    drawCurve(ctx, 40, 40, 80, 40, 60, 80);
    drawCurve(ctx, 40, 40, 40, 80, 80, 60);
    
    // 右上角花纹
    drawCurve(ctx, canvas.width - 40, 40, canvas.width - 80, 40, canvas.width - 60, 80);
    drawCurve(ctx, canvas.width - 40, 40, canvas.width - 40, 80, canvas.width - 80, 60);
    
    // 左下角花纹
    drawCurve(ctx, 40, canvas.height - 40, 80, canvas.height - 40, 60, canvas.height - 80);
    drawCurve(ctx, 40, canvas.height - 40, 40, canvas.height - 80, 80, canvas.height - 60);
    
    // 右下角花纹
    drawCurve(ctx, canvas.width - 40, canvas.height - 40, canvas.width - 80, canvas.height - 40, canvas.width - 60, canvas.height - 80);
    drawCurve(ctx, canvas.width - 40, canvas.height - 40, canvas.width - 40, canvas.height - 80, canvas.width - 80, canvas.height - 60);
    
    // 保存为图像
    saveCanvasAsImage(canvas, 'hearthstone-frame.png');
}

/**
 * 创建昆特牌风格框架
 */
function createGwentFrame() {
    const canvas = document.createElement('canvas');
    canvas.width = 300;
    canvas.height = 440;
    const ctx = canvas.getContext('2d');
    
    // 外框
    ctx.lineWidth = 8;
    ctx.strokeStyle = '#4B0082'; // 靛蓝色
    ctx.shadowColor = '#9370DB';
    ctx.shadowBlur = 15;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
    
    // 矩形框
    ctx.strokeRect(8, 8, canvas.width - 16, canvas.height - 16);
    
    // 内框
    ctx.lineWidth = 3;
    ctx.strokeStyle = '#E6E6FA'; // 淡紫色
    ctx.shadowBlur = 5;
    ctx.strokeRect(16, 16, canvas.width - 32, canvas.height - 32);
    
    // 角落装饰
    ctx.fillStyle = '#4B0082';
    
    // 左上角
    ctx.beginPath();
    ctx.moveTo(8, 8);
    ctx.lineTo(40, 8);
    ctx.lineTo(8, 40);
    ctx.closePath();
    ctx.fill();
    
    // 右上角
    ctx.beginPath();
    ctx.moveTo(canvas.width - 8, 8);
    ctx.lineTo(canvas.width - 40, 8);
    ctx.lineTo(canvas.width - 8, 40);
    ctx.closePath();
    ctx.fill();
    
    // 左下角
    ctx.beginPath();
    ctx.moveTo(8, canvas.height - 8);
    ctx.lineTo(40, canvas.height - 8);
    ctx.lineTo(8, canvas.height - 40);
    ctx.closePath();
    ctx.fill();
    
    // 右下角
    ctx.beginPath();
    ctx.moveTo(canvas.width - 8, canvas.height - 8);
    ctx.lineTo(canvas.width - 40, canvas.height - 8);
    ctx.lineTo(canvas.width - 8, canvas.height - 40);
    ctx.closePath();
    ctx.fill();
    
    // 中间装饰线
    ctx.strokeStyle = '#9370DB';
    ctx.lineWidth = 2;
    
    // 顶部线
    ctx.beginPath();
    ctx.moveTo(60, 16);
    ctx.lineTo(canvas.width - 60, 16);
    ctx.stroke();
    
    // 底部线
    ctx.beginPath();
    ctx.moveTo(60, canvas.height - 16);
    ctx.lineTo(canvas.width - 60, canvas.height - 16);
    ctx.stroke();
    
    // 保存为图像
    saveCanvasAsImage(canvas, 'gwent-frame.png');
}

/**
 * 创建塔罗牌风格框架
 */
function createTarotFrame() {
    const canvas = document.createElement('canvas');
    canvas.width = 280;
    canvas.height = 420;
    const ctx = canvas.getContext('2d');
    
    // 外框
    ctx.lineWidth = 10;
    ctx.strokeStyle = '#228B22'; // 森林绿
    ctx.shadowColor = '#00FF00';
    ctx.shadowBlur = 15;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
    
    // 圆角矩形
    roundRect(ctx, 10, 10, canvas.width - 20, canvas.height - 20, 5, false, true);
    
    // 内框
    ctx.lineWidth = 3;
    ctx.strokeStyle = '#F0FFF0'; // 蜜瓜绿
    ctx.shadowBlur = 5;
    roundRect(ctx, 20, 20, canvas.width - 40, canvas.height - 40, 3, false, true);
    
    // 神秘符号
    ctx.strokeStyle = '#228B22';
    ctx.lineWidth = 2;
    ctx.shadowBlur = 3;
    
    // 顶部星形
    drawStar(ctx, canvas.width / 2, 40, 15, 5);
    
    // 底部月亮
    drawMoon(ctx, canvas.width / 2, canvas.height - 40, 15);
    
    // 左侧太阳
    drawSun(ctx, 40, canvas.height / 2, 15);
    
    // 右侧星星
    drawStar(ctx, canvas.width - 40, canvas.height / 2, 15, 5);
    
    // 装饰边框
    ctx.strokeStyle = '#228B22';
    ctx.lineWidth = 1;
    
    // 顶部边框
    drawPatternLine(ctx, 60, 30, canvas.width - 60, 30);
    
    // 底部边框
    drawPatternLine(ctx, 60, canvas.height - 30, canvas.width - 60, canvas.height - 30);
    
    // 左侧边框
    drawPatternLine(ctx, 30, 60, 30, canvas.height - 60);
    
    // 右侧边框
    drawPatternLine(ctx, canvas.width - 30, 60, canvas.width - 30, canvas.height - 60);
    
    // 保存为图像
    saveCanvasAsImage(canvas, 'tarot-frame.png');
}

/**
 * 绘制圆角矩形
 */
function roundRect(ctx, x, y, width, height, radius, fill, stroke) {
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    ctx.lineTo(x + width, y + height - radius);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    ctx.lineTo(x + radius, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();
    
    if (fill) {
        ctx.fill();
    }
    
    if (stroke) {
        ctx.stroke();
    }
}

/**
 * 绘制贝塞尔曲线
 */
function drawCurve(ctx, x1, y1, x2, y2, cpx, cpy) {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.quadraticCurveTo(cpx, cpy, x2, y2);
    ctx.stroke();
}

/**
 * 绘制星形
 */
function drawStar(ctx, cx, cy, radius, spikes) {
    let rot = Math.PI / 2 * 3;
    let x = cx;
    let y = cy;
    let step = Math.PI / spikes;
    
    ctx.beginPath();
    ctx.moveTo(cx, cy - radius);
    
    for (let i = 0; i < spikes; i++) {
        x = cx + Math.cos(rot) * radius;
        y = cy + Math.sin(rot) * radius;
        ctx.lineTo(x, y);
        rot += step;
        
        x = cx + Math.cos(rot) * radius * 0.4;
        y = cy + Math.sin(rot) * radius * 0.4;
        ctx.lineTo(x, y);
        rot += step;
    }
    
    ctx.lineTo(cx, cy - radius);
    ctx.closePath();
    ctx.stroke();
}

/**
 * 绘制月亮
 */
function drawMoon(ctx, cx, cy, radius) {
    ctx.beginPath();
    ctx.arc(cx, cy, radius, 0, Math.PI * 2);
    ctx.stroke();
    
    ctx.beginPath();
    ctx.arc(cx + radius * 0.5, cy, radius * 0.8, 0, Math.PI * 2);
    ctx.stroke();
}

/**
 * 绘制太阳
 */
function drawSun(ctx, cx, cy, radius) {
    // 中心圆
    ctx.beginPath();
    ctx.arc(cx, cy, radius * 0.7, 0, Math.PI * 2);
    ctx.stroke();
    
    // 光芒
    for (let i = 0; i < 8; i++) {
        const angle = i * Math.PI / 4;
        const x1 = cx + Math.cos(angle) * radius * 0.7;
        const y1 = cy + Math.sin(angle) * radius * 0.7;
        const x2 = cx + Math.cos(angle) * radius * 1.3;
        const y2 = cy + Math.sin(angle) * radius * 1.3;
        
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
    }
}

/**
 * 绘制装饰线
 */
function drawPatternLine(ctx, x1, y1, x2, y2) {
    const dx = x2 - x1;
    const dy = y2 - y1;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const segments = Math.floor(distance / 10);
    const segmentLength = distance / segments;
    
    const unitX = dx / distance;
    const unitY = dy / distance;
    
    for (let i = 0; i < segments; i++) {
        if (i % 2 === 0) {
            const startX = x1 + i * segmentLength * unitX;
            const startY = y1 + i * segmentLength * unitY;
            const endX = x1 + (i + 1) * segmentLength * unitX;
            const endY = y1 + (i + 1) * segmentLength * unitY;
            
            ctx.beginPath();
            ctx.moveTo(startX, startY);
            ctx.lineTo(endX, endY);
            ctx.stroke();
        }
    }
}

/**
 * 将Canvas保存为图像
 */
function saveCanvasAsImage(canvas, filename) {
    // 在实际环境中，这里会将Canvas转换为图像文件并保存
    // 但在当前环境中，我们只能模拟这个过程
    
    // 创建一个隐藏的图像元素
    const img = document.createElement('img');
    img.src = canvas.toDataURL('image/png');
    img.style.display = 'none';
    img.id = filename.replace('.png', '');
    document.body.appendChild(img);
    
    console.log(`Generated ${filename} dynamically`);
    
    // 更新CSS中的引用
    updateCSSImageReferences(filename, img.id);
}

/**
 * 更新CSS中的图像引用
 */
function updateCSSImageReferences(filename, imgId) {
    // 在实际环境中，这里会更新CSS文件
    // 但在当前环境中，我们通过动态样式表来实现
    
    let selector, property;
    
    switch (filename) {
        case 'hearthstone-frame.png':
            selector = '.card-about::before';
            break;
        case 'gwent-frame.png':
            selector = '.card-projects::before';
            break;
        case 'tarot-frame.png':
            selector = '.card-creative::before';
            break;
        default:
            return;
    }
    
    // 创建或获取动态样式表
    let styleSheet = document.getElementById('dynamic-card-styles');
    if (!styleSheet) {
        styleSheet = document.createElement('style');
        styleSheet.id = 'dynamic-card-styles';
        document.head.appendChild(styleSheet);
    }
    
    // 添加新规则
    const imgUrl = `url(#${imgId})`;
    const rule = `${selector} { background-image: ${imgUrl} !important; }`;
    
    styleSheet.textContent += rule;
}

/**
 * 修复卡片导航链接
 */
function fixCardNavigationLinks() {
    document.addEventListener('click', function(e) {
        const card = e.target.closest('.card');
        if (!card) return;
        
        const section = card.getAttribute('data-section');
        if (!section) return;
        
        e.preventDefault();
        
        // 显示过渡动画
        showPageTransition();
        
        // 导航到对应页面
        setTimeout(function() {
            window.location.href = `${section}.html`;
        }, 500);
    });
}

/**
 * 设置页面过渡动画
 */
function setupPageTransitions() {
    // 创建过渡动画元素
    createTransitionElement();
    
    // 为所有导航链接添加过渡效果
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // 只对内部链接应用过渡效果
            if (href && !href.startsWith('#') && !href.startsWith('http')) {
                e.preventDefault();
                
                // 显示过渡动画
                showPageTransition();
                
                // 导航到新页面
                setTimeout(function() {
                    window.location.href = href;
                }, 500);
            }
        });
    });
    
    // 页面加载完成后隐藏过渡动画
    window.addEventListener('load', function() {
        hidePageTransition();
    });
}

/**
 * 创建过渡动画元素
 */
function createTransitionElement() {
    // 检查是否已存在
    if (document.querySelector('.page-transition')) return;
    
    // 创建过渡元素
    const transition = document.createElement('div');
    transition.className = 'page-transition';
    
    // 创建加载指示器
    const loader = document.createElement('div');
    loader.className = 'loader';
    transition.appendChild(loader);
    
    // 添加到页面
    document.body.appendChild(transition);
}

/**
 * 显示页面过渡动画
 */
function showPageTransition() {
    const transition = document.querySelector('.page-transition');
    if (transition) {
        transition.classList.add('active');
    }
}

/**
 * 隐藏页面过渡动画
 */
function hidePageTransition() {
    const transition = document.querySelector('.page-transition');
    if (transition) {
        transition.classList.remove('active');
    }
}
