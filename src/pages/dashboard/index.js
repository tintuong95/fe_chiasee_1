import React from 'react';
import {Avatar, Button, Col, Row, Space, Statistic, Tag} from 'antd';
import CountUp from 'react-countup';
import {UserOutlined} from '@ant-design/icons';
import {getCountPhotos} from '../../apis/photo';
import {useEffect} from 'react';
import {useState} from 'react';
import {getCountFolders, getFolderList} from '../../apis/folder';
import {getAlbumList, getCountAlbums} from '../../apis/album';
import {useSelector} from 'react-redux';
import {useMitt} from 'react-mitt';

import {BiPhotoAlbum} from 'react-icons/bi';
import {FiFolder} from 'react-icons/fi';

import {HiOutlinePhotograph} from 'react-icons/hi';
import {MdOutlineSdStorage} from 'react-icons/md';
import {BsFolderPlus} from 'react-icons/bs';
import AlbumComponent from '../../components/album';
import FolderComponent from '../../components/folder';

export default function DashBoard() {
	// const [data, setData] = useState();
	const [countPhotos, setCountPhotos] = useState(0);
	const [countFolders, setCountFolders] = useState(0);
	const [countAlbums, setCountAlbums] = useState(0);
	const [albums, setAlbums] = useState([]);
	const [folderLists, setFolderLists] = useState([]);
	const {emitter} = useMitt();
	const {user} = useSelector((state) => state.auth);

	const fetchCountPhotos = getCountPhotos();

	const fetchCountFolders = getCountFolders();

	const fetchCountAlbums = getCountAlbums();

	const fetchAlbumList = getAlbumList({currentPage: 1, perPage: 4});

	const fetchFolderList = getFolderList({currentPage: 1, perPage: 4});

	useEffect(() => {
		emitter.emit('loading', true);
		Promise.all([
			fetchCountPhotos,
			fetchCountFolders,
			fetchCountAlbums,
			fetchAlbumList,
			fetchFolderList,
		])
			.then((result) => {
				const [photos, folders, albums, albumsList, folderList] = result;
				setCountPhotos(photos.data.count);
				setCountFolders(folders.data.count);
				setCountAlbums(albums.data.count);
				setAlbums(albumsList.data);
				setFolderLists(folderList.data);
			})
			.finally(() => {
				emitter.emit('loading', false);
			});
	}, []);

	useEffect(() => {}, []);

	return (
		<div className='w-full  px-5 pl-10 py-5 '>
			<div className='bg-neutral-800 text-neutral-200 p-8 mt-6 rounded'>
				<h1>Try Team Pro for free</h1>
				<p className='mb-8'>14 days free trial. No credit card required.</p>
				<span className='bg-rose-600 p-2  rounded'>Start 14-day free trial</span>
			</div>
			<h1 className='text-neutral-200 text-xl my-5 mt-8'>KHỞI TẠO</h1>
			<div className='flex gap-5'>
				<div className='flex bg-neutral-100 p-4 rounded-sm w-72 gap-4 items-center pl-6 text-neutral-800'>
					<BsFolderPlus /> New Folder
				</div>
				<div className='flex bg-neutral-100 p-4 rounded-sm w-72 gap-4 items-center pl-6 text-neutral-800'>
					<BsFolderPlus /> New Album
				</div>
				<div className='flex bg-neutral-100 p-4 rounded-sm w-72 gap-4 items-center pl-6 text-neutral-800'>
					<BsFolderPlus /> New Photo
				</div>
			</div>
			<h1 className='text-neutral-200 text-xl my-5 mt-16'>THỐNG KÊ</h1>
			<div className='w-full   '>
				{/* <div className='flex justify-between items-center mb-5'>
					<div className='flex items-center gap-3  '>
						<Avatar
							shape='square'
							style={{backgroundColor: '#87d068'}}
							icon={<UserOutlined />}
						/>
						<div className='flex flex-col gap-1'>{user?.email}</div>
					</div>
					<div className='flex items-center'>
						{' '}
						<Tag color='success'>#Chuyên gia</Tag>
					</div>
				</div> */}
				{/* <div className='my-8 ' /> */}
				<div className='grid grid-cols-4 gap-5'>
					<div className='hover:shadow-lg transition text-neutral-200 duration-300 ease-in-out bg-neutral-800  rounded-sm shadow-sm p-4 '>
						<div className='flex  justify-between'>
							<Statistic title='ALBUMS' value={countPhotos} precision={2} />
							<BiPhotoAlbum size={40} />
						</div>
						<p
							style={{marginTop: 16}}
							type='primary'
							className='bg-stone-800 text-neutral-400 mt-10'>
							Còn lại 2
						</p>
					</div>
					<div className='hover:shadow-lg transition text-neutral-200 duration-300 ease-in-out bg-neutral-800  rounded-sm shadow-sm p-4 '>
						<div className='flex  justify-between'>
							<Statistic title='FOLDERS' value={countFolders} precision={2} />

							<FiFolder size={40} />
						</div>

						<p
							style={{marginTop: 16}}
							type='primary'
							className='bg-stone-800 text-neutral-400 mt-10'>
							Không giới hạn
						</p>
					</div>
					<div className='hover:shadow-lg transition text-neutral-200 duration-300 ease-in-out bg-neutral-800  rounded-sm shadow-sm p-4 '>
						<div className='flex  justify-between'>
							<Statistic title='PHOTOS' value={countAlbums} precision={2} />
							<HiOutlinePhotograph size={40} />
						</div>

						<p
							style={{marginTop: 16}}
							type='primary'
							className='bg-stone-800 text-neutral-400 mt-10'>
							Không giới hạn
						</p>
					</div>
					<div className='hover:shadow-lg transition text-neutral-200 duration-300 ease-in-out bg-neutral-800  rounded-sm shadow-sm p-4 '>
						<div className='flex  justify-between'>
							<Statistic title='QUALITY (GB)' value={12} precision={2} />
							<MdOutlineSdStorage size={40} />
						</div>

						<p
							style={{marginTop: 16}}
							type='primary'
							className='bg-stone-800 text-neutral-400 mt-10'>
							Còn lại 3 GB
						</p>
					</div>
				</div>
			</div>

			<h1 className='text-neutral-200 text-xl my-5 mt-16'>ALBUMS</h1>
			<div className='w-full grid grid-cols-4 gap-5  justify-start mt-4  z-10 '>
				{albums?.data?.map((v) => (
					<AlbumComponent key={v.id} data={v} />
				))}
			</div>
			<h1 className='text-neutral-200 text-xl my-5 mt-16'>FOLDERS</h1>
			<div className='w-full grid grid-cols-4 gap-6  justify-start   z-10 py-5'>
				{folderLists?.data?.map((v) => (
					<FolderComponent
						setFolderLists={setFolderLists}
						// folderLists={folderLists}
						key={v.id}
						data={v}
						// fetchListFolders={fetchListFolders}
						// initialParams={initialParams}
					/>
				))}
			</div>
		</div>
	);
}
