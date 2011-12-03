var platformNumber = 0;
function OnTriggerEnter(other: Collider) {
	if(other.tag == "Player") {
		var lastPlatform = other.GetComponent(ThirdPersonController).GetLastPlatformOn();
		if((lastPlatform >= (platformNumber - 1)) && (lastPlatform <= (platformNumber + 1))) {
			other.GetComponent(ThirdPersonController).SetLastPlatformOn(platformNumber);
		} else {
			other.GetComponent(ThirdPersonController).SetLastPlatformOn(0);
		}
	}
}