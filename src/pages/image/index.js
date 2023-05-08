import React from 'react';
import PropTypes from 'prop-types';
import {Button, Image, Input, Modal, Pagination, Result, Segmented} from 'antd';
import ImageComponent from '../../components/image';
import {BsFolderPlus, BsPlusSquare} from 'react-icons/bs';
import {
	AiOutlineAppstore,
	AiOutlineDelete,
	AiOutlineSearch,
} from 'react-icons/ai';
import {FiEdit2} from 'react-icons/fi';
import {MdPublic} from 'react-icons/md';
import {Link, useNavigate, useParams} from 'react-router-dom';
import {useState} from 'react';
import {deletePhoto, getPhotoList} from '../../apis/photo';
import {useEffect} from 'react';
import {createAlbum} from '../../apis/album';
import {AppstoreOutlined, UnorderedListOutlined} from '@ant-design/icons';
import ConfirmModal from '../../components/confirm-modal';
import {openNotification} from '../../utils/notification';
import {
	ERROR,
	ERROR_TEXT,
	SUCCESS,
	SUCCESS_TEXT,
} from '../../constants/notifacation';
import {ExclamationCircleFilled} from '@ant-design/icons';
import {SWIPER_EFFECT} from '../../constants/effect';
import ImageModal from './components/modal-image';
import {useMitt} from 'react-mitt';
import BackButton from '../../components/btn-back';

