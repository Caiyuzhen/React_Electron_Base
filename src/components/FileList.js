import React, { Fragment, useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import docs from '../../src/resource/icon/icon-Docs.svg'


// UL 标签
let GroupUL = styled.ul.attrs({
	className: "list-group list-group-flush"
})`
	border-bottom: 0px solid #9c9cba; //分割线
	li {
		background-color: transparent;
	}
`



export default FileList = ({files, editFile, saveFile, deleteFile}) => {
	return (
		<GroupUL>
			{
				files.map((file) => {
					return (
						<li
							key={file.id}
							className='list-group-item d-flex align-items-center'
						>
						<img src={docs} style={{width: 20}}/>
						<span>{file.title}</span>
						</li>
					)
				})
			}
		</GroupUL>
	)
}