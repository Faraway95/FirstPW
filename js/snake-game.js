// 贪吃蛇游戏实现
document.addEventListener('DOMContentLoaded', function() {
    // 只在项目页面初始化游戏
    if (document.getElementById('snake-game-container')) {
        initSnakeGame();
    }
});

function initSnakeGame() {
    // 获取游戏容器
    const gameContainer = document.getElementById('snake-game-container');
    
    // 创建游戏画布
    const canvas = document.createElement('canvas');
    canvas.width = 400;
    canvas.height = 400;
    canvas.id = 'snake-game-canvas';
    gameContainer.appendChild(canvas);
    
    // 创建游戏信息显示区域
    const gameInfo = document.createElement('div');
    gameInfo.className = 'game-info';
    gameInfo.innerHTML = `
        <div class="score-container">
            <span>分数: </span>
            <span id="current-score">0</span>
        </div>
        <div class="controls">
            <button id="start-game">开始游戏</button>
            <button id="pause-game">暂停</button>
        </div>
        <div class="leaderboard-container">
            <h4>排行榜</h4>
            <ul id="leaderboard"></ul>
        </div>
    `;
    gameContainer.appendChild(gameInfo);
    
    // 游戏变量
    const ctx = canvas.getContext('2d');
    const gridSize = 20;
    const gridWidth = canvas.width / gridSize;
    const gridHeight = canvas.height / gridSize;
    
    let snake = [];
    let food = {};
    let direction = 'right';
    let nextDirection = 'right';
    let gameSpeed = 150;
    let gameInterval;
    let score = 0;
    let isPaused = false;
    let isGameOver = true;
    
    // 排行榜数据
    let leaderboard = JSON.parse(localStorage.getItem('snakeLeaderboard')) || [];
    
    // 初始化游戏
    function initGame() {
        // 初始化蛇
        snake = [
            {x: 5, y: 10},
            {x: 4, y: 10},
            {x: 3, y: 10}
        ];
        
        // 生成食物
        generateFood();
        
        // 重置游戏状态
        direction = 'right';
        nextDirection = 'right';
        score = 0;
        document.getElementById('current-score').textContent = score;
        isGameOver = false;
        isPaused = false;
        
        // 开始游戏循环
        clearInterval(gameInterval);
        gameInterval = setInterval(gameLoop, gameSpeed);
        
        // 更新按钮状态
        document.getElementById('start-game').textContent = '重新开始';
        document.getElementById('pause-game').disabled = false;
    }
    
    // 生成食物
    function generateFood() {
        // 随机位置
        let foodX, foodY;
        let validPosition = false;
        
        while (!validPosition) {
            foodX = Math.floor(Math.random() * gridWidth);
            foodY = Math.floor(Math.random() * gridHeight);
            
            // 确保食物不会出现在蛇身上
            validPosition = true;
            for (let i = 0; i < snake.length; i++) {
                if (snake[i].x === foodX && snake[i].y === foodY) {
                    validPosition = false;
                    break;
                }
            }
        }
        
        food = {
            x: foodX,
            y: foodY
        };
    }
    
    // 游戏主循环
    function gameLoop() {
        if (isPaused || isGameOver) return;
        
        // 更新方向
        direction = nextDirection;
        
        // 移动蛇
        const head = {x: snake[0].x, y: snake[0].y};
        
        switch (direction) {
            case 'up':
                head.y -= 1;
                break;
            case 'down':
                head.y += 1;
                break;
            case 'left':
                head.x -= 1;
                break;
            case 'right':
                head.x += 1;
                break;
        }
        
        // 检查碰撞
        if (
            head.x < 0 || head.x >= gridWidth ||
            head.y < 0 || head.y >= gridHeight ||
            checkCollision(head)
        ) {
            gameOver();
            return;
        }
        
        // 添加新头部
        snake.unshift(head);
        
        // 检查是否吃到食物
        if (head.x === food.x && head.y === food.y) {
            // 增加分数
            score += 10;
            document.getElementById('current-score').textContent = score;
            
            // 生成新食物
            generateFood();
            
            // 增加游戏速度
            if (score % 50 === 0 && gameSpeed > 50) {
                gameSpeed -= 10;
                clearInterval(gameInterval);
                gameInterval = setInterval(gameLoop, gameSpeed);
            }
        } else {
            // 如果没吃到食物，移除尾部
            snake.pop();
        }
        
        // 绘制游戏
        drawGame();
    }
    
    // 检查碰撞
    function checkCollision(position) {
        for (let i = 1; i < snake.length; i++) {
            if (position.x === snake[i].x && position.y === snake[i].y) {
                return true;
            }
        }
        return false;
    }
    
    // 绘制游戏
    function drawGame() {
        // 清空画布
        ctx.fillStyle = '#f0f7ff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // 绘制网格
        ctx.strokeStyle = '#e5e7eb';
        ctx.lineWidth = 0.5;
        
        for (let i = 0; i <= gridWidth; i++) {
            ctx.beginPath();
            ctx.moveTo(i * gridSize, 0);
            ctx.lineTo(i * gridSize, canvas.height);
            ctx.stroke();
        }
        
        for (let i = 0; i <= gridHeight; i++) {
            ctx.beginPath();
            ctx.moveTo(0, i * gridSize);
            ctx.lineTo(canvas.width, i * gridSize);
            ctx.stroke();
        }
        
        // 绘制食物
        ctx.fillStyle = '#ef4444';
        ctx.beginPath();
        ctx.arc(
            (food.x + 0.5) * gridSize,
            (food.y + 0.5) * gridSize,
            gridSize / 2 * 0.8,
            0,
            Math.PI * 2
        );
        ctx.fill();
        
        // 绘制蛇
        for (let i = 0; i < snake.length; i++) {
            // 蛇头用不同颜色
            if (i === 0) {
                ctx.fillStyle = '#1e3a8a';
            } else {
                // 蛇身渐变色
                const colorValue = Math.floor(150 + (105 * i / snake.length));
                ctx.fillStyle = `rgb(59, 130, ${colorValue})`;
            }
            
            // 圆角矩形
            roundRect(
                ctx,
                snake[i].x * gridSize + 1,
                snake[i].y * gridSize + 1,
                gridSize - 2,
                gridSize - 2,
                5,
                true
            );
            
            // 蛇头添加眼睛
            if (i === 0) {
                ctx.fillStyle = '#ffffff';
                
                // 根据方向确定眼睛位置
                let eyeX1, eyeY1, eyeX2, eyeY2;
                const eyeSize = gridSize / 5;
                const eyeOffset = gridSize / 3;
                
                switch (direction) {
                    case 'up':
                        eyeX1 = snake[i].x * gridSize + eyeOffset;
                        eyeY1 = snake[i].y * gridSize + eyeOffset;
                        eyeX2 = snake[i].x * gridSize + gridSize - eyeOffset - eyeSize;
                        eyeY2 = snake[i].y * gridSize + eyeOffset;
                        break;
                    case 'down':
                        eyeX1 = snake[i].x * gridSize + eyeOffset;
                        eyeY1 = snake[i].y * gridSize + gridSize - eyeOffset - eyeSize;
                        eyeX2 = snake[i].x * gridSize + gridSize - eyeOffset - eyeSize;
                        eyeY2 = snake[i].y * gridSize + gridSize - eyeOffset - eyeSize;
                        break;
                    case 'left':
                        eyeX1 = snake[i].x * gridSize + eyeOffset;
                        eyeY1 = snake[i].y * gridSize + eyeOffset;
                        eyeX2 = snake[i].x * gridSize + eyeOffset;
                        eyeY2 = snake[i].y * gridSize + gridSize - eyeOffset - eyeSize;
                        break;
                    case 'right':
                        eyeX1 = snake[i].x * gridSize + gridSize - eyeOffset - eyeSize;
                        eyeY1 = snake[i].y * gridSize + eyeOffset;
                        eyeX2 = snake[i].x * gridSize + gridSize - eyeOffset - eyeSize;
                        eyeY2 = snake[i].y * gridSize + gridSize - eyeOffset - eyeSize;
                        break;
                }
                
                ctx.beginPath();
                ctx.arc(eyeX1 + eyeSize/2, eyeY1 + eyeSize/2, eyeSize/2, 0, Math.PI * 2);
                ctx.arc(eyeX2 + eyeSize/2, eyeY2 + eyeSize/2, eyeSize/2, 0, Math.PI * 2);
                ctx.fill();
            }
        }
    }
    
    // 辅助函数：绘制圆角矩形
    function roundRect(ctx, x, y, width, height, radius, fill, stroke) {
        if (typeof stroke === 'undefined') {
            stroke = false;
        }
        if (typeof radius === 'undefined') {
            radius = 5;
        }
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
    
    // 游戏结束
    function gameOver() {
        isGameOver = true;
        clearInterval(gameInterval);
        
        // 显示游戏结束信息
        ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = '#ffffff';
        ctx.font = '30px Noto Sans SC';
        ctx.textAlign = 'center';
        ctx.fillText('游戏结束', canvas.width / 2, canvas.height / 2 - 30);
        
        ctx.font = '20px Noto Sans SC';
        ctx.fillText(`最终得分: ${score}`, canvas.width / 2, canvas.height / 2 + 10);
        
        ctx.font = '16px Noto Sans SC';
        ctx.fillText('点击"开始游戏"重新开始', canvas.width / 2, canvas.height / 2 + 50);
        
        // 更新排行榜
        updateLeaderboard(score);
    }
    
    // 更新排行榜
    function updateLeaderboard(score) {
        // 创建玩家名称
        const playerName = `玩家${Math.floor(Math.random() * 1000)}`;
        
        // 添加新分数
        leaderboard.push({
            name: playerName,
            score: score,
            date: new Date().toLocaleDateString()
        });
        
        // 按分数排序
        leaderboard.sort((a, b) => b.score - a.score);
        
        // 只保留前10名
        if (leaderboard.length > 10) {
            leaderboard = leaderboard.slice(0, 10);
        }
        
        // 保存到本地存储
        localStorage.setItem('snakeLeaderboard', JSON.stringify(leaderboard));
        
        // 更新显示
        displayLeaderboard();
    }
    
    // 显示排行榜
    function displayLeaderboard() {
        const leaderboardElement = document.getElementById('leaderboard');
        leaderboardElement.innerHTML = '';
        
        leaderboard.forEach((entry, index) => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `
                <span class="rank">${index + 1}</span>
                <span class="name">${entry.name}</span>
                <span class="score">${entry.score}</span>
            `;
            leaderboardElement.appendChild(listItem);
        });
    }
    
    // 键盘控制
    document.addEventListener('keydown', function(event) {
        if (isGameOver) return;
        
        switch (event.key) {
            case 'ArrowUp':
                if (direction !== 'down') {
                    nextDirection = 'up';
                }
                event.preventDefault();
                break;
            case 'ArrowDown':
                if (direction !== 'up') {
                    nextDirection = 'down';
                }
                event.preventDefault();
                break;
            case 'ArrowLeft':
                if (direction !== 'right') {
                    nextDirection = 'left';
                }
                event.preventDefault();
                break;
            case 'ArrowRight':
                if (direction !== 'left') {
                    nextDirection = 'right';
                }
                event.preventDefault();
                break;
            case ' ':
                // 空格键暂停/继续
                togglePause();
                event.preventDefault();
                break;
        }
    });
    
    // 触摸控制（移动设备）
    let touchStartX = 0;
    let touchStartY = 0;
    
    canvas.addEventListener('touchstart', function(event) {
        touchStartX = event.touches[0].clientX;
        touchStartY = event.touches[0].clientY;
        event.preventDefault();
    }, false);
    
    canvas.addEventListener('touchmove', function(event) {
        if (isGameOver) return;
        
        const touchEndX = event.touches[0].clientX;
        const touchEndY = event.touches[0].clientY;
        
        const dx = touchEndX - touchStartX;
        const dy = touchEndY - touchStartY;
        
        // 确定滑动方向
        if (Math.abs(dx) > Math.abs(dy)) {
            // 水平滑动
            if (dx > 0 && direction !== 'left') {
                nextDirection = 'right';
            } else if (dx < 0 && direction !== 'right') {
                nextDirection = 'left';
            }
        } else {
            // 垂直滑动
            if (dy > 0 && direction !== 'up') {
                nextDirection = 'down';
            } else if (dy < 0 && direction !== 'down') {
                nextDirection = 'up';
            }
        }
        
        event.preventDefault();
    }, false);
    
    // 暂停/继续游戏
    function togglePause() {
        if (isGameOver) return;
        
        isPaused = !isPaused;
        
        if (isPaused) {
            clearInterval(gameInterval);
            document.getElementById('pause-game').textContent = '继续';
            
            // 显示暂停信息
            ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            ctx.fillStyle = '#ffffff';
            ctx.font = '30px Noto Sans SC';
            ctx.textAlign = 'center';
            ctx.fillText('游戏暂停', canvas.width / 2, canvas.height / 2);
        } else {
            gameInterval = setInterval(gameLoop, gameSpeed);
            document.getElementById('pause-game').textContent = '暂停';
        }
    }
    
    // 按钮事件
    document.getElementById('start-game').addEventListener('click', initGame);
    
    document.getElementById('pause-game').addEventListener('click', togglePause);
    
    // 初始化排行榜
    displayLeaderboard();
    
    // 初始绘制游戏界面
    drawGame();
}
