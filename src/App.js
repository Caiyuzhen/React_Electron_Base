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
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { useState } from 'react'
import placeholderImg from '../src/resource/img/placeholder-inspired.png'


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
	padding-right: 8px;
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
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	background-color: #fffdfc;
	min-height: 100vh;
	padding-right: 24px;
	box-sizing: border-box;

	.init-page {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
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
	const [files, setFiles] = useState(initFilesData) // 所有的文件（docs） 信息
	const [openIds, setOpenIds] = useState([]) // 当前已打开的所有文件（docs）信息, 比如 1 就是打开了第一个 docs, 1, 2 就是打开了第一二个 docs
	const [activeEditId, setActiveEditId] = useState('')  // 当前聚焦在哪个 tab 的信息
	const [unSaveIds, setUnSaveIds] = useState([]) // 未保存的文件（docs）信息

	// 🌟 获得已打开的文件的信息 => 根据 openId 来判断展示哪个 tab 🔥
	const openFiles = openIds.map(openId => {
		return files.find(file => file.id === openId) //同时可能打开多个
	})

	// 🌟 点击左侧文件, 打开 docs
	const openItem = (id) => {
		// 将当前 id 设置为 activeEditId
		setActiveEditId(id)

		// 将打开的页面添加进 openIds (注意要去重！已经打开的就不加入)
		if(!openIds.includes(id)) {//如果 openIds 中没有这个 id, 就加入
			setOpenIds([...openIds, id])
		}
	}

	// 🌟 点击 tab 选项卡, 切换编辑框内容
	const changeActiveEditContent = (id) => {
		setActiveEditId(id)
	}

	// 🌟 关闭选项卡
	const closeActiveEditContent = (id) => {
		// 过滤掉当前打开的这个选项卡
		const retOpen = openIds.filter(openId => openId !== id)
		setOpenIds(retOpen)

		// 剩下的选项卡取第一个
		if(retOpen.length > 0) { //还有被打开的 tab
			setActiveEditId(retOpen[0])
		} else {
			setActiveEditId('') //没有被打开的 tab
		}
	}

	// 🌟 编辑 docs 内容（出现红色⭕️）
	const changeFile = (id, newValue) => { //在编辑时候, 传入 id, 判断是否已经保存过
		if(!unSaveIds.includes(id)) { // 如果还没有保存过, 就加入
			setUnSaveIds([...unSaveIds, id])
		}

		// 更新内容生成 files
		const newFiles = files.map(file => {
			if(file.id === id) { //需要更新的文件
				file.body = newValue 
			}

			return file
		})

		setFiles(newFiles)
	}
	
	// 🔥正在编辑的 docs 的默认内容 （根据 activeEditId 从所有 files 的 body 中取出数据） => 用来判断编辑状态
	const activeFileContent = files.find(file => file.id === activeEditId)  //只会有一个


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
							// editFile={ (id) => { console.log('编辑文档:', id) } } //id 由下层组件传入
							editFile={openItem}
							deleteFile={ (id) => { console.log('删除文档:', id) } } //id 由下层组件传入
							// files={initFilesData}
							files={files}
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
					{activeFileContent && //有打开 tab 时, 才显示编辑框
						<>
							<TabList
							className='wll'
								files={openFiles}
								activeItem={activeEditId} //选中哪个 tab 
								unSaveItems={unSaveIds} //
								// activeItem={'1'} //选中哪个 tab 
								// unSaveItems={['2', '3', '5']} //未保存的 tab

								clickItem={changeActiveEditContent} //切换选项卡
								// clickItem={(id) => {console.log('点击 tab:', id)}}

								closeItem={closeActiveEditContent} //关闭选项卡
								// closeItem={(id) => {console.log('点击 close', id)}}
							/>
							<SimpleMDE 
								key={activeEditId && activeEditId.id } // 🔥判断有没有打开的文件, 有就把 id 传入为 key, 没有就不传入
								className="custom-editor"
								// onChange={(value) => {console.log(value)}} //编辑框的值

								onChange={(value) => {changeFile(activeFileContent.id, value)}} //docs 内容更新时, 显示未保存的 icon
								// value={initFilesData[0].body} //根据 activeEditId 从所有 files 的 body 中取出数据
								value={activeFileContent.body}
								options={{
									autofocus: true, //自动聚焦
									spellChecker: false, //拼写检查
									minHeight: "80vh", //最小高度
									width: "100%"
								}}
								style={{ width: '100%' }}
							/>
						</>
					}
					{
						!activeFileContent && //没有打开的 tab 时, 显示兜底图片
						<div className="init-page">
							<img src={placeholderImg} alt="" style={{width: 240}}/>
							Start spreading your inspiration!
						</div>
					}
				</RightDiv>
			</div>
		</div>
	)
}

export default App
