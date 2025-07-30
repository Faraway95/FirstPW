// 三维弹球游戏实现
document.addEventListener('DOMContentLoaded', function() {
    // 只在项目页面初始化游戏
    if (document.getElementById('pinball-game-container')) {
        initPinballGame();
    }
});

class PinballGame {
    constructor() {
        this.canvas = null;
        this.ctx = null;
        this.width = 500;
        this.height = 700;
        this.gameRunning = false;
        this.gamePaused = false;
        this.animationId = null;
        
        // 游戏状态
        this.score = 0;
        this.highScore = localStorage.getItem('pinball-high-score') || 0;
        this.ballsLeft = 3;
        this.multiplier = 1;
        
        // 物理属性
        this.gravity = 0.3;
        this.friction = 0.99;
        this.ballRadius = 8;
        
        // 游戏对象
        this.ball = null;
        this.flippers = [];
        this.targets = [];
        this.walls = [];
        this.particles = [];
        
        // 输入状态
        this.keys = {
            left: false,
            right: false,
            space: false
        };
        
        this.initializeGame();
    }
    
    initializeGame() {
        this.createCanvas();
        this.createGameObjects();
        this.bindEvents();
        this.updateUI();
        this.gameLoop();
    }
    
    createCanvas() {
        const container = document.getElementById('pinball-game-container');
        this.canvas = document.createElement('canvas');
        this.canvas.id = 'pinball-canvas';
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        this.ctx = this.canvas.getContext('2d');
        container.appendChild(this.canvas);
    }
    
    createGameObjects() {
        // 创建弹球
        this.resetBall();
        
        // 创建挡板
        this.flippers = [
            {
                x: this.width * 0.3,
                y: this.height - 80,
                width: 80,
                height: 15,
                angle: 0,
                maxAngle: 45,
                side: 'left',
                active: false
            },
            {
                x: this.width * 0.7,
                y: this.height - 80,
                width: 80,
                height: 15,
                angle: 0,
                maxAngle: -45,
                side: 'right',
                active: false
            }
        ];
        
        // 创建目标
        this.targets = [
            { x: 100, y: 200, radius: 20, color: '#3498db', points: 10, hit: false },
            { x: 200, y: 150, radius: 25, color: '#e74c3c', points: 25, hit: false },
            { x: 300, y: 180, radius: 20, color: '#3498db', points: 10, hit: false },
            { x: 400, y: 200, radius: 20, color: '#3498db', points: 10, hit: false },
            { x: 250, y: 300, radius: 30, color: '#f39c12', points: 50, hit: false },
            { x: 150, y: 350, radius: 15, color: '#e74c3c', points: 25, hit: false },
            { x: 350, y: 350, radius: 15, color: '#e74c3c', points: 25, hit: false }
        ];
        
        // 创建墙壁和边界
        this.walls = [
            // 左右边界
            { x1: 0, y1: 0, x2: 0, y2: this.height },
            { x1: this.width, y1: 0, x2: this.width, y2: this.height },
            // 顶部
            { x1: 0, y1: 0, x2: this.width, y2: 0 },
            // 倾斜侧壁
            { x1: 50, y1: this.height - 150, x2: 50, y2: this.height - 50 },
            { x1: this.width - 50, y1: this.height - 150, x2: this.width - 50, y2: this.height - 50 }
        ];
    }
    
    resetBall() {
        this.ball = {
            x: this.width - 30,
            y: this.height - 200,
            vx: 0,
            vy: 0,
            launched: false,
            trail: []
        };
    }
    
