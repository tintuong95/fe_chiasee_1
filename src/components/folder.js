import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {Checkbox, Dropdown, Image, Space, Watermark} from 'antd';
import {FcOpenedFolder} from 'react-icons/fc';
import moment from 'moment';
import {useNavigate} from 'react-router-dom';
import {useEffect} from 'react';
import {timeBetween} from '../utils/time';
import {DownOutlined} from '@ant-design/icons';
import {AiOutlineBars, AiOutlineMore} from 'react-icons/ai';
import {deleteFolder} from '../apis/folder';

function FolderComponent({
	data,
	setFolderLists,
	folderLists,
	initialParams,
	fetchListFolders,
}) {
	const [status, setStatus] = useState(true);
	const navigate = useNavigate();

	const onClick = (evt) => {
		navigate(`/folder/${data.id}`);
	};

	const onDelete = () => {
		deleteFolder(data.id)
			.then((result) => {
				fetchListFolders(initialParams);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const items = [
		{
			label: <span>Edit </span>,
			key: '0',
		},
		{
			label: <span aria-hidden className='cursor-pointer' onClick={onDelete}>Delete</span>,
			key: '1',
		},
	];

	return (
		// <Watermark content='Ant Design'>
		<div className=' hover:shadow transition relative  duration-100 ease-in-out  group   bg-neutral-800  rounded-sm overflow-hidden  p-5'>
			<div className=' duration-100 ease-in-out transition'>
				<FcOpenedFolder size={40} />
			</div>

			<div className=' cursor-pointer px-2 mt-8' aria-hidden onClick={onClick}>
				<div className=' text-neutral-200  text-base '>
					{data?.name || data?.id}
				</div>
				<div className='text-sm text-gray-500 '>{timeBetween(data?.createdAt)}</div>
			</div>

			<Dropdown
				placement='bottomRight'
				menu={{
					items,
				}}
				className='absolute top-2 right-2 text-white'
				trigger={['click']}>
				<span aria-hidden onClick={(e) => e.preventDefault()}>
					<Space>
						<AiOutlineMore />
					</Space>
				</span>
			</Dropdown>
		</div>
		// </Watermark>
	);
}

FolderComponent.propTypes = {
	data: PropTypes.object,
	setFolderLists: PropTypes.func,
	folderLists: PropTypes.object,
	initialParams: PropTypes.object,
	fetchListFolders: PropTypes.func,
};

export default FolderComponent;
