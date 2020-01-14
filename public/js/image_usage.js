function ImageLoader(imageDataArray, manager, callback){
	let self = this;
	self.length = imageDataArray.length;
	self.current = 0;
	function loadImage (imageProps) {
		let img = new Image();
		$(img).on('load', function () {
		    manager.addAsset({
                image: img,
                x: imageProps.x,
                y: imageProps.y,
                width: imageProps.width,
                height: imageProps.height,
                type: imageProps.type
            });
			if(self.current < self.length - 1){
				self.current++;
				loadImage(imageDataArray[self.current]);
			}else{
				if(callback != null) {
					callback();
				}
			}
			
		});
		img.src = imageProps.src;
	}
	
	this.load = function ()	{
		loadImage(imageDataArray[self.current]);
	}
}


let imageData = [
	{
	    type: "miner",
		src: 'static/128px-Miner_MK1.png',
		x: 0,
		y: 0,
		width: 128,
		height: 128
	},
	{
        type: "smelter",
		src: 'static/128px-Smelter.png',
		x: 0,
		y: 0,
		width: 128,
		height: 128
	},
	{
        type: "constructor",
		src: 'static/128px-Constructor.png',
		x: 0,
		y: 0,
		width: 128,
		height: 128
	},
	{
        type: "assembler",
		src: 'static/128px-Assembler.png',
		x: 0,
		y: 0,
		width: 128,
		height: 128
	},
	{
        type: "manufacturer",
		src: 'static/128px-Manufacturer.png',
		x: 0,
		y: 0,
		width: 128,
		height: 128
	},
	{
		type: "iron-ore",
		src: 'static/128px-Iron_Ore.png',
		x: 0,
		y: 0,
		width: 128,
		height: 128
	},
	{
		type: "iron-ingot",
		src: 'static/128px-Iron_Ingot.png',
		x: 0,
		y: 0,
		width: 128,
		height: 128
	},
	{
		type: "cooper-ore",
		src: 'static/128px-Copper_Ore.png',
		x: 0,
		y: 0,
		width: 128,
		height: 128
	},
	{
		type: "cooper-ingot",
		src: 'static/128px-Copper_Ingot.png',
		x: 0,
		y: 0,
		width: 128,
		height: 128
	},
	{
		type: "iron-plate",
		src: 'static/128px-Iron_Plate.png',
		x: 0,
		y: 0,
		width: 128,
		height: 128
	},
	{
		type: "iron-rod",
		src: 'static/128px-Iron_Rod.png',
		x: 0,
		y: 0,
		width: 128,
		height: 128
	},
	{
		type: "wire",
		src: 'static/128px-Wire.png',
		x: 0,
		y: 0,
		width: 128,
		height: 128
	},
	{
		type: "cable",
		src: 'static/128px-Cable.png',
		x: 0,
		y: 0,
		width: 128,
		height: 128
	},
	{
		type: "limestone",
		src: 'static/128px-Limestone.png',
		x: 0,
		y: 0,
		width: 128,
		height: 128
	},
	{
		type: "concrete",
		src: 'static/128px-Concrete.png',
		x: 0,
		y: 0,
		width: 128,
		height: 128
	},
	{
		type: "screw",
		src: 'static/128px-Screw.png',
		x: 0,
		y: 0,
		width: 128,
		height: 128
	}
];