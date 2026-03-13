# 医疗器械数据抓取项目

## 项目目标
构建一个Netlify网站，用于动态抓取医疗器械网页数据，并在前端动态展示和更新。

## 核心功能
1. **数据抓取** - 从指定医疗器械网站抓取数据
2. **动态更新** - 定期或按需更新数据
3. **前端展示** - 展示抓取到的医疗器械信息

## 技术架构
- **部署平台**: Netlify
- **后端**: Netlify Functions (无服务器函数)
- **前端**: 静态HTML/CSS/JS
- **数据存储**: 可考虑Netlify Blob或外部数据库

## 目标数据源
主要医疗器械网站：
1. **NMPA国家药监局** - 医疗器械注册信息
2. **中国医疗器械采购公共服务平台**
3. **医疗器械行业信息平台**

## 项目进展
- [x] 基础架构搭建 - Netlify Functions + 静态站点
- [x] 数据抓取API - 支持设备列表、NMPA查询、搜索、统计
- [x] 前端展示页面 - 响应式设计，支持搜索和分类筛选
- [x] 自动更新机制 - 每5分钟自动刷新数据
- [ ] 接入真实数据源（需要具体目标网站）

## 本地运行
```bash
npm run dev    # 启动本地开发服务器 (http://localhost:8888)
```

## 部署
```bash
netlify deploy --prod    # 部署到生产环境
```

## 项目结构
```
D:\ClaudeProject\web project\
├── netlify/
│   └── functions/
│       └── api.js       # API函数（数据抓取逻辑）
├── public/
│   └── index.html       # 前端展示页面
├── memory/
│   └── MEMORY.md        # 项目文档
├── netlify.toml         # Netlify配置
└── package.json         # 项目依赖
```

## API端点测试
本地服务已启动: http://localhost:8888

| 端点 | 功能 | 示例 |
|------|------|------|
| `/api/stats` | 统计数据 | [测试](http://localhost:8888/api/stats) |
| `/api/devices` | 器械列表 | [测试](http://localhost:8888/api/devices) |
| `/api/search?q=关键词` | 搜索器械 | [测试口罩](http://localhost:8888/api/search?q=口罩) |
| `/api/nmpa?regNumber=xxx` | NMPA注册信息 | 需参数 |

## 推荐：GitHub + Netlify 自动部署（动态部署）

### 步骤1: 创建GitHub仓库
```bash
cd "web project"

# 初始化git
git init

# 添加所有文件
git add .

# 提交
git commit -m "Initial commit: 医疗器械数据平台"

# 创建main分支
git branch -M main

# 连接远程仓库（需先在GitHub创建空仓库）
git remote add origin https://github.com/你的用户名/medical-device-tracker.git

# 推送
git push -u origin main
```

### 步骤2: Netlify连接GitHub
1. 登录 [netlify.com](https://netlify.com)
2. 点击 "Add new site" → "Import an existing project"
3. 选择 GitHub → 授权 → 选择 `medical-device-tracker` 仓库
4. 构建设置：
   - Build command: （留空，因为是静态站点）
   - Publish directory: `public`
5. 点击 "Deploy site"

### 步骤3: 完成！自动部署启用
- 每次 `git push` 自动部署
- 每次 Pull Request 自动生成预览链接
- 在Netlify控制台可查看部署历史、一键回滚

### 部署后更新代码
```bash
# 修改代码后...
git add .
git commit -m "更新功能"
git push origin main  # 自动触发部署
```

## GitHub仓库
- **URL**: https://github.com/George0225/webdemo2
- **分支**: main
- **提交**: Initial commit: Medical device tracker

## Netlify部署步骤（下一步）
1. 登录 [netlify.com](https://netlify.com)
2. 点击 "Add new site" → "Import an existing project"
3. 选择 GitHub → 授权 → 选择 `webdemo2` 仓库
4. 构建设置保持默认（Build command留空，Publish directory: public）
5. 点击 "Deploy site"
6. 获得自动分配的 `.netlify.app` 域名

---
*最后更新: 2026-03-13*
