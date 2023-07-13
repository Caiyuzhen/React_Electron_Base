import React, { Fragment, useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import docs from '../../src/resource/icon/icon-Docs.svg'
import edit from '../../src/resource/icon/icon-edit.svg'
import deleteIcon from '../../src/resource/icon/icon-delete.svg'



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
	return (
		<GroupUL>
			{
				files.map((file) => {
					return (
						<div className="cell" key={file.id}>
							<li
								className='list-group-item d-flex align-items-center'
							>
								<img src={docs} style={{width: 18, marginRight: 4}}/>
								<span>{file.title}</span>
							</li>
							<div className="action">
								<img src={edit} style={{width: 16}}/>
								<img src={deleteIcon} style={{width: 16}}/>
							</div>
						</div>
					)
				})
			}
		</GroupUL>
	)
}