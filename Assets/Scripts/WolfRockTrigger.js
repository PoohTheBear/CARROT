
var xSpeed = 0.2;
var ySpeed = 0.2;

function OnTriggerEnter (other : Collider) {
	if (other.tag == "Player") {
		var player = other.transform;
		var controller = player.GetComponent(ThirdPersonController);
		if (controller.canPunch) {
			var boulder = GameObject.FindWithTag("WolfBoulder").transform;
			boulder.position.x += xSpeed;
			boulder.position.y += ySpeed;
			
		}
	}
}

function OnTriggerStay (other : Collider) {
	OnTriggerEnter(other);
}