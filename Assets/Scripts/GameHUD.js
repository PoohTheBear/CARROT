// GameHUD: Platformer Tutorial Master GUI script.

// This script handles the in-game HUD, showing the lives, number of fuel cells remaining, etc.

var nativeVerticalResolution = 1200.0;

//lives;
var liveImage: Texture2D;

// health:
var healthActiveImage: Texture2D;
var healthInactiveImage: Texture2D;

// poweups
var spinachActiveImage: Texture2D;
var spinachInactiveImage: Texture2D;
var spinachOffset = Vector2(0, 0);
var coffeeBeanActiveImage: Texture2D;
var coffeeBeanInactiveImage: Texture2D;
var coffeeBeanOffset = Vector2(0, 0);
var brocolliActiveImage: Texture2D;
var brocolliInactiveImage: Texture2D;
var brocolliOffset = Vector2(0, 0);

var gSkin: GUISkin;

private var playerHealthInfo : ThirdPersonStatus;
private var playerPowerupsInfo : ThirdPersonController;
private var timeScale;
private var enemyHealthLeft = 0.0;

// Cache link to player's state management script for later use.
function Awake()
{
	playerHealthInfo = GameObject.FindWithTag("Player").GetComponent(ThirdPersonStatus);
	playerPowerupsInfo = GameObject.FindWithTag("Player").GetComponent(ThirdPersonController);
	timeScale = Time.timeScale;

	if (!playerHealthInfo)
		Debug.Log("No link to player's state manager.");
	if (!playerPowerupsInfo)
		Debug.Log("No link to player's state manager.");
}

function OnGUI ()
{

	if(gSkin)
		GUI.skin = gSkin;
	else
		Debug.Log("GameHUD: Skin Object missing!");
		
	var scaledResolutionWidth = nativeVerticalResolution / Screen.height * Screen.width;

	var onMolePlatform = playerPowerupsInfo.GetOnMolePlatform();
	var mole = GameObject.FindGameObjectWithTag("Mole");
	var pause = playerPowerupsInfo.shouldPause;
	var healthCount = playerHealthInfo.health;
	var liveCount = playerHealthInfo.lives;

	// Our GUI is laid out for a 1920 x 1200 pixel display (16:10 aspect). The next line makes sure it rescales nicely to other resolutions.
	GUI.matrix = Matrix4x4.TRS (Vector3(0, 0, 0), Quaternion.identity, Vector3 (Screen.height / nativeVerticalResolution, Screen.height / nativeVerticalResolution, 1)); 

	//Lives info.
	for (i=0; i<liveCount; i++) {
		DrawImageTopAligned(Vector2(128*i,0), liveImage);
	}

	// Health info.
	for (i=0; i<playerHealthInfo.maxHealth; i++) {
		if (i < healthCount)
			DrawImageTopAligned(Vector2(64*(i%10),128+(64*(i/10))), healthActiveImage);
		else
			DrawImageTopAligned(Vector2(64*(i%10),128+(64*(i/10))), healthInactiveImage);
	}	
	
	if (playerPowerupsInfo.canDash)
		DrawImageTopRightAligned(coffeeBeanOffset, coffeeBeanActiveImage);
	else
		DrawImageTopRightAligned(coffeeBeanOffset, coffeeBeanInactiveImage);
	if (playerPowerupsInfo.canDoubleJump)
		DrawImageTopRightAligned(brocolliOffset, brocolliActiveImage);
	else
		DrawImageTopRightAligned(brocolliOffset, brocolliInactiveImage);
	if (playerPowerupsInfo.canPunch)
		DrawImageTopRightAligned(spinachOffset, spinachActiveImage);
	else
		DrawImageTopRightAligned(spinachOffset, spinachInactiveImage);
		
	if(pause) {
		Time.timeScale = 0;
		if (GUI.Button( Rect ((scaledResolutionWidth / 2) - 150, (nativeVerticalResolution / 2) - 160, 300, 100),"Resume")) {
			playerPowerupsInfo.shouldPause = false;
			Time.timeScale = timeScale;
		}
		if (GUI.Button( Rect ((scaledResolutionWidth / 2) - 150, (nativeVerticalResolution / 2) - 50, 300, 100),"Main Menu")) {
			playerPowerupsInfo.shouldPause = false;
			Time.timeScale = timeScale;
			Application.LoadLevel("StartMenu");
		}
			
		var isWebPlayer = (Application.platform == RuntimePlatform.OSXWebPlayer ||
				Application.platform == RuntimePlatform.WindowsWebPlayer);
		if (!isWebPlayer)
		{
			if (GUI.Button( Rect((scaledResolutionWidth / 2) - 150, (nativeVerticalResolution / 2) + 60, 300, 100), "Quit"))
				Application.Quit();
		}
	} else {
		Time.timeScale = timeScale;
	}
	
	if(onMolePlatform && mole != null) {
		var moleStatus = mole.GetComponent(ThirdPersonStatus);
		enemyHealthLeft = parseFloat(moleStatus.health) / moleStatus.maxHealth;
		Debug.Log(enemyHealthLeft);
		GUI.Label( Rect ((scaledResolutionWidth / 2) - 500, 100, 1000*enemyHealthLeft,20),"","healthBar");
		GUI.Label( Rect ((scaledResolutionWidth / 2) - 500 + (1000*enemyHealthLeft), 100, 1000*(1-enemyHealthLeft),20),"","healthBarEmpty");
	}
}

function DrawImageTopAligned (pos : Vector2, image : Texture2D)
{
	GUI.Label(Rect (pos.x, pos.y, image.width, image.height), image);
}

function DrawImageTopRightAligned (pos : Vector2, image : Texture2D)
{
	var scaledResolutionWidth = nativeVerticalResolution / Screen.height * Screen.width;
	GUI.Label(Rect (scaledResolutionWidth - pos.x - image.width, pos.y, image.width, image.height), image);
}

function DrawImageBottomAligned (pos : Vector2, image : Texture2D)
{
	GUI.Label(Rect (pos.x, nativeVerticalResolution - image.height - pos.y, image.width, image.height), image);
}

function DrawLabelBottomAligned (pos : Vector2, text : String)
{
	GUI.Label(Rect (pos.x, nativeVerticalResolution - pos.y, 100, 100), text);
}

function DrawImageBottomRightAligned (pos : Vector2, image : Texture2D)
{
	var scaledResolutionWidth = nativeVerticalResolution / Screen.height * Screen.width;
	GUI.Label(Rect (scaledResolutionWidth - pos.x - image.width, nativeVerticalResolution - image.height - pos.y, image.width, image.height), image);
}

function DrawLabelBottomRightAligned (pos : Vector2, text : String)
{
	var scaledResolutionWidth = nativeVerticalResolution / Screen.height * Screen.width;
	GUI.Label(Rect (scaledResolutionWidth - pos.x, nativeVerticalResolution - pos.y, 100, 100), text);
}