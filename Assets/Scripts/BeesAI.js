var moveSpeed = 1.0;
var rotateSpeed = 10;
private var inAction = false;
var attackDistance = 1.0;
var visionDistance = 17.0;
var damage = 1;
private var canAttack = true;
private var startPosition = Vector3.zero;
var idleTime = 3;
var goHome = false;
var stay = false;

private var gotBumped = false;
private var baseY = 0;

private var characterController : CharacterController;
	characterController = GetComponent(CharacterController);

private var levelStateMachine : LevelStatus;
var target : Transform;

function Start () {

	startPosition = transform.position;

	levelStateMachine = FindObjectOfType(LevelStatus);
	if (!levelStateMachine)
		Debug.Log("No link to Level Status");

	if (!target)
		target = GameObject.FindWithTag("Player").transform;

	yield Move();
}

function RotateTowardsYPosition (targetPos : Vector3, rotateSpeed : float) : float
{
	// Compute relative point and get the angle towards it
	var relative = transform.InverseTransformPoint(targetPos);
	//var angle = Mathf.Atan2 (relative.x, relative.z) * Mathf.Rad2Deg;
	var angle = Mathf.Atan(relative.y) * Mathf.Rad2Deg;
	//Debug.Log("y " + angle);
	// Clamp it with the max rotation speed
	var maxRotation = rotateSpeed * Time.deltaTime;
	var clampedAngle = Mathf.Clamp(angle, -maxRotation, maxRotation);
	// Rotate
	//transform.Rotate(0, clampedAngle, 0);
	transform.Rotate(0, 0, clampedAngle);
	// Return the current angle
	return angle;
}

function RotateTowardsPosition (targetPos : Vector3, rotateSpeed : float) : float
{
	// Compute relative point and get the angle towards it
	var relative = transform.InverseTransformPoint(targetPos);
	var angle = Mathf.Atan2 (relative.x, relative.z) * Mathf.Rad2Deg;
	//Debug.Log("norm " + angle);
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
	GameObject.FindGameObjectWithTag("Player").GetComponent(ThirdPersonController).SetLastPlatformOn(0);
	goHome = true;
}

function Idle (seconds) {
	yield WaitForSeconds(seconds);
}

function Move () {
	var time = 0.0;
	while (true)
	{
		var playerOn: int = GameObject.FindWithTag("Player").GetComponent(ThirdPersonController).GetLastPlatformOn();
		var offset;
		if(playerOn != 0 && !goHome && !stay) {
			if(playerOn == 1) {
				GetComponent(ParticleEmitter).emit = true;
				yield Idle(idleTime);
			}
			offset = transform.position - target.position;
	
			//Debug.Log("Following Player on: " + playerOn);
			
			var angle = RotateTowardsPosition(target.position, rotateSpeed);
			
			var yAngle = RotateTowardsYPosition(target.position, rotateSpeed);
			
			if (angle < 10 && angle > -10) {
				if(playerOn >= 8) {
					direction = transform.TransformDirection(Vector3.forward * moveSpeed);
				} else {
					direction = transform.TransformDirection(Vector3.forward * 0.05);
				}
				characterController.Move(direction);
			}
			
			if (canAttack && offset.magnitude < attackDistance) {							
				Attack();
			}
		} else if(!stay) {	
			offset = startPosition - transform.position;
			if(offset.magnitude >= 0.5){	
				Debug.Log("Going home");
					
				var angleElse = RotateTowardsPosition(startPosition, rotateSpeed);
				
				var yAngleElse = RotateTowardsYPosition(startPosition, rotateSpeed);
				
				if (angleElse < 10 && angleElse > -10) {
					direction = transform.TransformDirection(Vector3.forward * moveSpeed);
					characterController.Move(direction);
				}
			} else {
				GetComponent(ParticleEmitter).emit = false;
				goHome = false;
				canAttack = true;
			}
		}
		
		yield;
	}
}
