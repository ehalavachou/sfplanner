function DrawObject(name, x, y, color) {
    let self = this;

    self.name = name;
    self.x = x;
    self.y = y;
    self.color = color;
}

function Ball(name, x, y, color, radius) {
    DrawObject.apply(this, arguments);

    let self = this;

    self.radius = radius;

    this.draw = function (ctx) {
        ctx.beginPath();
        ctx.arc(self.x, self.y, self.radius, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.fillStyle = this.color;
        ctx.fill();
        /*ctx.fillStyle = 'black';
        ctx.font = "15px Arial";
        ctx.fillText(self.name, self.x - self.radius, self.y + self.radius + 15);*/
    };

    this.clear = function (drawer) {
        /*drawer.ctx.clearRect(self.x - self.radius, self.y - self.radius, 2 * self.radius, 2 * self.radius);
        $(drawer.frame).off("click." + self.name);
        self.drawer.frameObjects.remove(self);*/
    };

    this.isIntersect = function (evt) {
/*
        let cursor = getCursorCoord(evt);
        if(Math.sqrt((cursor.x - self.x) ** 2 + (cursor.y - self.y) ** 2) < self.radius) {
            if($("#" + selectors.buttonRemoveMode).data("mode-remove") === "on") {
                //self.clear(evt.data.drawer);
            } else {
                evt.data.drawer.setCurrentObject(self);
                evt.data.drawer.ctx.strokeStyle = 'black';
                evt.data.drawer.ctx.strokeRect(self.x - self.radius, self.y - self.radius, 2 * self.radius, 2 * self.radius);
            }
        }
*/
    };
}

function ImageObject(name, imageData) {
    let self = this;

    self.name = name;
    self.imageData = Object.assign({}, imageData);

    self.getObjBox = function() {
        return {
          x: self.imageData.x,
          y: self.imageData.y,
          width: self.imageData.width,
          height: self.imageData.height
        };
    };

    self.draw = function (ctx) {
        ctx.drawImage(self.imageData.image, self.imageData.x, self.imageData.y, self.imageData.width, self.imageData.height);
    };
}
