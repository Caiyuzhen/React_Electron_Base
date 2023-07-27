// const { remote } = require('@electron/remote')
// const fs = remote.require('fs').promises
// const path = remote.require('path')
// const { fs, path } = window.nodeModules


// 🚀 把 initFilesData 数组转为对象 id:{...}、 id:{} 格式的方式 
export const mapArr = (arr) => {
	return arr.reduce((map, item) => { // 🔥 reduce 方式是将数组快速转换为对象的方式
		map[item.id] = item // id 为 key,item 为 value
		return map
	}, {}) // 设置初始值是一个空对象{}
}


// 🚀 把对象扁平化, 转为数组的方法 => 在 React 中,我们常会将状态数据存储为对象,然后通过这个函数转换为数组,以渲染列表等, 比如 a: {name: 'Alice'}, b: {name: 'Bob'} => [{name: 'Alice'}, {name: 'Bob'}]
export const objToArr = (obj) => {
	return Object.keys(obj).map(key => obj[key]) // 🔥 Object.keys 取出对象所有的键,返回一个数组
}





// // 【👀读取】读取文件
// export const readFile = (path) => {
// 	return fs.readFile(path, 'utf8')
// }


// // 【✏️写入】写入文件
// export const writeFile = (path, content) => {
// 	return fs.writeFile(path, content, 'utf-8')
// }


// // 【🌫️修改】重命名
// export const reNameFile = (path, newPath) => {
// 	return fs.rename(path, newPath)
// }


// // 【🗑️删除】删除文件
// export const deleteFile = (path) => {
// 	return fs.unlink(path)
// }


// 👇测试
// const testReadPath = path.join(__dirname, './mock/test.js') //读取路径
// const testWritePath = path.join(__dirname, './mock/test.md') //写入路径
// const oldPath = path.join(__dirname, './mock/rename.md') //重命名路径
// const newPath = path.join(__dirname, './mock/renameNew.md') //重命名路径
// const delPath = path.join(__dirname, './mock/del1.md') //删除路径


// readFile(testReadPath).then((data) => {
// 	console.log('读取成功:', data)
// })


// writeFile(testWritePath, '## 写入二级标题').then(() => {
// 	console.log('写入成功')
// })


// reNameFile(oldPath, newPath).then(() => {
// 	console.log('重命名成功')	
// })


// deleteFile(delPath).then(() => {
// 	console.log('删除成功')
// })

