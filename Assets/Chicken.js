#pragma strict

var rigidBody : Rigidbody2D;

//Our Chciken vairables
var chickHealth;
var chickLvl;

function Start(){
    rigidBody = gameObject.GetComponent(Rigidbody2D);
    
    //Initialize our variables
    chickHealth = 5;
    chickLvl = 1;
}

function Update(){
    Move();
}

function Move(){
    var h = Input.GetAxis("Horizontal");
    var v = Input.GetAxis("Vertical");
    var direction = new Vector2(h, v);
    rigidBody.MovePosition(rigidBody.position + (direction * 0.1));
}

//Get methods
function getHealth()
{
	return chickHealth;
}

function getLvl()
{
	return chickLvl;
}