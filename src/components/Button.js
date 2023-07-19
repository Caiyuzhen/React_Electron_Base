import React from 'react'
import styled, {css} from 'styled-components'




export const ButtonItems = ({css, icon, title, btnClick}) => { //👈 customStyles 允许组件使用者自定义样式
	// 自定义 p 标签, 模拟按钮操作
	const BtnP = styled.div.attrs({
		className: 'btn no-border'
	})`
		${css} //⚡️css 样式由上层传入！
		display: flex;
	`


	return (
		<BtnP>
			<img src={icon} alt="" style={{width: 18}}/>
			<span>{title}</span>
		</BtnP>
	)
}
