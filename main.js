const { app, BrowserWindow, ipcRenderer, contextBridge, ipcMain } = require('electron')
const isDev = require('electron-is-dev')
const path = require('path')
const remote = require("@electron/remote/main")
const { getPath } = require('@electron/remote/main') // 引入 getPath
// require("@electron/remote/main").initialize() // 初始化远程模块




let mainWindow //主进程


app.on('ready', () => {
	mainWindow = new BrowserWindow({
		width: 1440,
		height: 900,
		minWidth: 600,
		webPreferences: {
			nodeIntegration: true, //👈 允许渲染进行使用 Node
			enableRemoteModule: true, //👈 允许渲染进行使用 Node
			contextIsolation: false, //👈 允许渲染进行使用 Node
		}
	})
	
	remote.initialize()  // 初始化远程模块
	remote.enable(mainWindow.webContents) // enable() 方法用于启用指定 webConte
	



	//  在 主进程 中暴露 Node.js 模块, 将 API 公开给渲染进程
	// ipcMain.on('generateAPI', (e, data) => {
	// 	const savedPath = getPath('Users') + '/zen/myDocsData ' // 获取到的是用户的文档目录
	// 	event.returnValue = savedPath
	// })
	  

		  



	 // dock 栏的图标 ——————
	app.dock.setIcon('./src/resource/logo/magicApp@1x.png')


	// const urlLoaction = isDev ? 'http://localhost:3000' : 'productUrl'//开发环境目前是本地 3000 端口, 否则就是线上生产环境
	const urlLoaction = isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`//开发环境就是本地 3000 端口, 在生产环境下,将 url 设置为编译打包后的前端静态资源所在位置

	mainWindow.loadURL(urlLoaction) //加载 react 运行的 3000 端口
})
