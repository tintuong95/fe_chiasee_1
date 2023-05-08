import {Avatar, List, Tabs, Tag} from 'antd';
import React, {useEffect, useState} from 'react';
import {AiOutlineDelete, AiOutlineSearch} from 'react-icons/ai';
import ListComponent from './components/list';
import ItemEdit from './components/item-edit';
import {Link, useParams} from 'react-router-dom';
import {getAlbumDetails} from '../../apis/album';

import moment from 'moment';
import {getAlbumPhotos} from '../../apis/photo';
import {ALBUM_STATUS_TEXT, NOTIFICATION_COLOR} from '../../constants/text';

import {FcFolder} from 'react-icons/fc';

export default function AlbumDetails() {
	const {id} = useParams();
	const [album, setAlbum] = useState({});
	const [albumPhotos, setAlbumPhotos] = useState({});
	const fetchAlbumDetails = () => {
		getAlbumDetails(id)
			.then((results) => {
				setAlbum(results.data);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const fetchAlbumPhotos = () => {
		getAlbumPhotos(id)
			.then((results) => {
				setAlbumPhotos(results.data);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const onClickReview = (evt) => {
		evt.stopPropagation();
		window.open('http://localhost:3002/review/' + id, '_blank');
		// navigate('/review/' + data.id);
	};

	const refeshAlbumPhotos = () => {
		fetchAlbumPhotos();
	};

	useEffect(() => {
		fetchAlbumDetails();
		fetchAlbumPhotos();
	}, [id]);

	return (
		<div className='w-full px-5 pl-10 py-5 m-auto  mt-7 rounded-sm  text-gray-200'>
			<div className='grid grid-cols-2 py-4  mb-5'>
				<div className='col-span-1 flex items-center'>
					<p className='text-2xl font-bold mb-0  '>{album?.name}</p>
				</div>
				<div className='col-span-1 flex justify-end gap-3'>
					<button
						onClick={onClickReview}
						type='button'
						className=' flex gap-2  justify-center border border-stone-700 hover:text-rose-600  font-medium rounded-md text-sm px-5 py-2 text-center  items-center  '>
						{/* <AiOutlineSearch /> */}
						Demo
					</button>
					<button
						type='button'
						className=' flex gap-2  justify-center  bg-stone-800 text-white hover:bg-opacity-90  font-medium rounded-md text-sm px-5 py-2 text-center  items-center  '>
						{/* <AiOutlineSearch /> */}
						Công khai
					</button>
				</div>
			</div>

			{/* <h1 className='mt-4 border-b-2 text-rose-600 inline-block pb-1 '>
				TỔNG QUAN
			</h1>

			<div className='grid grid-cols-2 py-3 mb-5 '>
				<div className='col-span-1 flex flex-col gap-7 '>
					<div className='flex item-center'>
						<p className=' mb-0 w-1/4'>Tên album :</p>
						<p className=' mb-0'>{album?.name}</p>
					</div>
					<div className='flex item-center'>
						<p className=' mb-0  w-1/4'>Link demo :</p>
						<p className='text-blue-700 hover:underline cursor-pointer mb-0'>
							{'https://chiasee.com/' + album?.alias}
						</p>
					</div>
					<div className='flex item-center'>
						<p className=' mb-0  w-1/4'>Link công khai</p>
						<p className='text-blue-700 hover:underline cursor-pointer mb-0'>
							{'https://dashboard.chiasee.com/' + album?.alias}
						</p>
					</div>
					<div className='flex item-center'>
						<p className=' mb-0  w-1/4'>Thư mục</p>
						<p className='mb-0'>
							<Link
								className='flex items-center gap-2 hover:underline cursor-pointer'
								to={'/folder/' + album?.folder_albums?.id}>
								<FcFolder /> {album?.folder_albums?.name}
							</Link>
						</p>
					</div>
					<div className='flex item-center'>
						<p className=' mb-0  w-1/4'>Trạng thái</p>
						<p className=' mb-0'>
							<Tag className='mt-1' color={NOTIFICATION_COLOR[album?.status]}>
								{ALBUM_STATUS_TEXT[album?.status]}
							</Tag>
						</p>
					</div>
					<div className='flex item-center'>
						<p className=' mb-0  w-1/4'>Thời gian</p>
						<p className='mb-0 '>{moment(album?.createdAt).format('DD/MM/YYYY')}</p>
					</div>
				</div>

			
			</div> */}
			<div className='text-xl text-neutral-200 mt-10 mb-5'>THÔNG TIN</div>

			<div className='grid grid-cols-4 gap-5'>
				<ItemEdit
					id={id}
					name_text={'Tên album'}
					name={'name'}
					value={album?.name}
					type={'input'}
				/>

				<ItemEdit
					id={id}
					name_text={'Đường dẫn'}
					name={'alias'}
					value={album?.alias}
					type={'input'}
				/>

				<ItemEdit
					id={id}
					name_text={'Hiệu ứng'}
					name={'effect'}
					value={album?.effect}
					type={'option'}
				/>
				<ItemEdit
					id={id}
					name_text={'Tốc độ'}
					name={'speed'}
					value={album?.speed}
					type={'input'}
				/>

				<ItemEdit
					id={id}
					name_text={'Tự động'}
					name={'autoPlay'}
					value={album?.autoPlay}
					type={'switch'}
				/>

				<ItemEdit
					id={id}
					name_text={'Trộn ảnh'}
					name={'mix'}
					value={album?.mix}
					type={'switch'}
				/>

				<ItemEdit
					id={id}
					name_text={'Công khai'}
					name={'state'}
					value={album?.state}
					type={'switch'}
				/>
			</div>
			<div className='text-xl text-neutral-200 mt-10 mb-5'>HÌNH ẢNH</div>
			<div className='mt-2  '>
				{albumPhotos?.length > 0 && (
					<ListComponent data={albumPhotos} refeshAlbumPhotos={refeshAlbumPhotos} />
				)}
			</div>
		</div>
	);
}
