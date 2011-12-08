
var i = 0;
var y = 0;

function OnTriggerEnter (other : Collider) {
	if (other.tag == "Wolf") {
		y++;
		other.transform.SendMessage("JumpOverPit", true);
	}
}
	
function OnTriggerExit (other : Collider) {
	if (other.tag == "Wolf") {
		i++;
		other.transform.SendMessage("JumpOverPit", false);
	}
}