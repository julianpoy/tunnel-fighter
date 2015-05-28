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
    //Get our tile shadow and make sure it is correct
    tileShadow = gameObject.transform.Find("Shadow").gameObject;
    tileShadow.SetActive(true);
    tileShadow.GetComponent(SpriteRenderer).color.a = 255;
}

function OnTriggerEnter2D(other: Collider2D) 
{
	if(other.gameObject.Equals(Chicken))
	{
		StartCoroutine("SmoothEnter");
	}
}

//Smooth Enter function to reveal our tile
function SmoothEnter()
{
	//Get our tile shadow color
	var shadow : Color32 = tileShadow.GetComponent(SpriteRenderer).color;
	
	//while our alpha value is full, decrease it until the shadow is gone
	while(shadow.a > 0)
	{
		shadow.a = shadow.a / 1.065f;
		tileShadow.GetComponent(SpriteRenderer).color = shadow;
		yield WaitForSeconds(.01f);
	}
	
	//tile is now smoothly exited, exit it 
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