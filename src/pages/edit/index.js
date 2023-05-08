import React from 'react';
import './pintura.css';
import {openDefaultEditor} from './pintura.js';
import {useEffect} from 'react';


let editor = null;
export default function EditImage() {
	const onClick = (e) => {

		editor = openDefaultEditor({
			src: e.target.files[0],
			imageCropAspectRatio: 1,
			stickers: [
				['Emoji', ['😩', '⭐️', '😊', '👍', '👎', '☀️', '🌤', '🌥']],
				[
					'Markers',
					[
						{
							src: 'sticker-one.svg',
							width: '5%',
							alt: 'One',
						},
						{
							src: 'sticker-two.svg',
							width: '5%',
							alt: 'Two',
						},
						{
							src: 'sticker-three.svg',
							width: '5%',
							alt: 'Three',
						},
					],
				],
			],
		});
		editor.on('close', () => {
			// the user cancelled editing the image
			console.log('d');
		});

	

		editor.on('process', ({dest, imageState}) => {
			console.log( dest);
		});
		
	};


	return (
		// <div className='w-full h-screen items-center justify-center'>
		<div className='mt-10'>
			<label htmlFor='dropzone-file'>
				<div className='flex flex-col items-center justify-center pt-5 pb-6'>
					<svg
						aria-hidden='true'
						className='w-10 h-10 mb-3 text-gray-400'
						fill='none'
						stroke='currentColor'
						viewBox='0 0 24 24'
						xmlns='http://www.w3.org/2000/svg'>
						<path
							strokeLinecap='round'
							strokeLinejoin='round'
							strokeWidth='2'
							d='M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12'></path>
					</svg>
					<p className='mb-2 text-sm text-gray-500 dark:text-gray-400'>
						<span className='font-semibold'>Click to upload</span> or drag and drop
					</p>
					<p className='text-xs text-gray-500 dark:text-gray-400'>
						SVG, PNG, JPG or GIF (MAX. 800x400px)
					</p>
				</div>
				<input
					onChange={onClick}
					id='dropzone-file'
					type='file'
					className='hidden'
				/>
			</label>
		</div>
		// </div>
	);
}
