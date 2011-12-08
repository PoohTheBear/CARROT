
var slamStrength = 2.0;

function OnTriggerEnter (other : Collider) {
	if (other.tag == "Player") {
		var player = other.transform;
		var controller = player.GetComponent(ThirdPersonController);
		if (controller.canPunch) {
			var boulder = GameObject.FindWithTag("Boulder").transform;
			//boulder.position
			//boulder.position.x += 1;
			boulder.rotation.y -= 0.1;
			/*// Compute relative point and get the angle towards it
			var relative = boulder.InverseTransformPoint(boulder.position);
			var angle = Mathf.Atan2 (relative.x, relative.z) * Mathf.Rad2Deg;
			// Clamp it with the max rotation speed
			var maxRotation = 200 * Time.deltaTime;
			var clampedAngle = Mathf.Clamp(angle, -maxRotation, maxRotation);
			// Rotate
			boulder.Rotate(0, clampedAngle, 0);*/
			
		}
		else {
			var slamDirection = player.InverseTransformDirection(player.position);
			slamDirection.y = slamStrength;
			slamDirection.x = -slamStrength;
			slamDirection.z = 0;
			player.SendMessage("Slam", transform.TransformDirection(slamDirection));
		}
	}
}

function OnTriggerStay (other : Collider) {
	OnTriggerEnter(other);
}