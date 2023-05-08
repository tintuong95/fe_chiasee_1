import {
	BsFillCalendar2WeekFill,
	BsFillBoxFill,
	BsFillCalendar2CheckFill,
	BsFillBarChartFill,
	BsFillBadgeSdFill,
	BsFolderCheck,
	BsFolderPlus,
	BsPlusLg,
} from 'react-icons/bs';
import {Breadcrumb, Input, Layout, Menu, theme} from 'antd';
import {useState} from 'react';
import {Outlet} from 'react-router-dom';

const MainLayout = () => {
	
	return (
		<div className='bg-neutral-900'>
			<Outlet />
		</div>
	);
};
export default MainLayout;
