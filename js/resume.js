// 简历页面功能脚本
document.addEventListener('DOMContentLoaded', function() {
    // 初始化简历页面功能
    initResumeFeatures();
    animateSkillBars();
    setupPrintFunction();
    setupDownloadFunction();
    
    // 滚动时触发动画
    window.addEventListener('scroll', throttle(handleScrollAnimations, 100));
});

// 初始化简历页面功能
function initResumeFeatures() {
    // 年份更新
    const currentYear = new Date().getFullYear();
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        yearElement.textContent = currentYear;
    }
    
    // 为技能进度条添加动画效果
    observeSkillBars();
}

// 技能条动画
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    skillBars.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0%';
        
        // 延迟执行动画
        setTimeout(() => {
            bar.style.width = width;
        }, 500);
    });
}

// 观察技能条，当进入视窗时播放动画
function observeSkillBars() {
    if ('IntersectionObserver' in window) {
        const skillObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const skillBars = entry.target.querySelectorAll('.skill-progress');
                    skillBars.forEach((bar, index) => {
                        const width = bar.getAttribute('data-width') || bar.style.width;
                        bar.style.width = '0%';
                        
                        setTimeout(() => {
                            bar.style.width = width;
                        }, index * 200 + 300);
                    });
                    
                    skillObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.5,
            rootMargin: '0px 0px -100px 0px'
        });
        
        const skillsSection = document.querySelector('.skills');
        if (skillsSection) {
            skillObserver.observe(skillsSection);
        }
    }
}

// 打印功能
function setupPrintFunction() {
    const printButton = document.getElementById('print-resume');
    
    if (printButton) {
        printButton.addEventListener('click', function() {
            // 优化打印样式
            document.body.classList.add('printing');
            
            // 延迟打印以确保样式应用
            setTimeout(() => {
                window.print();
                document.body.classList.remove('printing');
            }, 100);
        });
    }
}

// 下载PDF功能
function setupDownloadFunction() {
    const downloadButton = document.getElementById('download-pdf');
    
    if (downloadButton) {
        downloadButton.addEventListener('click', function() {
            // 如果PDF文件存在，直接下载
            const pdfPath = 'resume_chinese_final_v3.pdf';
            
            // 创建临时链接进行下载
            const link = document.createElement('a');
            link.href = pdfPath;
            link.download = '涂润东_个人简历.pdf';
            link.style.display = 'none';
            
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            
            // 显示下载提示
            showNotification('PDF下载已开始，请查看下载文件夹', 'success');
        });
    }
}

// 滚动动画处理
function handleScrollAnimations() {
    const animatableElements = document.querySelectorAll('.resume-card, .timeline-item, .award-item');
    
    animatableElements.forEach(element => {
        if (isElementInViewport(element) && !element.classList.contains('animated')) {
            element.classList.add('fade-in', 'animated');
        }
    });
}

// 检查元素是否在视窗内
function isElementInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// 节流函数
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

// 通知函数
function showNotification(message, type = 'info') {
    // 创建通知元素
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    // 添加样式
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : '#3b82f6'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 0.5rem;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        z-index: 10000;
        opacity: 0;
        transform: translateX(100%);
        transition: all 0.3s ease;
    `;
    
    // 添加到页面
    document.body.appendChild(notification);
    
    // 触发动画
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // 自动移除
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// 简历数据验证和更新
function validateResumeData() {
    const requiredFields = [
        '.profile-image',
        '.personal-details h3',
        '.job-title',
        '.contact-item'
    ];
    
    let isValid = true;
    const missingFields = [];
    
    requiredFields.forEach(selector => {
        const element = document.querySelector(selector);
        if (!element || !element.textContent.trim()) {
            isValid = false;
            missingFields.push(selector);
        }
    });
    
    if (!isValid) {
        console.warn('简历数据不完整，缺少以下字段:', missingFields);
    }
    
    return isValid;
}

// 技能数据更新
function updateSkillData(skillName, percentage) {
    const skillItems = document.querySelectorAll('.skill-item');
    
    skillItems.forEach(item => {
        const nameElement = item.querySelector('.skill-name');
        if (nameElement && nameElement.textContent.trim() === skillName) {
            const progressBar = item.querySelector('.skill-progress');
            if (progressBar) {
                progressBar.style.width = `${percentage}%`;
                progressBar.setAttribute('data-width', `${percentage}%`);
            }
        }
    });
}

// 联系信息更新
function updateContactInfo(type, value) {
    const contactItems = document.querySelectorAll('.contact-item');
    
    contactItems.forEach(item => {
        const icon = item.querySelector('i');
        let isMatch = false;
        
        switch(type) {
            case 'email':
                isMatch = icon.classList.contains('fa-envelope');
                break;
            case 'phone':
                isMatch = icon.classList.contains('fa-phone');
                break;
            case 'location':
                isMatch = icon.classList.contains('fa-map-marker-alt');
                break;
        }
        
        if (isMatch) {
            const span = item.querySelector('span');
            if (span) {
                span.textContent = value;
            }
        }
    });
}

// 导出简历数据
function exportResumeData() {
    const resumeData = {
        personalInfo: {
            name: document.querySelector('.personal-details h3')?.textContent || '',
            title: document.querySelector('.job-title')?.textContent || '',
            email: document.querySelector('.contact-item .fa-envelope')?.parentNode?.querySelector('span')?.textContent || '',
            phone: document.querySelector('.contact-item .fa-phone')?.parentNode?.querySelector('span')?.textContent || '',
            location: document.querySelector('.contact-item .fa-map-marker-alt')?.parentNode?.querySelector('span')?.textContent || ''
        },
        summary: document.querySelector('.summary p')?.textContent || '',
        skills: Array.from(document.querySelectorAll('.skill-item')).map(item => ({
            name: item.querySelector('.skill-name')?.textContent || '',
            level: item.querySelector('.skill-progress')?.style.width || '0%'
        })),
        experience: Array.from(document.querySelectorAll('.timeline-item')).map(item => ({
            date: item.querySelector('.timeline-date')?.textContent || '',
            title: item.querySelector('.timeline-content h4')?.textContent || '',
            company: item.querySelector('.company')?.textContent || '',
            responsibilities: Array.from(item.querySelectorAll('.responsibilities li')).map(li => li.textContent)
        }))
    };
    
    return resumeData;
}

// 简历完整性检查
function checkResumeCompleteness() {
    const data = exportResumeData();
    const completeness = {
        personalInfo: Object.values(data.personalInfo).every(value => value.trim() !== ''),
        summary: data.summary.trim() !== '',
        skills: data.skills.length > 0,
        experience: data.experience.length > 0
    };
    
    const overallCompleteness = Object.values(completeness).filter(Boolean).length / Object.keys(completeness).length * 100;
    
    console.log('简历完整性检查:', {
        details: completeness,
        overall: `${overallCompleteness.toFixed(1)}%`
    });
    
    return completeness;
} 