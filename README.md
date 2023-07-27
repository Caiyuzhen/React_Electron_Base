### 安装依赖
npm install --no-optional

### 支持在渲染进程内使用 node 的模块
1. 修改 Webpack 配置
  - npm run eject
2. 修改 webpac.config.js
	fallback: {
	"path": require.resolve("path-browserify")
	},

3. 添加 path-browserify 库
   - yarn add path-browserify

4. 引入模块
	const fs = require('path-browserify')
	const path = require('path-browserify')

### 构建项目
yarn build

### 启动项目
yarn run dev