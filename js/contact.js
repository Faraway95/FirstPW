// 联系页面JavaScript功能

document.addEventListener('DOMContentLoaded', function() {
    // 初始化联系页面功能
    initContactForm();
    initContactAnimations();
    initSocialLinks();
});

// 初始化联系表单 - 已移至contact-form.js
function initContactForm() {
    // 表单处理功能已移至contact-form.js，这里禁用避免冲突
    console.log('联系表单初始化已移至contact-form.js');
}

// 处理表单提交 - 已移至contact-form.js
function handleFormSubmit(e) {
    // 此函数已禁用，表单处理移至contact-form.js
    console.log('表单提交处理已移至contact-form.js');
}

// 表单验证
function validateForm(form) {
    let isValid = true;
    
    const requiredFields = form.querySelectorAll('[required]');
    requiredFields.forEach(field => {
        if (!validateField({ target: field })) {
            isValid = false;
        }
    });
    
    return isValid;
}

// 验证单个字段
function validateField(e) {
    const field = e.target;
    const value = field.value.trim();
    const fieldType = field.type;
    
    clearValidationError(e);
    
    if (field.hasAttribute('required') && !value) {
        showFieldError(field, '此字段为必填项');
        return false;
    }
    
    if (fieldType === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            showFieldError(field, '请输入有效的邮箱地址');
            return false;
        }
    }
    
    return true;
}

// 显示字段错误
function showFieldError(field, message) {
    field.classList.add('error');
    
    // 移除已存在的错误消息
    const existingError = field.parentNode.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    // 添加错误消息
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    field.parentNode.appendChild(errorDiv);
}

// 清除验证错误
function clearValidationError(e) {
    const field = e.target;
    field.classList.remove('error');
    
    const errorMessage = field.parentNode.querySelector('.error-message');
    if (errorMessage) {
        errorMessage.remove();
    }
}

// 显示表单成功消息
function showFormSuccess() {
    // 创建成功提示
    const successDiv = document.createElement('div');
    successDiv.className = 'form-success-message';
    successDiv.innerHTML = `
        <div class="success-content">
            <i class="fas fa-check-circle"></i>
            <h4>消息发送成功！</h4>
            <p>感谢您的联系，我会尽快回复您。</p>
        </div>
    `;
    
    // 添加样式
    successDiv.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(30, 58, 138, 0.95);
        border: 1px solid rgba(59, 130, 246, 0.3);
        border-radius: 20px;
        padding: 2rem;
        z-index: 10000;
        text-align: center;
        backdrop-filter: blur(15px);
        animation: successFadeIn 0.5s ease;
    `;
    
    // 添加样式到头部
    if (!document.querySelector('#success-styles')) {
        const style = document.createElement('style');
        style.id = 'success-styles';
        style.textContent = `
            @keyframes successFadeIn {
                from { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
                to { opacity: 1; transform: translate(-50%, -50%) scale(1); }
            }
            .form-success-message .success-content i {
                font-size: 3rem;
                color: #10b981;
                margin-bottom: 1rem;
                display: block;
            }
            .form-success-message .success-content h4 {
                color: #ffffff;
                font-size: 1.5rem;
                margin-bottom: 0.5rem;
            }
            .form-success-message .success-content p {
                color: #94a3b8;
                margin: 0;
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(successDiv);
    
    // 3秒后自动消失
    setTimeout(() => {
        successDiv.style.animation = 'successFadeIn 0.5s ease reverse';
        setTimeout(() => {
            if (successDiv.parentNode) {
                successDiv.parentNode.removeChild(successDiv);
            }
        }, 500);
    }, 3000);
}

// 初始化联系动画
function initContactAnimations() {
    // 联系卡片悬停效果
    const contactCards = document.querySelectorAll('.contact-card');
    contactCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // 滚动动画
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'slideInUp 0.6s ease forwards';
            }
        });
    }, { threshold: 0.1 });
    
    // 观察需要动画的元素
    const animatedElements = document.querySelectorAll('.contact-card, .form-wrapper, .location-info');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        observer.observe(el);
    });
    
    // 添加动画样式
    if (!document.querySelector('#contact-animations')) {
        const style = document.createElement('style');
        style.id = 'contact-animations';
        style.textContent = `
            @keyframes slideInUp {
                from { 
                    opacity: 0; 
                    transform: translateY(30px); 
                }
                to { 
                    opacity: 1; 
                    transform: translateY(0); 
                }
            }
            
            .form-group input.error,
            .form-group textarea.error,
            .form-group select.error {
                border-color: #ef4444;
                box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
            }
            
            .error-message {
                color: #ef4444;
                font-size: 0.875rem;
                margin-top: 0.5rem;
                display: flex;
                align-items: center;
                gap: 0.25rem;
            }
            
            .error-message::before {
                content: "⚠️";
                font-size: 0.75rem;
            }
        `;
        document.head.appendChild(style);
    }
}

