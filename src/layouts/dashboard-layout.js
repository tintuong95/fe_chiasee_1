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
import {
	Breadcrumb,
	Button,
	Divider,
	Input,
	Layout,
	Menu,
	Spin,
	Tooltip,
	theme,
} from 'antd';
import {useState} from 'react';
import {Link, Outlet} from 'react-router-dom';
import {SiSemanticrelease} from 'react-icons/si';
import {LoadingOutlined} from '@ant-design/icons';
import {useEffect} from 'react';
import {useMitt} from 'react-mitt';
import Loading from '../components/loading';
const antIcon = (
	<SiSemanticrelease style={{fontSize: 30}} className='animate-spin text-rose-400' />
);

const DashBoardLayout = () => {
	const [loading, setLoading] = useState(false);
	const onClickAddFolder = () => {
		$('#add-folder').toggle(500);
	};
	const {emitter} = useMitt();

	useEffect(() => {
		emitter.on('loading', (value) => {
			setLoading(value);
		});
	}, []);
	return (
		<div className='main flex bg-neutral-900'>
			<div
				className=' p-5  border-r border-r-zinc-800 fixed left-0 h-screen z-40 flex flex-col justify-between'
				style={{width: 225}}>
				<div className='flex flex-col gap-2'>
					<div
						aria-hidden='true'
						onClick={onClickAddFolder}
						className=' bg-rose-600  shadow-inner mt-4 p-5 flex-col justify-center rounded 
						cursor-pointer text-white   
						flex items-center  font-bold'>
						{/* <BsFolderPlus /> */}
						<SiSemanticrelease size={25} />
						<div className='mt-2'>CHIASEE.COM</div>
					</div>
					{/* <div id='add-folder' style={{display: 'none'}}>
						<div className='flex '>
							<Input className='rounded-none' />
							<button
								type='button'
								className=' flex gap-2 cursor-pointer rounded-none text-white bg-gray-800  font-medium  text-sm px-5 py-1 text-center  items-center  '>
								<BsPlusLg />
							</button>
						</div>
					</div> */}
					<div className='mt-4'></div>

					<Link to={'/'}>
						<div className='  text-sm     cursor-pointer p-3 rounded  text-gray-100 hover:bg-neutral-700  flex items-center gap-4   transition 0 duration-300 ease-in-out pl-4'>
							<BsFolderCheck />
							TRANG CHỦ
						</div>
					</Link>
					<small className='text-gray-400 ml-4 mt-4'>Quản lý</small>
					<Link to={'/albums'}>
						<div className='  text-sm     cursor-pointer p-3 rounded  text-gray-100 hover:bg-neutral-700  flex items-center gap-4   transition 0 duration-300 ease-in-out pl-4'>
							<BsFolderCheck />
							ALBUMS
						</div>
					</Link>
					<Link to={'/folders'}>
						<div className='  text-sm     cursor-pointer p-3 rounded  text-gray-100 hover:bg-neutral-700  flex items-center gap-4   transition 0 duration-300 ease-in-out pl-4'>
							<BsFolderCheck />
							THƯ MỤC
						</div>
					</Link>
					<small className='text-gray-400 ml-4 mt-4'>Công cụ</small>
					<Link to={'/edit'}>
						<div className='  text-sm     cursor-pointer p-3 rounded  text-gray-100 hover:bg-neutral-700  flex items-center gap-4   transition 0 duration-300 ease-in-out pl-4'>
							<BsFolderCheck />
							CHỈNH SỬA
						</div>
					</Link>
					<small className='text-gray-400 ml-4 mt-4'>Thông tin</small>
					<Link to={'/account'}>
						<div className='  text-sm     cursor-pointer p-3 rounded  text-gray-100 hover:bg-neutral-700  flex items-center gap-4   transition 0 duration-300 ease-in-out pl-4'>
							<BsFolderCheck />
							TÀI KHOẢN
						</div>
					</Link>
					<Link to={'/chat'}>
						<div className='  text-sm     cursor-pointer p-3 rounded  text-gray-100 hover:bg-neutral-700  flex items-center gap-4   transition 0 duration-300 ease-in-out pl-4'>
							<BsFolderCheck />
							HỖ TRỢ
						</div>
					</Link>
				</div>
				<div>
					<Button
						size='large'
						type='primary'
						className='w-full rounded-sm bg-stone-800 hover:bg-opacity-90'>
						ĐĂNG XUẤT
					</Button>
				</div>
			</div>
			<div className='w-full ml-52 bg-neutral-900 min-h-screen main'>
				<Loading status={loading}>
					<Outlet />
				</Loading>
			</div>
		</div>
	);
};
export default DashBoardLayout;
