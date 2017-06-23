function Sky(option){
	this.ctx = option.ctx;
	this.img = option.img;
	this.x = option.x;
	this.y = option.y;
	this.width = this.img.width;
	this.height = this.img.height;
	this.speed = option.speed || 2;
}

Sky.prototype = {
	constructor: Sky,
	draw: function(){
		this.x -= this.speed;
		if(this.x < -this.width){
			this.x += 2 * this.width;
		}
		this.ctx.drawImage(this.img, this.x, this.y);
	}
}