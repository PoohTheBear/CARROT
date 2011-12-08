/*
This camera smoothes out rotation around the y-axis and height.
Horizontal Distance to the target is always fixed.

There are many different ways to smooth the rotation but doing it this way gives you a lot of control over how the camera behaves.

For every of those smoothed values we calculate the wanted value and the current value.
Then we smooth it using the Lerp function.
Then we apply the smoothed values to the transform's position.
*/

// The target we are following
var target : Transform;
// The distance in the x-z plane to the target
var distance = 10.0;
// the height we want the camera to be above the target
var height = 5.0;
var rotationX = 20.0;
var xSpeed = 250.0;
var ySpeed = 120.0;
// How much we 
var heightDamping = 2.0;
var rotationDamping = 3.0;
var zoomDamping = 4.0;

private var currentDistance = 0.0;
private var correctedDistance = 0.0;
private var y = 0.0;
private var x = 0.0;

// Place the script in the Camera-Control group in the component menu
@script AddComponentMenu("Camera-Control/Smooth Follow")

function Start() {
    x = rotationX;
    y = transform.eulerAngles.y;
}


function LateUpdate () {
	// Early out if we don't have a target
	if (!target)
		return;
		
	// Calculate the current rotation angles
	var wantedRotationAngle = target.eulerAngles.y;
	var wantedHeight = target.position.y + height;
		
	var currentRotationAngle = transform.eulerAngles.y;
	var currentHeight = transform.position.y;
	
		if (Input.GetMouseButton(0) || Input.GetMouseButton(1))
        {
            x += Input.GetAxis("Mouse X") * xSpeed * 0.02f;
            y -= Input.GetAxis("Mouse Y") * ySpeed * 0.02f;
        }
        // otherwise, ease behind the target if any of the directional keys are pressed
        else if (Input.GetAxis("Vertical") != 0 || Input.GetAxis("Horizontal") != 0)
        {
            x = Mathf.LerpAngle(currentRotationAngle, wantedRotationAngle, rotationDamping * Time.deltaTime);
        }

	var rotation = Quaternion.Euler(y,x,0);

	correctedDistance = distance;
	
	var position = target.position - (rotation * Vector3.forward * distance + Vector3(0,-height,0));
	
	var collisionHit : RaycastHit;
	trueTargetPosition = Vector3(target.position.x,target.position.y + height,target.position.z);
	
	var isCorrected = false;
	if(Physics.Linecast(trueTargetPosition, position, collisionHit)) {
		position = collisionHit.point;
		correctedDistance = Vector3.Distance(trueTargetPosition, position);
		isCorrected = true;
	}
	/*if(!isCorrected || correctedDistance > currentDistance)
		currentDistance = Mathf.Lerp(currentDistance, correctedDistance, Time.deltaTime * zoomDamping);
	else
		currentDistance = correctedDistance;*/
		
	currentDistance = distance;
	position = target.position - (rotation * Vector3.forward * currentDistance + Vector3(0,-height,0));
	
	
	transform.rotation = rotation;
	transform.position = position;
	/*
	// Damp the rotation around the y-axis
	currentRotationAngle = Mathf.LerpAngle (currentRotationAngle, wantedRotationAngle, rotationDamping * Time.deltaTime);

	// Damp the height
	currentHeight = Mathf.Lerp (currentHeight, wantedHeight, heightDamping * Time.deltaTime);

	// Convert the angle into a rotation
	var currentRotation = Quaternion.Euler (0, currentRotationAngle, 0);
	
	// Set the position of the camera on the x-z plane to:
	// distance meters behind the target
	transform.position = target.position;
	transform.position -= currentRotation * Vector3.forward * distance;
	
	// Set the height of the camera
	transform.position.y = currentHeight;
	
	// Always look at the target
	//transform.rotation = target.rotation;
	transform.LookAt (target);*/
}

function OnTriggerEnter(other: Collider) {
	//var offset = target.position - transform.position;
	//currentDistance = offset.magnitude;
	//moveCloser = true;
}

function OnTriggerExit(other: Collider) {
	//moveCloser = false;
}