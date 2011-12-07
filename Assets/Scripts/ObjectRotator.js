
// objectRotater: Rotates the object to which it is attached.
// Useful for collectable items, etc.

var rotateSpeed = 200;

function Update () 
{
	transform.Rotate (0, rotateSpeed * Time.deltaTime, 0);
}

function OnBecameVisible()
{
	enabled = true;	
}

function OnBecameInvisible()
{
	enabled = false;	
}