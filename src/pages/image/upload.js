import {UploadOutlined} from '@ant-design/icons';
import {Button, Upload} from 'antd';
import {useParams} from 'react-router-dom';
import Compressor from 'compressorjs';

const fileList = [];
const UploadComponent = () => {
	const {id} = useParams();
	return (
		<div className='w-1/2 p-6 m-auto mt-5'>
			<Upload
				action={`http://localhost:3000/v1/api/photo/create/${id}`}
				headers={{
					Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
				}}
				listType='picture'
				maxCount={10}
				multiple={true}
				
				defaultFileList={[...fileList]}
				beforeUpload={(file,) => {
					new Compressor(file, {
						quality: 0.6,

						// The compression process is asynchronous,
						// which means you have to access the `result` in the `success` hook function.
						success(result) {
							
							file=result
							
							
						},
						error(err) {
							console.log(err.message);
						},
					});
				}}

				className='upload-list-inline'>
				<Button className='w-full p-14 border border-dashed flex flex-col items-center justify-center'>
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
				</Button>
			</Upload>
		</div>
	);
};
export default UploadComponent;
