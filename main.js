const { app, BrowserWindow, ipcRenderer, contextBridge, ipcMain } = require('electron')
const isDev = require('electron-is-dev')
// require("@electron/remote/main").initialize() // 初始化远程模块
const remote = require("@electron/remote/main")


let mainWindow //主进程



app.on('ready', () => {
	mainWindow = new BrowserWindow({
		width: 1024,
		height: 768,
		minWidth: 600,
		webPreferences: {
			preload: path.join(__dirname, 'App.js'),
			nodeIntegration: true, //👈 允许渲染进行使用 Node
			enableRemoteModule: true, //👈 允许渲染进行使用 Node
			contextIsolation: false, //👈 允许渲染进行使用 Node
		}
	})
	
	remote.initialize()  // 初始化远程模块
	remote.enable(mainWindow.webContents) // enable() 方法用于启用指定 webConte
	 // 在 contextBridge 中暴露 Node.js 模块



	// 公开的API
	const api = {
		// 示例方法
		getPath: async () => {
			const response = await ipcRenderer.invoke('get-path')
			return response;
		}
	}

	// 将 API 公开给渲染进程
	ipcMain.on('msg', (e, data) => { 
		console.log(data) // 接收渲染进程发来的异步消息 data
	
		// 往渲染进程发送消息
		e.sender.send('api', api)
	})
	


	 // dock 栏的图标 ——————
	app.dock.setIcon('./src/resource/logo/magicApp@1x.png')


	// const urlLoaction = isDev ? 'http://localhost:3000' : 'productUrl'//开发环境目前是本地 3000 端口, 否则就是线上生产环境
	const urlLoaction = isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`//开发环境就是本地 3000 端口, 在生产环境下,将 url 设置为编译打包后的前端静态资源所在位置

	mainWindow.loadURL(urlLoaction) //加载 react 运行的 3000 端口
})
