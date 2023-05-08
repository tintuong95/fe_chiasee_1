import React from 'react';
import PropTypes from 'prop-types';
import {useState} from 'react';
import {useEffect} from 'react';
import {FiEdit2} from 'react-icons/fi';
import {VscSave} from 'react-icons/vsc';
import {CgCloseR} from 'react-icons/cg';
import {updateAlbum} from '../../../apis/album';
import {notification} from 'antd';
import {openNotification} from '../../../utils/notification';
import {
	ERROR,
	ERROR_TEXT,
	SUCCESS,
	SUCCESS_TEXT,
} from '../../../constants/notifacation';
import {SWIPER_EFFECT} from '../../../constants/effect';

export default function ItemEdit({name_text, name, value, type, id}) {
	const [state, setState] = useState(true);
	const [inputValue, setInputValue] = useState('');

	const onSave = () => {
		const data = {
			[name]: inputValue,
		};
		updateAlbum(id, data)
			.then((result) => {
				openNotification(SUCCESS, SUCCESS_TEXT);
			})
			.catch((err) => {
				openNotification(ERROR, ERROR_TEXT);
			})
			.finally(() => {
				setState(!state);
			});
	};

	useEffect(() => {
		setInputValue(value);
	}, [value]);

	return (
		<div className='flex gap-3 items-center bg-neutral-800 p-4 py-10 h-36 rounded-md'>
			<div className='w-2/6'>{name_text} :</div>
			<div className='w-3/6'>
				{type === 'input' && (
					<input
						readOnly={state}
						name={name}
						className=' px-3 rounded w-full focus-visible:bg-neutral-700  bg-neutral-700  focus-visible:outline-none p-2'
						value={inputValue}
						onChange={(event) => {
							setInputValue(event.target.value);
						}}
					/>
				)}
				{type === 'option' && (
					<select
						className=' px-3 rounded w-full focus-visible:bg-neutral-700  bg-neutral-700  focus-visible:outline-none p-2'
						value={inputValue}
						onChange={(event) => {
							setInputValue(event.target.value);
						}}
						disabled={state}>
						{Object.entries(SWIPER_EFFECT).map((item, index) => {
							return (
								<option key={index} value={item[1]}>
									{item[1]}
								</option>
							);
						})}
					</select>
				)}
				{type === 'switch' && (
					<label className='relative inline-flex items-center cursor-pointer'>
						<input
							disabled={state}
							onChange={(e) => {
								setInputValue(e.target.checked);
							}}
							type='checkbox'
							checked={inputValue}
							className='sr-only peer'
						/>
						<div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300  rounded-full peer  peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all  peer-checked:bg-blue-600"></div>
					</label>
				)}
			</div>
			<div className='w-1/6 flex justify-end text-zinc-500'>
				{state && (
					<button
						onClick={() => {
							setState(!state);
						}}>
						<FiEdit2 />
					</button>
				)}
				{!state && (
					<div className='flex gap-3'>
						<button onClick={onSave}>
							<VscSave />
						</button>
						<button
							onClick={() => {
								setState(!state);
								setInputValue(value);
							}}>
							<CgCloseR />
						</button>
					</div>
				)}
			</div>
		</div>
	);
}
ItemEdit.propTypes = {
	name: PropTypes.string,
	name_text: PropTypes.string,
	value: PropTypes.string,
	type: PropTypes.string,
	id: PropTypes.string,
};