// 初始化社交链接
function initSocialLinks() {
    const socialLinks = document.querySelectorAll('.social-link');
    
    socialLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // 获取社交平台类型
            const platform = this.classList[1]; // 如 'linkedin', 'github' 等
            
            // 这里可以添加实际的社交媒体链接
            const socialUrls = {
                linkedin: '#',
                github: '#',
                twitter: '#',
                weibo: '#'
            };
            
            if (socialUrls[platform] && socialUrls[platform] !== '#') {
                window.open(socialUrls[platform], '_blank');
            } else {
                // 显示提示消息
                showTooltip(this, '链接即将开放');
            }
        });
    });
}

// 显示微信二维码
function showWeChatQR() {
    // 创建模态框
    const modal = document.createElement('div');
    modal.className = 'wechat-modal';
    modal.innerHTML = `
        <div class="modal-overlay">
            <div class="modal-content">
                <div class="modal-header">
                    <h3><i class="fab fa-weixin"></i> 微信二维码</h3>
                    <button class="modal-close">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="qr-code-large">
                        <i class="fas fa-qrcode"></i>
                        <p>请使用微信扫描二维码</p>
                        <small>二维码图片待添加</small>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // 添加模态框样式
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 10000;
        animation: modalFadeIn 0.3s ease;
    `;
    
    // 添加模态框样式到头部
    if (!document.querySelector('#modal-styles')) {
        const style = document.createElement('style');
        style.id = 'modal-styles';
        style.textContent = `
            @keyframes modalFadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            .modal-overlay {
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.8);
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 1rem;
            }
            .modal-content {
                background: rgba(30, 58, 138, 0.95);
                border: 1px solid rgba(59, 130, 246, 0.3);
                border-radius: 20px;
                max-width: 400px;
                width: 100%;
                backdrop-filter: blur(15px);
            }
            .modal-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 1.5rem;
                border-bottom: 1px solid rgba(59, 130, 246, 0.2);
            }
            .modal-header h3 {
                color: #ffffff;
                margin: 0;
                font-size: 1.3rem;
            }
            .modal-close {
                background: none;
                border: none;
                color: #94a3b8;
                font-size: 1.5rem;
                cursor: pointer;
                transition: color 0.3s ease;
            }
            .modal-close:hover {
                color: #ffffff;
            }
            .modal-body {
                padding: 2rem;
            }
            .qr-code-large {
                text-align: center;
                color: #60a5fa;
            }
            .qr-code-large i {
                font-size: 5rem;
                margin-bottom: 1rem;
                display: block;
            }
            .qr-code-large p {
                color: #ffffff;
                margin-bottom: 0.5rem;
            }
            .qr-code-large small {
                color: #94a3b8;
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(modal);
    
    // 关闭模态框
    function closeModal() {
        modal.style.animation = 'modalFadeIn 0.3s ease reverse';
        setTimeout(() => {
            if (modal.parentNode) {
                modal.parentNode.removeChild(modal);
            }
        }, 300);
    }
    
    // 绑定关闭事件
    modal.querySelector('.modal-close').addEventListener('click', closeModal);
    modal.querySelector('.modal-overlay').addEventListener('click', function(e) {
        if (e.target === this) {
            closeModal();
        }
    });
    
    // ESC键关闭
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeModal();
        }
    }, { once: true });
}

// 显示工具提示
function showTooltip(element, message) {
    const tooltip = document.createElement('div');
    tooltip.className = 'custom-tooltip';
    tooltip.textContent = message;
    
    tooltip.style.cssText = `
        position: absolute;
        background: rgba(30, 58, 138, 0.9);
        color: white;
        padding: 0.5rem 1rem;
        border-radius: 8px;
        font-size: 0.875rem;
        z-index: 1000;
        pointer-events: none;
        backdrop-filter: blur(10px);
        border: 1px solid rgba(59, 130, 246, 0.3);
    `;
    
    document.body.appendChild(tooltip);
    
    // 定位tooltip
    const rect = element.getBoundingClientRect();
    tooltip.style.left = rect.left + rect.width / 2 - tooltip.offsetWidth / 2 + 'px';
    tooltip.style.top = rect.top - tooltip.offsetHeight - 10 + 'px';
    
    // 2秒后移除
    setTimeout(() => {
        if (tooltip.parentNode) {
            tooltip.parentNode.removeChild(tooltip);
        }
    }, 2000);
}

// 导出函数供全局使用
window.showWeChatQR = showWeChatQR;
