// 创意空间页面特定脚本
document.addEventListener('DOMContentLoaded', function() {
    // 设置标签切换功能
    setupTabs();
    
    // 设置创意模态框
    setupCreativeModal();
});

// 设置标签切换功能
function setupTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // 更新活动按钮
            tabButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // 获取标签ID
            const tabId = button.getAttribute('data-tab');
            
            // 切换内容
            tabContents.forEach(content => {
                if (content.id === tabId) {
                    content.classList.add('active');
                } else {
                    content.classList.remove('active');
                }
            });
        });
    });
}

// 设置创意模态框
function setupCreativeModal() {
    const modal = document.getElementById('creative-modal');
    const modalBody = document.querySelector('.creative-modal-body');
    const closeModal = document.querySelector('.close-modal');
    const creativeLinks = document.querySelectorAll('.btn-view');
    
    // 打开模态框
    creativeLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // 获取创意作品信息
            const creativeTitle = this.closest('.creative-item').querySelector('h4').textContent;
            const creativeImage = this.closest('.creative-item').querySelector('img').src;
            
            // 创建模态框内容
            modalBody.innerHTML = `
                <h2>${creativeTitle}</h2>
                <div class="creative-modal-content">
                    <div class="creative-modal-image">
                        <img src="${creativeImage}" alt="${creativeTitle}">
                    </div>
                    <div class="creative-modal-details">
                        <p class="creative-date">创作时间：2023年</p>
                        <p>这个创意作品探索了[描述创意理念]，灵感来源于[描述灵感来源]。在创作过程中，我使用了[描述创作技巧或方法]，旨在表达[描述表达的理念或情感]。</p>
                        <div class="creative-features">
                            <h3>创意特点</h3>
                            <ul>
                                <li>特点一：[描述创意特点]</li>
                                <li>特点二：[描述创意特点]</li>
                                <li>特点三：[描述创意特点]</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="creative-modal-description">
                    <h3>创意背景</h3>
                    <p>这个创意的背景是[描述创意背景]。我希望通过这个作品[描述创作目的]。</p>
                    
                    <h3>创作过程</h3>
                    <p>在创作过程中，我首先[描述创作第一步]，然后[描述创作第二步]，最后[描述创作最后步骤]。</p>
                    
                    <h3>应用场景</h3>
                    <p>这个创意可以应用于[描述应用场景]，为[描述目标用户]提供[描述价值]。</p>
                </div>
            `;
            
            // 显示模态框
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden'; // 防止背景滚动
        });
    });
    
    // 关闭模态框
    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
        document.body.style.overflow = ''; // 恢复背景滚动
    });
    
    // 点击模态框外部关闭
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = ''; // 恢复背景滚动
        }
    });
}
