var girl,girlImg;
var bg,bgImg;
var tree,tree2,obstaclesGroup;
var wild,animalsGroup;
var animal1,animal2,animal3,animal5,animal6,animal7,animal8,animal9,animal10;
var invisibleGround;
var fly,fliesGroup;
var fly1,fly2,fly3,fly4,fly5,fly6,fly7;
var score=100;
var gamestate="START";

function preload(){
    bgImg = loadImage("jungle.jpg");
    girlImg = loadImage("girl.png");
    tree = loadImage("tree.png");
    tree2 = loadImage("tree2.png");
    animal1 = loadImage("animal.png");
    animal2 = loadImage("animal2.png");    
    animal3 = loadImage("animal3.png");
    animal4 = loadImage("animal4.png");
    animal5 = loadImage("animal5.png");
    animal6 = loadImage("animal6.png");
    animal7 = loadImage("animal7.gif");
    animal8 = loadImage("animal8.png");
    animal9 = loadImage("animal9.png");
    animal10 = loadImage("animal10.png");
    fly1 = loadImage("fly1.png");
    fly2 = loadImage("fly2.png");
    fly3 = loadImage("fly3.png");
    fly4 = loadImage("fly4.png");
    fly5 = loadImage("fly5.png");
    fly6 = loadImage("fly6.png");
    fly7 = loadImage("fly7.png");
}

function setup(){
    createCanvas(1132,700);

    bg = createSprite(660,370,576,360);
    bg.addImage(bgImg);
    bg.scale = 2.3;

    invisibleGround = createSprite(576,630,1132,1);
    invisibleGround.visible = false;

    girl = createSprite(90,500,1,1);
    girl.addImage(girlImg);
    girl.scale = 0.2;

    animalsGroup = createGroup();
    obstaclesGroup = createGroup();
    fliesGroup = createGroup();
}

function draw(){
        background("black");

        drawSprites();
        
        if(gamestate === "START"){
                textSize(20);
                fill("yellow");
                stroke("black");
                text("Hello Friends, I am Palak who wants to catch all the butterflies",300,300);
                text('But the wild plants and animals of the jungle are big obstacles for me',270,320);
                text("Please help me catching the butterfles!",400,340)
                text("And remember, butterflies get you 100 points while the obstacles reduce 200 points",200,380);
                text("Just reach 1500 points and win the game!",392,400);
                text("Press ENTER to start",530,420);
                bg.visible = false;

                if(keyDown("enter")){
                        gamestate = "PLAY";
                }
        }

        if(gamestate === "PLAY"){
                bg.visible = true;
                
    bg.velocityX = -(score/100);

    if(bg.x<470){
        bg.x = 670;
    }

    if(keyDown("space")&&girl.y>200){
        girl.velocityY = -16;
    }
    if(keyDown(LEFT_ARROW)&&girl.y>200){
        girl.velocityX = -7;
    }
    if(keyDown(RIGHT_ARROW)&&girl.y>200){
        girl.velocityX = 7;
    }

    girl.velocityY = girl.velocityY + 1.2;

    spawnAnimals();
    spawnTrees();
    spawnButterflies();

    girl.collide(invisibleGround);

    if(girl.isTouching(animalsGroup)){
            score = score - 200;
            animalsGroup.destroyEach();
    }
    if(girl.isTouching(obstaclesGroup)){
        score = score - 200;
        obstaclesGroup.destroyEach();
    }
    if(girl.isTouching(fliesGroup)){
        score = score + 100;
        fliesGroup.destroyEach();
    }

    if(score === 0||score<0){
        fill("red");
        stroke("black");
        textSize(20);
        text("You lose!",550,340);
        score =0;
        bg.velocityX = 0;
        girl.velocityX = 0;
        girl.velocityY = 0;
        animalsGroup.setLifetimeEach(-1);
        obstaclesGroup.setLifetimeEach(-1);
        fliesGroup.setLifetimeEach(-1);
        animalsGroup.setVelocityXEach(0);
        fliesGroup.setVelocityXEach(0);
        obstaclesGroup.setVelocityXEach(0);
    }

    else if(score === 1500||score>1500){
        fill("red");
        stroke("black");
        textSize(20);
        text("You won!",550,340);
        bg.velocityX = 0;
        girl.velocityX = 0;
        girl.velocityY = 0;
        animalsGroup.setLifetimeEach(-1);
        obstaclesGroup.setLifetimeEach(-1);
        fliesGroup.setLifetimeEach(-1);
        obstaclesGroup.setVelocityXEach(0);
        fliesGroup.setVelocityXEach(0);
        animalsGroup.setVelocityXEach(0);
    }
    else{
        score = score + Math.round(getFrameRate()/60.4);
    }
        }

    

    fill("red");
    stroke("black");
    textSize(20);
    text("Score: "+score,100,100);
}

