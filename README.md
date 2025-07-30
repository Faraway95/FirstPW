# 🌟 远在咫尺 - 个人作品集网站

一个现代化、响应式的个人作品集网站，采用HTML5、CSS3和原生JavaScript构建。网站以"远在咫尺"为主题，意寓着通过技术让远方的梦想触手可及。

![网站预览](images/hero-bg.jpg)

## 🎮 关于我

我是一名游戏行业8年从业者，目前在艺电（EA）担任游戏发行经理，正在转型成为独立游戏开发者。热爱创造有意义的数字体验，致力于用游戏连接人心。

## ✨ 网站特色

### 首页设计
- **现代简洁风格**：参照优秀设计案例，打造沉稳而富有创造性的视觉体验
- **柔和色彩搭配**：使用紫蓝色渐变主题，营造温和专业的氛围
- **丝滑动画效果**：包含AOS滚动动画、代码打字机效果、浮动元素等
- **响应式设计**：完美适配桌面端、平板和移动设备

### 功能亮点

#### 🚀 交互体验
- 导航栏滚动隐藏/显示效果
- 平滑滚动和页面过渡动画
- 鼠标跟随效果（桌面端）
- 滚动进度指示器

#### 📱 移动端优化
- 侧滑式移动导航菜单
- 触摸友好的交互设计
- 响应式布局适配

#### 🎯 内容展示
- **Hero区域**：展示个人介绍和职业定位
- **理念展示**：创新思维、精工细作、情感连接
- **技能展示**：游戏发行、开发技术、商业策略、团队协作
- **项目状态**：当前开发项目的实时进度

## 🛠️ 技术栈

- **前端**: HTML5, CSS3, JavaScript (ES6+)
- **动画库**: AOS (Animate On Scroll)
- **字体**: Noto Sans SC (中文优化)
- **图标**: Font Awesome 6
- **设计**: CSS Grid, Flexbox, CSS Variables

## 📂 项目结构

```
Personal Website/
├── index.html              # 全新设计的首页
├── resume.html             # 个人简历页面  
├── projects.html           # 项目经历展示
├── contact.html            # 联系方式页面
├── css/
│   ├── homepage.css        # 首页专用样式
│   ├── navigation.css      # 导航组件样式
│   ├── animations.css      # 动画效果样式
│   └── ...                 # 其他页面样式
├── js/
│   ├── homepage.js         # 首页交互逻辑
│   ├── script.js           # 通用脚本
│   └── ...                 # 其他功能脚本
└── images/                 # 图片资源
```

## 🚀 快速开始

### 方法1：直接访问（推荐）
1. 下载所有文件到本地目录
2. 双击 `index.html` 文件在浏览器中打开
3. 开始探索网站！

### 方法2：本地服务器（推荐用于开发）
```bash
# 使用Python内置服务器
python -m http.server 8000

# 或使用Node.js的http-server
npx http-server

# 然后在浏览器访问 http://localhost:8000
```

### 方法3：VS Code Live Server
1. 在VS Code中安装Live Server扩展
2. 右键点击 `index.html`
3. 选择"Open with Live Server"

## 🎨 个性化定制指南

### 📝 修改文本内容

#### 1. 首页内容修改
**文件位置**：`index.html`

**网站标题和描述**：
```html
<!-- 第22行左右 -->
<h1>远在咫尺</h1>

<!-- 第45-47行左右 -->
<h2>远在咫尺</h2>
<p>探索创意，连接世界，让远方触手可及</p>
```

**卡片标题和描述**：
```html
<!-- 第52-55行左右 - 关于我卡片 -->
<h3>关于我</h3>
<p>探索我的故事与专业之旅</p>

<!-- 第60-63行左右 - 项目经历卡片 -->
<h3>项目经历</h3>
<p>我设计过的游戏、内容与工作</p>

<!-- 第68-71行左右 - 创意空间卡片 -->
<h3>创意空间</h3>
<p>我的设计理念与创新想法</p>

<!-- 第76-79行左右 - 联系卡片 -->
<h3>联系</h3>
<p>与我取得联系</p>
```

#### 2. 关于我页面修改
**文件位置**：`about.html`

