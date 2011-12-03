var boss: GameObject;

function OnTriggerEnter (other : Collider)
{
	if (other.tag == "Player")
	{
		other.GetComponent (ThirdPersonController).SetOnBossPlatform(true);
		other.GetComponent (ThirdPersonController).SetBoss(boss);
	}
}

function OnTriggerExit (other : Collider)
{
	if (other.tag == "Player")
	{
		other.GetComponent (ThirdPersonController).SetOnBossPlatform(false);
		other.GetComponent (ThirdPersonController).SetBoss(null);
	}
}

// Auto setup the pickup
function Reset ()
{
	if (collider == null)
		gameObject.AddComponent(BoxCollider);
	collider.isTrigger = true;
}