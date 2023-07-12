import React from 'react'
import styled from 'styled-components'
import 'bootstrap/dist/css/bootstrap.min.css'
import SearchFile from './components/SearchFile'


// 左侧容器样式 （styled-components 语法）
let LeftDiv = styled.div.attrs({
	className: 'col-3 left-panel' // bootstrap 的样式
})`
	background-color: #bbbac9;
	min-height: 100vh;
`


// 自定义右侧容器样式 （styled-components 语法）
let RightDiv = styled.div.attrs({
	className: 'col-9 right-panel' // bootstrap 的样式
})`
	background-color: #4d4e68;
	min-height: 100vh;
`


// 右侧容器
function App() {
	return (
		<div className="App container-fluid px-0">
			<div className="row">
				<LeftDiv>
					<SearchFile
						title='我的文档'
						onSearchData={() => {console.log('搜索中')}}
					>
					</SearchFile>
				</LeftDiv>
				<RightDiv>右侧</RightDiv>
			</div>
		</div>
	)
}

export default App
