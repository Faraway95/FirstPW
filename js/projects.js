// 项目经历页面特定脚本
document.addEventListener('DOMContentLoaded', function() {
    // 设置项目筛选功能
    setupProjectFilters();
    
    // 设置项目模态框
    setupProjectModal();
});

// 设置项目筛选功能
function setupProjectFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // 更新活动按钮
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // 获取筛选类别
            const filter = button.getAttribute('data-filter');
            
            // 筛选项目卡片
            projectCards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-category') === filter) {
                    card.style.display = 'block';
                    // 添加淡入动画
                    card.classList.add('fade-in');
                } else {
                    card.style.display = 'none';
                    card.classList.remove('fade-in');
                }
            });
        });
    });
}

// 设置项目模态框
function setupProjectModal() {
    const modal = document.getElementById('project-modal');
    const modalBody = document.querySelector('.project-modal-body');
    const closeModal = document.querySelector('.close-modal');
    const projectLinks = document.querySelectorAll('.project-btn, .btn-sm');
    
    // 打开模态框
    projectLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // 获取项目信息（在实际应用中，这些信息可能来自数据库或API）
            const projectTitle = this.closest('.project-item, .project-card, .featured-project-content').querySelector('h3').textContent;
            
            // 创建模态框内容
            modalBody.innerHTML = `
                <h2>${projectTitle}</h2>
                <div class="project-modal-info">
                    <div class="project-modal-image">
                        <img src="images/project1.jpg" alt="${projectTitle}">
                    </div>
                    <div class="project-modal-details">
                        <div class="project-meta">
                            <span class="project-category">项目类别</span>
                            <span class="project-date">2023</span>
                        </div>
                        <p>这是一个详细的项目描述。在这个项目中，我负责[描述您的角色和贡献]，成功解决了[描述您解决的问题]。该项目的主要目标是[描述项目目标]，通过[描述您的方法]，我们成功实现了[描述项目成果]。</p>
                        <div class="project-highlights">
                            <div class="highlight-item">
                                <i class="fas fa-star"></i>
                                <span>亮点一：[描述项目亮点]</span>
                            </div>
                            <div class="highlight-item">
                                <i class="fas fa-star"></i>
                                <span>亮点二：[描述项目亮点]</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="project-modal-content">
                    <h3>项目背景</h3>
                    <p>这个项目的背景是[描述项目背景]。客户需要[描述客户需求]，面临的挑战是[描述挑战]。</p>
                    
                    <h3>解决方案</h3>
                    <p>我提出的解决方案是[描述解决方案]。这个方案的创新点在于[描述创新点]。</p>
                    
                    <h3>实施过程</h3>
                    <p>在实施过程中，我采用了[描述实施方法]。主要步骤包括[描述主要步骤]。</p>
                    
                    <h3>成果</h3>
                    <p>项目最终取得了[描述项目成果]。客户对结果非常满意，并且[描述客户反馈]。</p>
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
