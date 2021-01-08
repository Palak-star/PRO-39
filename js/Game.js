class Game {
  constructor(){}

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){

      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }

    monkey = createSprite(150,400,50,50)
   monkey.addAnimation("running" ,monkey_running)
   monkey.scale = 0.2;

   monkey2 = createSprite(150,400,50,50)
   monkey2.addAnimation("running" ,monkey_running)
   monkey2.scale = 0.2;
  }

  play(){
    form.hide();
    
    Player.getPlayerInfo();
    
    if(allPlayers !== undefined){
      background(rgb(198,135,103));
      image(track, 0,-displayHeight*4,displayWidth, displayHeight*5);
      
      //var display_position = 100;
      
      //index of the array
      var index = 0;

      //x and y position of the cars
      var x = 175 ;
      var y;

      for(var plr in allPlayers){
        //add 1 to the index for every loop
        index = index + 1 ;

        //position the cars a little away from each other in x direction
        x = x + 200;
        //use data form the database to display the cars in y direction
        y = displayHeight - allPlayers[plr].distance;
        monkeys[index-1].x = x;
        monkeys[index-1].y = y;

        if (index === player.index){
          ellipse(x, y, 90, 90);
          stroke("blue");
          monkeys[index - 1].shapeColor = "red";
          camera.position.x = displayWidth/2;
          camera.position.y = monkeys[index-1].y;
        }
       
        //textSize(15);
        //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
      }

    }

    if(keyIsDown(RIGHT_ARROW) && player.index !== null){
      player.distance +=10
      player.update();
    }

    if(player.distance > 3860){
      gameState = 2;
    }
   
    drawSprites();
  }

  end(){
    console.log("Game Ended");
  }
}
