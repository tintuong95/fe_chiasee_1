import {Button, Modal, Result} from 'antd';
import {useState} from 'react';
import PropTypes from 'prop-types';

const ImageModal = ({isModalOpen, setIsModalOpen, type}) => {
	const showModal = () => {
		setIsModalOpen(true);
	};
	const handleOk = () => {
		setIsModalOpen(false);
	};
	const handleCancel = () => {
		setIsModalOpen(false);
	};
	return (
		<>
			<Modal
				title='Thông báo'
				open={isModalOpen}
				onOk={handleOk}
				onCancel={handleCancel}
				footer={false}>
				{type && (
					<Result
						status='success'
						title='Successfully Purchased Cloud Server ECS!'
						subTitle='Order number: 2017182818828182881 Cloud server configuration takes 1-5 minutes, please wait.'
						extra={[
							<Button key='console'>Tiếp tục</Button>,
							<Button key='buy'>Đi đến</Button>,
						]}
					/>
				)}
				{!type && (
					<Result
						status='error'
						title='Submission Failed'
						subTitle='Please check and modify the following information before resubmitting.'
						extra={[
							<Button type='primary' key='console'>
								Go Console
							</Button>,
							<Button key='buy'>Buy Again</Button>,
						]}></Result>
				)}
			</Modal>
		</>
	);
};
export default ImageModal;
ImageModal.propTypes = {
	isModalOpen: PropTypes.bool,
	setIsModalOpen: PropTypes.func,
	type: PropTypes.bool,
};
