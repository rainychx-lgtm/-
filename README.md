# 柴化鑫 · 体验设计师作品集

基于 React 与 Vite 的个人作品集，包含首页、5 个项目案例详情页、响应式导航、无障碍支持以及 Cloudflare Pages 部署配置。

## 本地运行

需要 Node.js 22.12 或更高版本。

> React + Vite 项目不能直接双击 `index.html` 预览，否则浏览器会显示空白页。

在 macOS 中可以直接双击项目根目录下的 `预览网站.command`。它会启动开发服务器并自动打开浏览器。首次运行时会自动安装依赖。

也可以在终端运行：

```bash
npm install
npm run dev
```

生产构建与本地预览：

```bash
npm run build
npm run preview
```

构建产物位于 `dist/`。

## 部署到 Cloudflare Pages

1. 将代码推送到 GitHub 仓库。
2. 在 Cloudflare Dashboard 打开 **Workers & Pages → Create → Pages → Connect to Git**。
3. 选择 GitHub 仓库并填写：
   - Framework preset：`Vite`
   - Build command：`npm run build`
   - Build output directory：`dist`
   - Node.js version：`22.12` 或更高
4. 保存并部署。之后推送到生产分支会自动触发部署。

`public/_redirects` 已配置单页应用回退，因此 `/case/ai-companion` 等详情页可以直接访问；`public/_headers` 提供静态资源缓存与基础安全响应头。

## 内容维护

- 案例标题、分类、封面和详情图数量：`src/data/cases.js`
- 首页内容与工作流：`src/pages/HomePage.jsx`
- 全局视觉样式：`src/styles.css`
- 所有图片素材：`public/assets/`
- AI UI/UX 工作流独立页面：`public/ai-ui-ux-workflow.html`

首页视频目前使用外部 CloudFront 地址。若要完全自托管，可将视频放入 `public/assets/`，再修改 `src/pages/HomePage.jsx` 中的 `video src`。
