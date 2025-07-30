// 联系表单邮件发送功能
document.addEventListener('DOMContentLoaded', function() {
    // 获取表单元素
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmit);
    }
});

// 处理表单提交
async function handleFormSubmit(e) {
    e.preventDefault();
    
    console.log('表单提交开始...');
    
    const form = e.target;
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn.innerHTML;
    
    // 获取表单数据
    const formData = {
        name: form.name.value.trim(),
        email: form.email.value.trim(),
        subject: form.subject.value,
        message: form.message.value.trim()
    };
    
    console.log('表单元素检查:');
    console.log('- name field:', form.name, 'value:', form.name ? form.name.value : 'NOT FOUND');
    console.log('- email field:', form.email, 'value:', form.email ? form.email.value : 'NOT FOUND');
    console.log('- subject field:', form.subject, 'value:', form.subject ? form.subject.value : 'NOT FOUND');
    console.log('- message field:', form.message, 'value:', form.message ? form.message.value : 'NOT FOUND');
    
    console.log('表单数据:', formData);
    
    // 验证表单数据
    if (!validateForm(formData)) {
        console.log('表单验证失败');
        return;
    }
    
    console.log('表单验证通过，准备发送...');
    
    // 显示加载状态
    showLoadingState(submitBtn);
    
    try {
        // 尝试使用Formspree服务发送邮件
        const response = await sendEmailViaFormspree(formData);
        
        if (response.ok) {
            console.log('邮件发送成功');
            showSuccessMessage();
            form.reset();
        } else {
            throw new Error('Formspree发送失败');
        }
        
    } catch (error) {
        console.error('邮件发送失败:', error);
        // 使用mailto作为备用方案
        showMailtoFallback(formData);
    } finally {
        // 恢复按钮状态
        resetButtonState(submitBtn, originalBtnText);
    }
}

// 表单验证
function validateForm(data) {
    // 验证姓名
    if (!data.name) {
        showValidationError('请输入您的姓名');
        return false;
    }
    
    if (data.name.length < 2) {
        showValidationError('姓名至少需要2个字符');
        return false;
    }
    
    // 验证邮箱
    if (!data.email) {
        showValidationError('请输入您的邮箱');
        return false;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
        showValidationError('请输入有效的邮箱地址');
        return false;
    }
    
    // 验证主题
    if (!data.subject) {
        showValidationError('请选择联系主题');
        return false;
    }
    
    // 验证消息内容
    if (!data.message) {
        showValidationError('请输入消息内容');
        return false;
    }
    
    if (data.message.length < 10) {
        showValidationError('消息内容至少需要10个字符');
        return false;
    }
    
    if (data.message.length > 1000) {
        showValidationError('消息内容不能超过1000个字符');
        return false;
    }
    
    return true;
}

// 获取主题文本
function getSubjectText(subjectValue) {
    const subjects = {
        'job': '工作机会咨询',
        'collaboration': '项目合作咨询',
        'consultation': '咨询服务',
        'other': '其他咨询'
    };
    
    return subjects[subjectValue] || '网站联系表单';
}

// 显示加载状态
function showLoadingState(button) {
    button.disabled = true;
    button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> 发送中...';
    button.classList.add('loading');
}

// 重置按钮状态
function resetButtonState(button, originalText) {
    button.disabled = false;
    button.innerHTML = originalText;
    button.classList.remove('loading');
}

// 显示成功消息
function showSuccessMessage() {
    showNotification('success', '消息发送成功！', '感谢您的联系，我会尽快回复您。');
}

// 显示错误消息
function showErrorMessage(error) {
    let message = '消息发送失败，请稍后重试。';
    
    if (error && error.text) {
        switch (error.text) {
            case 'The user ID is invalid':
                message = '邮件服务配置错误，请联系网站管理员。';
                break;
            case 'Template not found':
                message = '邮件模板未找到，请联系网站管理员。';
                break;
            case 'Service not found':
                message = '邮件服务未找到，请联系网站管理员。';
                break;
            default:
                message = '发送失败：' + error.text;
        }
    }
    
    showNotification('error', '发送失败', message);
}

