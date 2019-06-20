import React from 'react';
import './Compress.css';

const Compress = () => {
	var input = '';
	var fileByteArray = [];
	var contentBuffer = undefined;

	function onInputChange(e) {
		input = e.target;
		console.log("ready");
	}

	function onButtonClick() {
		if (input !== '') {
			processFile()
		}

		

	}

	function readFileAsync(file) {
		return new Promise((resolve, reject) => {
		  let reader = new FileReader();
	    
		  reader.onload = () => {
		    resolve(reader.result);
		  };
	    
		  reader.onerror = reject;
	    
		  reader.readAsArrayBuffer(file);
		})
	    }
	    
	async function processFile() {
		try {
			let file = input.files[0];
			contentBuffer = await readFileAsync(file);
			var array = new Uint8Array(contentBuffer);
			fileByteArray= [];
				for (var i = 0; i < array.length; i++) {
				    fileByteArray.push(array[i]);
				}

			huffmancoding(fileByteArray);

		} catch(err) {
			console.log(err);
		}
	}

	function huffmancoding(fileByteArray) {
		
	}


	return (
		<div>
			<div className='center'>
				<div className='form center pa4 br3 shadow-5'>
					<input className= 'f4 pa2 w-70 center' name= 'file' type="file" onChange={(e) => onInputChange(e)}/>
					<button className='w-30 grow f4 link ph3 pv2 dib white bg-light-purple' onClick= {onButtonClick}>Compress</button>
					<span id="file"></span>
				</div>
			</div>
		</div>
	);
}

export default Compress;