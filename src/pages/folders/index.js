import React from 'react';
import PropTypes from 'prop-types';
import {Button, Image, Input, Pagination, Modal, Switch, Segmented} from 'antd';

import {BsPlusSquare} from 'react-icons/bs';
import {AiOutlineAppstore, AiOutlinePlus, AiOutlineSearch} from 'react-icons/ai';


import FolderComponent from '../../components/folder';
import {useState} from 'react';
import {deleteFolder, getFolderList} from '../../apis/folder';
import {useEffect} from 'react';
import {AppstoreOutlined, UnorderedListOutlined} from '@ant-design/icons';
import {createFolder} from '../../apis/folder';
import {openNotification} from '../../utils/notification';
import {
	ERROR,
	ERROR_TEXT,
	SUCCESS,
	SUCCESS_TEXT,
} from '../../constants/notifacation';

import {useMitt} from 'react-mitt';
import BackButton from '../../components/btn-back';

function Folder(props) {
	const [folders, setFolders] = useState([]);
	const {emitter} = useMitt();
	const [input, setInput] = useState('');
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [folderLists, setFolderLists] = useState([]);
	const newSearchParams = {
		currentPage: 1,
		perPage: 16,
	};

	const [initialParams, setInitialParams] = useState(newSearchParams);

	const fetchListFolders = (data) => {
		emitter.emit('loading', true);
		getFolderList(data)
			.then((result) => {
				setFolders(result.data);
				console.log(result.data);
			})
			.catch((err) => {
				console.log(err);
			})
			.finally(() => {
				emitter.emit('loading', false);
			});
	};

	const fetchCreateFolders = () => {
		const data = {
			name: input,
		};
		createFolder(data)
			.then((result) => {
				fetchListFolders(initialParams);
				openNotification(SUCCESS, SUCCESS_TEXT);
			})
			.catch((err) => {
				openNotification(ERROR, ERROR_TEXT);
			});
	};

	const fetchDeleteFolders = (listFolderId) => {
		listFolderId.forEach((item) => {
			deleteFolder(item)
				.then((result) => {
					fetchListFolders(initialParams);
					openNotification(SUCCESS, SUCCESS_TEXT);
				})
				.catch((err) => {
					openNotification(ERROR, ERROR_TEXT);
				});
		});
	};

	const handleOk = () => {
		fetchCreateFolders();
		setIsModalOpen(false);
	};

	const handleOpen = () => {
		setIsModalOpen(true);
	};

	const handleCancel = () => {
		setIsModalOpen(false);
	};

	useEffect(() => {
		fetchListFolders(initialParams);
	}, []);

	return (
		<div className=' '>
			<Modal
				title='Thêm mới thư mục'
				open={isModalOpen}
				okType='default'
				onOk={handleOk}
				onCancel={handleCancel}>
				<input
					name='name'
					onChange={(e) => {
						setInput(e.target.value);
					}}
					className='mt-5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus-visible:outline-none block w-full p-2.5    '
					placeholder='Name folder'
				/>
				<small className='text-slate-400 ml-3'>Không quá 50 ký tự</small>
			</Modal>
			<div className='px-5 pl-10 py-3'>
				<div className='flex justify-between gap-2 py-2  w-full'>
					<div className='flex gap-4  '>
						<BackButton />

						{/* <ConfirmModal
							action={fetchDeleteFolders}
							data={folderLists}
							textBtn={'Xóa thư mục'}
							titleText={'Xác nhận xóa thư mục'}
						/> */}
					</div>
					<div className='flex gap-4 '>
						<input
							className='w-52 ml-36 px-4 rounded bg-neutral-800 text-neutral-200 focus-visible:outline-none'
							onChange={(e) => {
								setInitialParams({
									...initialParams,
									name: e.target.value,
								});
							}}
							placeholder='Tìm kiếm'
						/>
						{/* <button
							onClick={() => {
								if (initialParams?.name == '') delete initialParams?.name;
								fetchListFolders(initialParams);
							}}
							style={{width: 150}}
							type='button'
							className=' flex gap-2 border duration-150 transition-all  border-rose-700  text-rose-600 bg-white hover:bg-rose-600 hover:text-white ease-in-out font-medium rounded-md text-sm px-5 py-2 text-center  items-center  '>
							<AiOutlineSearch />
							Tìm kiếm
						</button> */}
					</div>
				</div>
				<div className='my-3 flex justify-between items-center mt-10'>
					<div className='text-xl text-neutral-200 '>THƯ MỤC</div>
					<div className='flex items-center'>
						<button
							onClick={handleOpen}
							type='button'
							className=' flex gap-2  duration-150 transition-all      hover:text-white ease-in-out text-neutral-400 rounded-md text-sm px-5 py-2 text-center  items-center  '>
							<AiOutlinePlus />
							Thêm thư mục
						</button>
						<AiOutlineAppstore size={24} color='white' />
					</div>
				</div>

				<div className='w-full grid grid-cols-4 gap-6  justify-start mt-4  z-10 py-5'>
					{folders?.data?.map((v) => (
						<FolderComponent
							setFolderLists={setFolderLists}
							folderLists={folderLists}
							key={v.id}
							data={v}
							fetchListFolders={fetchListFolders}
							initialParams={initialParams}
						/>
					))}
				</div>
				<div className=''>
					<Pagination
						current={initialParams?.currentPage}
						pageSize={initialParams?.perPage}
						total={folders?.meta?.total}
						onChange={(page) => {
							const newParams = {...initialParams, currentPage: page};
							setInitialParams(newParams);
							fetchListFolders(newParams);
						}}
					/>
				</div>
			</div>
		</div>
	);
}
Folder.propTypes = {};

export default Folder;
