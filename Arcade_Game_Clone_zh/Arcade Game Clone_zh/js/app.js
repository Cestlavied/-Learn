var width = 99;
var height = 80;
var delta = 30;
var Enemy = function(level,speed,status) {// 这是我们的玩家要躲避的敌人
    if (status === 999 ) {
        this.x=0;//敌人的坐标
        this.y=level * height - delta;//敌人的坐标
        this.speed=speed;// 敌人的速度
        this.sprite = 'images/enemy-bug.png';// 敌人的图片，用一个我们提供的工具函数来轻松的加载文件
    }else{
        this.x=status * width;//敌人的坐标
        this.y=level * height - delta;//敌人的坐标
        this.speed=speed;// 敌人的速度
        this.sprite = 'images/Rock.png';// 敌人的图片，用一个我们提供的工具函数来轻松的加载文件
    }

};

Enemy.prototype.update = function(dt) {//更新敌人的位置
    this.x = this.x + this.speed*dt;//dt是时间时间间隙，让每台电脑的显示一样
    if (this.x > 5 * width) {
        this.x = 0;//让敌人回到原点重新出发，形成不断的敌人
    }
};

Enemy.prototype.render = function() {// 此为游戏必须的函数，用来在屏幕上画出敌人
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


var Player = function(){// 玩家类
    this.x=2 * width;// 设置玩家初始坐标
    this.y=5 * height - delta;// 设置玩家初始坐标
    this.sprite = 'images/char-cat-girl.png';// 加载玩家图片
}

Player.prototype.update = function(dt) {//限制玩家的范围函数，不让玩家超出格子
    if(this.x < 0){
        this.x = 0;
    }
    else if (this.x > 4 * width) {
        this.x = 4 * width;
    }
    else if (this.y < 0) {
        this.y = 0 - delta;
    }
    else if (this.y > 5 * height- delta) {
        this.y = 5 * height - delta;
    }
};

Player.prototype.render = function() {// 此为游戏必须的函数，用来在屏幕上画出玩家
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
Player.prototype.win = function() {// 用来显示玩家胜利
    this.sprite = 'images/win.png';
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    location.reload();
};

Player.prototype.handleInput = function(direction) {// 将获取到键盘的上下左右键，用switch循环来让画面上的玩家移动
    switch(direction){
        case "left":
        this.x = this.x - width;
        break;
        case "right":
        this.x = this.x + width;
        break;
        case "up":
        this.y = this.y - height;
        break;
        case "down":
        this.y = this.y + height;
        break;
    }
};

var allEnemies = [];// 把所有敌人的对象都放进一个叫 allEnemies 的数组里面
allEnemies.push(new Enemy(1,100,999));
allEnemies.push(new Enemy(2,40,999));
allEnemies.push(new Enemy(2,70,999));
allEnemies.push(new Enemy(3,110,999));
allEnemies.push(new Enemy(4,0,1));
allEnemies.push(new Enemy(3,0,4));
allEnemies.push(new Enemy(2,0,0));
var player = new Player;// 把玩家对象放进一个叫 player 的变量里面

document.addEventListener('keyup', function(e) {// 获取键盘的上下左右键，传给handleInput函数
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});
