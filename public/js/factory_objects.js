function FactoryManager(drawer) {
    let templateManager = new TemplateManager();
    let factoryDrawer = drawer;
    let self = this;
    let assets = {};
    let components = [];
    let currentObject = null;
    let isMousePressed = false;
    let isMoving = false;
    let offsetX = 0;
    let offsetY = 0;

    let componentIds = {
        miner: 1,
        smelter: 1,
        constructor: 1,
        assembler: 1,
        manufacturer: 1
    };

    self.addAsset = function (imageData) {
        assets[imageData.type] = imageData;
    };

    self.getAssets = function () {
        return assets;
    };

    function setCurrentObject(newObject) {
        currentObject = newObject;
        updateInfoPanel();
    }

    function removeObject(object) {
        remove(object);
        factoryDrawer.removeObject(object);
        factoryDrawer.refreshFrame();
        updateComponentsInfo();
    }

    function updateInfoPanel() {
        $(classes.objectSelected).html("");
        $(classes.objectSelected).append(templateManager.getInfoComponentTmpl(currentObject));
    }


    function addComponent(x, y, type) {
        let component = new FactoryComponent(getNameByType(type), assets[type], type, "TBD");
        component.imageData.x = calculateCoordinate(x);
        component.imageData.y = calculateCoordinate(y);
        components.push(component);
        factoryDrawer.addObject(component);
        factoryDrawer.refreshFrame();
        updateComponentsInfo();
    }

    function updateComponentsInfo() {
        let componentInfoList = $(".objects-added");
        componentInfoList.html("");
        for(let key in components) {
            componentInfoList.append(templateManager.getInfoComponentTmpl(components[key]));
        }
    }

    function getNameByType(type) {
        let name = type.charAt(0).toUpperCase() + type.slice(1);
        name = name + "_" + componentIds[type];
        componentIds[type] = componentIds[type] + 1;
        return name;
    }

    function checkCollision(obj) {
        for(let i = 0; i < components.length; i++) {
            if(isCollision(obj, components[i].imageData)) {
                return true;
            }
        }
        return false;
    }

    function isCollision(targetA, targetB) {
        return !(targetB.x > (targetA.x + targetA.width) ||
            (targetB.x + targetB.width) < targetA.x ||
            targetB.y > (targetA.y + targetA.height) ||
            (targetB.y + targetB.height) < targetA.y);
    }

    $(".add-component").on('click', function (evt) {
        $("#place-component").toggleClass("hidden");
        $(ids.statuses).data("mode-move", "on");
        $(ids.statuses).data("mode-add", "on");
        $(ids.mainFrame).on('click.add-component', function (frameEvt) {
            let cursor = getCursorCoord(frameEvt);
            if(checkCollision({
                x: cursor.x,
                y: cursor.y,
                width: assets[evt.target.dataset.componentType].image.width,
                height: assets[evt.target.dataset.componentType].image.height
            })){
                $("#area-restricted").toggle();
                setTimeout(function () {
                    $("#area-restricted").toggle();
                }, 1000);
            } else {
                $(ids.statuses).data("mode-move", "off");
                $(ids.statuses).data("mode-add", "off");
                addComponent(cursor.x, cursor.y, evt.target.dataset.componentType);
                $(ids.mainFrame).off('click.add-component');
                $(ids.mainFrame).off('mousemove.move-ghost');
                $("#place-component").toggleClass("hidden");
            }

        });
        $(ids.mainFrame).on('mousemove.move-ghost', function (frameEvt) {
            let cursor = getCursorCoord(frameEvt);
            let img = assets[evt.target.dataset.componentType].image;
            factoryDrawer.refreshFrame();
            factoryDrawer.ctx.globalAlpha = 0.4;
            factoryDrawer.ctx.drawImage(img, cursor.x, cursor.y);
            factoryDrawer.ctx.globalAlpha = 1.0;
            if($(ids.statuses).data("mode-move") === "on") {
                factoryDrawer.ctx.strokeStyle = 'black';
                factoryDrawer.ctx.strokeRect(cursor.x, cursor.y, img.width, img.height);
            }
        });
    });

    $(ids.mainFrame).on('mousedown', function () {
        isMousePressed = true;
    });

    $(ids.mainFrame).on('mousemove', function (evt) {
        if( $(ids.statuses).data("mode-add") === "off"){
            if(isMousePressed && currentObject && !isMoving) {
                factoryDrawer.removeObject(currentObject);
                remove(currentObject);
                isMoving = true;
                $(ids.statuses).data("mode-move", "on");
                let cursor = getCursorCoord(evt);
                offsetX = cursor.x - currentObject.imageData.x;
                offsetY = cursor.y - currentObject.imageData.y;
            }
            if(isMoving) {
                let cursor = getCursorCoord(evt);
                factoryDrawer.refreshFrame();
                let img = currentObject.imageData;
                factoryDrawer.ctx.globalAlpha = 0.4;
                factoryDrawer.ctx.drawImage(img.image, cursor.x - offsetX, cursor.y - offsetY);
                factoryDrawer.ctx.globalAlpha = 1.0;
                if($(ids.statuses).data("mode-move") === "on") {
                    factoryDrawer.ctx.strokeStyle = 'black';
                    factoryDrawer.ctx.strokeRect(cursor.x - offsetX, cursor.y - offsetY, img.width, img.height);
                }
            }
        }
    });

    $(ids.mainFrame).on('mouseup', function (evt) {
        isMousePressed = false;
        if(isMoving) {
            isMoving = false;
            let cursor = getCursorCoord(evt);
            let imgData = currentObject.imageData;
            if(checkCollision({
                x: cursor.x - offsetX,
                y: cursor.y - offsetY,
                width: imgData.image.width,
                height: imgData.image.height
            })){
                $("#area-restricted").toggle();
                setTimeout(function () {
                    $("#area-restricted").toggle();
                }, 1000);
            } else {
                imgData.x = calculateCoordinate(cursor.x - offsetX);
                imgData.y = calculateCoordinate(cursor.y - offsetY);
            }
            factoryDrawer.addObject(currentObject);
            components.push(currentObject);
            $(ids.statuses).data("mode-move", "off");
            factoryDrawer.refreshFrame();
        }
    });

    function FactoryComponent(name, imageData, type, recipe) {
        ImageObject.apply(this, arguments);

        let self = this;
        self.type = type;
        self.recipe = recipe;

        self.draw = function (ctx) {
            let img = self.imageData;
            ctx.drawImage(img.image, img.x, img.y, img.width, img.height);
            if($(ids.statuses).data("mode-move") === "on") {
                ctx.strokeStyle = 'black';
                ctx.strokeRect(img.x, img.y, img.width, img.height);
            }
        };

        self.isIntersect = function (evt) {
            let cursor = getCursorCoord(evt);
            let objBox = self.getObjBox();
            if(cursor.x > objBox.x && cursor.x < objBox.x + objBox.width
                && cursor.y > objBox.y && cursor.y < objBox.y + objBox.height) {
                if($(ids.statuses).data("mode-remove") === "on") {
                    removeObject(self);
                } else {
                    setCurrentObject(self);
                }
            }
        }
    }

    function remove(object) {
        let index = components.indexOf(object);
        if (index > -1) {
            components.splice(index, 1);
        }
    }
}