import React from 'react';
import PropTypes from 'prop-types';
import {Button, Image, Input, Pagination, Segmented} from 'antd';
import AlbumComponent from '../../components/album';
import {BsFolderPlus, BsPlusSquare} from 'react-icons/bs';
import {AiOutlineAppstore, AiOutlineDelete, AiOutlineSearch} from 'react-icons/ai';
import {FiEdit2} from 'react-icons/fi';
import {MdPublic} from 'react-icons/md';
import {Link} from 'react-router-dom';
import {useState} from 'react';
import {getAlbumList} from '../../apis/album';
import {useEffect} from 'react';
import {AppstoreOutlined, UnorderedListOutlined} from '@ant-design/icons';
import {useMitt} from 'react-mitt';
import BackButton from '../../components/btn-back';

function Albums() {
	const {emitter} = useMitt();
	const [albums, setAlbums] = useState([]);
	const newSearchParams = {
		currentPage: 1,
		perPage: 16,
	};

	const [initialParams, setInitialParams] = useState(newSearchParams);

	const fetchListAlbum = () => {
		emitter.emit('loading', true);
		getAlbumList(initialParams)
			.then((result) => {
				setAlbums(result.data);
				console.log(result);
			})
			.catch((err) => {
				console.log(err);
			})
			.finally(() => {
				emitter.emit('loading', false);
			});
	};

	useEffect(() => {
		fetchListAlbum();
	}, [initialParams]);
	return (
		<div className=' '>
			<div className='px-5 pl-10 py-3'>
				<div className='flex justify-between gap-2 py-2  w-full'>
					<div className='flex gap-4'>
						<BackButton />
					</div>
					<div className='flex gap-4 '>
						<input
							className='w-52  px-4 rounded bg-neutral-800 text-neutral-200 focus-visible:outline-none'
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
				<div className='my-3 flex mt-8 justify-between items-center'>
					<div className='text-xl text-neutral-200 '>LIST ALBUM</div>
					<AiOutlineAppstore size={24} color='white' />
				</div>
				<div className='w-full grid grid-cols-4 gap-7  justify-start mt-4  z-10 '>
					{albums?.data?.map((v) => (
						<AlbumComponent
							fetchListAlbums={fetchListAlbum}
							initialParams={initialParams}
							key={v.id}
							data={v}
						/>
					))}
				</div>
				<div className='mt-5 '>
					<Pagination
						current={initialParams?.currentPage}
						pageSize={initialParams?.perPage}
						total={albums?.meta?.total}
						onChange={(page) => {
							setInitialParams({...initialParams, currentPage: page});
						}}
					/>
				</div>
			</div>
		</div>
	);
}
Albums.propTypes = {};

export default Albums;
