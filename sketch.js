//Create variables here
var dog, happyDog, database, foodStock, foodS
function preload()
{
	//load images here
  dog1=loadImage("images/dogImg.png")
  happyDog=loadImage("images/dogImg1.png")
}

function setup() {
	createCanvas(800, 700);
  database=firebase.database()
  dog=createSprite(700,400,50,50)
  dog.addImage(dog1)
  dog.scale=0.3

  foodStock=database.ref('Food')
  foodStock.on("value",readStock)

  milk1=new Food()
  milk1.getfeedtime()
}


function draw() {  
  background(46,139,87)

  fill(1000)
  textSize(20)
  if(milk1.feedtime<11){
    text("Last Fed: " + milk1.feedtime +" AM", 200,50)
  } else if(milk1.feedtime>=12){
    text("Last Fed: " + milk1.feedtime + " PM", 200,50)
  }

  
  milk1.buttons()
  milk1.milkImg()

  drawSprites();

}

function writeStock(x){

  

  database.ref('/').set({
    Food:x,
    feedtime:hour()
  })
  if(x<=0){
    x=0
  } else{
    x=x-1
  }
}
function readStock(data){
  foodS=data.val()
}

function happy(){
  dog.addImage(happyDog)
}

function normal(){
  dog.addImage(dog1)
}