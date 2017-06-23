function Land(option){
	this.x = option.x;
	this.y = option.y;
	this.img = option.img;
	this.ctx = option.ctx;
	this.width = this.img.width;
	this.height = this.img.height;
	this.speed = option.speed || 2;
}

Land.prototype = {
	constructor: Land,
	draw: function(){
		this.x -= this.speed;
		if(this.x < - this.width){
			this.x += 4 * this.width;
		}
		this.ctx.drawImage(this.img, this.x, this.y);
	}
}