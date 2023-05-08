import React from 'react';
import {useState} from 'react';
import PropTypes from 'prop-types';
import {updateProfile} from '../apis/auth';
import {useEffect} from 'react';
import {openNotification} from '../utils/notification';
import {
	ERROR,
	ERROR_TEXT,
	SUCCESS,
	SUCCESS_TEXT,
} from '../constants/notifacation';
export default function BaseInputEdit({label, data, name, disabled = false}) {
	const [state, setState] = useState(false);
	const [initialData, setInitialData] = useState();

	const onSetState = () => {
		setState(!state);
	};

	const onSave = () => {
		const params = {
			[name]: initialData,
		};
		updateProfile(params)
			.then((result) => {
				openNotification(SUCCESS, SUCCESS_TEXT);
			})
			.catch((err) => {
				openNotification(ERROR, ERROR_TEXT);
			});
	};

	useEffect(() => {
		setInitialData(data);
	}, [data]);

	return (
		<div className='flex gap-4 items-center p-3  text-neutral-200'>
			<div className='w-2/12'>{label} :</div>
			<div className='w-8/12'>
				<input
					className='bg-neutral-800 text-white appearance-none   rounded-sm w-full py-2 px-4  leading-tight focus:outline-none focus:bg-neutral-600 focus-visible:border-rose-500'
					id='inline-full-name'
					type='text'
					name={name}
					value={initialData}
					readOnly={!state}
					onChange={(e) => {
						const {value} = e.target;
						setInitialData(value);
					}}
				/>
			</div>
			<div className='w-2/12 flex justify-end  text-neutral-200 '>
				{!state && !disabled && (
					<span aria-hidden onClick={onSetState} className='cursor-pointer'>
						edit
					</span>
				)}
				{state && (
					<div className='flex gap-4'>
						<span aria-hidden onClick={onSetState} className='cursor-pointer'>
							exit
						</span>
						<span aria-hidden className='cursor-pointer' onClick={onSave}>
							save
						</span>
					</div>
				)}
			</div>
		</div>
	);
}
BaseInputEdit.propTypes = {
	label: PropTypes.string,
	data: PropTypes.any,
	name: PropTypes.string,
	disabled: PropTypes.bool,
};
