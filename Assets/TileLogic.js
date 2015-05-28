#pragma strict

var Chicken : GameObject;
var tileShadow : GameObject;
var neighborNorth : boolean = false;
var neighborSouth : boolean = false;
var neighborWest : boolean = false;
var neighborEast : boolean = false;

function Start () 
{
    Chicken = GameObject.Find("ChickenShit");
    tileShadow = gameObject.transform.Find("Shadow").gameObject;
}

function OnTriggerEnter2D(other: Collider2D) 
{
	if(other.gameObject.Equals(Chicken))
	{
		tileShadow.SetActive(false);
	}
}

function setNeighborNorth(){
	neighborNorth = true;
}

function setNeighborSouth(){
	neighborSouth = true;
}

function setNeighborWest(){
	neighborWest = true;
}

function setNeighborEast(){
	neighborEast = true;
}

function hasNeighborNorth(){
	return neighborNorth;
}

function hasNeighborSouth(){
	return neighborSouth;
}

function hasNeighborWest(){
	return neighborWest;
}

function hasNeighborEast(){
	return neighborEast;
}