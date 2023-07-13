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
	className: 'd-flex align-items-center justify-content-between mt-4', //Bootstrap 的 mt-2 类名来设置 margin-top 为 8px
})`
	/* 👇自定义的 styleComponent 样式 */
	display: flex;
	padding: 0 8px 0 12px;
	margin-left: 12px;
	margin-bottom: 16px;
	border-radius: 6px;
	height: 36px;
	/* background-color: rgba(255, 255, 255, 0.2); */

	span {
		color: #ab6262;
		font-weight: 600;
		padding: 0 0 0 2px;
		font: normal 18px/40px 'PingFang'; // 字体 16px, 行高 40px
		display: flex;
	};

	img {
		cursor: pointer;
	};

	input {
		color: #fff;
		width: 100%;
		height: 36px;
		border: none;
		padding: 0 8px 0 0;
		background-color: rgba(255, 255, 255, 0);
		transition: 0.3s ease-in-out;
	};

	/* input 框的聚焦态 */
	input:focus {
		padding: 0 8px;
		margin-right: 8px;
		color: #fff;
		height: 36px;
		outline: none;
		transition: 0.3s ease-in-out;
		border-radius: 6px;
		background-color: rgba(255, 255, 255, 0.6);
	};
`



const SearchBar = ({title, onSearchData}) => { 

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
						<SearchDiv>
							<span>{title}</span>
							<span
								onClick={() => { setSearchActive(!searchActive) }}
							>	
								<img src={ searchActive ? close : search } alt= "" style={{ width: 20 }}/>
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
								onBlur={() => setSearchActive(false)}
							/>
							<span
								onClick={() => { closeSearch() }}
							>	
								<img src={ searchActive ? close : search } alt= "" style={{ width: 20 }}/>
							</span>
						</SearchDiv>
					</>
			}
		</>
	)
}

export default SearchBar