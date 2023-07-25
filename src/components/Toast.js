import { useEffect, useRef, useState } from 'react'
import '../style/toast.css'

export const ToastBase = ({content, type, time, position}) => {
	const [showToast, setShowToast] = useState(true)
	const timerRef = useRef(null)
  
	useEffect(() => {
		clearTimeout(timerRef.current) // 清除之前的定时器

		if (time > 0) {
			timerRef.current = setTimeout(() => {
				setShowToast(false) // 在定时器结束后隐藏toast
			}, time)
		}

		return () => clearTimeout(timerRef.current) // 组件卸载时清除定时器
	}, [showToast, time]);
  
	if (!showToast) {
		return null // 如果showToast为false，则不渲染Toast组件
	}
  

	return (
		<div className={`toast ${type} ${position}`}>
			{content}
		</div>
	)
}


// 封装多一层成功与失败的方法
const Toast = {
	success: (time, position) => {
		return (
			<ToastBase 
				content={'🌞 操作成功!'}
				type={'.success'} 
				time={time} 
				position={position} 
			/>
		)
	},
	error: (time, position) => {
		return (
			<ToastBase 
				content={'❌ 操作失败~'}
				type={'.error'}
				time={time} 
				position={position} 
			/>
		)
	}
}


export default Toast