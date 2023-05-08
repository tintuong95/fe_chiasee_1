import React from 'react';
import PropTypes from 'prop-types';
import { SiSemanticrelease } from 'react-icons/si';
export default function Loading({status, children}) {
	return (
		<>
			{status && (
				<div className='h-screen w-full bg-neutral-800 bg-opacity-50 fixed z-50 flex items-center justify-center ml-4 '>
					<SiSemanticrelease
						style={{fontSize: 30}}
						className='animate-spin text-rose-400 mb-10 mr-36'
					/>
				</div>
			)}
			<div>{children}</div>
		</>
	);
}
Loading.propTypes = {
	status: PropTypes.bool,
	children: PropTypes.node,
};
