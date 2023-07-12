import React, { Fragment, useState } from 'react'

/**
 * @title {string} 标题文案
 * @onSearchData {string} 搜索的回调
 */
const SearchFile = ({title, onSearchData}) => { 

	const [searchActive, setSearchActive] = useState(false) //是否是搜索状态
	const [value, setValue] = useState('') //列表的值

	return (
		<>
			{
				// 判断显示【搜索结果】还是【默认状态】
				!searchActive && 
					<>
						<div>
							<span>{title}</span>
							<span>搜索</span>
						</div>
					</>
			}
		</>
	)
}

export default SearchFile