const {confirm} = Modal;
function ImageLists(props) {
	const {emitter} = useMitt();
	const [images, setImages] = useState([]);
	const [photoList, setPhotoList] = useState([]);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [statusModal, setStatusModal] = useState(true);

	const [createAlbumData, setCreateAlbumData] = useState({
		name: '',
		alias: '',
		status: 0,
		state: 0,
		autoPlay: true,
		speed: 1200,
		effect: SWIPER_EFFECT.random,
		mix: true,
	});
	const {id} = useParams();

	const newSearchParams = {
		currentPage: 1,
		perPage: 15,
	};

	const [initialParams, setInitialParams] = useState(newSearchParams);

	const fetchListImages = (id, data) => {
		emitter.emit('loading', true);
		getPhotoList(id, data)
			.then((result) => {
				setImages(result.data);
				console.log(result);
			})
			.catch((err) => {
				console.log(err);
			})
			.finally(() => {
				emitter.emit('loading', false);
			});
	};

	const fetchCreateAlbum = () => {
		emitter.emit('loading', true);
		const data = {
			...createAlbumData,
			folderId: id,
			photos: photoList,
		};
		createAlbum(data)
			.then((result) => {
				setStatusModal(true);
				setIsModalOpen(true);
			})
			.catch((err) => {
				setStatusModal(false);
				setIsModalOpen(true);
			})
			.finally(() => {
				emitter.emit('loading', false);
			});
	};

	const fetchDeletePhotos = (listPhotoId) => {
		listPhotoId.forEach((item) => {
			deletePhoto(item)
				.then((result) => {
					fetchListImages(id, initialParams);
					openNotification(SUCCESS, SUCCESS_TEXT);
				})
				.catch((err) => {
					openNotification(ERROR, ERROR_TEXT);
				});
		});
	};

	const onCreateAlbum = () => {
		fetchCreateAlbum(initialParams);
	};

	const onChange = (evt) => {
		const {name, value} = evt.target;
		setCreateAlbumData({...createAlbumData, [name]: value});
	};

	useEffect(() => {
		fetchListImages(id, initialParams);
	}, [id]);
	return (
		<div className=' '>
			<div className='px-5 pl-10 py-3'>
				<ImageModal
					isModalOpen={isModalOpen}
					type={statusModal}
					setIsModalOpen={setIsModalOpen}
				/>
				<div
					className='flex justify-between  py-2  w-full'
					style={{paddingRight: 240}}>
					<div className='flex gap-4 '>
						<BackButton />
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
					</div>
				</div>
				<div
					className='my-3 flex justify-between items-center'
					style={{paddingRight: 240}}>
					<div className='text-xl text-neutral-200 '>LIST FOLDER</div>
					<div className='flex items-center '>
						<Link to={`/folder/${id}/upload`}>
							<button
								type='button'
								className=' flex gap-2  duration-150 transition-all      hover:text-white ease-in-out text-neutral-400 rounded-md text-sm px-5 py-2 text-center  items-center  '>
								<BsPlusSquare />
								Thêm hình ảnh
							</button>
						</Link>
						<ConfirmModal
							action={fetchDeletePhotos}
							data={photoList}
							textBtn={'Xóa hình ảnh'}
							titleText={'Xác nhận xóa hình ảnh'}
						/>
						<AiOutlineAppstore size={24} color='white' />
					</div>
				</div>

				<div
					className='w-full grid grid-cols-5 gap-7 justify-start mt-4  py-2  z-10'
					style={{paddingRight: 240}}>
					{images?.data?.map((v) => (
						<ImageComponent
							photoList={photoList}
							setPhotoList={setPhotoList}
							key={v.id}
							data={v}
						/>
					))}
				</div>
				<Pagination
					current={initialParams?.currentPage}
					pageSize={initialParams?.perPage}
					total={images?.meta?.total}
					onChange={(page) => {
						const newParams = {...initialParams, currentPage: page};
						setInitialParams(newParams);
						fetchListImages(id, newParams);
					}}
				/>
			</div>
			<div className='w-60 border-l border-l-zinc-800 bg-opacity-50  h-screen flex justify-center p-3 pt-5 fixed right-0 top-0 z-30'>
				<div className='w-full p-3'>
					<span
						aria-hidden='true'
						onClick={onCreateAlbum}
						className=' bg-blue-600 p-2 rounded cursor-pointer text-white shadow-blue-700 shadow-inner   flex items-center justify-center gap-2 text-sm'>
						<MdPublic />
						CÔNG KHAI
					</span>

					<hr className='h-px my-6  bg-neutral-700 border-0 dark:bg-gray-700'></hr>
					<div>
						<label htmlFor='small' className='block  mb-2  text-stone-500'>
							Tên album
						</label>
						<input
							placeholder='Album2007'
							name='name'
							onChange={onChange}
							className='block w-full p-2 mb-6 text-sm text-white   rounded-sm bg-neutral-800 '
						/>
						<label htmlFor='small' className='block  mb-2  text-stone-500'>
							Đường dẫn
						</label>
						<input
							placeholder='/slug'
							name='alias'
							onChange={onChange}
							className='block w-full p-2 mb-6 text-sm text-white   rounded-sm bg-neutral-800 '
						/>

						<label htmlFor='small' className='block  mb-2  text-stone-500'>
							Hiệu ứng
						</label>
						<select
							id='small'
							name='effect'
							onChange={onChange}
							className='block w-full p-2 mb-6 text-sm text-white   rounded-sm bg-neutral-800 '>
							{Object.entries(SWIPER_EFFECT).map((item, index) => {
								return (
									<option key={index} value={item[1]}>
										{item[1]}
									</option>
								);
							})}
						</select>
						<label htmlFor='small' className='block  mb-2  text-stone-500'>
							Tự động
						</label>
						<select
							id='small'
							name='autoPlay'
							onChange={onChange}
							className='block w-full p-2 mb-6 text-sm text-white   rounded-sm bg-neutral-800 '>
							<option selected value={false}>
								Tắc
							</option>
							<option value={true}>Bật</option>
						</select>
						<label htmlFor='small' className='block  mb-2  text-stone-500'>
							Trộn ảnh
						</label>
						<select
							id='small'
							name='mix'
							onChange={onChange}
							className='block w-full p-2 mb-6 text-sm text-white   rounded-sm bg-neutral-800 '>
							<option selected value={true}>
								Bật
							</option>
							<option value={false}>Tắc</option>
						</select>
						<label htmlFor='small' className='block  mb-2  text-stone-500'>
							Tốc độ
						</label>
						<input
							placeholder='1200'
							name='speed'
							onChange={onChange}
							className='block w-full p-2 mb-6 text-sm text-white   rounded-sm bg-neutral-800 '
						/>
						<label htmlFor='small' className='block  mb-2  text-stone-500'>
							Tình trạng
						</label>
						<select
							id='small'
							name='state'
							onChange={onChange}
							className='block w-full p-2 mb-6 text-sm text-white   rounded-sm bg-neutral-800 '>
							<option selected value={0}>
								Bản nháp
							</option>
							<option value={1}>Bình thường</option>
						</select>
					</div>
				</div>
			</div>
		</div>
	);
}

ImageLists.propTypes = {};

export default ImageLists;
