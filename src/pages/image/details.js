import React from 'react';
import PropTypes from 'prop-types';
import {Image} from 'antd';
import {AiOutlineDelete, AiFillEdit} from 'react-icons/ai';
import {useState} from 'react';
import {getPhotoDetails} from '../../apis/photo';
import {useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {openDefaultEditor} from '../edit/pintura';
import {imageToBase64} from '../../utils/base64';
import BackButton from '../../components/btn-back';
import { REACT_APP_URL_CLOUD_S3 } from '../../constants/enviroment';

let editor = null;
function ImageDetails() {
	const [details, setDetails] = useState({});
	const [base64, setBase64] = useState();
	const {id} = useParams();
	const fetchImageDetails = (id) => {
		getPhotoDetails(id)
			.then((result) => {
				setDetails(result.data);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const onClick = (e) => {
		editor = openDefaultEditor({
			src: base64,
			imageCropAspectRatio: 1,
			stickers: [
				['Emoji', ['😩', '⭐️', '😊', '👍', '👎', '☀️', '🌤', '🌥']],
				[
					'Markers',
					[
						{
							src: 'sticker-one.svg',
							width: '5%',
							alt: 'One',
						},
						{
							src: 'sticker-two.svg',
							width: '5%',
							alt: 'Two',
						},
						{
							src: 'sticker-three.svg',
							width: '5%',
							alt: 'Three',
						},
					],
				],
			],
		});
		editor.on('close', () => {
			// the user cancelled editing the image
			console.log("d")
		});

		editor.on('process', ({dest, imageState}) => {});

		editor.on('save', ({dest, imageState}) => {
			console.log("s")
		});
	};

	useEffect(() => {
		fetchImageDetails(id);
	}, [id]);

	useEffect(() => {
		details?.name &&
			imageToBase64(REACT_APP_URL_CLOUD_S3 + details?.path).then((result) => {
				setBase64(result);
			});
	}, [details]);

	return (
		<div className='ml-5 mt-8 flex justify-center'>
			<div>
				<div className='my-2 flex gap-5'>
					<BackButton />
					<span
						aria-hidden
						onClick={onClick}
						href='/image/1/edit'
						className='flex items-center justify-center gap-2 text-gray-300 hover:text-blue-700 text-sm'>
						<AiFillEdit /> Chỉnh sửa
					</span>
					<a
						href='/image/1/edit'
						className='flex items-center justify-center gap-2 text-gray-300 hover:text-red-700 text-sm'>
						<AiOutlineDelete /> Xóa ảnh
					</a>
				</div>
				<Image
					className='object-cover mt-4 '
					src={base64}
					alt='img'
					style={{width: 850, height: 370}}
				/>

				<dl className=' w-full text-gray-200 grid grid-cols-4  divide-gray-100   mt-8 text-sm'>
					<div className='flex flex-col py-3'>
						<dt className='mb-1 '>Tên ảnh</dt>
						<dd className=' '>0001SD</dd>
					</div>
					<div className='flex flex-col py-3'>
						<dt className='mb-1 '>Loại file</dt>
						<dd className=' '>PNG</dd>
					</div>
					<div className='flex flex-col pt-3'>
						<dt className='mb-1 '>Kích thước</dt>
						<dd className=' '>1.2 MB</dd>
					</div>

					<div className='flex flex-col pt-3'>
						<dt className='mb-1 '>Ngày đăng</dt>
						<dd className=' '>10/10/2022</dd>
					</div>
				</dl>
			</div>
		</div>
	);
}

ImageDetails.propTypes = {};

export default ImageDetails;
