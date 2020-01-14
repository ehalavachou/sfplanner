function DrawObjectFactory() {
    this.createBall = function (name, x, y, radius, color) {
        return new Ball(name, x, y, color, radius);
    };
    this.createDynamicBall = function (name, x, y, radius, color, vx, vy) {
        let ball = this.createBall(name ,x, y, radius, color);
        ball['vx'] = vx;
        ball['vy'] = vy;
        return ball;
    };
}

function Drawer(canvas) {

    let self = this;
    self.frame = canvas.getFrame();
    self.ctx = canvas.getContext('2d');
    self.frameObjects = [];

    this.clearAndDraw = function (object) {
        self.ctx.clearRect(0, 0, canvas.width, canvas.height);
        object.draw(self.ctx);
    };

    this.drawObj = function (object) {
        object.draw(self.ctx);
    };

    this.refreshFrame = function () {
        self.ctx.clearRect(0, 0, self.frame.width(), self.frame.height());
        for(let k in self.frameObjects) {
            self.drawObj(self.frameObjects[k]);
        }
    };

    this.addObject = function (object) {
        $(self.ctx.canvas).on('mousedown.' + object.name, object.isIntersect);
        self.frameObjects.push(object);
    };

    this.removeObject = function (object) {
        $(self.ctx.canvas).off('mousedown.' + object.name, object.isIntersect);
        remove(object);
    };

    function remove(object) {
        let index = self.frameObjects.indexOf(object);
        if (index > -1) {
            self.frameObjects.splice(index, 1);
        }
    }

}

function AnimateDrawer(canvas, imageData) {
    Drawer.apply(this, arguments);
    console.log(this);

    let self = this;

    this.drawAnimate = function (object) {
        console.log(self);
        startDraw(object);
    };

    function startDraw(object) {
        object.draw(self.ctx);
        if (object) {
            drawObjectAnimate(object);
            window.requestAnimationFrame(function () {
                startDraw(object)
            });
        } else {
            console.error("object required.");
        }
    }

    function drawObjectAnimate(object) {
        self.ctx.clearRect(0, 0, canvas.width, canvas.height);
        object.draw(self.ctx);

        if (object.y + object.vy > canvas.height || object.y + object.vy < 0) {
            object.vy = -object.vy;
        }
        if (object.x + object.vx > canvas.height || object.x + object.vx < 0) {
            object.vx = -object.vx;
        }
        object.x += object.vx;
        object.y += object.vy;

        object.vy *= 0.99;
        object.vy += 0.25;
    }
}


function BackgroundDrawer(canvas, imageData) {
    Drawer.apply(this, arguments);

    let self = this;

    self.drawBg = function() {
        let gridVal = $(ids.settings).data("grid-size");
        let xSnapPointNumber = Math.floor(self.ctx.canvas.width / gridVal);
        let ySnapPointNumber = Math.floor(self.ctx.canvas.height / gridVal);
        for(let i = 0; i < xSnapPointNumber; i++) {
            for(let j = 0; j < ySnapPointNumber; j++) {
                self.ctx.beginPath();
                self.ctx.arc(i * gridVal, j * gridVal, 1, 0, Math.PI * 2, true);
                self.ctx.closePath();
                self.ctx.fillStyle = this.color;
                self.ctx.fill();
            }
        }
    }
}

function Frame(id, width, height, styles) {
    let frame = document.getElementById(id);
    this.width = frame.width = width;
    this.height = frame.height = height;
    $(frame).addClass(styles.join(" "));
    console.log("frame initialized");

    this.getContext = function (contextType) {
        return frame.getContext(contextType);
    };

    this.getFrame = function () {
        return $(frame);
    }
}