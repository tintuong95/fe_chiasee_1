import {Navigate, Outlet, createBrowserRouter} from 'react-router-dom';

import DashBoardLayout from '../layouts/dashboard-layout';
import DashBoard from '../pages/dashboard';
import Folder from '../pages/folders';
import Albums from '../pages/albums';
import AlbumDetails from '../pages/albums/detail';
import ImageLists from '../pages/image';
import Upload from '../pages/image/upload';
import ImageDetails from '../pages/image/details';
import MainLayout from '../layouts/main-layout';
import Login from '../pages/auth/login';
import Signup from '../pages/auth/signup';
import NotFound from '../pages/404';
import EditImage from '../pages/edit/index';
import ReView from '../pages/review';
import Account from '../pages/account';

export const routers = [
	{
		path: '/',
		element: <DashBoardLayout />,
		children: [
			{
				path: '/',
				element: <DashBoard />,
			},
			{
				path: '/edit',
				element: <EditImage />,
			},

			{
				path: '/folders',
				element: <Folder />,
			},
			{
				path: '/albums',
				element: <Albums />,
			},
			{
				path: '/album/:id',
				element: <AlbumDetails />,
			},
			{
				path: '/folder/:id',
				element: <ImageLists />,
			},
			{
				path: '/folder/:id/upload',
				element: <Upload />,
			},

			{
				path: '/photo/:id/details',
				element: <ImageDetails />,
			},

			{
				path: '/account',
				element: <Account />,
			},
		],
	},

	{
		path: '/',
		element: <MainLayout />,
		children: [
			{
				path: '/review/:id',
				element: <ReView />,
			},
			{
				path: '/login',
				element: <Login />,
			},
			{
				path: '/signup',
				element: <Signup />,
			},

			{
				path: '404',
				element: <NotFound />,
			},
			{
				path: '*',
				element: <NotFound />,
			},
		],
	},
];
