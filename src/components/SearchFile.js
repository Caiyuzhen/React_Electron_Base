import React, { Fragment, useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import search from '../../src/resource/icon/icon-search.svg'
import close from '../../src/resource/icon/icon-close.svg'

/**
 * @title {string} 标题文案
 * @onSearchData {string} 搜索的回调, 传递给上层组件 App.js
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
	const oInput = useRef(null) //获取 input 框的 DOM, 用于聚焦
	
	// 退出搜索状态
	const closeSearch = () => {
		setSearchActive(false)
		//清空输入框的值
		setValue('')
	}


	// 👇command + k 快捷键
	useEffect(() => {
		const handleKeydown = (e) => {
		  if (e.metaKey && e.key === 'k') {
			setSearchActive(true);
		  }
		}
	  
		document.addEventListener('keydown', handleKeydown);
	  
		return () => {
		  document.removeEventListener('keydown', handleKeydown);
		}
	}, [])


	// 监听键盘的操作, 回车后把 input 的 value 传递给 App.js
	useEffect(() => {
		const searchHandle = (e) => {
			const { keyCode } = e
			if(keyCode === 13 && searchActive) {//13 为回车键
				onSearchData(value) // 👈 把输入框的数据传递给 onSearchData, onSearchData 是要传递给上层组件 App.js 的数据
			}
			if(keyCode === 27 && searchActive) {//27 为 esc 键
				closeSearch()
			}
		}

		document.addEventListener('keyup', searchHandle) // 监听键盘的操作, keyup 表示键盘按键抬起时触发

		return () => { // 🚀 组件卸载（React 内部有卸载机制）后, 移除这个副作用, 避免内存泄露。 我们需要在组件卸载时清理一些副作用,比如移除事件监听,取消网络请求等。这时我们需要在useEffect中返回一个清理函数
			document.removeEventListener('keyup', searchHandle)
		}
	})


	//⚡️点击搜索后自动聚焦输入框
	useEffect(() => {
		if(searchActive) {
			oInput.current.focus() 
		}
	}, [searchActive])


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
								ref={oInput}
								type="text" 
								placeholder='Search data'
								value={value}
								onChange={(e) => { setValue(e.target.value) }} //受控组件, 拿到 input 框的内容并保存到 value 中
							/>
							<span
								onClick={() => { closeSearch() }}
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