    bindEvents() {
        // 键盘事件
        document.addEventListener('keydown', (e) => {
            switch(e.code) {
                case 'KeyA':
                    this.keys.left = true;
                    this.activateFlipper('left');
                    break;
                case 'KeyD':
                    this.keys.right = true;
                    this.activateFlipper('right');
                    break;
                case 'Space':
                    e.preventDefault();
                    this.keys.space = true;
                    this.launchBall();
                    break;
            }
        });
        
        document.addEventListener('keyup', (e) => {
            switch(e.code) {
                case 'KeyA':
                    this.keys.left = false;
                    this.deactivateFlipper('left');
                    break;
                case 'KeyD':
                    this.keys.right = false;
                    this.deactivateFlipper('right');
                    break;
                case 'Space':
                    this.keys.space = false;
                    break;
            }
        });
        
        // 按钮事件
        document.getElementById('start-pinball').addEventListener('click', () => this.startGame());
        document.getElementById('pause-pinball').addEventListener('click', () => this.togglePause());
        document.getElementById('reset-pinball').addEventListener('click', () => this.resetGame());
        document.getElementById('left-flipper').addEventListener('mousedown', () => this.activateFlipper('left'));
        document.getElementById('left-flipper').addEventListener('mouseup', () => this.deactivateFlipper('left'));
        document.getElementById('right-flipper').addEventListener('mousedown', () => this.activateFlipper('right'));
        document.getElementById('right-flipper').addEventListener('mouseup', () => this.deactivateFlipper('right'));
        document.getElementById('launch-ball').addEventListener('click', () => this.launchBall());
    }
    
    startGame() {
        this.gameRunning = true;
        this.gamePaused = false;
        this.score = 0;
        this.ballsLeft = 3;
        this.multiplier = 1;
        this.resetTargets();
        this.resetBall();
        this.updateUI();
    }
    
    togglePause() {
        this.gamePaused = !this.gamePaused;
    }
    
    resetGame() {
        this.gameRunning = false;
        this.gamePaused = false;
        this.score = 0;
        this.ballsLeft = 3;
        this.multiplier = 1;
        this.resetTargets();
        this.resetBall();
        this.updateUI();
    }
    
    resetTargets() {
        this.targets.forEach(target => {
            target.hit = false;
        });
    }
    
    launchBall() {
        if (!this.ball.launched && this.gameRunning && !this.gamePaused) {
            this.ball.vx = -3 + Math.random() * 2;
            this.ball.vy = -15 - Math.random() * 5;
            this.ball.launched = true;
        }
    }
    
    activateFlipper(side) {
        const flipper = this.flippers.find(f => f.side === side);
        if (flipper) {
            flipper.active = true;
        }
    }
    
    deactivateFlipper(side) {
        const flipper = this.flippers.find(f => f.side === side);
        if (flipper) {
            flipper.active = false;
        }
    }
    
    gameLoop() {
        this.update();
        this.draw();
        this.animationId = requestAnimationFrame(() => this.gameLoop());
    }
    
    update() {
        if (!this.gameRunning || this.gamePaused) return;
        
        // 更新弹球物理
        this.updateBall();
        
        // 更新挡板
        this.updateFlippers();
        
        // 更新粒子效果
        this.updateParticles();
        
        // 检测碰撞
        this.checkCollisions();
        
        // 检查游戏状态
        this.checkGameState();
    }
    
    updateBall() {
        if (!this.ball.launched) return;
        
        // 应用重力
        this.ball.vy += this.gravity;
        
        // 应用摩擦力
        this.ball.vx *= this.friction;
        
        // 更新位置
        this.ball.x += this.ball.vx;
        this.ball.y += this.ball.vy;
        
        // 添加轨迹点
        this.ball.trail.push({ x: this.ball.x, y: this.ball.y });
        if (this.ball.trail.length > 5) {
            this.ball.trail.shift();
        }
        
        // 边界碰撞
        if (this.ball.x <= this.ballRadius) {
            this.ball.x = this.ballRadius;
            this.ball.vx = -this.ball.vx * 0.8;
        }
        if (this.ball.x >= this.width - this.ballRadius) {
            this.ball.x = this.width - this.ballRadius;
            this.ball.vx = -this.ball.vx * 0.8;
        }
        if (this.ball.y <= this.ballRadius) {
            this.ball.y = this.ballRadius;
            this.ball.vy = -this.ball.vy * 0.8;
        }
        
        // 球掉落
        if (this.ball.y > this.height + 50) {
            this.ballLost();
        }
    }
    
