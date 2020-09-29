
var trex,trex3;
var land,land1;   
var Mrinvisible;
var cloud;
var rando;
var obstacle;
var gamestate="play";
var score=0000;
var obsgroup;
var cloudgroup;
var gameover;
var restart;
var die;
var checkpoint;
var jump;   
var highscore=0000;
var touches=[]
function preload(){
trex3=loadAnimation("trex1.png","trex3.png","trex4.png" )
land1=loadAnimation("ground2.png")
cloud=loadAnimation("cloud.png");
obstacle1=loadAnimation("obstacle1.png");
obstacle2=loadAnimation("obstacle2.png");  
obstacle3=loadAnimation("obstacle3.png");
obstacle4=loadAnimation("obstacle4.png");
obstacle5=loadAnimation("obstacle5.png");
obstacle6=loadAnimation("obstacle6.png");
trexc=loadAnimation("trex_collided.png");
gameover1=loadImage("gameOver.png");
die1=loadSound("die.mp3");
jump1=loadSound("jump.mp3");
checkpoint1=loadSound("checkPoint.mp3");
restart1=loadImage("restart.png");

}
function setup() {
  createCanvas(windowWidth,windowHeight);
  trex=createSprite(width/2,height/2,30,10);
  trex.addAnimation("trex",trex3)
  trex.scale=0.5
 // trex.setCollider("circle",0,0,30);
  //trex.debug=true;
  trex.setCollider("rectangle",0,0,20,80)
   land=createSprite(width/2,height-100,3000,10);
   land.addAnimation("ground",land1 );
  restart=createSprite(200,150,100,100)
  Mrinvisible=createSprite(500,height-88,2000,10);
Mrinvisible.visible=false
  obsgroup=new Group();
  cloudgroup=new Group();
  gameover=createSprite(200,200,30,30)
  gameover.scale=0.5;
  gameover.addImage(gameover1);
restart.scale=0.5;
} 

function draw() {
  //console.log(getFrameRate())
  background("white");
text("score",250,50);  
    if(gamestate=="play"){
        if((keyDown("space") || touches.length >0)&& trex.y>=height/2+80){
    trex.velocityY = -10 ; 
 jump1.play(); 
    } //end of space if
      trex.velocityY = trex.velocityY + 0.5;
    land.velocityX=-(10+score/100);      
      
if(land.x<10){
land.x=200  
}  //end of ground resetfunction 
   clouds();  
    obstacles();
     score=score+Math.round(getFrameRate()/60);
      if(trex.isTouching(obsgroup)){
        gamestate="end"
      trex.addAnimation("trex",trexc)
        die1.play();
      
      }
      gameover.visible=false;
    if(score%100==0 && score>0){
    checkpoint1.play();
    }
  restart.visible=false;  
    } //end of gamestateplay
  if(gamestate=="end"){
  trex.velocityY=0
  land.velocityX=0
  obsgroup.setVelocityXEach(0)
  cloudgroup.setVelocityXEach(0)    
  obsgroup.setLifetimeEach(-1)
  cloudgroup.setLifetimeEach(-1)
    gameover.visible=true;
  restart.addImage(restart1)
  restart.visible=true;
  if(mousePressedOver(restart)){
     trex.x=67;
     trex.y=200;
    obsgroup.destroyEach();
    score=0
    trex.addAnimation("trex",trex3);
    cloudgroup.destroyEach();
    
    gamestate="play";
  }
  }//end of gamestate end
  trex.collide(Mrinvisible ) 
    text(score,300,50)
     text("highscore",340,50)
       text(highscore,420,50)
  if(highscore<score){
    highscore=score
    }
  drawSprites();  
  }//end of draw
  
  function clouds(){
  //6%4=2
  //console.log("trex",trex.depth)
 rando=Math.round(random(10,14)) *10
  ;
    
  if(frameCount%40==0)
  {
 // console.log(frameCount)
  cloud1=createSprite(600,rando,10,10);
  cloud1.velocityX=-10;
  cloud1.lifetime=63;
  //console.log(trex.y) //console.log("c",cloud1.depth);
  cloud1.addAnimation("cloud1",cloud);
  cloud1.depth=0.5
  cloudgroup.add(cloud1);
  }
  }// end of cloud}
  function obstacles(){
  if(frameCount%100==0){    
obstacle=createSprite(600,(height/2)+85,10,10)
    obstacle.velocityX=-(12+score/100);
   obstacle.scale=0.65
  ob=Math.round(random(1,6));
  obstacle.lifetime=300;
  switch(ob){
  case 1:obstacle.addAnimation("obstacle1",obstacle1); 
    break
case 2:obstacle.addAnimation("obstacle2",obstacle2);
      break
case 3:obstacle.addAnimation("obstacle003",obstacle3);  
      break
case 4:obstacle.addAnimation("obstacle",obstacle4);
     break
case 5:obstacle.addAnimation("obstacle",obstacle5);
      break
case 6:obstacle.addAnimation("obstacle",obstacle6);
       break
       default:
       break
  }//end of switch
       obsgroup.add(obstacle)
  }//end of if
    
   
  }


   