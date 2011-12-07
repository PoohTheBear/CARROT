var moveSpeed = 1.0;
var dashSpeed = 1.0;
var rotateSpeed = 10;
var timeUntilDash = 1.0;
private var inAction = false;
private var isDashing = false;
private var prepareToStopDashing = false;
private var isIdle = false;
var timeUntilDashStop = 0.5;
var attackDistance = 4.0;
var visionDistance = 26.0;
var damage = 1;
private var canAttack = true;
private var startScale = Vector3(1,1,1);
private var startSpeed = moveSpeed;
var startPosition = 0.0;
var damageDealt = 1; // Per hit to wolf
var maxTimeWthoutStop = 5;
var idleTime = 5;
var waitAfterAttack = 2;

private var gotBumped = false;
private var baseY = 0;

private var characterController : CharacterController;
	characterController = GetComponent(CharacterController);

var levelStateMachine : LevelStatus;
var target : Transform;
var status : ThirdPersonStatus;

function Start () {

	startSpeed = moveSpeed;
	startScale = transform.localScale;
	startPosition = transform.position.y;

	levelStateMachine = FindObjectOfType(LevelStatus);
	if (!levelStateMachine)
		Debug.Log("No link to Level Status");

	if (!target)
		target = GameObject.FindWithTag("Player").transform;

	yield Move();
}

function RotateTowardsPosition (targetPos : Vector3, rotateSpeed : float) : float
{
	// Compute relative point and get the angle towards it
	var relative = transform.InverseTransformPoint(targetPos);
	var angle = Mathf.Atan2 (relative.x, relative.z) * Mathf.Rad2Deg;
	// Clamp it with the max rotation speed
	var maxRotation = rotateSpeed * Time.deltaTime;
	var clampedAngle = Mathf.Clamp(angle, -maxRotation, maxRotation);
	// Rotate
	transform.Rotate(0, clampedAngle, 0);
	// Return the current angle
	return angle;
}

function Slam (attacked) {
	var slamDirection = transform.InverseTransformDirection(target.position - transform.position);
	slamDirection.y = 1;
	slamDirection.z = 0;
	if (slamDirection.x >= 0)
		slamDirection.x = 1;
	else
		slamDirection.x = -1;
	if (!attacked) {
		slamDirection.x = 0;
	}
	target.SendMessage("Slam", transform.TransformDirection(slamDirection));
}

function Attack () {
	// deal damage
	target.SendMessage("ApplyDamage", damage);
	// knock the player back and to the side
	Slam(true);
}

function TransformScale (start, end, time) {
	
	if (time == 0) {
		transform.position = Vector3.Lerp(start, end, 1);
		transform.localScale = startScale;
	}
	else {
		var t = 0.0;
		while (t < 1.0) {
		    t += Time.deltaTime / time;
		    transform.position = Vector3.Lerp(start, end, t);
		
		    yield;
		}
		transform.position.y = startPosition;
		transform.localScale = Vector3(0.1,0.1,0.1);
	}
}

function Idle (seconds) {
	isIdle = true;
	yield WaitForSeconds(seconds);
	isIdle = false;
}

function HeadBump () {
	if (isIdle || isDashing) {
		SendMessage("ApplyDamage", damageDealt);
		gotBumped = true;
		Slam(false);
	}
}

