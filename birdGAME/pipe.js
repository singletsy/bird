function Pipe(option){
	this.x = option.x;
	this.yTop = 0;
	this.yBottom = 0;
	this.imgTop = option.imgTop;
	this.imgBottom = option.imgBottom;
	this.ctx = option.ctx;
	this.width = this.imgTop.width;
	this.height = this.imgTop.height;
	this.speed = option.speed || 2;
	this.space = option.space || 150;

	//对象刚创建出来的时候，需要一个随机的y值
	this.initY();
}

Pipe.prototype = {
	constructor: Pipe,
	draw: function(){
		this.x -= this.speed;
		if(this.x < - this.width * 3){
			this.x += this.width * 3 * 6;
			//对象重新进入画面的时候，要重新计算一次y值
			this.initY();
		}
		
		//下面管道的y值 = 上面管道的y值+ 上面管道的高度 + 两个管道的间隙
		this.yBottom = this.yTop + this.space + this.height;

		this.ctx.drawImage(this.imgTop, this.x, this.yTop);
		this.ctx.drawImage(this.imgBottom, this.x, this.yBottom);

		this.initPath();
	},
	initY: function(){
		//随机生成一个 180 到 320 之间的整数作为上面管道的y值
		this.yTop = -(Math.random() * 200 + 150);
	},
	initPath: function(){
		this.ctx.rect(this.x, this.yTop, this.width, this.height);
		this.ctx.rect(this.x, this.yBottom, this.width, this.height);
	}
}