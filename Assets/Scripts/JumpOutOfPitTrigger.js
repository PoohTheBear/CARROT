
function OnTriggerEnter (other : Collider) {
	if (other.tag == "Wolf") {
		//Debug.Log("INSIDEEEE");
		other.transform.SendMessage("InsidePit", true);
	}
}

function OnTriggerExit (other : Collider) {
	if (other.tag == "Wolf") {
		//Debug.Log("INSIDEEEE");
		other.transform.SendMessage("InsidePit", false);
	}
}