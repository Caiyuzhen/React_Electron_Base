import React from 'react'
import styled, {css} from 'styled-components'
import 'bootstrap/dist/css/bootstrap.min.css'
import SearchBar from './components/SearchBar'
import FileList from './components/FileList'
import initFilesData from './utils/mock/initFilesData'
import {ButtonItems} from './components/Button'
import addIcon from '../src/resource/icon/icon-add.svg'
import importIcon from '../src/resource/icon/icon-import.svg'
import {TabList} from '../src/components/TabList'


// 左侧容器样式 （styled-components 语法）
let LeftDiv = styled.div.attrs({
	className: 'col-3 left-panel' // bootstrap 的样式
})`
	background-color: #d4d8f2;
	min-height: 100vh;
	position: relative;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	padding-bottom: 24px;
	box-sizing: border-box;

	.btn_list {
		padding: 0 24px;
		width: 100%;
		display: flex;
		align-items: center;
		bottom: 24px;
		left: 2px;
		gap: 8px;
		/* position: fixed; */
	}

	/* span {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
	} */
`


// 自定义右侧容器样式 （styled-components 语法）
let RightDiv = styled.div.attrs({
	className: 'col-9 right-panel' // bootstrap 的样式
})`
	background-color: #fffdfc;
	min-height: 100vh;
`


// 自定义按钮组件的样式
const customAddStyles = css
`
	appearance: button;
	background-color: #4D4AE8;
	background-image: linear-gradient(180deg, rgba(255, 255, 255, .15), rgba(255, 255, 255, 0));
	border: 1px solid #4D4AE8;
	border-radius: .5rem;
	box-shadow: rgba(255, 255, 255, 0.15) 0 1px 0 inset,rgba(46, 54, 80, 0.075) 0 1px 1px;
	box-sizing: border-box;
	color: #FFFFFF;
	cursor: pointer;
	display: inline-block;
	gap: 4px;
	align-items: center;
	justify-content: center;
	font-family: Inter,sans-serif;
	font-size: 14px;
	font-weight: 500;
	line-height: 1.5;
	height: 36px;
	width: 100%;
	min-width: 98px;
	margin: 0;
	text-align: center;
	text-transform: none;
	transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;
	user-select: none;
	-webkit-user-select: none;
	touch-action: manipulation;
	vertical-align: middle;

	// hover 态
	&:hover {
		background-color: #3c38e3;
		border-color: #3c38e3;
		color: #fff;
	}

	// 点击态
	&:active {
		background-color: #2f2bd9;
		border-color: #2f2bd9;
		color: #fff;
	}

	// 长按状态
	&:focus {
		background-color: #2f2bd9;
		border-color: #2f2bd9;
		color: #fff;
		outline: none; /* 去掉默认的蓝色边框 */
		box-shadow: 0px 0px 0px 2px rgba(47,43,217,0.5); /* 添加自定义的阴影效果 */
	}
`

const customImportStyles = css 
`
	align-items: center;
	background-color: initial;
	background-image: linear-gradient(#464d55, #25292e);
	border-radius: .5rem;
	border-width: 0;
	box-shadow: 0 10px 20px rgba(0, 0, 0, .1),0 3px 6px rgba(0, 0, 0, .05);
	box-sizing: border-box;
	color: #fff;
	cursor: pointer;
	font-family: expo-brand-demi,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";
	font-size: 14px;
	height: 36px;
	width: 100%;
	min-width: 98px;
	display: inline-flex;
	gap: 4px;
	justify-content: center;
	line-height: 1;
	margin: 0;
	outline: none;
	overflow: hidden;
	padding: 0 32px;
	text-align: center;
	text-decoration: none;
	transform: translate3d(0, 0, 0);
	transition: all 150ms;
	vertical-align: baseline;
	white-space: nowrap;
	user-select: none;
	-webkit-user-select: none;
	touch-action: manipulation;

	&:hover {
		color: #fff;
		box-shadow: rgba(0, 1, 0, .2) 0 2px 8px;
		background-image: linear-gradient(#323840, #1a1e22);
		opacity: .85;
	}

	&:active {
		color: #fff;
		outline: 0;
		opacity: 1;
		background-image: linear-gradient(#22282e, #0f1114);
	}
`


// 右侧容器
function App() {
	return (
		<div className="App container-fluid px-0">
			<div className="row">
				<LeftDiv>
					<div className="top_container">
						<SearchBar
							title='📃 My Docs'
							onSearchData={(value) => {console.log(value)}} //🚀 数据来自 SearchFile 下层组件!!
						>
						</SearchBar>

						<FileList
							editFile={ (id) => { console.log('编辑文档:', id) } } //id 由下层组件传入
							deleteFile={ (id) => { console.log('删除文档:', id) } } //id 由下层组件传入
							files={initFilesData}
							saveFile={ (id, value)=>{console.log(id, value)} }
						>
						</FileList>
					</div>

					<div className="btn_list">
						<ButtonItems
							css={customAddStyles} //把 css 样式出传入下一层组件！
							icon={addIcon}
							title={'New'}
						/>
						<ButtonItems
							css = {customImportStyles} //把 css 样式出传入下一层组件！
							icon={importIcon}
							title = {'Import'}
						/>
					</div>
				</LeftDiv>
				<RightDiv>
					<TabList
						files={initFilesData}
						activeItem={'1'} //选中哪个 tab 
						clickItem={(id) => {console.log(id)}}
					/>
				</RightDiv>
			</div>
		</div>
	)
}

export default App
