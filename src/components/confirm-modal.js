import {Button, Modal} from 'antd';
import {useState} from 'react';
import PropTypes from 'prop-types';
import {CONFIRM_TEXT} from '../constants/confirm';
import {AiOutlineDelete, AiOutlineSearch} from 'react-icons/ai';

const ConfirmModal = ({textBtn, titleText, action, data}) => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [confirmText, setConfirmText] = useState('');

	const showModal = () => {
		setIsModalOpen(true);
	};
	const handleOk = () => {
	
		if (CONFIRM_TEXT == confirmText) {
			action(data);
			setIsModalOpen(false);
		}
	};
	const handleCancel = () => {
		setIsModalOpen(false);
	};
	return (
		<>
			<button
				onClick={showModal}
				type='button'
				className=' flex gap-2  duration-150 transition-all      hover:text-white ease-in-out text-neutral-400 rounded-md text-sm px-5 py-2 text-center  items-center  '>
				<AiOutlineDelete />
				{textBtn}
			</button>
			<Modal
				title={titleText}
				open={isModalOpen}
				onOk={handleOk}
				okType='default'
				onCancel={handleCancel}>
				<input
					name='confirmText'
					onChange={(e) => {
						setConfirmText(e.target.value);
					}}
					className='mt-5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5    '
					placeholder='confirm'
				/>
			</Modal>
		</>
	);
};

ConfirmModal.propTypes = {
	children: PropTypes.node,
	setIsModalOpen: PropTypes.func,
	isModalOpen: PropTypes.bool,
	textBtn: PropTypes.string,
	titleText: PropTypes.string,
	action: PropTypes.func,
	data: PropTypes.any,
};
export default ConfirmModal;
