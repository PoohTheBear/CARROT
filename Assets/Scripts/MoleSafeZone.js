
function OnTriggerExit (other : Collider)
{
	if (other.tag == "Mole") {
		Debug.Log("MOLE OUT!");
		//other.transform.SetGoHome(true);
		other.transform.SendMessage("SetGoHome", true);
	}
}

function OnTriggerEnter (other : Collider)
{
	if (other.tag == "Mole") {
		Debug.Log("IN");
		//other.transform.SetGoHome(false);
		other.transform.SendMessage("SetGoHome", false);
	}
}