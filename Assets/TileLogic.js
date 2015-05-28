#pragma strict

var ChickenPos : Vector2;
var tileShadow : GameObject;
var neighborNorth : boolean = false;
var neighborSouth : boolean = false;
var neighborWest : boolean = false;
var neighborEast : boolean = false;

function Start () {
    ChickenPos = GameObject.Find("ChickenShit").transform.position;
    tileShadow = GameObject.Find("Shadow");
}

function Update () {

}

function OnTriggerEnter2D(other: Collider2D) {
	tileShadow.SetActive(false);
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
