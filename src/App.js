import React from 'react'
import styled from 'styled-components'
import 'bootstrap/dist/css/bootstrap.min.css'
import SearchBar from './components/SearchBar'
import FileList from './components/FileList'
import initFilesData from './utils/mock/initFilesData'


// 左侧容器样式 （styled-components 语法）
let LeftDiv = styled.div.attrs({
	className: 'col-3 left-panel' // bootstrap 的样式
})`
	background-color: #fee1db;
	min-height: 100vh;
`


// 自定义右侧容器样式 （styled-components 语法）
let RightDiv = styled.div.attrs({
	className: 'col-9 right-panel' // bootstrap 的样式
})`
	background-color: #fffdfc;
	min-height: 100vh;
`


// 右侧容器
function App() {
	return (
		<div className="App container-fluid px-0">
			<div className="row">
				<LeftDiv>
					<SearchBar
						title='My Files'
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
				</LeftDiv>
				<RightDiv>右侧</RightDiv>
			</div>
		</div>
	)
}

export default App
