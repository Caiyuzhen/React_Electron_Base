import { useState, useEffect } from 'react'

// 判断键盘事件的 hook, 传入 keyCode, 可以返回 true 或者 false
export const useKeyboardHandle = (code) => { //传入 keyCode
	const [keyIsPress, setKeyIsPress] = useState(false) //保存键盘的按下的状态

	// 键盘抬起
	const keyUpHandle = ({keyCode}) => { // 解构赋值 keyCode
		if(keyCode === code) {
			setKeyIsPress(false)
		}
	}

	// 键盘按下
	const keyDownHandle = ({keyCode}) => { // 解构赋值 keyCode, 
		if(keyCode === code) {
			setKeyIsPress(true)
		}
	}

	useEffect(() => {
		document.addEventListener('keyup', keyUpHandle)
		document.addEventListener('keydown', keyDownHandle)
		
		return () => {
			document.removeEventListener('keyup', keyUpHandle)
			document.removeEventListener('keydown', keyDownHandle)
		}
	})

	return keyIsPress
}