// 显示验证错误
function showValidationError(message) {
    showNotification('warning', '输入错误', message);
}

// 显示通知
function showNotification(type, title, message, callback = null) {
    // 移除已存在的通知
    const existingNotification = document.querySelector('.notification-toast');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // 创建通知元素
    const notification = document.createElement('div');
    notification.className = `notification-toast notification-${type}`;
    
    const icon = getNotificationIcon(type);
    
    notification.innerHTML = `
        <div class="notification-content">
            <div class="notification-icon">${icon}</div>
            <div class="notification-text">
                <div class="notification-title">${title}</div>
                <div class="notification-message">${message}</div>
            </div>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    // 添加样式
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 10000;
        background: white;
        border-radius: 12px;
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
        border-left: 4px solid ${getNotificationColor(type)};
        animation: slideInRight 0.3s ease-out;
        max-width: 400px;
        overflow: hidden;
    `;
    
    // 添加到页面
    document.body.appendChild(notification);
    
    // 如果有回调函数，在3秒后执行
    if (callback) {
        setTimeout(() => {
            callback();
        }, 3000);
    }
    
    // 自动移除
    setTimeout(() => {
        if (notification && notification.parentNode) {
            notification.style.animation = 'slideOutRight 0.3s ease-in';
            setTimeout(() => {
                if (notification && notification.parentNode) {
                    notification.remove();
                }
            }, 300);
        }
    }, 5000);
}

// 获取通知图标
function getNotificationIcon(type) {
    const icons = {
        'success': '<i class="fas fa-check-circle" style="color: #10b981;"></i>',
        'error': '<i class="fas fa-exclamation-circle" style="color: #ef4444;"></i>',
        'warning': '<i class="fas fa-exclamation-triangle" style="color: #f59e0b;"></i>',
        'info': '<i class="fas fa-info-circle" style="color: #3b82f6;"></i>'
    };
    
    return icons[type] || icons['info'];
}

// 获取通知颜色
function getNotificationColor(type) {
    const colors = {
        'success': '#10b981',
        'error': '#ef4444',
        'warning': '#f59e0b',
        'info': '#3b82f6'
    };
    
    return colors[type] || colors['info'];
}

// 添加通知动画样式
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .notification-content {
        display: flex;
        align-items: flex-start;
        padding: 1rem;
        gap: 0.75rem;
    }
    
    .notification-icon {
        font-size: 1.25rem;
        margin-top: 0.125rem;
    }
    
    .notification-text {
        flex: 1;
    }
    
    .notification-title {
        font-weight: 600;
        font-size: 0.9rem;
        margin-bottom: 0.25rem;
        color: #1f2937;
    }
    
    .notification-message {
        font-size: 0.85rem;
        color: #6b7280;
        line-height: 1.4;
    }
    
    .notification-close {
        background: none;
        border: none;
        color: #9ca3af;
        cursor: pointer;
        padding: 0.25rem;
        border-radius: 4px;
        transition: all 0.2s ease;
    }
    
    .notification-close:hover {
        background: #f3f4f6;
        color: #374151;
    }
    
    .btn.loading {
        cursor: not-allowed;
        opacity: 0.7;
    }
`;

document.head.appendChild(notificationStyles);

// 使用Web3Forms服务发送邮件
async function sendEmailViaFormspree(formData) {
    // 使用Web3Forms免费服务 
    const web3formsUrl = 'https://api.web3forms.com/submit';
    
    // 使用您的Web3Forms API密钥
    const API_KEY = '99cd281d-c287-4149-9805-387e2f813713';
    
    const emailData = new FormData();
    emailData.append('access_key', API_KEY);
    emailData.append('name', formData.name);
    emailData.append('email', formData.email);
    emailData.append('subject', `[网站联系] ${getSubjectText(formData.subject)}`);
    emailData.append('message', `
联系人信息:
• 姓名: ${formData.name}
• 邮箱: ${formData.email}
• 联系主题: ${getSubjectText(formData.subject)}

消息内容:
${formData.message}

