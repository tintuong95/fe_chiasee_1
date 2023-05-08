import React from 'react'
import { IoMdArrowBack } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';

export default function BackButton() {

    const navigation =useNavigate()
  return (
			<button
				onClick={()=>{navigation(-1)}}
				type='button'
				className=' flex gap-2  duration-150 transition-all  
							 text-stone-300    hpver:text-stone-100
							 ease-in-out font-medium rounded-md text-sm 
							 py-2 text-center  items-center  '>
				<IoMdArrowBack />
				Back
			</button>
		);
}
