import React from 'react'
import styled from 'styled-components'
import closeIcon from '../../src/resource/icon/icon-close.svg'


const TabUl = styled.ul.attrs({
	className: 'nav nav-pills' //药丸样式
})`
	.active {
		background-color: #d4d8f2 !important;
		color: #352766!important;
		font-weight: 500;
	}

	.nav-link {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
	}

	span {
		display: flex;
		align-items: center;
		justify-content: center;
	}
`

export const TabList = ({files, activeItem, unSaveItems, clickItem, closeItem}) => {
	return (
		<TabUl>
			{
				files.map((file) => {
					return (
						<li className='nav-items' key={file.id}>
							<a href="#" 
							   className={`nav-link ${activeItem===file.id && 'active'}`} //🚀一个固定类名 + 一个动态判断的类名
							   onClick={(e)=>{e.preventDefault(); clickItem(file.id)}}
							>
								{file.title}
								<span>
									<img src={closeIcon} alt="" style={{width: 18}}/>
								</span>
							</a>
						</li>
					)
				})
			}
		</TabUl>
	)
}
