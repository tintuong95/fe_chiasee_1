import {Avatar, Button, Dropdown, List, Skeleton, Space} from 'antd';
import {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {deleteAlbumPhotos} from '../../../apis/photo';
import {openNotification} from '../../../utils/notification';
import {
	ERROR,
	ERROR_TEXT,
	SUCCESS,
	SUCCESS_TEXT,
} from '../../../constants/notifacation';
import {REACT_APP_URL_CLOUD_FRONT} from '../../../constants/enviroment';
import { timeBetween } from '../../../utils/time';
import { AiOutlineMore } from 'react-icons/ai';

const ListComponent = ({data, refeshAlbumPhotos}) => {
	const onRemove = (id) => {
		deleteAlbumPhotos(id)
			.then(() => {
				refeshAlbumPhotos();
				openNotification(SUCCESS, SUCCESS_TEXT);
			})
			.catch((err) => {
				openNotification(ERROR, ERROR_TEXT);
			});
	};
	
	return (
		<div>
			<div className='grid grid-cols-4 gap-5 '>
				{data?.map((item) => (
					<div className='bg-neutral-800 p-5  flex gap-5 relative' key={item.id}>
						<img
							className='rounded overflow-hidden'
							alt='name'
							src={
								process.env.REACT_APP_URL_CLOUD_FRONT + '100x100/' + item.photos.path
							}
						/>
						<div className='flex flex-col justify-between'>
							<div>{item.photos.name}</div>
							<small className='text-zinc-500'>
								{timeBetween(item.photos.createdAt)}
							</small>
						</div>
						<Dropdown
							placement='bottomRight'
							menu={{
								items: [
									{
										label: (
											<span
												onClick={() => {
													onRemove(item.id);
												}}
												aria-hidden
												className='cursor-pointer text-red-700'>
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
				))}
			</div>

			<div className='flex justify-end'>
				<Button type='link'>xem thêm</Button>
			</div>
		</div>
	);
};
export default ListComponent;
ListComponent.propTypes = {
	data: PropTypes.array,
	refeshAlbumPhotos: PropTypes.func,
};
