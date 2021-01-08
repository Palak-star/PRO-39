
var monkey, monkey2 , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var ground2, ground;
var canvas;

var gameState = 0;
var playerCount;
var allPlayers;
var distance = 0;
var database;

var form, player, game;
var monkey1, monkey2;
var monkeys = []

function preload(){
  
  monkey_running = loadAnimation("images/sprite_0.png","images/sprite_1.png","images/sprite_2.png","images/sprite_3.png","images/sprite_4.png","images/sprite_5.png","images/sprite_6.png","images/sprite_7.png","images/sprite_8.png")
  
  bananaImage = loadImage("images/banana.png");
  obstacleImage = loadImage("images/obstacle.png");
   
}


function setup() {
  canvas = createCanvas(displayWidth - 20,displayHeight - 30);
  
  database = firebase.database();
  game = new Game();
  game.getState();
  game.start();

  }


function draw() {
background("lightblue")
  
  monkey.collide(ground); 
  monkey2.collide(ground); 

    if(playerCount === 4){
      game.update(1);
    }
    if(gameState === 1){
      clear();
      game.play();
    }
    if(gameState === 2){
      game.end();
    }


  drawSprites();
}
