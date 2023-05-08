import {axios} from '../configs/axios';

export const getFolderList = (params) => axios.get('/folder/list', {params});

export const getFolderDetails = (id) => axios.get(`/folder/${id}/details`);

export const createFolder = (data) => axios.post(`/folder/create`, data);

export const updateFolder = (id, data) =>
	axios.post(`/folder/${id}/update`, data);

export const deleteFolder = (id) => axios.post(`/folder/${id}/remove`);


export const getCountFolders = () => axios.get(`/folder/counts`);