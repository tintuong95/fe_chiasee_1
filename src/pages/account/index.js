import React from 'react';
import BaseInputEdit from '../../components/base-input-edit';
import {useSelector} from 'react-redux';
import {useEffect} from 'react';
import {getProfile} from '../../apis/auth';
import {useState} from 'react';

export default function Account() {
	const {user} = useSelector((state) => state.auth);
	const [profile, setProfile] = useState({});
	useEffect(() => {
		getProfile()
			.then((result) => {
				setProfile(result.data);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);
	console.log(profile);
	return (
		<div className='px-10 py-6'>
			<BaseInputEdit label={'Trạng thái '} name={'status'} />
			<hr className='h-px my-6  bg-neutral-700 border-0 dark:bg-gray-700'></hr>

			<BaseInputEdit label={'Tên người dùng'} name={'name'} data={profile?.name} />
			<hr className='h-px my-6  bg-neutral-700 border-0 dark:bg-gray-700'></hr>
			<BaseInputEdit
				disabled={true}
				label={'Địa chỉ email'}
				name={'email'}
				data={profile.email}
			/>

			<hr className='h-px my-6  bg-neutral-700 border-0 dark:bg-gray-700'></hr>
			<BaseInputEdit
				label={'Số điện thoại'}
				name={'phone_number'}
				data={profile?.phone_number}
			/>
			<hr className='h-px my-6  bg-neutral-700 border-0 dark:bg-gray-700'></hr>
			<BaseInputEdit
				label={'Ngày sinh'}
				name={'brithday'}
				data={profile?.brithday}
			/>
			<hr className='h-px my-6  bg-neutral-700 border-0 dark:bg-gray-700'></hr>
			<BaseInputEdit label={'Giới tính'} name={'gender'} data={profile?.gender} />
			<hr className='h-px my-6  bg-neutral-700 border-0 dark:bg-gray-700'></hr>
			<BaseInputEdit label={'Địa chỉ'} name={'address'} data={profile?.address} />
			<hr className='h-px my-6  bg-neutral-700 border-0 dark:bg-gray-700'></hr>
			<BaseInputEdit label={'Loại tài khoản'} name={'status'} />
		</div>
	);
}
