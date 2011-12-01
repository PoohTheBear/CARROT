function OnTriggerEnter (other : Collider)
{
	if (other.tag == "Player")
	{
		other.GetComponent (ThirdPersonController).SetOnMolePlatform(true);
	}
}

function OnTriggerExit (other : Collider)
{
	if (other.tag == "Player")
	{
		other.GetComponent (ThirdPersonController).SetOnMolePlatform(false);
	}
}

// Auto setup the pickup
function Reset ()
{
	if (collider == null)
		gameObject.AddComponent(BoxCollider);
	collider.isTrigger = true;
}