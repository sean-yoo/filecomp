import React from 'react';
import './Compress.css';

const Compress = ({ onInputChange1, onButtonSubmit1 }) => {
	return (
		<div>
			<div className='center'>
				<div className='form center pa4 br3 shadow-5'>
					<input className= 'f4 pa2 w-70 center' name= 'file' type="file" onChange={(e)=>onInputChange1(e)}/>
					<button className='w-30 grow f4 link ph3 pv2 dib white bg-light-purple' onClick={onButtonSubmit1}>Compress</button>
				</div>
			</div>
		</div>
	);
}

export default Compress;