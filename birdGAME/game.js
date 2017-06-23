function Game(ctx){
	this.ctx = ctx;
	this.imgs = ["birds", "sky", "land", "pipe1", "pipe2"];
	this.imgList = null;
	this.roles = [];
	this.currentTime = new Date();
	this.lastTime = new Date();
	this.deltaTime = 0;
	this.hero = null;
	this.isRuning = false;
	this.init();
}

Game.prototype = {
	constructor: Game,
	pause: function(){
		this.isRuning = false;
	},
	start: function(){
		this.lastTime = new Date();
		this.isRuning = true;
		this.render();
	},
	init: function(){	
		this.loadImg(this.imgs, function(imgList){
			this.imgList = imgList;	
			this.createRoles();	
			this.initEvent();
			this.render();
		});
	},
	createRoles: function(){
		//创建天空对象
		for(var i = 0; i < 2; i++){
			this.roles.push(new Sky({
				img: this.imgList["sky"],
				x: this.imgList["sky"].width * i,
				y: 0,
				ctx: ctx
			}));
		}

		//创建管道对象
		for(var i = 0; i < 6; i ++){
			this.roles.push(new Pipe({
				x: 300 +  this.imgList["pipe1"].width * 3 * i,
				imgTop:  this.imgList["pipe2"],
				imgBottom: this.imgList["pipe1"],
				ctx: ctx,
				space: 120
			}));
		}
		
		//创建陆地对象
		for(var i = 0; i < 4; i++){
			this.roles.push(new Land({
				x: this.imgList["land"].width * i,
				y: cas.height - this.imgList["land"].height,
				img: this.imgList["land"],
				ctx: ctx
			}));
		}
		//创建小鸟对象
		var bird = new Bird({
			x: 100,
			y: 100,
			img: this.imgList["birds"],
			ctx: ctx
		});
		this.roles.push(bird);
		this.hero = bird;
	},
	initEvent: function(){

		var that = this;
		this.ctx.canvas.onclick = function(){
			if(!that.isRuning){
				that.start();
			}else{
				that.hero.speed = - 0.3;
			}
		}
	},	
	calcTime: function(){
		//时间的计算
		//获取当前帧的时间
		this.currentTime = new Date();
		//时间差= 当前帧的时间 - 上一帧的时间
		this.deltaTime = this.currentTime - this.lastTime;
		//将当前帧的事件设置为lastTime
		this.lastTime = this.currentTime;
	},
	loadImg: function (imgArr, callback){
		var count = 0;
		var imgList = {};
		var that = this;
		for(var i = 0; i < imgArr.length; i++){
			var img = new Image();
			imgList[imgArr[i]] = img;
			img.src = "imgs/" + imgArr[i] + ".png";
			img.onload = function(){
				count ++;
				if(count >= imgArr.length){
					callback.call(that, imgList);
				}
			}
		}
	},
	render: function (){
		this.calcTime();
		this.ctx.clearRect(0, 0, cas.width, cas.height);	
		this.ctx.beginPath();
		var that = this;
		this.roles.forEach(function(role){
			role.draw(that.deltaTime);
		})
		if(this.hero.y > 0 && this.hero.y + this.hero.height / 2 < cas.height - this.imgList["land"].height && !ctx.isPointInPath(this.hero.x + this.hero.width / 2, this.hero.y + this.hero.height / 2) && this.isRuning){
			requestAnimationFrame(function(){
				that.render();
			});
			//bind
		}
	}
}



