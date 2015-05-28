#pragma strict

//Our current tile prefab
var tile : GameObject;
//Our original tile prefab
var ogTile : GameObject;

//number of initialized prefabs
var numMade;

//number of active tileCreators
var numActiveCreators;

function Start()
{
    //Get our first tile
    ogTile = GameObject.Find("MapStuff");

    //Set our current tile to our newest tile
    tile = ogTile;

    //Create a tile every 2 seconds
    InvokeRepeating("tileCreate", 0, .5);
    //tileCreate();
}

function Update()
{

}

//Create a tile
function tileCreate()
{
  var dir : double;
  var hitSouth: RaycastHit2D = Physics2D.Raycast(new Vector2(tile.transform.Find("BarrierSouth").transform.position.x, tile.transform.Find("BarrierSouth").transform.position.y - 1), -Vector2.up, 2.5);
  var hitEast: RaycastHit2D = Physics2D.Raycast(new Vector2(tile.transform.Find("BarrierEast").transform.position.x + 1, tile.transform.Find("BarrierEast").transform.position.y), Vector2.right, 2.5);
  var hitNorth: RaycastHit2D = Physics2D.Raycast(new Vector2(tile.transform.Find("BarrierNorth").transform.position.x, tile.transform.Find("BarrierNorth").transform.position.y + 1), Vector2.up, 2.5);
  var hitWest: RaycastHit2D = Physics2D.Raycast(new Vector2(tile.transform.Find("BarrierWest").transform.position.x - 1, tile.transform.Find("BarrierWest").transform.position.y), -Vector2.right, 2.5);
  var validDirection = false;
  while(!validDirection){
  	//Create a random direction to generate
    dir = Random.Range(0, 4);
    //dir = 0;
    validDirection = true;
	//Debug.Log(dir);
	
	
    //Debug.Log(hitWest.transform.name);
    if((dir < 1 && (hitSouth)) || 
    	(dir >= 1 && dir < 2 && (hitEast)) || 
    	(dir >= 2 && dir < 3 && (hitNorth)) || 
    	(dir >= 3 && dir <= 4 && (hitWest))){
    	validDirection = false;
    	
    		//Debug.Log("fuck yo couch");
    	
    }
  }
  //Our vector we are spawning
  var vector : Vector2;
	vector = tile.transform.localPosition;
	
	//Our offset from the previous tile
	var offset = 3.0f;

  //enable our is trigger and vector 2
  if(dir < 1)
  {
      vector.y = vector.y - offset;
      ogTile.transform.Find("BarrierSouth").gameObject.GetComponent(BoxCollider2D).isTrigger = true;
  }
  else if(dir < 2)
  {
    vector.x = vector.x + offset;
    ogTile.transform.Find("BarrierEast").gameObject.GetComponent(BoxCollider2D).isTrigger = true;
  }
  else if (dir < 3)
  {
    vector.y = vector.y + offset;
    ogTile.transform.Find("BarrierNorth").gameObject.GetComponent(BoxCollider2D).isTrigger = true;
  }
  else
  {
    vector.x = vector.x - offset;
    ogTile.transform.Find("BarrierWest").gameObject.GetComponent(BoxCollider2D).isTrigger = true;
  }


  //Set the shadow to true on the tile
  tile.transform.Find("Shadow").gameObject.SetActive(true);


  //save our newest tile, then spawn our new current tile
  ogTile = tile;
  tile = Instantiate(tile,vector,Quaternion.identity);

  //now disable our trigger in the opposite direction
  if(dir < 1)
  {
    tile.transform.Find("BarrierNorth").gameObject.GetComponent(BoxCollider2D).isTrigger = true;
  }
  else if(dir < 2)
  {
    tile.transform.Find("BarrierWest").gameObject.GetComponent(BoxCollider2D).isTrigger = true;
  }
  else if (dir < 3)
  {
    tile.transform.Find("BarrierSouth").gameObject.GetComponent(BoxCollider2D).isTrigger = true;
  }
  else
  {
    tile.transform.Find("BarrierEast").gameObject.GetComponent(BoxCollider2D).isTrigger = true;
  }
}
