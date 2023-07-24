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