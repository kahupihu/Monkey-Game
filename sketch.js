var monkey , monkey_running, monkey_dead;
var banana ,bananaImage, obstacle, obstacleImage;
var bananaGroup, obstaclesGroup;
var score;
var ground;
var PLAY=1;
var END=0;
var gs=PLAY;

function preload(){
  monkey_running=loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  monkey_dead=loadAnimation("sprite_0.png");
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png"); 
}

function setup() {
  createCanvas(400,400);
  
  monkey=createSprite(80,315,10,10);
  monkey.addAnimation("dead", monkey_dead);
  monkey.addAnimation("moving", monkey_running);
  monkey.scale=0.1;

  ground=createSprite(400,350,900,10);
  ground.velocityX=-6;

  bananaGroup= new Group();
  obstaclesGroup= new Group();
} 

function draw() {
    background("white");

    if(gs===1){
        monkey.changeAnimation("moving", monkey_running);
        monkey.collide(ground);
        monkey.velocityY=monkey.velocityY+0.8;

        if(ground.x=0){ground.x=ground.width/2; }

        if(keyDown("space")&&monkey.y>314.29){monkey.velocityY=-12; }

        spawnBananas();
        spawnRocks();

        if(bananaGroup.isTouching(monkey)){bananaGroup.destroyEach(); }
        if(obstaclesGroup.isTouching(monkey)){gs=0; }
        score=Math.round(frameCount/getFrameRate());
    }  
    
    if(gs===0){
        ground.velocityX=0;
        bananaGroup.setVelocityXEach(0);
        obstaclesGroup.setVelocityXEach(0);
        bananaGroup.setLifetimeEach(-1);
        obstaclesGroup.setLifetimeEach(-1);
        monkey.velocityY=0;
        monkey.changeAnimation("dead", monkey_dead);
        textSize(35);
        stroke("black");
        strokeWeight(1.5);
        fill("red");
        text("Game Over!",100,200);
    }
    
    textSize(17);
    stroke(0);
    strokeWeight(0.35);
    fill("green");
    text("Survival Time: "+score,135,20);
    drawSprites();
}

function spawnBananas(){
  if(frameCount%80===0){
    banana=createSprite(400,Math.round(random(190,270)),10,10);
    banana.addImage(bananaImage);
    banana.scale=0.1;
    banana.velocityX=-6;
    banana.lifetime=115;
    banana.setCollider("circle",0,0,150);
    bananaGroup.add(banana);
  }
}

function spawnRocks(){
  if(frameCount%300===0){
    obstacle=createSprite(400,325,10,10);
    obstacle.addImage(obstacleImage);
    obstacle.scale=0.1;
    obstacle.velocityX=-6;
    obstacle.lifetime=115;
    obstacle.setCollider("circle",0,0,180);
    obstaclesGroup.add(obstacle);
  }  
}
