#pragma strict

//Our current tile prefab
var tile : GameObject;
//Our original tile prefab
var ogTile : GameObject;
//Our last created Tile

//number of initialized prefabs
var numMade;

function Start()
{
    //Get our first tile
    ogTile = GameObject.Find("MapStuff");

    //Set our current tile to our newest tile
    tile = ogTile;

    //Create a tile every 2 seconds
    InvokeRepeating("tileCreate", 0, 1 );
}

function Update()
{

}

//Create a tile
function tileCreate()
{
  //Create a random direction to generate
  dir = Random.Range(0, 4);
  //Our vector we are spawning
  var vector = tile.transform;

  //enable our is trigger and vector 2
  if(dir < 1)
  {
      vector.transform.position.y = vector.transform.position.y - 3;
      tile.transform.Find("BarrierSouth").isTrigger = false;
  }
  else if(dir < 2)
  {
    vector.transform.position.x = vector.transform.position.x + 3;
    tile.transform.Find("BarrierEast").isTrigger = false;
  }
  else if (dir < 3)
  {
    vector.transform.position.y = vector.transform.position.y + 3;
    tile.transform.Find("BarrierNorth").isTrigger = false;
  }
  else
  {
    vector.transform.position.x = vector.transform.position.x - 3;
    tile.transform.Find("BarrierWest").isTrigger = false;
  }


  //Set the shadow to true on the tile
  tile.transform.Find("Shadow").enabled = true;


  //save our newest tile, then spawn our new current tile
  ogTile = tile
  tile = Instantiate(tile, new Vector2(i * 2.0F, 0), Quaternion.identity);

  //now disable our trigger in the opposite direction
  if(dir < 1)
  {
      ogTile.transform.Find("BarrierNorth").isTrigger = false;
  }
  else if(dir < 2)
  {
    ogTile.transform.Find("BarrierWest").isTrigger = false;
  }
  else if (dir < 3)
  {
    ogTile.transform.Find("BarrierSouth").isTrigger = false;
  }
  else
  {
    ogTile.transform.Find("BarrierEast").isTrigger = false;
  }
}
