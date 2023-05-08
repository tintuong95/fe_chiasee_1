import React from 'react';

function Signup() {
	return (
		<div className='text-center '>
			<section className='flex  h-screen items-center justify-center pb-48 w-1/2 m-auto'>
				<div
					className='bg-white px-6 lg:px-16 xl:px-12 w-2/5
        flex items-center justify-center'>
					<div className='w-full h-100'>
						<form className='space-y-6 text-left' action='#'>
							<h3 className='text-xl font-medium text-gray-900 dark:text-white'>
								Đăng ký
							</h3>
							<div>
								<label
									htmlFor='email'
									className='text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300'>
									Tên đăng nhập
								</label>
								<input
									type='email'
									name='email'
									id='email'
									className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white'
									placeholder='name@company.com'
									required=''
								/>
							</div>
							<div>
								<label
									htmlFor='password'
									className='text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300'>
									Mật khẩu
								</label>
								<input
									type='password'
									name='password'
									id='password'
									placeholder='••••••••'
									className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white'
									required=''
								/>
							</div>
							<div>
								<label
									htmlFor='password'
									className='text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300'>
									Nhập lại mật khẩu
								</label>
								<input
									type='password'
									name='password'
									id='password'
									placeholder='••••••••'
									className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white'
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
											className='bg-gray-50 border border-gray-300 focus:ring-3 focus:ring-blue-300 h-4 w-4 rounded dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800'
											required=''
										/>
									</div>
									<div className='text-sm ml-3'>
										<label
											htmlFor='remember'
											className='font-medium text-gray-900 dark:text-gray-300'>
											Tôi đồng ý với điều khoản
										</label>
									</div>
								</div>
								
							</div>
							<button
								type='submit'
								className='w-full text-white bg-fuchsia-700 hover:bg-opacity-75 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'>
								Đăng ký
							</button>
							<div className='text-sm font-medium text-gray-500 dark:text-gray-300'>
								Đã có tài khoản?{' '}
								<a
									href='#c'
									className='text-blue-700 hover:underline dark:text-blue-500'>
									Đăng nhập
								</a>
							</div>
						</form>
					</div>
				</div>
				<div className='bg-indigo-600 bg-login hidden lg:block w-3/5  '></div>
			</section>
		</div>
	);
}

export default Signup;
