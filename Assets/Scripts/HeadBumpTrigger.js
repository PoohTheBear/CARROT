
var boss : Collider;

function OnTriggerEnter (other : Collider)
{
	if (other.tag == "Player") {
		boss.SendMessage("HeadBump");
	}
}