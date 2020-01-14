function drawSolarAnimate(){
    sun = imageContainer[0].image;
    moon = imageContainer[1].image;
    earth = imageContainer[2].image;
    ctx.globalCompositeOperation = 'destination-over';
    ctx.clearRect(0, 0, 300, 300);

    ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
    ctx.strokeType = 'rgba(0, 153, 255, 0.4)';
    ctx.save();
    ctx.translate(150, 150);

    var time = new Date();
    ctx.rotate(((2 * Math.PI) / 60) * time.getSeconds() + ((2 * Math.PI) / 60000) * time.getMilliseconds() );
    ctx.translate(105, 0);
    ctx.fillRect(0, -12, 50, 24);
    ctx.drawImage(earth, -12, -12);

    ctx.save();
    ctx.rotate(((2 * Math.PI) / 6) * time.getSeconds() + ((2 * Math.PI) / 6000) * time.getMilliseconds() );
    ctx.translate(0, 28.5);
    ctx.drawImage(moon, -3.5, -3.5);
    ctx.restore();

    ctx.restore();

    ctx.beginPath();
    ctx.arc(150, 150, 105, 0, Math.PI * 2, false);
    ctx.stroke();

    ctx.drawImage(sun, 0, 0, 300, 300);

}


//let ball = factory.createDynamicBall('bouncing-ball', 50, 50, 30, 'green', 7, 7);
//let static_ball = factory.createBall('ball1', 300, 300, 30, 'red');
//let static_ball_2 = factory.createBall('ball2', 200, 200, 20, 'blue');

//let drawerBg = new BackgroundDrawer(new Frame(selectors.bgFrame, 600, 600, frameStyling), imageData);
//drawerBg.init();
//let drawer = new Drawer(new Frame(selectors.mainFrame, 600, 600, frameStyling));
//let animateDrawer = new AnimateDrawer(new Frame('animate-frame', 600, 600, frameStyling));

//new MouseDrawModule(drawer);

function getNameByType(type) {
    letname = "";
    switch (type) {
        case "miner":
            name = "Miner" + componentIds.miner;
            break;
        case "smelter":
            break;
        case "constructor":
            break;
        case "assembler":
            break;
        case "manufacturer":
            break;
    }
    return name;
}