---
发送时间: ${new Date().toLocaleString('zh-CN', {
    year: 'numeric',
    month: '2-digit', 
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
})}
来源: 个人网站联系表单 (远在咫尺)
    `.trim());
    
    // 设置接收邮箱
    emailData.append('to', 'jordantu95@gmail.com');
    emailData.append('from_name', '网站联系表单');
    emailData.append('replyto', formData.email);
    
    try {
        const response = await fetch(web3formsUrl, {
            method: 'POST',
            body: emailData
        });
        
        const result = await response.json();
        
        if (result.success) {
            return { ok: true, data: result };
        } else {
            throw new Error(result.message || '发送失败');
        }
        
    } catch (error) {
        console.error('Web3Forms发送错误:', error);
        throw error;
    }
}

// 显示mailto备用方案
function showMailtoFallback(formData) {
    const subject = encodeURIComponent(`[网站联系] ${getSubjectText(formData.subject)}`);
    const body = encodeURIComponent(`
姓名: ${formData.name}
邮箱: ${formData.email}
主题: ${getSubjectText(formData.subject)}

消息内容:
${formData.message}

---
发送时间: ${new Date().toLocaleString('zh-CN')}
此邮件来自个人网站联系表单
    `.trim());
    
    const mailtoUrl = `mailto:jordantu95@gmail.com?subject=${subject}&body=${body}`;
    
    // 显示选择对话框
    showNotification('info', '启用邮件客户端', '将为您打开邮件客户端，请在您的邮件软件中完成发送。', () => {
        window.location.href = mailtoUrl;
    });
}

// 为演示目的，当EmailJS服务不可用时，使用模拟发送
async function simulateEmailSend(formData) {
    // 模拟网络延迟
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // 模拟成功率（90%成功）
    if (Math.random() > 0.1) {
        console.log('模拟邮件发送成功:', formData);
        return { status: 200, text: 'OK' };
    } else {
        throw new Error('模拟网络错误');
    }
}

// 如果需要，可以在这里添加表单的实时验证
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    if (!form) return;
    
    // 添加实时验证
    const inputs = form.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
        
        input.addEventListener('input', function() {
            // 清除之前的错误状态
            this.classList.remove('error');
            const errorMsg = this.parentNode.querySelector('.field-error');
            if (errorMsg) {
                errorMsg.remove();
            }
        });
    });
});

// 单个字段验证
function validateField(field) {
    const value = field.value.trim();
    let isValid = true;
    let errorMessage = '';
    
    // 清除之前的错误
    field.classList.remove('error');
    const existingError = field.parentNode.querySelector('.field-error');
    if (existingError) {
        existingError.remove();
    }
    
    switch (field.name) {
        case 'name':
            if (!value) {
                isValid = false;
                errorMessage = '请输入您的姓名';
            } else if (value.length < 2) {
                isValid = false;
                errorMessage = '姓名至少需要2个字符';
            }
            break;
            
        case 'email':
            if (!value) {
                isValid = false;
                errorMessage = '请输入您的邮箱';
            } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
                isValid = false;
                errorMessage = '请输入有效的邮箱地址';
            }
            break;
            
        case 'subject':
            if (!value) {
                isValid = false;
                errorMessage = '请选择联系主题';
            }
            break;
            
        case 'message':
            if (!value) {
                isValid = false;
                errorMessage = '请输入消息内容';
            } else if (value.length < 10) {
                isValid = false;
                errorMessage = '消息内容至少需要10个字符';
            } else if (value.length > 1000) {
                isValid = false;
                errorMessage = '消息内容不能超过1000个字符';
            }
            break;
    }
    
    if (!isValid) {
        field.classList.add('error');
        const errorDiv = document.createElement('div');
        errorDiv.className = 'field-error';
        errorDiv.textContent = errorMessage;
        errorDiv.style.cssText = `
            color: #ef4444;
            font-size: 0.75rem;
            margin-top: 0.25rem;
            display: flex;
            align-items: center;
            gap: 0.25rem;
        `;
        errorDiv.innerHTML = `<i class="fas fa-exclamation-circle"></i> ${errorMessage}`;
        field.parentNode.appendChild(errorDiv);
    }
    
    return isValid;
}