**个人信息修改**：
```html
<!-- 第65-75行左右 -->
<p class="about-greeting">您好，我是<span class="highlight">你的姓名</span></p>
<p class="about-title">一位充满热情的<span class="highlight">你的职业</span></p>
<p class="about-description">
    我专注于<span class="highlight">你的专业领域</span>，致力于<span class="highlight">你的目标</span>。
    我拥有丰富的行业经验，精通相关技能...
</p>
```

**技能标签修改**：
```html
<!-- 第82-88行左右 -->
<div class="skill-tags">
    <span class="skill-tag">你的技能1</span>
    <span class="skill-tag">你的技能2</span>
    <span class="skill-tag">你的技能3</span>
    <!-- 可以添加更多技能标签 -->
</div>
```

#### 3. 简历页面修改
**文件位置**：`resume.html`

**个人信息修改**：
```html
<!-- 第67-80行左右 -->
<h3>你的姓名</h3>
<p class="job-title">你的职位</p>
<div class="contact-info">
    <div class="contact-item">
        <i class="fas fa-envelope"></i>
        <span>你的邮箱@example.com</span>
    </div>
    <div class="contact-item">
        <i class="fas fa-phone"></i>
        <span>你的电话号码</span>
    </div>
    <!-- 可以添加更多联系方式 -->
</div>
```

**工作经验修改**：
```html
<!-- 第105-125行左右 -->
<div class="timeline-item">
    <div class="timeline-date">工作时间段</div>
    <div class="timeline-content">
        <h4>职位名称</h4>
        <p class="company">公司名称 | 工作地点</p>
        <ul class="responsibilities">
            <li>工作职责1</li>
            <li>工作职责2</li>
            <li>工作成就</li>
        </ul>
    </div>
</div>
```

#### 4. 项目页面修改
**文件位置**：`projects.html`

**项目卡片修改**：
```html
<!-- 第103-125行左右 -->
<div class="project-card" data-category="分类名">
    <div class="project-card-inner">
        <div class="project-card-front">
            <img src="images/你的项目图片.jpg" alt="项目名称" loading="lazy">
            <div class="project-card-overlay">
                <h3>项目名称</h3>
                <div class="project-card-tags">
                    <span class="project-tag">项目类型</span>
                </div>
            </div>
        </div>
        <div class="project-card-back">
            <h3>项目名称</h3>
            <p>项目描述...</p>
            <a href="#" class="btn">查看详情</a>
        </div>
    </div>
</div>
```

#### 5. 联系页面修改
**文件位置**：`contact.html`

**联系信息修改**：
```html
<!-- 第55-65行左右 -->
<div class="contact-info-card">
    <div class="contact-icon">
        <i class="fas fa-envelope"></i>
    </div>
    <h3>电子邮件</h3>
    <p>你的邮箱@example.com</p>
    <a href="mailto:你的邮箱@example.com" class="contact-link">发送邮件</a>
</div>
```

### 🖼️ 修改图片

#### 图片文件名和位置对照表
| 用途 | 文件名 | 建议尺寸 | 用途说明 |
|------|--------|----------|----------|
| 个人头像 | `images/profile.jpg` | 300x300px | 用于关于页面和简历页面 |
| 首页背景 | `images/hero-bg.jpg` | 1920x1080px | 首页主背景图 |
| 关于页面背景 | `images/about-bg.jpg` | 1920x1080px | 关于页面背景 |
| 项目页面背景 | `images/projects-bg.jpg` | 1920x1080px | 项目页面背景 |
| 创意页面背景 | `images/creative-bg.jpg` | 1920x1080px | 创意页面背景 |
| 联系页面背景 | `images/contact-bg.jpg` | 1920x1080px | 联系页面背景 |
| 项目图片1 | `images/project1.jpg` | 400x300px | 第一个项目展示图 |
| 项目图片2 | `images/project2.jpg` | 400x300px | 第二个项目展示图 |
| 项目图片3 | `images/project3.jpg` | 400x300px | 第三个项目展示图 |
| 创意作品1 | `images/creative1.jpg` | 400x300px | 第一个创意作品图 |
| 创意作品2 | `images/creative2.jpg` | 400x300px | 第二个创意作品图 |
| 创意作品3 | `images/creative3.jpg` | 400x300px | 第三个创意作品图 |