    updateFlippers() {
        this.flippers.forEach(flipper => {
            if (flipper.active) {
                flipper.angle = Math.min(flipper.angle + 5, Math.abs(flipper.maxAngle)) * Math.sign(flipper.maxAngle);
            } else {
                flipper.angle *= 0.8;
            }
        });
    }
    
    updateParticles() {
        this.particles = this.particles.filter(particle => {
            particle.x += particle.vx;
            particle.y += particle.vy;
            particle.vy += 0.1;
            particle.life--;
            particle.alpha = particle.life / particle.maxLife;
            return particle.life > 0;
        });
    }
    
    checkCollisions() {
        // 目标碰撞
        this.targets.forEach(target => {
            if (!target.hit) {
                const dx = this.ball.x - target.x;
                const dy = this.ball.y - target.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < this.ballRadius + target.radius) {
                    target.hit = true;
                    this.score += target.points * this.multiplier;
                    this.multiplier = Math.min(this.multiplier + 0.5, 5);
                    
                    // 创建粒子效果
                    this.createParticles(target.x, target.y, target.color);
                    
                    // 创建分数弹出
                    this.createScorePopup(target.x, target.y, target.points);
                    
                    // 反弹
                    const angle = Math.atan2(dy, dx);
                    const speed = Math.sqrt(this.ball.vx * this.ball.vx + this.ball.vy * this.ball.vy);
                    this.ball.vx = Math.cos(angle) * speed * 1.2;
                    this.ball.vy = Math.sin(angle) * speed * 1.2;
                    
                    this.updateUI();
                }
            }
        });
        
