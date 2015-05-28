#pragma strict

var ChickenPos : Vector2;
var tileShadow : GameObject;

function Start () {
    ChickenPos = GameObject.Find("ChickenShit").transform.position;
    tileShadow = GameObject.Find("Shadow");
}

function Update () {

}

function OnTriggerEnter2D(other: Collider2D) {
	tileShadow.SetActive(false);
}