function Move () {
	var time = 0.0;
	var destinationPosition = Vector3.zero;
	var lowestMag = 1000.0;
	var dashStoppageTime = 0.0;
	while (true)
	{
	
	// Wolf should run towards for ±2 secs. If no direction change (maybe only slight) then dash into rabbit. During dash wolf
	//won't change direction and rabbit should avoid
		if (!inAction) {
			var offset = transform.position - target.position;

			//Debug.Log("Magnitude " + offset.magnitude);
			
			if (offset.magnitude > visionDistance) {
				yield Idle(1);
				continue;
			}
			
			var angle = 100.0;
			if (!isDashing) {
				angle = RotateTowardsPosition(target.position, rotateSpeed);
				//Debug.Log(angle);
				if (angle < 0.2 && angle > -0.2) {
					//Debug.Log("SUCCESS");
					time += Time.deltaTime;
				}
				else {
					time = 0;
				}
				
				if (time > timeUntilDash) {
					isDashing = true;
					destinationPosition = target.position;
					time = 0;
				}
				//Debug.Log("Angle = " + angle);
			}
			
			if (isDashing) {
				angle = RotateTowardsPosition(target.position, 0);
				moveSpeed = dashSpeed;
			}
			
			/*time += Time.deltaTime;
			if (time > maxTimeWthoutStop) {
				yield Idle(idleTime);
				time = 0;
			}*/
			
			if (isDashing && (transform.position - destinationPosition).magnitude < 3.2) {
				time = 0.0;
				dashStoppageTime = 0.0;
				prepareToStopDashing = true;
				isDashing = false;
			}
			
			if ( (angle < 10 && angle > -10) || isDashing || prepareToStopDashing) {
			
				direction = transform.TransformDirection(Vector3.forward * moveSpeed);
				characterController.Move(direction);
				//characterController.SimpleMove(direction);
				if (prepareToStopDashing) {
					dashStoppageTime += Time.deltaTime;
				}
				if (dashStoppageTime > timeUntilDashStop) {
					isDashing = false;
					moveSpeed = startSpeed;
					yield Idle(1);
					prepareToStopDashing = false;
				}
			}
			
			if (canAttack && offset.magnitude < attackDistance && angle < 10 && angle > -10) {
				canAttack = false;
				isDashing = false;
				prepareToStopDashing = false;
				moveSpeed = startSpeed;
				time = 0;
				Attack();
				
				yield Idle(1);
				StartCoroutine("AllowAttacking");
			}
		}
		
		yield;
	}
}

