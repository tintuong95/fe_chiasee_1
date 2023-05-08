import React, {useEffect, useState} from 'react';
import {loginApi} from '../../../apis/auth';
import { useDispatch } from 'react-redux';
import { loginAction } from '../../../stores/actions/auth';

function Login() {
	const dispatch=useDispatch()
	const [dataLogin, setDataLogin] = useState({});
	const fetchLogin = () => {
		dispatch(loginAction(dataLogin));
	};

	const onChange = (evt) => {
		const {name, value} = evt.target;
		setDataLogin({
			...dataLogin,
			[name]: value,
		});
	};

	return (
		<div className='text-center '>
			<section className='flex  h-screen items-center justify-center text-white pb-48 w-1/2 m-auto'>
				<div
					className=' px-6 lg:px-16 xl:px-12 w-2/5
        flex items-center justify-center'>
					<div className='w-full h-100'>
						<div className='space-y-6 text-left'>
							<h3 className='text-xl font-medium '>Đăng nhập</h3>
							<div>
								<label htmlFor='email' className='text-sm font-medium  block mb-2 '>
									Tên đăng nhập
								</label>
								<input
									onChange={onChange}
									type='email'
									name='email'
									id='email'
									className='bg-gray-50 border text-black border-gray-300  sm:text-sm rounded-sm  block w-full p-2.5   '
									placeholder='name@company.com'
									required=''
								/>
							</div>
							<div>
								<label htmlFor='password' className='text-sm font-medium  block mb-2 '>
									Mật khẩu
								</label>
								<input
									onChange={onChange}
									type='password'
									name='password'
									id='password'
									placeholder='••••••••'
									className='bg-gray-50 border text-black focus-visible:outline border-gray-300  sm:text-sm rounded-sm   block w-full p-2.5 '
									required=''
								/>
							</div>
							<div className='flex items-start'>
								<div className='flex items-start'>
									<div className='flex items-center h-5'>
										<input
											id='remember'
											aria-describedby='remember'
											type='checkbox'
											className='bg-gray-50 text-zinc-800 border border-gray-300 focus:ring-3 focus:ring-blue-300 h-4 w-4 rounded focus-visible:outline '
											required=''
										/>
									</div>
									<div className='text-sm ml-3'>
										<label htmlFor='remember' className='font-medium text-neutral-400 '>
											Lưu thông tin
										</label>
									</div>
								</div>
								<a href='#d' className='text-sm text-blue-700 hover:underline ml-auto '>
									Quên mật khẩu ?
								</a>
							</div>
							<button
								type='button'
								onClick={fetchLogin}
								className='w-full text-white bg-rose-700 hover:bg-rose-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-sm text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'>
								Đăng nhập
							</button>
							<div className='text-sm font-medium text-gray-500 dark:text-gray-300'>
								Chưa có tài khoản?{' '}
								<a href='#c' className='text-blue-700 hover:underline '>
									Tạo mới tài khoản
								</a>
							</div>
						</div>
					</div>
				</div>
				<div className='bg-indigo-600 rounded shadow bg-login hidden lg:block w-3/5  '></div>
			</section>
		</div>
	);
}

export default Login;
