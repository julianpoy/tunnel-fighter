#pragma strict

var rigidBody : Rigidbody2D;

function Start(){
    rigidBody = gameObject.GetComponent(Rigidbody2D);
}

function Update(){
    Move();
}

function Move(){
    var h = Input.GetAxis("Horizontal");
    var v = Input.GetAxis("Vertical");
    var direction = new Vector2(h, v);
    rigidBody.MovePosition(rigidBody.position + (direction * 0.1));
}
