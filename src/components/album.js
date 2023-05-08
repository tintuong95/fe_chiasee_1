import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {Badge, Checkbox, Dropdown, Image, Space, Watermark} from 'antd';
import {FcFolder} from 'react-icons/fc';
import {RxCountdownTimer} from 'react-icons/rx';
import {FaExternalLinkAlt} from 'react-icons/fa';
import {useNavigate} from 'react-router-dom';
import {GiEarthAmerica} from 'react-icons/gi';
import {BsArrowLeftRight} from 'react-icons/bs';
import {timeBetween} from '../utils/time';
import {AiOutlineBars, AiOutlineMore} from 'react-icons/ai';
import { deleteAlbum } from '../apis/album';
import { openNotification } from '../utils/notification';
import { ERROR, ERROR_TEXT, SUCCESS, SUCCESS_TEXT } from '../constants/notifacation';

function AlbumDefault({data, initialParams,fetchListAlbums}) {
	const navigate = useNavigate();

	const onClickMain = (evt) => {
		navigate('/album/' + data.id);
	};

	const onDelete = (id) => {
		deleteAlbum(id)
			.then((result) => {
				fetchListAlbums(initialParams);
				openNotification(SUCCESS, SUCCESS_TEXT);
			})
			.catch((err) => {
				console.log(err);
				openNotification(ERROR, ERROR_TEXT);
			});
	};

	return (
		// <Watermark content='Ant Design'>
		<div className=' hover:shadow-lg relative album  bg-neutral-800    rounded-sm  shadow-sm p-3 pb-1'>
			<div className='p-2'>
				<div
					aria-hidden
					onClick={onClickMain}
					className=' text-gray-700 cursor-pointer  text-base font-semibold flex items-center gap-3 '>
					<Badge color='#f50' /> <div className='text-neutral-200'>{data?.name}</div>
				</div>
				<div className='text-sm text-gray-400 cursor-pointer hover:text-blue-700 hover:underline  flex items-center gap-2'>
					<GiEarthAmerica />
					{`chiasee.com/a/${data?.alias}`}
				</div>
				<div className='my-3'></div>
				<div className='text-sm text-gray-400 flex items-center gap-2'>
					<BsArrowLeftRight />
					{data?.state == 0 ? 'Bản nháp' : 'Công khai'}
				</div>

				<div className='text-sm hover:text-blue-700 cursor-pointer text-gray-400 flex items-center gap-2'>
					<FcFolder />
					{data?.folder_albums?.name}
				</div>

				<div className='my-3'></div>
				<div className='text-sm text-gray-400 flex items-center gap-2 '>
					<RxCountdownTimer />

					{timeBetween(data?.createdAt)}
				</div>
				<Dropdown
					placement='bottomRight'
					menu={{
						items: [
							{
								label: (
									<span onClick={()=>{onDelete(data?.id)}} aria-hidden className='cursor-pointer'>
										Delete
									</span>
								),
								key: '1',
							},
						],
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
		</div>
		// </Watermark>
	);
}

AlbumDefault.propTypes = {
	data: PropTypes.object,
	initialParams: PropTypes.object,
	fetchListAlbums: PropTypes.func,
};

export default AlbumDefault;
