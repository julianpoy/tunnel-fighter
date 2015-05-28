#pragma strict

//RigidBody
var theBody : Rigidbody2D;

//Move speed
var eMoveSpeed : float;

//Enemy Level
var eLevel : float;

//Our target to fight
var player : GameObject;


function Start () 
{
	//Get a random enemy level
	eLevel = Random.Range(1, 10);

	//Go after our player!
	player = GameObject.Find("ChickenShit").gameObject;
}

function Update () 
{
	//Move our enemy
	//Get our speed according to our current level
	var superSpeed = eMoveSpeed + (eLevel / 10);
		
	//Get the position we want to move to, and go to it using move towards
	transform.position =  Vector2.MoveTowards(transform.position, player.transform.position, superSpeed * Time.deltaTime);
}