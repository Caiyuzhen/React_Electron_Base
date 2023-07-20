import React, { Fragment, useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import docs from '../../src/resource/icon/icon-Docs.svg'
import edit from '../../src/resource/icon/icon-edit.svg'
import deleteIcon from '../../src/resource/icon/icon-delete.svg'
import closeIcon from '../../src/resource/icon/icon-close.svg'
import {useKeyboardHandle} from '../../src/hooks/useKeyHandle.js'


// UL 标签
let GroupUL = styled.ul.attrs({
	className: "list-group list-group-flush"
})`
	padding-left: 8px;
	border-bottom: 0px solid #9c9cba; //分割线

	li {
		width: 100%;
		background-color: transparent;
	};

	.list-group-item {
		border: none !important;
		padding: 8px;
	}
	
	.cell {
		width: 100%;
		display: flex;
		justify-content: flex-start;
		align-items: center;
		margin-top: 4px;
		padding: 0 10px 0 6px;
		cursor: pointer;
	}

	.cell:hover {
		background-color: rgba(37, 34, 56, 0.15);
		border-radius: 8px;
	}

	.action {
		display: flex;
		gap: 8px;
		align-items: center;
	}

	span {
		color: #232326;
	}

	.edit_btn, .delete_btn, .close_btn {
		cursor: pointer;
	}

	input {
		width: 99%;
		border: none;
		height: 24px;
		border-radius: 4px; 
		background-color: rgba(255, 255, 255, 0.6); 
		transition: 0.3s ease-in-out;

		&::placeholder {
			font-size: 14px;
			transition: 0.3s ease-in-out;
			padding-left: 0px;
		}
	}

	/* input 框的聚焦态 */
	input:focus {
		border: none;
		height: 24px;
		width: 99%;
		outline: none;
		transition: 0.3s ease-in-out;
		box-shadow: 0 0 0 1px #4D4AE8;
		border-radius: 4px; 
		background-color: rgba(255, 255, 255, 0.9);
		transition: 0.3s ease-in-out;

		&::placeholder {
			font-size: 14px;
			transition: 0.3s ease-in-out;
			padding-left: 2px;
		}
	};
`



export default FileList = ({files, editFile, saveFile, deleteFile}) => {

	const [editItem, setEditItem] = useState(false) // 判断是否要显示重名的 UI 样式
	const [value, setValue] = useState('') //编辑文档名
	const oInput = useRef(null) //获取 input 框的 DOM, 用于聚焦
	const enterPressed = useKeyboardHandle(13)	// 👉结合 hook 的抽象, 用来判断对应的键盘 (Esc、Enter) 是否按下了
	const escPressed = useKeyboardHandle(27)	// 👉结合 hook 的抽象, 用来判断对应的键盘 (Esc、Enter) 是否按下了


	// 关闭 list 的【编辑状态】
	const closeListEdit = () => {
		setEditItem(false)
		setValue('') //清空输入状态
	}

	// 键盘的事件操作
	useEffect(() => {
		// 👇抽象后, 用钩子函数判断 ---
		if(enterPressed && editItem) {
			saveFile(editItem, value) //把【item id】跟【输入框的 value 】给到 App.js 组件
			closeListEdit() //关闭编辑状态
		}
		if(escPressed && editItem) {
			closeListEdit() //关闭编辑状态
		}

		// 👇未抽象前, 直接判断 ---
		// const keyboardHandle = (e) => {
		// 	let {keyCode} = e //解构出键盘事件
		// 	if(keyCode === 13 && editItem) {//键盘为回车并且为 editItem 状态
		// 		saveFile(editItem, value) //把【item id】跟【输入框的 value 】给到 App.js 组件
		// 		closeListEdit() //关闭编辑状态
		// 	}
		// 	if(keyCode === 27 && editItem) {//键盘为 esc 并且为 editItem 状态
		// 		closeListEdit() //关闭编辑状态
		// 	}
		// }
		// // 👇监听键盘事件
		// document.addEventListener('keyup', keyboardHandle) 

		// // 👇移除键盘的监听事件
		// return () => {
		// 	document.removeEventListener('keyup', keyboardHandle)
		// }
	})

	//⚡️编辑后自动聚焦输入框
	useEffect(() => {
		if(editItem) {
			oInput.current.focus() 
		}
	}, [editItem])

	return (
		<GroupUL>
			{
				files.map((file) => {
					return (
						<div className="cell" 
							 key={file.id}
							 //点击文档
							 onClick={ () => {editFile(file.id)}}   //把 id 传递给 App.js
						>
							{ //列表默认状态
								(file.id !== editItem) &&  
									<>
										<li
											className='list-group-item d-flex align-items-center'
										>
											<img src={docs} style={{width: 18, marginRight: 4}}/>
											<span>{file.title}</span>
										</li>
										<div className="action">
											<img //编辑文档名
												className="edit_btn"
												onClick={ () => {setEditItem(file.id)} } //把 id 传递给 App.js
												src={edit} style={{width: 16}}
											/>
											<img //删除文档
												className="delete_btn"
												onClick={ () => {editFile(file.id)} }//把 id 传递给 App.js
												src={deleteIcon} 
												style={{width: 16}}
											/>
										</div>
									</>
							}
							{ //列表编辑状态
								(file.id === editItem) &&  
									<>
										<li
											className='list-group-item d-flex align-items-center'
										>
											<input //输入框
												ref={oInput}
												placeholder='Edit Docs name'
												value={value} //🔥受控组件
												onChange={ (e) => {setValue(e.target.value)} } //🔥受控组件, 更新文档名为 value 
												onClick={ () => {editFile(file.id)} }   //把 id 传递给 App.js
											/>
										</li>
										<div className="action">
											<img  //关闭编辑状态
												className="close_btn"
												onClick={ () => { closeListEdit() } } //把 id 传递给 App.js
												src={closeIcon} style={{width: 16} }
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