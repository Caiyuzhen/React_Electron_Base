import React from 'react'
import styled, {css} from 'styled-components'




export const ButtonItems = ({title, btnClick, css}) => { //👈 customStyles 允许组件使用者自定义样式
	// 自定义 p 标签, 模拟按钮操作
	const BtnP = styled.div.attrs({
		className: 'btn no-border'
	})`
		${css} //⚡️css 样式由上层传入！
	`


	return (
		<BtnP>
			<span>{title}</span>
		</BtnP>
	)
}
