// import Swiper, {Navigation, Autoplay} from 'swiper';
// eslint-disable-next-line import/no-unresolved
// import 'swiper/css';
// eslint-disable-next-line import/no-unresolved

// import './main.css';

// import SwiperGL from './swiper-gl.min.js';
// import './swiper-gl.min.css';
import {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {getAlbumPhotos} from '../../apis/photo';
import ImageComponent from '../../components/image';
import {Image} from 'antd';
import SwiperComponent from '../../components/swiper/Swiper.jsx';
import PropTypes from 'prop-types';
import { getAlbumDetails } from '../../apis/album';
import { useMitt } from 'react-mitt';
export default function ReView() {
	const {id} = useParams();
	const [listPhotos, setListPhotos] = useState([]);
const [albumDetails, setAlbumDetails] = useState([]);
	const fetchAlbumPhotos = getAlbumPhotos(id);

	const fetchAlbumDetails = getAlbumDetails(id);

const {emitter} = useMitt();




	useEffect(() => {
		emitter.emit('loading', true);
		Promise.all([fetchAlbumPhotos, fetchAlbumDetails])
			.then((result) => {
				const [photosList,  albumsDetails] = result;
				setListPhotos(photosList.data);
				setAlbumDetails(albumsDetails.data);
			})
			.catch((err) => {
				console.log(err);
			});
	}, [id]);

	return (
		<>
			
			<SwiperComponent data={albumDetails} photoLists={listPhotos} />
		</>
	);
}
ReView.propTypes = {
	
	
};