#### 图片替换步骤
1. **准备新图片**：确保图片格式为JPG、PNG或WebP
2. **调整尺寸**：使用图片编辑软件调整到建议尺寸
3. **重命名**：将新图片重命名为对应的文件名
4. **替换文件**：将新图片放入`images/`目录，覆盖原文件
5. **刷新页面**：在浏览器中刷新页面查看效果

#### 智能占位符功能
网站已集成智能图片占位符功能，如果图片加载失败，会自动显示美观的SVG占位符：
- 📷 **个人头像占位符**：显示用户图标
- 🏗️ **项目图片占位符**：显示项目图标
- 🎨 **创意作品占位符**：显示创意图标
- 🖼️ **背景图片占位符**：显示纹理图案

### 🎨 修改颜色主题

**文件位置**：`css/styles.css`（第1-25行）

```css
:root {
    /* 主色调 - 可以修改这些颜色值 */
    --primary-color: #1e3a8a;     /* 深蓝色 - 主要按钮和标题 */
    --secondary-color: #3b82f6;   /* 中蓝色 - 次要元素 */
    --accent-color: #60a5fa;      /* 浅蓝色 - 强调元素 */
    --background-color: #f0f7ff;  /* 淡蓝背景 - 页面背景 */
    --card-background: #ffffff;   /* 卡片背景 */
    --text-color: #1f2937;        /* 主文本颜色 */
    --light-text: #ffffff;        /* 浅色文本 */
    --border-color: #e5e7eb;      /* 边框颜色 */
}
```

**推荐配色方案**：
- 🔵 **蓝色系（当前）**：专业、信任、科技感
- 🟢 **绿色系**：`--primary-color: #059669; --secondary-color: #10b981; --accent-color: #34d399;`
- 🟣 **紫色系**：`--primary-color: #7c3aed; --secondary-color: #8b5cf6; --accent-color: #a78bfa;`
- 🟠 **橙色系**：`--primary-color: #ea580c; --secondary-color: #f97316; --accent-color: #fb923c;`

### ⚙️ 高级定制

#### 1. 添加新的项目分类
**文件位置**：`projects.html`（第67-72行）

```html
<!-- 在筛选按钮中添加新分类 -->
<button class="filter-btn" data-filter="你的新分类">分类名称</button>

<!-- 在项目卡片中使用新分类 -->
<div class="project-card" data-category="你的新分类">
    <!-- 项目内容 -->
</div>
```

#### 2. 修改贪吃蛇游戏设置
**文件位置**：`js/snake-game.js`（第35-40行）

```javascript
// 游戏参数配置
const gridSize = 20;        // 网格大小
let gameSpeed = 150;        // 游戏速度（毫秒）
let score = 0;              // 初始分数
```

#### 3. 添加新的技能项
**文件位置**：`resume.html`（第200-215行）

```html
<div class="skill-item">
    <span class="skill-name">新技能名称</span>
    <div class="skill-bar">
        <div class="skill-progress" style="width: 85%"></div>
    </div>
</div>
```

## 🎮 贪吃蛇游戏功能

### 游戏特色
- 🐍 **经典玩法**：经典贪吃蛇游戏机制
- 📱 **触屏支持**：移动端触摸控制
- 🏆 **排行榜**：本地存储最高分记录
- ⚡ **自适应速度**：分数越高游戏越快
- 🎨 **美观界面**：现代化游戏界面设计

### 控制方式
- **键盘**：使用方向键控制蛇的移动
- **触屏**：点击屏幕上的方向按钮
- **暂停**：按空格键或点击暂停按钮

### 游戏规则
- 🍎 吃到红色食物增加分数和蛇身长度
- 💥 撞墙或撞到自己身体游戏结束
- 📈 每获得50分，游戏速度增加
- 🏆 尝试创造最高分记录

## 📱 响应式设计

网站采用移动优先的响应式设计，在所有设备上都能完美显示：

### 断点设置
- **大屏设备** (>1200px)：完整布局，多列展示
- **中等设备** (768px-1200px)：平板适配布局
- **小屏设备** (<768px)：移动端单列布局

