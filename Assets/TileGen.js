#pragma strict

//Our current tile prefab
var tile : GameObject;
//Our original tile prefab
var ogTile : GameObject;

//The main player object
var player : GameObject;

//Keep track of if generation backs itself into a corner
var genStopped : boolean;

//number of initialized prefabs
var numMade : int;

function Start()
{
	//Get our player
	player = GameObject.Find("ChickenShit");

    //Get our first tile
    ogTile = GameObject.Find("MapStuff");

    //Set our current tile to our newest tile
    tile = ogTile;

    //Create a tile every 2 seconds
    genStopped = false;
    tileCreate();
}

function Update()
{

}

//Create a tile
function tileCreate()
{
	//Declare direction container
	var dir : double;

	//Shoot RayCasts in each direction to detect ajacent tiles
	var blockSouth: RaycastHit2D = Physics2D.Raycast(new Vector2(tile.transform.Find("BarrierSouth").transform.position.x, tile.transform.Find("BarrierSouth").transform.position.y - 1), -Vector2.up, 2.5);
	var blockEast: RaycastHit2D = Physics2D.Raycast(new Vector2(tile.transform.Find("BarrierEast").transform.position.x + 1, tile.transform.Find("BarrierEast").transform.position.y), Vector2.right, 2.5);
	var blockNorth: RaycastHit2D = Physics2D.Raycast(new Vector2(tile.transform.Find("BarrierNorth").transform.position.x, tile.transform.Find("BarrierNorth").transform.position.y + 1), Vector2.up, 2.5);
	var blockWest: RaycastHit2D = Physics2D.Raycast(new Vector2(tile.transform.Find("BarrierWest").transform.position.x - 1, tile.transform.Find("BarrierWest").transform.position.y), -Vector2.right, 2.5);

	//Keep picking until a valid direction is found
	var validDirection = false;
	//Quit if it runs too many times (signifies that gen has entered a corner)
	var directionCrash : int;
	while(!validDirection){
		//Increment the crash catch counter
		directionCrash = directionCrash + 1;

		//Choose a random direction
		dir = Random.Range(0, 4);

		//Assume direction is valid
		validDirection = true;

		//Check if chosen direction is blocked
		if((dir < 1 && (blockSouth)) || 
			(dir >= 1 && dir < 2 && (blockEast)) || 
			(dir >= 2 && dir < 3 && (blockNorth)) || 
			(dir >= 3 && dir <= 4 && (blockWest))){
			//If so, that direction was not valid
			validDirection = false;
		}

		//Check if the direction picker has been running too many times
		if(directionCrash > 200){
		Debug.Log("Generator Stopped Early");
		genStopped = true;
		break;
		}
	}

	//If generation is a go, run the main gen code
	if(genStopped == false){
		//Our vector we will be spawning
		var vector : Vector2;
		vector = tile.transform.localPosition;

		//Our offset from the previous tile
		var offset = 2.9f;

		//Generate vectors for the corrosponding direction
		if(dir < 1)
		{
		  vector.y = vector.y - offset;
		}
		else if(dir < 2)
		{
			vector.x = vector.x + offset;
		}
		else if (dir < 3)
		{
			vector.y = vector.y + offset;
		}
		else
		{
			vector.x = vector.x - offset;
		}


		//Set the shadow to true on the tile
		tile.transform.Find("Shadow").gameObject.SetActive(true);

		//Save the old tile for future reference, set tile to mean the newly generated tile
		ogTile = tile;
		tile = Instantiate(tile,vector,Quaternion.identity);

		//Disable BoxCollider on player and new tile
		player.GetComponent(BoxCollider2D).enabled = false;
		tile.transform.Find("BarrierNorth").gameObject.GetComponent(BoxCollider2D).enabled = false;
		tile.transform.Find("BarrierWest").gameObject.GetComponent(BoxCollider2D).enabled = false;
		tile.transform.Find("BarrierEast").gameObject.GetComponent(BoxCollider2D).enabled = false;
		tile.transform.Find("BarrierSouth").gameObject.GetComponent(BoxCollider2D).enabled = false;

		//Check for adjacent tiles
		var hitSouth : RaycastHit2D = Physics2D.Raycast(new Vector2(tile.transform.position.x, tile.transform.position.y), -Vector2.up, 3);
		var hitEast : RaycastHit2D = Physics2D.Raycast(new Vector2(tile.transform.position.x, tile.transform.position.y), Vector2.right, 3);
		var hitNorth : RaycastHit2D = Physics2D.Raycast(new Vector2(tile.transform.position.x, tile.transform.position.y), Vector2.up, 3);
		var hitWest : RaycastHit2D = Physics2D.Raycast(new Vector2(tile.transform.position.x, tile.transform.position.y), -Vector2.right, 3);

		//For each direction, if there is an adjacent tile, set the boxcollider2d istrigger of both the current tile and the adjacent tile
		if(hitNorth)
		{
			//Debug.Log(numMade + " North " + hitNorth.collider);
			tile.transform.Find("BarrierNorth").gameObject.GetComponent(BoxCollider2D).isTrigger = true;
			//Debug.DrawLine(new Vector2(tile.transform.position.x, tile.transform.position.y), hitNorth.collider.transform.position, Color.white, 5f, false);
			//var tileNorth : GameObject = hitNorth.collider.gameObject;
			hitNorth.collider.gameObject.GetComponent(BoxCollider2D).isTrigger = true;
		} else {
			tile.transform.Find("BarrierNorth").gameObject.GetComponent(BoxCollider2D).isTrigger = false;
		}
		if(hitWest)
			{
			//Debug.Log(numMade + " West " + hitWest.collider);
			tile.transform.Find("BarrierWest").gameObject.GetComponent(BoxCollider2D).isTrigger = true;
			//Debug.DrawLine(new Vector2(tile.transform.position.x, tile.transform.position.y), hitWest.collider.transform.position, Color.white, 5f, false);
			//var tileWest : GameObject = hitWest.collider.gameObject;
			hitWest.collider.gameObject.GetComponent(BoxCollider2D).isTrigger = true;
		} else {
			tile.transform.Find("BarrierWest").gameObject.GetComponent(BoxCollider2D).isTrigger = false;
		}
		if(hitEast)
		{
			//Debug.Log(numMade + " East " + hitEast.collider);
			tile.transform.Find("BarrierEast").gameObject.GetComponent(BoxCollider2D).isTrigger = true;
			//Debug.DrawLine(new Vector2(tile.transform.position.x, tile.transform.position.y), hitEast.collider.transform.position, Color.white, 5f, false);
			//var tileEast : GameObject = hitEast.collider.gameObject;
			hitEast.collider.gameObject.GetComponent(BoxCollider2D).isTrigger = true;
		} else {
			tile.transform.Find("BarrierEast").gameObject.GetComponent(BoxCollider2D).isTrigger = false;
		}
		if(hitSouth)
		{
			//Debug.Log(numMade + " South " + hitSouth.collider);
			tile.transform.Find("BarrierSouth").gameObject.GetComponent(BoxCollider2D).isTrigger = true;
			//Debug.DrawLine(new Vector2(tile.transform.position.x, tile.transform.position.y), hitSouth.collider.transform.position, Color.white, 5f, false);
			//var tileSouth : GameObject = hitSouth.collider.gameObject;
			hitSouth.collider.gameObject.GetComponent(BoxCollider2D).isTrigger = true;
		} else {
			tile.transform.Find("BarrierSouth").gameObject.GetComponent(BoxCollider2D).isTrigger = false;
		}
		
		//Re-enable box collider for player and new tile
		player.GetComponent(BoxCollider2D).enabled = true;
		tile.transform.Find("BarrierNorth").gameObject.GetComponent(BoxCollider2D).enabled = true;
		tile.transform.Find("BarrierWest").gameObject.GetComponent(BoxCollider2D).enabled = true;
		tile.transform.Find("BarrierEast").gameObject.GetComponent(BoxCollider2D).enabled = true;
		tile.transform.Find("BarrierSouth").gameObject.GetComponent(BoxCollider2D).enabled = true;

		//Increment number of tiles made
		numMade = numMade + 1;

		//Call the function again
		if(numMade < 100 && genStopped == false){
			tileCreate();
		}
	}
}
