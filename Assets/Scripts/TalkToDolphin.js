function OnTriggerEnter(other: Collider) {
	if(other.tag == "Player") {
		GameObject.FindGameObjectWithTag("Player").GetComponent(ThirdPersonController).showTutorials = true;
		GameObject.FindGameObjectWithTag("Player").GetComponent(ThirdPersonController).canCallHelp = true;
	}
}

function OnTriggerExit(other: Collider) {
	if(other.tag == "Player") {
		GameObject.FindGameObjectWithTag("Player").GetComponent(ThirdPersonController).showTutorials = false;
		Camera.main.GetComponent(GameHUD).t = 0;
	}
}