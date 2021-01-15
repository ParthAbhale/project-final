var mario, marioImg, mario_jump, backgroundImg, backgroundImg1, backgroundImg2, backgroundImg3, backgroundImg4, ground1, ground2, ground3, ground4, ground5, groundImg, groundImg1, groundImg2, groundImg3, groundImg4;
var obstacle, obstacle1, obstacleImg, obstacleImg1, obstacleImg2, obstacleImg3, obstacleImg4;
var cloud, cloudImg;
var obstacleGroup, cloudGroup, coinsGroup;

var coin, coinImg;
var sun, sunImg;
var restart, restartImg;
var gameOver, gameOverImg;

var score = 0;
var coins = 0;

var PLAY = 0;
var jumpSound, dieSound, checkpoint;
var END = 4;

var invisibleGround;

var gameState = PLAY




function preload() {
    backgroundImg = loadImage("last.jpg")
    marioImg = loadAnimation("mario1.png", "mario2.png", "mario3.png", "mario4.png", "mario5.png", "mario6.png")
    groundImg = loadImage("lastground.jpg")
    obstacleImg = loadImage("rObstacle.png")
    cloudImg = loadImage("rCloud.png")
    coinImg = loadImage("rCoin.png")
    sunImg = loadImage("rSun.png")
    restartImg = loadImage("icon.png")
    gameOverImg = loadImage("download.png")
    backgroundImg1 = loadImage("images.jfif")
    backgroundImg2 = loadImage("background2.jfif")
    backgroundImg3 = loadImage("images (1).jfif")
    backgroundImg4 = loadImage("images (2).jfif")
    groundImg1 = loadImage("ground5.jfif")
    groundImg2 = loadImage("groun.jfif")
    groundImg3 = loadImage("ground2.jfif")
    groundImg4 = loadImage("ground4.jfif")
    jumpSound = loadSound("jump.mp3")
    dieSound = loadSound("die.mp3")
    checkpoint = loadSound("checkPoint.mp3")
    mario_jump = loadAnimation("mario3.png")
    obstacleImg1 = loadImage("rSnake.png")
    obstacleImg2 = loadImage("rGhost.png")
    obstacleImg3 = loadImage("rLion.png")
    obstacleImg4 = loadImage("rDragon.png")
}


function setup() {

    createCanvas(900, 700)
    mario = createSprite(100, 400, 10, 10)
    mario.addAnimation("running", marioImg)
    mario.scale = 0.4;
    mario.debug = false
    mario.setCollider("rectangle", 0, 0, 200, 200)




    ground1 = createSprite(700, 610)
    ground1.scale = 4.65

    invisibleGround = createSprite(width/2,ground1.y,width,ground1.height)
    invisibleGround.visible = false;
    


    sun = createSprite(width - 50, 40)
    sun.addImage(sunImg);
    sun.scale = 0.4
    sun.velocityX = -1




    obstacleGroup = createGroup();
    cloudGroup = createGroup();
    coinsGroup = createGroup();


}

function draw() {

    background(backgroundImg)



    if (gameState === PLAY) {



        spawnObstacle();
        spawClouds();
        spawCoins();

        mario.collide(invisibleGround)

        if (score < 1000) {
            background(backgroundImg)
            ground1.addImage(groundImg)
            invisibleGround.addImage(groundImg)
            ground1.scale = 1
            invisibleGround.scale = 1
        } else if (score < 2000) {
            background(backgroundImg1)
            ground1.addImage(groundImg1)
        } else if (score < 3000) {
            background(backgroundImg2)
            ground1.addImage(groundImg2)
        } else if (score < 4000) {
            background(backgroundImg3)
            ground1.addImage(groundImg3)
        } else if (score < 5000) {
            background(backgroundImg4)
            ground1.addImage(groundImg4)
        } else {
            background(backgroundImg)
            ground1.addImage(groundImg)
            ground1.scale = 1
        }


        // if (mario.isTouching(coinsGroup)) {
        //     coinsGroup.destroyEach();
        //     console.log("parth")
        // }



        gameOver = createSprite(width / 2, height / 2);
        gameOver.addImage(gameOverImg);
        gameOver.scale = 4;
        gameOver.visible = false;

        restart = createSprite(width / 2, height / 2 + 150)
        restart.addImage(restartImg)
        restart.scale = 0.2;
        restart.visible = false;

        if (sun.x < 10) {
            sun.x = 700
        }

        if (keyDown("space") && mario.y > height / 2) {
            mario.velocityY = -20
            mario.changeAnimation("jumping", mario_jump)
            jumpSound.play();
        }

        if (coinsGroup.isTouching(mario)) {
            coin.destroy();
            coins = coins + 1
        }


        mario.velocityY = mario.velocityY + 0.8
        mario.collide(ground1)


        ground1.velocityX = -5

        if (ground1.x < 300) {
            ground1.x = 450
        }


        score = score + 0.1




        if (obstacleGroup.isTouching(mario)) {
            dieSound.play();
            gameState = END;
        }


    } else if (gameState === END) {






        mario.velocityY = 0
        ground1.velocityX = 0
        obstacleGroup.setVelocityXEach(0);
        cloudGroup.setVelocityXEach(0);
        coinsGroup.setVelocityXEach(0);

        obstacleGroup.setLifetimeEach(-1)
        cloudGroup.setLifetimeEach(-1)
        coinsGroup.setLifetimeEach(-1)



        background(gameOverImg)

        gameOver.visible = true;
        restart.visible = true;

        if (mousePressedOver(restart)) {
            reset();
        }

    }





    drawSprites();
    textSize(30)
    fill("yellow")

    text("SURVIVAL: " + Math.round(score), 50, 50);
    text("COINS: " + coins, 50, 100);

}


function spawnObstacle() {
    if (frameCount % 100 === 0) {
        obstacle = createSprite(900, 500)
        if (score < 1000) {
            obstacle.addImage(obstacleImg)
        } else if (score < 2000) {
            obstacle.addImage(obstacleImg1)
        } else if (score < 3000) {
            obstacle.addImage(obstacleImg2)
        } else if (score < 4000) {
            obstacle.addImage(obstacleImg3)
        } else if (score < 5000) {
            obstacle.addImage(obstacleImg4)
        }
        obstacle.scale = 0.5
        obstacle.velocityX = -5
        obstacle.lifeTime = 180
        obstacle.debug = false
        obstacle.collide(ground1)
        obstacleGroup.add(obstacle)
        obstacleGroup.setColliderEach("rectangle", 0, 0, 160, 160)
    }
}


function spawClouds() {
    if (frameCount % 60 === 0) {
        cloud = createSprite(900, random(30, 200))
        cloud.addImage(cloudImg)
        cloud.scale = 0.4
        cloud.velocityX = -5
        cloud.lifeTime = 180
        mario.depth = cloud.depth + 1
        cloudGroup.add(cloud)
    }
}

function spawCoins() {
    if (frameCount % 60 === 0) {
        coin = createSprite(900, random(430, 470))
        coin.addImage(coinImg)
        coin.scale = 0.2
        coin.velocityX = -5
        coin.lifeTime = 180
        coinsGroup.add(coin)
    }
}

function reset() {
    gameState = PLAY;
    score = 0;
    coins = 0;
    mario.collide(invisibleGround)
    ground1.addImage(groundImg)
    background(backgroundImg4)
    coinsGroup.destroyEach();
    cloudGroup.destroyEach();
    obstacleGroup.destroyEach();
    gameOver.visible = false;
    restart.visible = false;
}
