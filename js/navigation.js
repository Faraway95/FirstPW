/* 导航按钮和行为优化 */

document.addEventListener('DOMContentLoaded', function() {
    // 优化导航按钮样式和交互
    enhanceNavigationButtons();
    
    // 实现导航栏滚动行为
    implementScrollBehavior();
});

/**
 * 优化导航按钮样式和交互
 * 为导航按钮添加悬停浮空效果和点击跳转功能
 */
function enhanceNavigationButtons() {
    // 获取所有导航链接
    const navLinks = document.querySelectorAll('nav a');
    
    // 为每个导航链接添加样式和事件
    navLinks.forEach(link => {
        // 添加按钮样式类
        link.classList.add('nav-button');
        
        // 添加点击事件处理
        link.addEventListener('click', function(e) {
            // 如果是内部链接（以#开头），阻止默认行为并平滑滚动
            if (this.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    // 平滑滚动到目标元素
                    targetElement.scrollIntoView({
                        behavior: 'smooth'
                    });
                    
                    // 更新活动链接
                    navLinks.forEach(l => l.classList.remove('active'));
                    this.classList.add('active');
                }
            }
        });
    });
    
    // 根据当前页面URL更新活动链接
    updateActiveNavLink();
}

/**
 * 根据当前页面URL更新活动导航链接
 */
function updateActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        
        // 如果是首页
        if (currentPage === '' || currentPage === 'index.html') {
            if (linkHref === 'index.html' || linkHref === './') {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        } 
        // 其他页面
        else if (linkHref.includes(currentPage)) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

/**
 * 实现导航栏滚动行为
 * 滚动时隐藏导航栏，鼠标靠近顶部时显示
 */
function implementScrollBehavior() {
    const header = document.querySelector('header');
    let lastScrollTop = 0;
    let isHeaderVisible = true;
    let isMouseNearTop = false;
    
    // 监听滚动事件
    window.addEventListener('scroll', throttle(function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // 判断滚动方向和距离
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // 向下滚动且不在页面顶部，隐藏导航栏
            if (isHeaderVisible && !isMouseNearTop) {
                header.classList.add('header-hidden');
                isHeaderVisible = false;
            }
        } else {
            // 向上滚动或在页面顶部，显示导航栏
            if (!isHeaderVisible) {
                header.classList.remove('header-hidden');
                isHeaderVisible = true;
            }
        }
        
        lastScrollTop = scrollTop;
    }, 100));
    
    // 监听鼠标移动事件
    document.addEventListener('mousemove', throttle(function(e) {
        // 检查鼠标是否靠近页面顶部（50px以内）
        isMouseNearTop = e.clientY <= 50;
        
        // 如果鼠标靠近顶部，显示导航栏
        if (isMouseNearTop && !isHeaderVisible) {
            header.classList.remove('header-hidden');
            isHeaderVisible = true;
        }
    }, 100));
    
    // 触摸设备支持
    document.addEventListener('touchmove', throttle(function(e) {
        // 获取触摸位置
        const touch = e.touches[0];
        isMouseNearTop = touch.clientY <= 50;
        
        // 如果触摸靠近顶部，显示导航栏
        if (isMouseNearTop && !isHeaderVisible) {
            header.classList.remove('header-hidden');
            isHeaderVisible = true;
        }
    }, 100));
}

/**
 * 节流函数 - 限制函数调用频率
 * @param {Function} func - 要节流的函数
 * @param {number} limit - 时间限制（毫秒）
 * @returns {Function} - 节流后的函数
 */
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}
