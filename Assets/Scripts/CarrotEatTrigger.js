function OnTriggerEnter (other: Collider) {
	if(other.tag == "Player") {
		Destroy(transform.gameObject);
		GameObject.FindGameObjectWithTag("Player").GetComponent(ThirdPersonStatus).LevelCompleted();
	}
}