//Create variables here

var dog,happyDog,database,foodS,foodStock

function preload()
{
	//load images here
  dogImg = loadImage ("images/dogImg.png");
  happyDogImg = loadImage ("images/dogImg1.png");
}

function setup() {
	createCanvas(500, 500);
  database = firebase.database()
  dog = createSprite (250,300,150,150);
  dog.addImage (dogImg);
  dog.scale = 0.15;
  
  foodStock = database.ref('Food');
  foodStock.on("value",readStock);
  
}


function draw() {  

  background(46,139,87);

  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(happyDogImg);  
  }

  drawSprites();
  //add styles here

  fill("red");
  textSize(13);
  text("food remaining "+foodS,170,200);
  text("Press UP_ARROW key to Feed Drago Milk",300,20);
}

function readStock(data) {
  foodS = data.val();
}

function writeStock(x) {
  if(x<=0){
    x = 0;
  }
  else{
    x=x-1
 }
 database.ref('/').update ({
   Food:x
 })

 
}

