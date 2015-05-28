#pragma strict

//Our current tile prefab
var tile : GameObject;
//Our original tile prefab
var ogTile : GameObject;

//number of initialized prefabs
var numMade;

function Start()
{
    //Get our first tile
    ogTile = GameObject.Find("MapStuff");

    //Set our current tile to our newest tile
    tile = ogTile;

    //Create a tile every 2 seconds
    InvokeRepeating("tileCreate", 0, .5);
}

function Update()
{

}

//Create a tile
function tileCreate()
{
  //Create a random direction to generate
  var dir = Random.Range(0, 4);
  //Our vector we are spawning
  var vector : Vector2;
	vector = tile.transform.localPosition;
	
	//Our offset from the previous tile
	var offset = 2.9f;

  //enable our is trigger and vector 2
  if(dir < 1)
  {
      vector.y = vector.y - offset;
      tile.transform.Find("BarrierSouth").gameObject.GetComponent(BoxCollider2D).isTrigger = true;
  }
  else if(dir < 2)
  {
    vector.x = vector.x + offset;
    tile.transform.Find("BarrierEast").gameObject.GetComponent(BoxCollider2D).isTrigger = true;
  }
  else if (dir < 3)
  {
    vector.y = vector.y + offset;
    tile.transform.Find("BarrierNorth").gameObject.GetComponent(BoxCollider2D).isTrigger = true;
  }
  else
  {
    vector.x = vector.x - offset;
    tile.transform.Find("BarrierWest").gameObject.GetComponent(BoxCollider2D).isTrigger = true;
  }


  //Set the shadow to true on the tile
  tile.transform.Find("Shadow").gameObject.SetActive(true);


  //save our newest tile, then spawn our new current tile
  ogTile = tile;
  tile = Instantiate(tile,vector,Quaternion.identity);

  //now disable our trigger in the opposite direction
  if(dir < 1)
  {
      ogTile.transform.Find("BarrierNorth").gameObject.GetComponent(BoxCollider2D).isTrigger = true;
  }
  else if(dir < 2)
  {
    ogTile.transform.Find("BarrierWest").gameObject.GetComponent(BoxCollider2D).isTrigger = true;
  }
  else if (dir < 3)
  {
    ogTile.transform.Find("BarrierSouth").gameObject.GetComponent(BoxCollider2D).isTrigger = true;
  }
  else
  {
    ogTile.transform.Find("BarrierEast").gameObject.GetComponent(BoxCollider2D).isTrigger = true;
  }
}