### 移动端优化
- 🔍 **可缩放视口**：支持用户缩放
- 👆 **触摸友好**：按钮和链接足够大
- 📱 **导航优化**：移动端汉堡菜单
- ⚡ **性能优化**：图片懒加载

## 🛠️ 技术栈

### 前端技术
- **HTML5**：语义化标记，SEO友好
- **CSS3**：现代布局（Grid/Flexbox）、动画效果
- **JavaScript ES6+**：模块化、面向对象编程
- **响应式设计**：移动优先策略

### 特色功能
- **图片懒加载**：提升页面加载性能
- **智能占位符**：自动生成SVG占位图
- **本地存储**：游戏分数持久化保存
- **PWA就绪**：可扩展为渐进式Web应用

### 浏览器兼容性
- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ⚠️ IE 11（部分功能受限）

## 🚀 性能优化

### 已实现的优化
- **图片优化**：懒加载、WebP格式支持
- **CSS优化**：关键路径CSS内联
- **JavaScript优化**：模块化加载、事件委托
- **缓存策略**：静态资源长缓存

### 性能指标
- **首屏渲染** < 1.5s
- **完全加载** < 3s
- **Lighthouse评分** > 90

## 📋 待办事项

### 近期计划
- [ ] 添加黑暗主题模式
- [ ] 集成内容管理系统
- [ ] 添加更多小游戏
- [ ] 实现用户评论功能

### 长期计划
- [ ] 转换为Vue.js/React应用
- [ ] 添加后端API支持
- [ ] 实现多语言支持
- [ ] PWA功能完善

## 🤝 贡献指南

欢迎提交Issue和Pull Request来改进这个项目！

### 提交Issue
1. 描述问题或建议
2. 提供复现步骤（如果是bug）
3. 包含环境信息（浏览器、操作系统等）

### 提交Pull Request
1. Fork本项目
2. 创建特性分支
3. 提交更改
4. 发起Pull Request

## 📞 支持与反馈

如果你在使用过程中遇到任何问题或有改进建议，欢迎通过以下方式联系：

- 📧 **邮箱**：你的邮箱@example.com
- 💬 **微信**：你的微信号
- 🌐 **网站**：[你的网站地址]

## 📄 许可证

本项目采用 [MIT 许可证](LICENSE)，你可以自由使用、修改和分发。

## 📸 图片更新指南

### 需要更新的图片文件

以下图片文件需要根据实际内容进行替换：

#### 项目页面图片
- **`images/project1.jpg`** - 三色星光项目图片
  - 当前状态：占位图片
  - 建议尺寸：1200x800px
  - 用途：【项目经历】页面 - 三色星光游戏项目展示图

#### 游戏研报PDF文件
项目页面预留了3个PDF研报下载位置，需要将以下PDF文件上传到根目录：
- **`游戏行业研报_1.pdf`** - 第一份游戏行业分析报告
- **`游戏行业研报_2.pdf`** - 第二份游戏行业分析报告  
- **`游戏行业研报_3.pdf`** - 第三份游戏行业分析报告

#### 更新步骤
1. **准备图片**：确保图片格式为JPG，尺寸适当（建议1200x800px）
2. **备份原文件**：在替换前备份原始占位图片
3. **替换文件**：将新图片重命名并放入`images/`目录
4. **上传PDF**：将PDF文件直接放入网站根目录
5. **更新链接**：如需要，修改`projects.html`中的PDF下载链接

#### 图片要求
- **格式**：JPG/PNG（建议JPG，文件更小）
- **尺寸**：1200x800px（保持16:9比例）
- **文件大小**：建议小于500KB
- **内容**：清晰、高质量的项目相关图片

## 🙏 致谢

感谢以下开源项目和资源：
- [Font Awesome](https://fontawesome.com/) - 图标库
- [Google Fonts](https://fonts.google.com/) - 字体服务
- [Unsplash](https://unsplash.com/) - 高质量图片素材

---

<div align="center">

**🌟 如果这个项目对你有帮助，请给它一个Star！**

Made with ❤️ by [你的名字]

[⬆ 回到顶部](#-远在咫尺---个人作品集网站)

</div>
