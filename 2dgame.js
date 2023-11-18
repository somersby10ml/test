var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
canvas.width = window.innerWidth - 100;
canvas.height = window.innerHeight - 100;
var img2 = new Image();
img2.src = 'big.png';
var dino = {
    x: 10,
    y: 200,
    width: 50,
    height: 50,
    draw: function () {
        ctx.fillStyle = 'green';
        // ctx.fillRect(this.x, this.y, this.width, this.height);
        /** 좌표(x,y) 크기(x * y) */
        ctx.drawImage(img2, this.x, this.y);
    }
};
var img1 = new Image();
img1.src = '3mm.png';
var Cactus = /** @class */ (function () {
    function Cactus() {
        this.x = 500;
        this.y = 200;
        this.width = 50;
        this.height = 50;
    }
    ;
    Cactus.prototype.draw = function () {
        ctx.fillStyle = 'red';
        // ctx.fillRect(this.x, this.y, this.width, this.height);
        /** 좌표(x,y) 크기(x * y) */
        ctx.drawImage(img1, this.x, this.y);
    };
    return Cactus;
}());
var timer = 0;
var cactusList = [];
var jumpTimer = 0;
var animation;
function actPerFrame() {
    animation = requestAnimationFrame(actPerFrame);
    timer++;
    ctx.clearRect(0, 0, canvas === null || canvas === void 0 ? void 0 : canvas.width, canvas === null || canvas === void 0 ? void 0 : canvas.height);
    if (timer % 220 === 0) {
        var cactus = new Cactus();
        cactus.draw();
        cactusList.push(cactus);
    }
    ;
    cactusList.forEach(function (a, i, o) {
        if (a.x < 0) {
            o.splice(i, 1);
        }
        collapseCheck(dino, a);
        a.x--;
        collapseCheck(dino, a);
        if (stateJump == true) {
            dino.y--;
            jumpTimer++;
        }
        if (stateJump == false) {
            if (dino.y < 200) {
                dino.y++;
            }
        }
        if (jumpTimer > 100) {
            stateJump = false;
            jumpTimer = 0;
        }
        a.draw();
    });
    dino.draw();
}
;
actPerFrame();
function collapseCheck(dino, cactus) {
    var xDiff = cactus.x - (dino.x + dino.width);
    var yDiff = cactus.y - (dino.y + dino.height);
    if (xDiff < 0 && yDiff < 0) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        cancelAnimationFrame(animation);
    }
}
var stateJump = false;
document.addEventListener('keydown', function (e) {
    if (e.code === 'Space') {
        stateJump = true;
    }
});
