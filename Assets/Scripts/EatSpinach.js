function OnTriggerEnter (other: Collider) {
	if(other.tag == "Player") {
		GameObject.FindGameObjectWithTag("Player").GetComponent(ThirdPersonController).canPunch = true;
		Destroy(transform.gameObject);
	}	
}