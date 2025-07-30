// 主要脚本文件
document.addEventListener('DOMContentLoaded', function() {
    // 设置当前年份
    const currentYearElement = document.getElementById('current-year');
    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
    }
    
    // 设置移动导航
    setupMobileNavigation();
    
    // 设置滚动动画
    setupScrollAnimations();
    
    // 设置表单提交
    setupContactForm();
    
    // 添加页面过渡效果
    setupPageTransitions();
});

// 页面过渡效果
function setupPageTransitions() {
    // 为所有内部链接添加过渡效果
    const internalLinks = document.querySelectorAll('a[href^="resume.html"], a[href^="projects.html"], a[href^="contact.html"]');
    
    internalLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetUrl = this.getAttribute('href');
            
            // 添加淡出效果
            document.body.style.opacity = '0';
            document.body.style.transition = 'opacity 0.3s ease';
            
            // 延迟跳转
            setTimeout(() => {
                window.location.href = targetUrl;
            }, 300);
        });
    });
}

// 设置移动导航
function setupMobileNavigation() {
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    const nav = document.querySelector('nav');
    
    if (mobileNavToggle && nav) {
        mobileNavToggle.addEventListener('click', function() {
            // 切换按钮动画
            this.classList.toggle('active');
            
            // 切换导航菜单
            nav.classList.toggle('mobile-active');
            
            // 防止背景滚动
            document.body.classList.toggle('nav-open');
        });
        
        // 点击导航链接关闭导航
        const navLinks = nav.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileNavToggle.classList.remove('active');
                nav.classList.remove('mobile-active');
                document.body.classList.remove('nav-open');
            });
        });
        
        // 点击页面其他区域关闭导航
        document.addEventListener('click', function(e) {
            if (!nav.contains(e.target) && !mobileNavToggle.contains(e.target)) {
                mobileNavToggle.classList.remove('active');
                nav.classList.remove('mobile-active');
                document.body.classList.remove('nav-open');
            }
        });
    }
}

// 设置滚动动画
function setupScrollAnimations() {
    // 检测元素是否在视口中
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
    
    // 添加滚动时的淡入效果
    function fadeInOnScroll() {
        const elements = document.querySelectorAll('.project-item, .creative-item, .timeline-item');
        
        elements.forEach(element => {
            if (isElementInViewport(element) && !element.classList.contains('fade-in')) {
                element.classList.add('fade-in');
            }
        });
    }
    
    // 初始检查
    fadeInOnScroll();
    
    // 滚动时检查
    window.addEventListener('scroll', throttle(fadeInOnScroll, 200));
}

// 设置联系表单
function setupContactForm() {
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // 在实际应用中，这里会发送表单数据到服务器
            alert('感谢您的留言！这是一个演示网站，因此没有实际发送消息。');
            contactForm.reset();
        });
    }
}

// 性能优化：节流函数
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

// 性能优化：防抖函数
function debounce(func, wait) {
    let timeout;
    return function() {
        const context = this;
        const args = arguments;
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            func.apply(context, args);
        }, wait);
    };
}

// 添加卡片悬停动画效果
document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left; // 鼠标在卡片内的X坐标
            const y = e.clientY - rect.top; // 鼠标在卡片内的Y坐标
            
            // 计算旋转角度（最大±10度）
            const rotateX = (y / rect.height - 0.5) * -10;
            const rotateY = (x / rect.width - 0.5) * 10;
            
            // 应用3D变换
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
        });
        
        // 鼠标离开时恢复
        card.addEventListener('mouseleave', function() {
            card.style.transform = '';
        });
    });
});
