import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {Checkbox, Image} from 'antd';
import moment from 'moment';
import {useNavigate} from 'react-router-dom';
import {timeBetween} from '../utils/time';
import {imageToBase64} from '../utils/base64';
import { REACT_APP_URL_CLOUD_FRONT } from '../constants/enviroment';

function ImageComponent({photoList, setPhotoList, data}) {
	const [status, setStatus] = useState(false);
	const navigate = useNavigate();
	const onChange = (evt) => {
		evt.preventDefault();
		setStatus(evt.target.checked);
	};
	const onClick = (evt) => {
		evt.preventDefault();
		navigate(`/photo/${data.id}/details`);
	};

	useEffect(() => {
		if (status) {
			setPhotoList([...photoList, data.id]);
		} else {
			const newPhotoList = photoList.filter((photoId) => photoId != data.id);
			setPhotoList(newPhotoList);
		}
	}, [status]);



	return (
		<div className='flex flex-col'>
			<div className='  hover:-translate-y-2  transition  duration-300  ease-in-out bg-opacity-50 rounded-sm overflow-hidden shadow-md p-1'>
				<div
					className={`relative w-full   overflow-hidden ${
						status && 'border-4 border-rose-500'
					}`}
					style={{width: 250, height: 140}}>
					<img
						className='object-cover   w-full rounded-sm  '
						src={REACT_APP_URL_CLOUD_FRONT + '200x120/' + data?.path}
						alt='img'
						style={{width: 250, height: 140}}
					/>
					{status && (
						<div className='bg-zinc-600 absolute bottom-0 left-0 w-10 h-10 rounded-tr-2xl flex items-center justify-center font-bold text-white opacity-70'>
							{+photoList.findIndex((photoId) => photoId === data.id) + 1}
						</div>
					)}
					<Checkbox
						onChange={(e) => onChange(e)}
						value={status}
						className='absolute top-2 right-2 rounded-full'
					/>
				</div>
			</div>
			<div
				aria-hidden
				className='hover:text-blue-900  cursor-pointer'
				onClick={onClick}>
				<div className='text-sm text-gray-300 mt-2 '>{data?.name}</div>
				<div className='text-sm text-gray-600 '>{timeBetween(data.createdAt)}</div>
			</div>
		</div>
	);
}

ImageComponent.propTypes = {
	photoList: PropTypes.array,
	setPhotoList: PropTypes.func,
	data: PropTypes.object,
};

export default ImageComponent;