        // 挡板碰撞
        this.flippers.forEach(flipper => {
            const flipperCenterX = flipper.x + flipper.width / 2;
            const flipperCenterY = flipper.y + flipper.height / 2;
            
            const dx = this.ball.x - flipperCenterX;
            const dy = this.ball.y - flipperCenterY;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < this.ballRadius + flipper.width / 2 && 
                this.ball.y > flipper.y - 20 && this.ball.y < flipper.y + flipper.height + 20) {
                
                // 计算反弹角度和力度
                const angle = Math.atan2(dy, dx) + (flipper.angle * Math.PI / 180);
                const power = flipper.active ? 15 : 8;
                
                this.ball.vx = Math.cos(angle) * power;
                this.ball.vy = Math.sin(angle) * power * -1;
                
                // 创建火花效果
                this.createParticles(this.ball.x, this.ball.y, '#ffffff');
            }
        });
    }
    
    createParticles(x, y, color) {
        for (let i = 0; i < 10; i++) {
            this.particles.push({
                x: x,
                y: y,
                vx: (Math.random() - 0.5) * 10,
                vy: (Math.random() - 0.5) * 10,
                color: color,
                life: 30,
                maxLife: 30,
                alpha: 1
            });
        }
    }
    
    createScorePopup(x, y, points) {
        const popup = document.createElement('div');
        popup.className = 'score-popup';
        popup.textContent = `+${points}`;
        popup.style.left = (x / this.width * 100) + '%';
        popup.style.top = (y / this.height * 100) + '%';
        
        document.getElementById('pinball-game-container').appendChild(popup);
        
        setTimeout(() => {
            if (popup.parentNode) {
                popup.parentNode.removeChild(popup);
            }
        }, 1000);
    }
    
    checkGameState() {
        // 检查是否所有目标都被击中
        const allHit = this.targets.every(target => target.hit);
        if (allHit) {
            this.resetTargets();
            this.multiplier += 1;
            this.score += 100 * this.multiplier;
            this.updateUI();
        }
    }
    
    ballLost() {
        this.ballsLeft--;
        this.multiplier = 1;
        
        if (this.ballsLeft <= 0) {
            this.gameOver();
        } else {
            this.resetBall();
        }
        
        this.updateUI();
    }
    
    gameOver() {
        this.gameRunning = false;
        
        if (this.score > this.highScore) {
            this.highScore = this.score;
            localStorage.setItem('pinball-high-score', this.highScore);
        }
        
        this.updateUI();
        
        setTimeout(() => {
            alert(`游戏结束！\n最终分数: ${this.score}\n最高分: ${this.highScore}`);
        }, 100);
    }
    
    updateUI() {
        document.getElementById('current-score').textContent = this.score;
        document.getElementById('high-score').textContent = this.highScore;
        document.getElementById('balls-left').textContent = this.ballsLeft;
    }
    
    draw() {
        // 清空画布
        this.ctx.fillStyle = 'linear-gradient(45deg, #1a1a2e, #16213e)';
        this.ctx.fillRect(0, 0, this.width, this.height);
        
        // 绘制渐变背景
        const gradient = this.ctx.createLinearGradient(0, 0, this.width, this.height);
        gradient.addColorStop(0, '#1a1a2e');
        gradient.addColorStop(0.5, '#16213e');
        gradient.addColorStop(1, '#0f3460');
        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(0, 0, this.width, this.height);
        
        // 绘制星空背景
        this.drawStars();
        
        // 绘制目标
        this.drawTargets();
        
        // 绘制挡板
        this.drawFlippers();
        
        // 绘制墙壁
        this.drawWalls();
        
        // 绘制弹球轨迹
        this.drawBallTrail();
        
        // 绘制弹球
        this.drawBall();
        
        // 绘制粒子效果
        this.drawParticles();
        
        // 绘制UI元素
        this.drawUI();
    }
    
    drawStars() {
        this.ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        for (let i = 0; i < 50; i++) {
            const x = (i * 137.508) % this.width;
            const y = (i * 97.338) % this.height;
            const size = Math.sin(Date.now() * 0.001 + i) * 0.5 + 1;
            this.ctx.beginPath();
            this.ctx.arc(x, y, size, 0, Math.PI * 2);
            this.ctx.fill();
        }
    }
    
    drawTargets() {
        this.targets.forEach(target => {
            if (!target.hit) {
                // 绘制目标光晕
                const glowGradient = this.ctx.createRadialGradient(
                    target.x, target.y, 0,
                    target.x, target.y, target.radius * 2
                );
                glowGradient.addColorStop(0, target.color + '80');
                glowGradient.addColorStop(1, 'transparent');
                
                this.ctx.fillStyle = glowGradient;
                this.ctx.beginPath();
                this.ctx.arc(target.x, target.y, target.radius * 2, 0, Math.PI * 2);
                this.ctx.fill();
                
                // 绘制目标本体
                this.ctx.fillStyle = target.color;
                this.ctx.beginPath();
                this.ctx.arc(target.x, target.y, target.radius, 0, Math.PI * 2);
                this.ctx.fill();
                
                // 绘制目标边框
                this.ctx.strokeStyle = '#ffffff';
                this.ctx.lineWidth = 2;
                this.ctx.stroke();
                
                // 绘制分数
                this.ctx.fillStyle = 'white';
                this.ctx.font = 'bold 12px Arial';
                this.ctx.textAlign = 'center';
                this.ctx.fillText(target.points, target.x, target.y + 4);
            }
        });
    }
    
    drawFlippers() {
        this.flippers.forEach(flipper => {
            this.ctx.save();
            
            const centerX = flipper.x + flipper.width / 2;
            const centerY = flipper.y + flipper.height / 2;
            
            this.ctx.translate(centerX, centerY);
            this.ctx.rotate(flipper.angle * Math.PI / 180);
            
            // 绘制挡板阴影
            this.ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
            this.ctx.fillRect(-flipper.width / 2 + 2, -flipper.height / 2 + 2, flipper.width, flipper.height);
            
            // 绘制挡板本体
            const flipperGradient = this.ctx.createLinearGradient(0, -flipper.height / 2, 0, flipper.height / 2);
            flipperGradient.addColorStop(0, '#e74c3c');
            flipperGradient.addColorStop(1, '#c0392b');
            
            this.ctx.fillStyle = flipperGradient;
            this.ctx.fillRect(-flipper.width / 2, -flipper.height / 2, flipper.width, flipper.height);
            
            // 绘制挡板高光
            this.ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
            this.ctx.fillRect(-flipper.width / 2, -flipper.height / 2, flipper.width, 3);
            
            this.ctx.restore();
        });
    }
    
    drawWalls() {
        this.ctx.strokeStyle = '#667eea';
        this.ctx.lineWidth = 4;
        this.ctx.shadowColor = '#667eea';
        this.ctx.shadowBlur = 10;
        
        this.walls.forEach(wall => {
            this.ctx.beginPath();
            this.ctx.moveTo(wall.x1, wall.y1);
            this.ctx.lineTo(wall.x2, wall.y2);
            this.ctx.stroke();
        });
        
        this.ctx.shadowBlur = 0;
    }
    
    drawBallTrail() {
        if (this.ball.trail.length > 1) {
            this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
            this.ctx.lineWidth = 2;
            this.ctx.beginPath();
            this.ctx.moveTo(this.ball.trail[0].x, this.ball.trail[0].y);
            
            for (let i = 1; i < this.ball.trail.length; i++) {
                this.ctx.lineTo(this.ball.trail[i].x, this.ball.trail[i].y);
            }
            
            this.ctx.stroke();
        }
    }
    
    drawBall() {
        // 绘制球的阴影
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
        this.ctx.beginPath();
        this.ctx.arc(this.ball.x + 2, this.ball.y + 2, this.ballRadius, 0, Math.PI * 2);
        this.ctx.fill();
        
        // 绘制球的光晕
        const ballGlow = this.ctx.createRadialGradient(
            this.ball.x, this.ball.y, 0,
            this.ball.x, this.ball.y, this.ballRadius * 3
        );
        ballGlow.addColorStop(0, 'rgba(255, 255, 255, 0.8)');
        ballGlow.addColorStop(1, 'transparent');
        
        this.ctx.fillStyle = ballGlow;
        this.ctx.beginPath();
        this.ctx.arc(this.ball.x, this.ball.y, this.ballRadius * 3, 0, Math.PI * 2);
        this.ctx.fill();
        
        // 绘制球本体
        const ballGradient = this.ctx.createRadialGradient(
            this.ball.x - 3, this.ball.y - 3, 0,
            this.ball.x, this.ball.y, this.ballRadius
        );
        ballGradient.addColorStop(0, '#ffffff');
        ballGradient.addColorStop(0.3, '#f8f8f8');
        ballGradient.addColorStop(1, '#d0d0d0');
        
        this.ctx.fillStyle = ballGradient;
        this.ctx.beginPath();
        this.ctx.arc(this.ball.x, this.ball.y, this.ballRadius, 0, Math.PI * 2);
        this.ctx.fill();
        
        // 绘制球的高光
        this.ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        this.ctx.beginPath();
        this.ctx.arc(this.ball.x - 2, this.ball.y - 2, 3, 0, Math.PI * 2);
        this.ctx.fill();
    }
    
    drawParticles() {
        this.particles.forEach(particle => {
            this.ctx.save();
            this.ctx.globalAlpha = particle.alpha;
            this.ctx.fillStyle = particle.color;
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, 2, 0, Math.PI * 2);
            this.ctx.fill();
            this.ctx.restore();
        });
    }
    
    drawUI() {
        // 绘制倍数指示器
        if (this.multiplier > 1) {
            this.ctx.fillStyle = 'rgba(241, 196, 15, 0.9)';
            this.ctx.font = 'bold 20px Arial';
            this.ctx.textAlign = 'center';
            this.ctx.fillText(`${this.multiplier}x`, this.width / 2, 50);
        }
        
        // 绘制游戏状态
        if (!this.gameRunning) {
            this.ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
            this.ctx.fillRect(0, 0, this.width, this.height);
            
            this.ctx.fillStyle = 'white';
            this.ctx.font = 'bold 24px Arial';
            this.ctx.textAlign = 'center';
            this.ctx.fillText('点击开始游戏', this.width / 2, this.height / 2);
        } else if (this.gamePaused) {
            this.ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
            this.ctx.fillRect(0, 0, this.width, this.height);
            
            this.ctx.fillStyle = 'white';
            this.ctx.font = 'bold 24px Arial';
            this.ctx.textAlign = 'center';
            this.ctx.fillText('游戏暂停', this.width / 2, this.height / 2);
        }
    }
}

function initPinballGame() {
    const game = new PinballGame();
}