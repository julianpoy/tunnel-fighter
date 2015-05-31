#pragma strict

//Our ui elemtns
var hud : UnityEngine.UI.Text;

//Our player info
var chicken : Chicken;
function Start () 
{
	//Initialize our hud
	hud = GameObject.Find("Hud").GetComponent("UnityEngine.UI.Text");
	
	//get our chicken
	chicken = GameObject.Find("ChickenShit").GetComponent("Chicken");
}

function Update () 
{
	//update our hud every seconda
	hud.text = "Health: " + chicken.getHealth() + "\nLevel: " + chicken.getLvl();
}