function OnTriggerEnter (other: Collider) {
	if(other.tag == "Player") {
		GameObject.FindGameObjectWithTag("Player").GetComponent(ThirdPersonController).canDoubleJump = true;
		Destroy(transform.gameObject);
	}	
}