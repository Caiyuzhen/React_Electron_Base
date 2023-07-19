import React from 'react'
import styled from 'styled-components'
import closeIcon from '../../src/resource/icon/icon-close.svg'
import unSaveIcon  from '../../src/resource/icon/icon-unSave.svg'


const TabUl = styled.ul.attrs({
	className: 'nav nav-pills' //药丸样式
})`
	padding-top: 16px;
	padding-left: 4px;
	
	a {
		color: #9c9ca9;
	}

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
		gap: 8px;
	}

	span {
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.closeIcon {
		display: none;
		transition: all 0.3s ease-in-out;
	}

	.nav-link:hover .closeIcon { //🚀移上 tab 后, 显示关闭按钮
		display: inline-block;
		transition: all 0.3s ease-in-out;
	}

	.nav-link:hover .rounded-circle { //🚀移上 tab 后, 隐藏未保存按钮
		display: none;
		transition: all 0.3s ease-in-out;
	}

	.rounded-circle {
		transition: all 0.3s ease-in-out;
	}

	.unSaveStyle {
		
	}
`

export const TabList = ({files, activeItem, unSaveItems, clickItem, closeItem}) => {
	return (
		<TabUl>
			{
				files.map((file) => {
					let showUnSaveMarkIcon = unSaveItems.includes(file.id)// 判断是否显示【未保存】icon, 看这个 id 是否存在于 unSaveItems 数组中, 数据由上层传入

					return (
						<li className='nav-items' key={file.id}>
							<a href="#" 
							   className={`nav-link ${activeItem===file.id && 'active'} ${showUnSaveMarkIcon && 'unSaveStyle'}`} //🚀一个固定类名 + 两个动态判断的类名(数据由上层传入)
							   onClick={(e)=>{e.preventDefault(); clickItem(file.id)}}
							>
								{file.title}
								
								<span //关闭按钮
									className='closeIcon'
									onClick={(e)=>{e.stopPropagation(); closeItem(file.id)}} // 💧 阻止冒泡, 避免触发父元素 li 的点击事件
								>
									<img src={closeIcon} alt="" style={{width: 18}}/>
								</span>

								{showUnSaveMarkIcon && <img src={unSaveIcon} style={{width: 18}} className='rounded-circle'></img>}
							</a>
						</li>
					)
				})
			}
		</TabUl>
	)
}
