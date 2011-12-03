var damage = 1;

private var beesNear = false;
private var timeBeesNear: double = 0.0;
private var damageTaken = false;

function Start ()
{
	// By default loop all animations
	animation.wrapMode = WrapMode.Loop;
	
	animation["idle"].layer = -1;
	animation["bees"].layer = -1;
	animation.SyncLayer(-1);
	
	animation["attack"].layer = 0;
	animation["attack"].wrapMode = WrapMode.Once;
	
	/*animation["run"].layer = -1;
	animation["walk"].layer = -1;
	animation["idle"].layer = -2;
	animation.SyncLayer(-1);

	animation["ledgefall"].layer = 9;	
	animation["ledgefall"].wrapMode = WrapMode.Loop;


	// The jump animation is clamped and overrides all others
	animation["jump"].layer = 10;
	animation["jump"].wrapMode = WrapMode.ClampForever;

	animation["jumpfall"].layer = 10;	
	animation["jumpfall"].wrapMode = WrapMode.ClampForever;

	// This is the jet-pack controlled descent animation.
	animation["jetpackjump"].layer = 10;	
	animation["jetpackjump"].wrapMode = WrapMode.ClampForever;

	animation["jumpland"].layer = 10;	
	animation["jumpland"].wrapMode = WrapMode.Once;

	animation["walljump"].layer = 11;	
	animation["walljump"].wrapMode = WrapMode.Once;

	// we actually use this as a "got hit" animation
	animation["buttstomp"].speed = 0.15;
	animation["buttstomp"].layer = 20;
	animation["buttstomp"].wrapMode = WrapMode.Once;	
	var punch = animation["punch"];
	punch.wrapMode = WrapMode.Once;
	animation["kick"].wrapMode = WrapMode.Once;*/

	// We are in full control here - don't let any other animations play when we start
	animation.Stop();
	animation.Play("idle");
}

function OnTriggerEnter(other: Collider) {
	if(other.tag == "Bees") {
		Debug.Log("bees near");
		GameObject.FindGameObjectWithTag("Bees").GetComponent(BeesAI).stay = true;
		timeBeesNear = 0.0;
		animation.Play("bees");
		animation.Rewind("idle");
		beesNear = true;
	}
	if(other.tag == "Player" && !beesNear) {
		Debug.Log("player near");
		Slam(other.gameObject);
		animation.Play("attack");
		animation.Rewind("idle");
	}	
}

function OnTriggerExit(other: Collider) {
	if(other.tag == "Bees") {
		animation.Play("idle");
		beesNear = false;
	}
}

function Slam (target: GameObject) {
	var slamDirection = transform.InverseTransformDirection(target.transform.position - transform.position);
	slamDirection.y = 1;
	/*slamDirection.z = 0;
	if (slamDirection.x >= 0)
		slamDirection.x = 1;
	else
		slamDirection.x = -1;
*/
	target.SendMessage("ApplyDamage", damage);
	target.SendMessage("Slam", transform.TransformDirection(slamDirection));
}

function Update ()
{
	if(beesNear) {
		timeBeesNear += Time.deltaTime;
		if(timeBeesNear >= 5.0 && !damageTaken) {
			GameObject.FindGameObjectWithTag("Bees").GetComponent(BeesAI).goHome = true;
			GameObject.FindGameObjectWithTag("Bees").GetComponent(BeesAI).stay = false;
			GameObject.FindGameObjectWithTag("Player").GetComponent(ThirdPersonController).SetLastPlatformOn(0);
			SendMessage("ApplyDamage", 1);
			damageTaken = true;
		}
	} else {
		damageTaken = false;
	}
	/*var playerController : ThirdPersonController = GetComponent(ThirdPersonController);
	var currentSpeed = playerController.GetSpeed();

	// Fade in run
	if (currentSpeed > playerController.walkSpeed)
	{
		animation.CrossFade("run");
		// We fade out jumpland quick otherwise we get sliding feet
		animation.Blend("jumpland", 0);
	}
	// Fade in walk
	else if (currentSpeed > 0.1)
	{
		animation.CrossFade("walk");
		// We fade out jumpland realy quick otherwise we get sliding feet
		animation.Blend("jumpland", 0);
	}
	// Fade out walk and run
	else
	{
		animation.Blend("walk", 0.0, 0.3);
		animation.Blend("run", 0.0, 0.3);
		animation.Blend("run", 0.0, 0.3);
	}
	
	animation["run"].normalizedSpeed = runSpeedScale;
	animation["walk"].normalizedSpeed = walkSpeedScale;
	
	if (playerController.IsJumping ())
	{
		if (playerController.IsControlledDescent())
		{
			animation.CrossFade ("jetpackjump", 0.2);
		}
		else if (playerController.HasJumpReachedApex ())
		{
			animation.CrossFade ("jumpfall", 0.2);
		}
		else
		{
			animation.CrossFade ("jump", 0.2);
		}
	}
	// We fell down somewhere
	else if (!playerController.IsGroundedWithTimeout())
	{
		animation.CrossFade ("ledgefall", 0.2);
	}
	// We are not falling down anymore
	else
	{
		animation.Blend ("ledgefall", 0.0, 0.2);
	}*/
}

/*function DidLand () {
	animation.Play("jumpland");
}

function DidButtStomp () {
	animation.CrossFade("buttstomp", 0.1);
	animation.CrossFadeQueued("jumpland", 0.2);
}

function Slam () {
	animation.CrossFade("buttstomp", 0.2);
	var playerController : ThirdPersonController = GetComponent(ThirdPersonController);
	while(!playerController.IsGrounded())
	{
		yield;	
	}
	animation.Blend("buttstomp", 0, 0);
}


function DidWallJump ()
{
	// Wall jump animation is played without fade.
	// We are turning the character controller 180 degrees around when doing a wall jump so the animation accounts for that.
	// But we really have to make sure that the animation is in full control so 
	// that we don't do weird blends between 180 degree apart rotations
	animation.Play ("walljump");
}

@script AddComponentMenu ("Third Person Player/Third Person Player Animation")*/