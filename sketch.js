var backImage,backgr;
var player, player_running;
var ground,ground_img;
var food , foodIMG ,foodGroup , gameOver , gameOverIMG ; 
var END =0;
var PLAY =1;
var score = 0 ;
var gameState = PLAY;
var stone , stoneGroup , stoneIMG ;

function preload(){
  backImage=loadImage("jungle.jpg");
  player_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  foodIMG = loadImage("banana.png");
  stoneIMG = loadImage("stone.png");
  gameOverIMG = loadImage("gameOver.png");

}

function setup() {
  createCanvas(displayWidth-400 , displayHeight-155);
  
  backgr=createSprite(width/2,height/2);
  backgr.addImage(backImage);
  backgr.scale=1;
  backgr.x=backgr.width/2;
  backgr.velocityX=-2;
  
  player = createSprite(100,height-100,20,50);
  player.addAnimation("Running",player_running);
  player.scale = 0.1;
  
  ground = createSprite(400,height-80,800,10);
  ground.x=ground.width/2;
  ground.visible=false;

  foodGroup = new Group() ;
 
  stoneGroup = new Group();

  gameOver = createSprite(width/2 , height/2);
  gameOver.addImage(gameOverIMG);
  gameOver.scale = 2 ;
  gameOver.visible = false ;
  
}

function draw() { 
  background(backImage);

  if(gameState===PLAY){
  
    spawnFood();
    spawnStone();
  if(backgr.x<100){
    backgr.x=backgr.width/2;
  }

  

  if(player.isTouching(foodGroup)) {
    foodGroup.destroyEach();
    score ++ ;
    player.scale +=0.05 ;
  }

  if(player.isTouching(stoneGroup) || score === 10){
    gameState = END ;
  }
  
    if(keyDown("space") || touches.length > 0  ) {
      
      player.velocityY = -12;
      touches = [];
    }
    player.velocityY = player.velocityY + 0.8;
  
    player.collide(ground);

  }

  else if(gameState === END){
    backgr.visible = false ;
    player.visible = false ;
    foodGroup.destroyEach();
    stoneGroup.destroyEach();
     gameOver.visible = true ;
  }

  drawSprites();

  textSize(40);
  fill(1)
  textFont("harrington");
  stroke(255,10,0);
  strokeWeight(3);
  text("Score : " + score , 50 , 50);
 
}

function spawnFood(){

  if(frameCount % 100 === 0 ){
  food = createSprite(100 , 0 , 37 ,332);
  food.addImage(foodIMG);
  food.x = random(100 , width -100)
  food.scale = 0.05 ;
  food.velocityX  = -2 ;
  food.velocityY = 2 ;
  food.lifetime = 300 ;
  player.depth = food.depth ;
  foodGroup.add(food);

  }
 
}

function spawnStone(){

  if(frameCount %200 === 0 ){
  stone = createSprite(100 , height-150 , 37 ,332);
  stone.addImage(stoneIMG);
  stone.x = width+10 ;
  stone.scale = 0.3 ;
  stone.velocityX  = -2 ;
  stone.lifetime = 900 ;
  player.depth = stone.depth ;
  stoneGroup.add(stone);

  }
 
}

