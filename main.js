const { app, BrowserWindow, contextBridge } = require('electron')
const isDev = require('electron-is-dev')
require('@electron/remote/main').initialize()


let mainWindow


app.on('ready', () => {
	mainWindow = new BrowserWindow({
		width: 1024,
		height: 768,
		minWidth: 600,
		webPreferences: {
			nodeIntegration: true,
			enableRemoteModule: true,
			contextIsolation: true,
		}
	})

	 // 在 contextBridge 中暴露 Node.js 模块
	//  contextBridge.exposeInMainWorld('nodeModules', {
	// 	fs: require('fs'),
	// 	path: require('path')
	// })

	 // dock 栏的图标
	app.dock.setIcon('./src/resource/logo/magicApp@1x.png')


	// const urlLoaction = isDev ? 'http://localhost:3000' : 'productUrl'//开发环境目前是本地 3000 端口, 否则就是线上生产环境
	const urlLoaction = isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`//开发环境就是本地 3000 端口, 在生产环境下,将 url 设置为编译打包后的前端静态资源所在位置

	mainWindow.loadURL(urlLoaction) //加载 react 运行的 3000 端口
})
