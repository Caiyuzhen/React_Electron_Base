import React, { Fragment, useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import docs from '../../src/resource/icon/icon-Docs.svg'
import edit from '../../src/resource/icon/icon-edit.svg'
import deleteIcon from '../../src/resource/icon/icon-delete.svg'
import closeIcon from '../../src/resource/icon/icon-close.svg'



// UL 标签
let GroupUL = styled.ul.attrs({
	className: "list-group list-group-flush"
})`
	border-bottom: 0px solid #9c9cba; //分割线
	li {
		width: 100%;
		background-color: transparent;
	};

	.list-group-item {
		border: none !important;
	}
	
	.cell {
		width: 100%;
		display: flex;
		justify-content: flex-start;
		align-items: center;
		margin-top: 4px;
		padding: 0 8px 0 6px;
	}

	.action {
		display: flex;
		gap: 8px;
		align-items: center;
	}

	span {
		color: #663131;
	}
`



export default FileList = ({files, editFile, saveFile, deleteFile}) => {

	const [editItem, setEditItem] = useState(false) // 判断是否改显示重名的 UI
	const [value, setValue] = useState('') //编辑文档名

	return (
		<GroupUL>
			{
				files.map((file) => {
					return (
						<div className="cell" key={file.id}>
							{
								(file.id !== editItem) &&  //默认状态
									<>
										<li
											className='list-group-item d-flex align-items-center'
										>
											<img src={docs} style={{width: 18, marginRight: 4}}/>
											{/* 点击文档 */}
											<span
												onClick={ () => {editFile(file.id)}}   //把 id 传递给 App.js
											>{file.title}</span>
										</li>
										<div className="action">
											{/* 编辑文档名 */}
											<img 
												onClick={ () => {setEditItem(file.id)} } //把 id 传递给 App.js
												src={edit} style={{width: 16}}
											/>
											{/* 删除文档 */}
											<img 
												onClick={ () => {editFile(file.id)} }//把 id 传递给 App.js
												src={deleteIcon} 
												style={{width: 16}}
											/>
										</div>
									</>
							}
							{
								(file.id === editItem) &&  //编辑状态
									<>
										<li
											className='list-group-item d-flex align-items-center'
										>
											{/* 点击文档 */}
											<input
												onClick={ () => {editFile(file.id)}}   //把 id 传递给 App.js
											/>
										</li>
										<div className="action">
											{/* 编辑文档名 */}
											<img 
												onClick={ () => {setEditItem(false)} } //把 id 传递给 App.js
												src={closeIcon} style={{width: 16}}
											/>
										</div>
									</>
							}
						</div>
					)
				})
			}
		</GroupUL>
	)
}