import React from 'react';
import './Compress.css';

const Compress = () => {
	var input = '';
	var fileByteArray = [];
	let contentBuffer, compressed;

	function onInputChange(e) {
		input = e.target;
		console.log("ready");
	}

	function onButtonClick() {
		if (input !== '') {
			processFile()
		}
	}

	function onDownloadClick() {
		let compbytes = []
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
			};
			console.log('this: ', fileByteArray.length * 8)
			
			let res = huffmancoding2(fileByteArray);
			console.log('test: ', res);
			let len = 0;
			for (let j = 0; j < res.length; j++) {
				len += res[j].length;
			}
			console.log('that: ', len);
			

		} catch(err) {
			console.log(err);
		}
	}

	function huffmancoding2(fileByteArray) {
		var freq = {};
		for (let i = 0; i < fileByteArray.length; i++) {
			if (freq[fileByteArray[i]] === undefined) {
				freq[fileByteArray[i]] = 1;
			} else {
				freq[fileByteArray[i]] +=1;
			}
		}
		console.log('sean: ',Object.keys(freq).length, freq);

		let queue = new PriorityQueue();
		for (var key in freq) {
			queue.push([freq[key], key]);
		}

		while(queue.size() > 1) {
			let pair1 = queue.pop();
			let pair2 = queue.pop();
			queue.push([pair1[0]+pair2[0], [pair1[1], pair2[1]]]);
		}

		let tree = queue.pop();
		console.log("tree: ", tree);

		let code = {};
		generatecoding(tree[1], "");
		console.log(code);


		let encoded = [];
		for (let j = 0; j < fileByteArray.length; j++) {
			encoded.push(code[fileByteArray[j]]);
		}

		return encoded;

		function generatecoding(arr, prefix) {
			if (arr instanceof Array) {
			generatecoding(arr[0], prefix + "0");
			generatecoding(arr[1], prefix + "1");
			} else {
			code[arr] = prefix;
			}
		}
	};

	const top = 0;
	const parent = i => ((i + 1) >>> 1) - 1;
	const left = i => (i << 1) + 1;
	const right = i => (i + 1) << 1;

	class PriorityQueue {
		constructor(comparator = (a, b) => a < b) {
		this._heap = [];
		this._comparator = comparator;
		}
		size() {
		return this._heap.length;
		}
		isEmpty() {
		return this.size() === 0;
		}
		peek() {
		return this._heap[top];
		}
		push(...values) {
		values.forEach(value => {
			this._heap.push(value);
			this._siftUp();
		});
		return this.size();
		}
		pop() {
		const poppedValue = this.peek();
		const bottom = this.size() - 1;
		if (bottom > top) {
			this._swap(top, bottom);
		}
		this._heap.pop();
		this._siftDown();
		return poppedValue;
		}
		replace(value) {
		const replacedValue = this.peek();
		this._heap[top] = value;
		this._siftDown();
		return replacedValue;
		}
		_greater(i, j) {
		return this._comparator(this._heap[i], this._heap[j]);
		}
		_swap(i, j) {
		[this._heap[i], this._heap[j]] = [this._heap[j], this._heap[i]];
		}
		_siftUp() {
		let node = this.size() - 1;
		while (node > top && this._greater(node, parent(node))) {
			this._swap(node, parent(node));
			node = parent(node);
		}
		}
		_siftDown() {
		let node = top;
		while (
			(left(node) < this.size() && this._greater(left(node), node)) ||
			(right(node) < this.size() && this._greater(right(node), node))
		) {
			let maxChild = (right(node) < this.size() && this._greater(right(node), left(node))) ? right(node) : left(node);
			this._swap(node, maxChild);
			node = maxChild;
		}
		}
	};


	return (
		<div>
			<div className='center'>
				<div className='form center pa4 br3 shadow-5'>
					<input className= 'f4 pa2 w-70 center' name= 'file' type="file" onChange={(e) => onInputChange(e)}/>
					<button className='w-30 grow f4 link ph3 pv2 dib white bg-light-purple' onClick= {onButtonClick}>Compress</button>
					<span id="file"></span>
					<button className='w-30 grow f4 link ph3 pv2 dib white bg-light-purple' onClick= {onDownloadClick}>Download</button>
				</div>
			</div>
		</div>
	);
}

export default Compress;