function AllowAttacking() {
      yield WaitForSeconds(waitAfterAttack);
      canAttack = true;
}
/*
	animations played are:
	idle, threaten, turnjump, attackrun
*/
/*
var attackTurnTime = 0.7;
var rotateSpeed = 120.0;
var attackDistance = 17.0;
var extraRunTime = 2.0;
var damage = 1;

var attackSpeed = 5.0;
var attackRotateSpeed = 20.0;

var idleTime = 1.6;

var punchPosition = new Vector3 (0.4, 0, 0.7);
var punchRadius = 1.1;

// sounds
var idleSound : AudioClip;	// played during "idle" state.
var attackSound : AudioClip;	// played during the seek and attack modes.

private var attackAngle = 10.0;
private var isAttacking = false;
private var lastPunchTime = 0.0;

var target : Transform;

// Cache a reference to the controller
private var characterController : CharacterController;
characterController = GetComponent(CharacterController);

// Cache a link to LevelStatus state machine script:
var levelStateMachine : LevelStatus;

function Start ()
{
	levelStateMachine = GameObject.Find("/Level").GetComponent(LevelStatus);

	if (!levelStateMachine)
	{
		Debug.Log("EnemyPoliceGuy: ERROR! NO LEVEL STATUS SCRIPT FOUND.");
	}

	if (!target)
		target = GameObject.FindWithTag("Player").transform;
	
	animation.wrapMode = WrapMode.Loop;

	// Setup animations
	animation.Play("idle");
	animation["threaten"].wrapMode = WrapMode.Once;
	animation["turnjump"].wrapMode = WrapMode.Once;
	animation["gothit"].wrapMode = WrapMode.Once;
	animation["gothit"].layer = 1;
	
	// initialize audio clip. Make sure it's set to the "idle" sound.
	audio.clip = idleSound;
	
	yield WaitForSeconds(Random.value);
	
	// Just attack for now
	while (true)	
	{
		// Don't do anything when idle. And wait for player to be in range!
		// This is the perfect time for the player to attack us
		yield Idle();

		// Prepare, turn to player and attack him
		yield Attack();
	//}
}


function Idle ()
{
	// if idling sound isn't already set up, set it and start it playing.
	if (idleSound)
	{
		if (audio.clip != idleSound)
		{
			audio.Stop();
			audio.clip = idleSound;
			audio.loop = true;
			audio.Play();	// play the idle sound.
		}
	}
	
	// Don't do anything when idle
	// The perfect time for the player to attack us
	yield WaitForSeconds(idleTime);

	// And if the player is really far away.
	// We just idle around until he comes back
	// unless we're dying, in which case we just keep idling.
	while (true)
	{
		characterController.SimpleMove(Vector3.zero);
		yield WaitForSeconds(0.2);
		
		var offset = transform.position - target.position;
		
		// if player is in range again, stop lazyness
		// Good Hunting!		
		if (offset.magnitude < attackDistance)
			return;
	}
} 

function RotateTowardsPosition (targetPos : Vector3, rotateSpeed : float) : float
{
	// Compute relative point and get the angle towards it
	var relative = transform.InverseTransformPoint(targetPos);
	var angle = Mathf.Atan2 (relative.x, relative.z) * Mathf.Rad2Deg;
	// Clamp it with the max rotation speed
	var maxRotation = rotateSpeed * Time.deltaTime;
	var clampedAngle = Mathf.Clamp(angle, -maxRotation, maxRotation);
	// Rotate
	transform.Rotate(0, clampedAngle, 0);
	// Return the current angle
	return angle;
}

function Attack ()
{
	isAttacking = true;
	
	if (attackSound)
	{
		if (audio.clip != attackSound)
		{
			audio.Stop();	// stop the idling audio so we can switch out the audio clip.
			audio.clip = attackSound;
			audio.loop = true;	// change the clip, then play
			audio.Play();
		}
	}
	
	// Already queue up the attack run animation but set it's blend wieght to 0
	// it gets blended in later
	// it is looping so it will keep playing until we stop it.
	//animation.Play("attackrun");
	
	// First we wait for a bit so the player can prepare while we turn around
	// As we near an angle of 0, we will begin to move
	var angle : float;
	angle = 180.0;
	var time : float;
	time = 0.0;
	var direction : Vector3;
	while (angle > 5 || time < attackTurnTime)
	{
		time += Time.deltaTime;
		//angle = Mathf.Abs(RotateTowardsPosition(target.position, rotateSpeed));
		//move = Mathf.Clamp01((90 - angle) / 90);
		//move = Mathf.Clamp01((90 - 50) / 90);
		
		// depending on the angle, start moving
		//animation["attackrun"].weight = animation["attackrun"].speed = move;
		//direction = transform.TransformDirection(Vector3.forward * attackSpeed * move);
		Debug.Log("GOOOOOOOOOONE");
		direction = transform.TransformDirection(Vector3.forward * 10);
		characterController.SimpleMove(direction);
		
		yield;
	}
	
	// Run towards player
	var timer = 0.0;
	var lostSight = false;
	while (timer < extraRunTime)
	{
		angle = RotateTowardsPosition(target.position, attackRotateSpeed);
			
		// The angle of our forward direction and the player position is larger than 50 degrees
		// That means he is out of sight
		if (Mathf.Abs(angle) > 40)
			lostSight = true;
			
		// If we lost sight then we keep running for some more time (extraRunTime). 
		// then stop attacking 
		if (lostSight)
			timer += Time.deltaTime;	
		
		// Just move forward at constant speed
		direction = transform.TransformDirection(Vector3.forward * attackSpeed);
		characterController.SimpleMove(direction);

		// Keep looking if we are hitting our target
		// If we are, knock them out of the way dealing damage
		var pos = transform.TransformPoint(punchPosition);
		if(Time.time > lastPunchTime + 0.3 && (pos - target.position).magnitude < punchRadius)
		{
			// deal damage
			target.SendMessage("ApplyDamage", damage);
			// knock the player back and to the side
			var slamDirection = transform.InverseTransformDirection(target.position - transform.position);
			slamDirection.y = 0;
			slamDirection.z = 1;
			if (slamDirection.x >= 0)
				slamDirection.x = 1;
			else
				slamDirection.x = -1;
			target.SendMessage("Slam", transform.TransformDirection(slamDirection));
			lastPunchTime = Time.time;
		}

		// We are not actually moving forward.
		// This probably means we ran into a wall or something. Stop attacking the player.
		if (characterController.velocity.magnitude < attackSpeed * 0.3)
			break;
		
		// yield for one frame
		yield;
	}
	

	isAttacking = false;
	
	// Now we can go back to playing the idle animation
	animation.CrossFade("idle");
}

function ApplyDamage ()
{
	animation.CrossFade("gothit");
}

function OnDrawGizmosSelected ()
{
	Gizmos.color = Color.yellow;
	Gizmos.DrawWireSphere (transform.TransformPoint(punchPosition), punchRadius);
	Gizmos.color = Color.red;
	Gizmos.DrawWireSphere (transform.position, attackDistance);
}

@script RequireComponent(AudioSource)
*/