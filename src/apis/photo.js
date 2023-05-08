import {axios} from '../configs/axios';

export const getPhotoList = (idFolder, params) =>
	axios.get(`/photo/${idFolder}/list`, {params});

export const getPhotoDetails = (id) => axios.get(`/photo/${id}/details`);

export const createPhoto = (idFolder, data) =>
	axios.post(`/photo/create/${idFolder}`, data);

export const updatePhoto = (id, data) =>
	axios.post(`/photo/${id}/update`, data);

export const deletePhoto = (id) => axios.post(`/photo/${id}/remove`);

export const getAlbumPhotos = (id) => axios.get(`/album-photo/${id}/list`);

export const deleteAlbumPhotos = (id) =>
	axios.post(`/album-photo/${id}/remove`);

export const getCountPhotos = () => axios.get(`/photo/counts`);
