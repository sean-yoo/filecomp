import React from 'react';
import './Compress.css';

const Compress = () => {
	var input = '';
	var fileByteArray = [];
	var contentBuffer = undefined;
	var tree = undefined;

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

			var res = huffmancoding(fileByteArray);
			var str = res[0];
			tree = res[1];
			console.log(res[0]);

		} catch(err) {
			console.log(err);
		}
	}

	function huffmancoding(fileByteArray) {
		var freq = countfreq(fileByteArray);
		var sorted = sortfreq(freq);
		var tree = freqtree(sorted);
		var trimmedtree = (trimtree(tree));
		var codes = {}
		assigncodes(trimmedtree, "");
		return [encode(fileByteArray, codes), trimmedtree];

		//count frequencies and put into map
		function countfreq(fileByteArray) {
			var freq = {};
			for (let i = 0; i < fileByteArray.length; i++) {
				if (freq[fileByteArray[i]] === undefined) {
					freq[fileByteArray[i]] = 1;
				} else {
					freq[fileByteArray[i]] +=1;
				}
			}
			return freq;
		}


		//sort frequencies
		function sortfreq(freq) {
			sorted = [];
			for (var key in freq) {
				sorted.push([freq[key], key]);
			}
			return sorted.sort();
		}


		//create tree
		function freqtree(sorted) {
			while(sorted.length>1) {
				var leasttwo = sorted.slice(0, 2);
				var others = sorted.slice(2, sorted.length);
				var sumfreq = sorted[0][0] + sorted[1][0];
				sorted = others;

				var two = [sumfreq, leasttwo];
				sorted.push(two);
				sorted.sort();
			}

			return sorted[0];
		}

		//remove freq counts in tree
		function trimtree(tree) {
			var p = tree[1];

			if (typeof p === 'string') {
				return p;
			} else {
				return (Array(trimtree(p[0]), trimtree(p[1])));
			}
		}

		//assign zeros and ones to tree paths
		function assigncodes(node, pat) {
			pat = pat || "";
			if(typeof(node) == typeof("")) {
				codes[node] = pat;
			} else {
				assigncodes(node[0], pat+"0");
				assigncodes(node[1], pat+"1");
			}
			return codes;
		}

		function encode(array, codes){
			var output = "";
			for (var i=0;i<array.length;i++){
				output = output+codes[array[i].toString()];
			}
			return output;
		}
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