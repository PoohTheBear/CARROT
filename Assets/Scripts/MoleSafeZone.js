
function OnTriggerExit (other : Collider)
{
	if (other.tag == "Mole" || other.tag == "Wolf") {
		other.transform.SendMessage("SetGoHome", true);
	}
}

function OnTriggerEnter (other : Collider)
{
	if (other.tag == "Mole" || other.tag == "Wolf") {
		other.transform.SendMessage("SetGoHome", false);
	}
}