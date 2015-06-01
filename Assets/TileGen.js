#pragma strict

//Our current tile prefab
var tile : GameObject;
//Our original tile prefab
var ogTile : GameObject;

//The main player object
var player : GameObject;

//Keep track of a mapGen crash (Every 2nd map generation ends with a mapGen crash)
var crash : int;

//number of initialized prefabs
var numMade : int;

//number of active tileCreators
var numActiveCreators;

function Start()
{
	//Get our player
	player = GameObject.Find("ChickenShit");

    //Get our first tile
    ogTile = GameObject.Find("MapStuff");

    //Set our current tile to our newest tile
    tile = ogTile;

    //Create a tile every 2 seconds
    crash = 0;
    tileCreate();
}

function Update()
{

}

//Create a tile
function tileCreate()
{
  var dir : double;
  var blockSouth: RaycastHit2D = Physics2D.Raycast(new Vector2(tile.transform.Find("BarrierSouth").transform.position.x, tile.transform.Find("BarrierSouth").transform.position.y - 1), -Vector2.up, 2.5);
  var blockEast: RaycastHit2D = Physics2D.Raycast(new Vector2(tile.transform.Find("BarrierEast").transform.position.x + 1, tile.transform.Find("BarrierEast").transform.position.y), Vector2.right, 2.5);
  var blockNorth: RaycastHit2D = Physics2D.Raycast(new Vector2(tile.transform.Find("BarrierNorth").transform.position.x, tile.transform.Find("BarrierNorth").transform.position.y + 1), Vector2.up, 2.5);
  var blockWest: RaycastHit2D = Physics2D.Raycast(new Vector2(tile.transform.Find("BarrierWest").transform.position.x - 1, tile.transform.Find("BarrierWest").transform.position.y), -Vector2.right, 2.5);
  var validDirection = false;
  var validityCrash : int;
  while(!validDirection){
  	validityCrash = validityCrash + 1;
  	//Create a random direction to generate
    dir = Random.Range(0, 4);
    //dir = 0;
    validDirection = true;
	//Debug.Log(dir);
	
	
    //Debug.Log(hitWest.transform.name);
    if((dir < 1 && (blockSouth)) || 
    	(dir >= 1 && dir < 2 && (blockEast)) || 
    	(dir >= 2 && dir < 3 && (blockNorth)) || 
    	(dir >= 3 && dir <= 4 && (blockWest))){
    	validDirection = false;
    	
    		//Debug.Log("fuck yo couch");
    	
    }
    if(validityCrash > 200){
    	Debug.Log("Validity Crash!!!");
    	crash = 1;
    	break;
    }
  }
  if(crash == 0){
	  //Our vector we are spawning
	  var vector : Vector2;
		vector = tile.transform.localPosition;
		
		//Our offset from the previous tile
		var offset = 2.9f;

	  //enable our is trigger for the old tile and vector 2 for the new tile
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

	  //save our newest tile, then spawn our new current tile
	  ogTile = tile;
	  tile = Instantiate(tile,vector,Quaternion.identity);
	  
	  //Disable BoxCollider on player
	  player.GetComponent(BoxCollider2D).enabled = false;
	  tile.transform.Find("BarrierNorth").gameObject.GetComponent(BoxCollider2D).enabled = false;
	  tile.transform.Find("BarrierWest").gameObject.GetComponent(BoxCollider2D).enabled = false;
	  tile.transform.Find("BarrierEast").gameObject.GetComponent(BoxCollider2D).enabled = false;
	  tile.transform.Find("BarrierSouth").gameObject.GetComponent(BoxCollider2D).enabled = false;
	  
	  var hitSouth : RaycastHit2D = Physics2D.Raycast(new Vector2(tile.transform.position.x, tile.transform.position.y), -Vector2.up, 3);
	  var hitEast : RaycastHit2D = Physics2D.Raycast(new Vector2(tile.transform.position.x, tile.transform.position.y), Vector2.right, 3);
	  var hitNorth : RaycastHit2D = Physics2D.Raycast(new Vector2(tile.transform.position.x, tile.transform.position.y), Vector2.up, 3);
	  var hitWest : RaycastHit2D = Physics2D.Raycast(new Vector2(tile.transform.position.x, tile.transform.position.y), -Vector2.right, 3);

	  //now disable our trigger in the opposite direction
	  if(hitNorth)
	  {
	    Debug.Log(numMade + " North " + hitNorth.collider);
	    tile.transform.Find("BarrierNorth").gameObject.GetComponent(BoxCollider2D).isTrigger = true;
	    Debug.DrawLine(new Vector2(tile.transform.position.x, tile.transform.position.y), hitNorth.collider.transform.position, Color.white, 5f, false);
	    //var tileNorth : GameObject = hitNorth.collider.gameObject;
	    hitNorth.collider.gameObject.GetComponent(BoxCollider2D).isTrigger = true;
	  } else {
	  	tile.transform.Find("BarrierNorth").gameObject.GetComponent(BoxCollider2D).isTrigger = false;
	  }
	  if(hitWest)
	  {
	   	Debug.Log(numMade + " West " + hitWest.collider);
	   	tile.transform.Find("BarrierWest").gameObject.GetComponent(BoxCollider2D).isTrigger = true;
	   	Debug.DrawLine(new Vector2(tile.transform.position.x, tile.transform.position.y), hitWest.collider.transform.position, Color.white, 5f, false);
	    //var tileWest : GameObject = hitWest.collider.gameObject;
	    hitWest.collider.gameObject.GetComponent(BoxCollider2D).isTrigger = true;
	  } else {
	  	tile.transform.Find("BarrierWest").gameObject.GetComponent(BoxCollider2D).isTrigger = false;
	  }
	  if(hitEast)
	  {
	    Debug.Log(numMade + " East " + hitEast.collider);
	    tile.transform.Find("BarrierEast").gameObject.GetComponent(BoxCollider2D).isTrigger = true;
	    Debug.DrawLine(new Vector2(tile.transform.position.x, tile.transform.position.y), hitEast.collider.transform.position, Color.white, 5f, false);
	    //var tileEast : GameObject = hitEast.collider.gameObject;
	    hitEast.collider.gameObject.GetComponent(BoxCollider2D).isTrigger = true;
	  } else {
	  	tile.transform.Find("BarrierEast").gameObject.GetComponent(BoxCollider2D).isTrigger = false;
	  }
	  if(hitSouth)
	  {
	    Debug.Log(numMade + " South " + hitSouth.collider);
	    tile.transform.Find("BarrierSouth").gameObject.GetComponent(BoxCollider2D).isTrigger = true;
	    Debug.DrawLine(new Vector2(tile.transform.position.x, tile.transform.position.y), hitSouth.collider.transform.position, Color.white, 5f, false);
	    //var tileSouth : GameObject = hitSouth.collider.gameObject;
	    hitSouth.collider.gameObject.GetComponent(BoxCollider2D).isTrigger = true;
	  } else {
	  	tile.transform.Find("BarrierSouth").gameObject.GetComponent(BoxCollider2D).isTrigger = false;
	  }
	  //Re-enable box collider for player
	  player.GetComponent(BoxCollider2D).enabled = true;
	  tile.transform.Find("BarrierNorth").gameObject.GetComponent(BoxCollider2D).enabled = true;
	  tile.transform.Find("BarrierWest").gameObject.GetComponent(BoxCollider2D).enabled = true;
	  tile.transform.Find("BarrierEast").gameObject.GetComponent(BoxCollider2D).enabled = true;
	  tile.transform.Find("BarrierSouth").gameObject.GetComponent(BoxCollider2D).enabled = true;
	  
	  //Increment number of tiles made
	  numMade = numMade + 1;
	  
	  //Call the function again
	  if(numMade < 100 && crash == 0){
	  	tileCreate();
	  }
	}
}
