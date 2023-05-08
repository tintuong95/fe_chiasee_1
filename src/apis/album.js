import {axios} from '../configs/axios';

export const getAlbumList = (params) => axios.get('/album/list', {params});

export const getAlbumDetails = (id) => axios.get(`/album/${id}/details`);

export const createAlbum = (data) => axios.post(`/album/create`, data);

export const updateAlbum = (id, data) =>
	axios.post(`/album/${id}/update`, data);

export const deleteAlbum = (id) => axios.post(`/album/${id}/remove`);


export const getCountAlbums = () => axios.get(`/album/counts`);