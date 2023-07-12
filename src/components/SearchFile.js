import React, { Fragment, useState } from 'react'
import styled from 'styled-components'
import search from '../../src/resource/icon/icon-search.svg'
import close from '../../src/resource/icon/icon-close.svg'

/**
 * @title {string} 标题文案
 * @onSearchData {string} 搜索的回调
*/


// 自定义搜索区域的 div 样式
const SearchDiv = styled.div.attrs({
	// 👇Bootstrap 提供的样式类名
	className: 'd-flex align-items-center justify-content-between mt-2', //Bootstrap 的 mt-2 类名来设置 margin-top 为 8px
})`
	/* 👇自定义的 styleComponent 样式 */
	border-bottom: 1px solid #9c9cba; //分割线
	margin-left: 12px;
	span {
		color: #19191c;
		padding: 0 12px;
		font: normal 16px/40px 'PingFang'; // 字体 16px, 行高 40px
	};
	img {
		cursor: pointer;
	};
	input {
		width: 100%;
		height: 40px;
		border: none;
		border-radius: 6px;
		margin-left: 8px;
		padding: 0 8px;
		background-color: rgba(255, 255, 255, 0.2);
	};
	/* input 框的聚焦态 */
	input:focus {
		outline: none;
		background-color: rgba(255, 255, 255, 0.4);
	};
`



const SearchFile = ({title, onSearchData}) => { 

	const [searchActive, setSearchActive] = useState(false) //是否是搜索状态
	const [value, setValue] = useState('') //列表的值

	return (
		<>
			{
				// 判断显示【搜索结果】还是【默认状态】
				!searchActive && 
					<>
						<SearchDiv style={{marginTop: '8px'}}>
							<span>{title}</span>
							<span
								onClick={() => { setSearchActive(!searchActive) }}
							>	
								<img src={ searchActive ? close : search } alt= "" style={{ width: 24 }}/>
							</span>
						</SearchDiv>
					</>
			}
			{
				// 判断显示【搜索结果】还是【默认状态】
				searchActive && 
					<>
						<SearchDiv>
							<input 
								type="text" 
								placeholder='Search data'
								value={value}
								onChange={(e) => { setValue(e.target.value) }} //受控组件, 拿到 input 框的内容并保存到 value 中
							/>
							<span
								onClick={() => { setSearchActive(!searchActive) }}
							>	
								<img src={ searchActive ? close : search } alt= "" style={{ width: 24 }}/>
							</span>
						</SearchDiv>
					</>
			}
		</>
	)
}

export default SearchFile