document.addEventListener('DOMContentLoaded', () => {
    // 背景元素动画
    gsap.to(".circle-1", {
        duration: 20,
        x: 100,
        y: 50,
        rotation: 360,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
    });

    gsap.to(".circle-2", {
        duration: 15,
        x: -80,
        y: -30,
        rotation: -180,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
    });

    gsap.to(".circle-3", {
        duration: 25,
        x: 50,
        y: -20,
        rotation: 270,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
    });

    gsap.to(".square-1", {
        duration: 18,
        x: -60,
        y: 40,
        rotation: 45,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
    });

    gsap.to(".square-2", {
        duration: 22,
        x: 70,
        y: -30,
        rotation: -30,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
    });

    gsap.to(".triangle-1", {
        duration: 20,
        x: -40,
        y: 60,
        rotation: 120,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
    });

    // 初始化GSAP插件
    gsap.registerPlugin(ScrollTrigger);
    
    // 页面切换
    const navLinks = document.querySelectorAll('.nav-links a');
    const pageSections = document.querySelectorAll('.page-section');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            
            // 更新导航状态
            navLinks.forEach(navLink => navLink.classList.remove('active'));
            link.classList.add('active');
            
            // 切换页面
            pageSections.forEach(section => {
                section.classList.remove('active');
                if (section.id === targetId.substring(1)) {
                    section.classList.add('active');
                }
            });
            
            // 平滑滚动到顶部
            gsap.to(window, {
                scrollTo: 0,
                duration: 0.5
            });
        });
    });
    
    // 项目卡片交互
    const projectCards = document.querySelectorAll('.project-card');
    const projectDetailLayer = document.querySelector('.project-detail-layer');
    const closeDetailBtns = document.querySelectorAll('.close-detail');
    
    projectCards.forEach(card => {
        card.addEventListener('click', () => {
            const projectId = card.getAttribute('data-project');
            const projectDetail = document.querySelector(`[data-project-detail="${projectId}"]`);
            
            // 显示对应的项目详情
            document.querySelectorAll('.project-detail').forEach(detail => {
                detail.style.display = 'none';
            });
            
            projectDetail.style.display = 'block';
            projectDetailLayer.classList.add('active');
            
            // 动画效果
            gsap.from(projectDetail, {
                y: 50,
                opacity: 0,
                duration: 0.5,
                ease: "power2.out"
            });
        });
    });
    
    // 关闭详情层
    closeDetailBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            gsap.to(projectDetailLayer, {
                opacity: 0,
                duration: 0.3,
                onComplete: () => {
                    projectDetailLayer.classList.remove('active');
                }
            });
        });
    });
    
    // 点击详情层外部关闭
    projectDetailLayer.addEventListener('click', (e) => {
        if (e.target === projectDetailLayer) {
            gsap.to(projectDetailLayer, {
                opacity: 0,
                duration: 0.3,
                onComplete: () => {
                    projectDetailLayer.classList.remove('active');
                }
            });
        }
    });
    
    // 英雄区域卡片动画
    const heroCards = document.querySelectorAll('.hero-card');
    
    heroCards.forEach((card, index) => {
        gsap.from(card, {
            y: 50,
            opacity: 0,
            duration: 0.8,
            delay: index * 0.15,
            ease: "back.out(1.2)"
        });
    });
    
    // 滚动触发动画
    gsap.utils.toArray('.project-card').forEach((card, i) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: "top 80%",
                toggleActions: "play none none none"
            },
            y: 50,
            opacity: 0,
            duration: 0.8,
            delay: i * 0.1,
            ease: "back.out(1.2)"
        });
    });
    
    // 卡片悬停效果
    document.querySelectorAll('.hero-card:not(.image-card)').forEach(card => {
        card.addEventListener('mouseenter', () => {
            gsap.to(card, {
                y: -5,
                duration: 0.3,
                ease: "power2.out"
            });
        });
        
        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                y: 0,
                duration: 0.3,
                ease: "power2.out"
            });
        });
    });
});
