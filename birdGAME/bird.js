function Bird(option){
	this.x = option.x;
	this.y = option.y;
	this.img = option.img;
	this.ctx = option.ctx;
	this.width = this.img.width / 3;
	this.height = this.img.height;
	this.speed = 0;
	this.acc = 0.0005;
	this.imgIndex = 0;
	this.maxAngle = option.maxAngle || 45;
	this.maxSpeed = option.maxSpeed || 0.3;
}

Bird.prototype = {
	constructor: Bird,
	draw: function(deltaTime){
		//首先计算小鸟下落的高度
		var deltaY = this.speed * deltaTime + this.acc * deltaTime * deltaTime /2;
		this.speed = this.speed + this.acc * deltaTime;

		this.y += deltaY;

		//鸟头旋转的角度
		//当前角度 = 当前速度 * 最大角度 / 最大速度
		var currentAngle = this.speed * this.maxAngle / this.maxSpeed;
		if(currentAngle > this.maxAngle){
			currentAngle = this.maxAngle;
		}

		this.ctx.save();
		this.ctx.translate(this.x + this.width / 2, this.y + this.height / 2);
		this.ctx.rotate(this.angleToRadian(currentAngle));
		this.ctx.drawImage(this.img, this.imgIndex * this.width, 0, this.width, this.height, -this.width / 2, -this.height / 2, this.width, this.height);
		this.ctx.restore();

		this.imgIndex++;
		this.imgIndex %= 3;
	},
	angleToRadian: function (angle){
			return angle * Math.PI / 180;
	}
}