function spawnAnimals(){
        if (frameCount % 100 === 0){
          var wild = createSprite(1200,540,1,1);
          wild.velocityX = -(score/100);
          
           //generate random obstacles
           var rand = Math.round(random(1,10));
           switch(rand){
            case 1: wild.addImage(animal1);
             wild.scale = 0.05;
                     break;
            case 2: wild.addImage(animal2);
             wild.scale = 0.2;
                     break;
            case 3: wild.addImage(animal3);
             wild.scale = 0.4;
                     break;
            case 4: wild.addImage(animal4);
            wild.scale = 0.3;
                     break;
            case 5: wild.addImage(animal5);
            wild.scale = 0.5;
                     break;
            case 6: wild.addImage(animal6);
            wild.scale = 0.7;
                     break;
            case 7: wild.addImage(animal7);
            wild.y = 520;
            wild.scale = 0.5;
                     break;
            case 8: wild.addImage(animal8);
            wild.y = 570;
            wild.scale = 0.06;
                     break;
            case 9: wild.addImage(animal9);
            wild.scale = 0.07;
                     break;
            case 10: wild.addImage(animal10);
            wild.scale = 0.06;
                     break;
             default: break;
           }
          
           //assign scale and lifetime to the obstacle           
           
           wild.lifetime = 600;
          
          //add each obstacle to the group
           animalsGroup.add(wild);
        }
       }
       
function spawnTrees(){
    if (frameCount % 100 === 0){
      var obstacle = createSprite(1200,540,1,1);
      obstacle.velocityX = -30;
      
       //generate random obstacles
       var rand = Math.round(random(1,2));
       switch(rand) {
         case 1: obstacle.addImage(tree);
         obstacle.scale = 0.15;
                 break;
         case 2: obstacle.addImage(tree2);
         obstacle.scale = 0.3;
                 break;
         default: break;
       }
      
       //assign scale and lifetime to the obstacle           
       
       obstacle.lifetime = 350;
      
      //add each obstacle to the group
       obstaclesGroup.add(obstacle);
    }
   }

   function spawnButterflies(){
    if (frameCount % 110 === 0){
      var fly = createSprite(1200,random(200,400),1,1);
      fly.velocityX = -(score/100);
      
       //generate random obstacles
       var rand = Math.round(random(1,7));
       switch(rand) {
         case 1: fly.addImage(fly1);
         fly.scale = 0.2;
                 break;
         case 2: fly.addImage(fly2);
         fly.scale = 0.1;
                 break;
        case 3: fly.addImage(fly3);
         fly.scale = 0.21;
                 break;
         case 4: fly.addImage(fly4);
         fly.scale = 0.2;
                 break;
        case 5: fly.addImage(fly5);
         fly.scale = 0.08;
                 break;
         case 6: fly.addImage(fly6);
         fly.scale = 0.1;
                 break;
        case 7: fly.addImage(fly7);
         fly.scale = 0.1;
                 break;
         default: break;
       }
      
       //assign scale and lifetime to the obstacle           
       
       fly.lifetime = 300;
      
      //add each obstacle to the group
       fliesGroup.add(fly);
    }
   }