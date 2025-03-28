# 游戏设计师个人网站使用指南

## 素材替换说明

### 1. 图片素材
- **位置**: `assets/` 文件夹
- **替换指南**:
  - `placeholder-hero.png`: 首页主图 (推荐尺寸: 1200x800)
  - `placeholder-project1.png`: 项目1封面图 (推荐尺寸: 600x400)
  - `placeholder-project2.png`: 项目2封面图 
  - `placeholder-detail1-1.png`: 项目1详情图1
  - `placeholder-detail1-2.png`: 项目1详情图2
  - 其他图片按相同命名规则替换

### 2. 图标素材
- **位置**: Font Awesome图标库
- **替换方法**:
  - 在 `index.html` 中修改 `<i class="fab fa-xxx">` 的类名
  - 可用图标列表: https://fontawesome.com/icons

### 3. 颜色主题
- **位置**: `styles.css` 中的 `:root` 部分
- **可修改变量**:
  - `--primary-blue`: 主蓝色
  - `--dark-blue`: 深蓝色
  - `--light-blue`: 浅蓝色
  - 其他辅助色变量

## 内容编辑指南

### 1. 项目内容
1. 在 `index.html` 中找到 `.project-grid`
2. 复制 `.project-card` 模板添加新项目
3. 修改 `data-project` 属性和对应详情层

### 2. 文字内容
- 直接修改 `index.html` 中的:
  - 标题 (`<h1>`, `<h2>`, `<h3>`)
  - 描述文本 (`<p>`)
  - 按钮文字

### 3. 社交链接
- 在 `index.html` 中修改:
  - GitHub: `.fa-github` 的 `href`
  - Twitter: `.fa-twitter` 的 `href`
  - LinkedIn: `.fa-linkedin` 的 `href`

## 高级功能配置

### 1. 邮件服务 (EmailJS)
1. 注册并登录 https://www.emailjs.com/
2. 创建邮件服务并获取:
   - Service ID
   - Template ID
3. 在 `script.js` 中替换对应值

### 2. 动画调整
- **页面加载动画**: 修改 `script.js` 中的 `gsap.from()` 参数
- **滚动动画**: 调整 `ScrollTrigger` 配置
- **悬停效果**: 修改 `styles.css` 中的 `--transition` 变量

## 部署说明

1. **本地测试**:
   ```bash
   npx serve
   ```
   访问 http://localhost:3000

2. **生产部署**:
   - GitHub Pages
   - Netlify
   - Vercel

3. **注意事项**:
   - 确保包含所有依赖文件
   - 上传前测试所有交互功能
   - 清除浏览器缓存查看最新更改

## 技术支持

如需进一步定制，可联系开发者提供:
- 更多页面模板
- 自定义动画效果
- 数据库集成
- 后台管理系统
