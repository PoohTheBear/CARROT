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

//dolphin
var dolphinImage: Texture2D;
var dolphinOffset = Vector2(0, 0);
var phoneActiveImage: Texture2D;
var phoneInactiveImage: Texture2D;
var phoneOffset = Vector2(0, 0);

var scrollSpeed = 1.0;
private var t = 0.0;
var background : Texture2D;

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
		
		
	var backgroundStyle : GUIStyle = new GUIStyle();
	backgroundStyle.normal.background = background;
	GUI.Label( Rect((Screen.width - (Screen.height*2))*0.75,0,Screen.height*2, Screen.height),"",backgroundStyle);
				
	var scaledResolutionWidth = nativeVerticalResolution / Screen.height * Screen.width;

	var onBossPlatform = playerPowerupsInfo.GetOnBossPlatform();
	var boss = playerPowerupsInfo.GetBoss();
	var pause = playerPowerupsInfo.shouldPause;
	var healthCount = playerHealthInfo.health;
	var liveCount = playerHealthInfo.lives;
	var showTutorials = playerPowerupsInfo.showTutorials;

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
		
	if (showTutorials) {
		t += Time.deltaTime;
		var x = (scaledResolutionWidth / 2) + dolphinOffset.x - 150;
		var y = Screen.height - t*20;
		var width = scaledResolutionWidth - 300 - dolphinImage.width;
		var height = 100;
		var gapSize = 50;
		DrawImageTopAligned(dolphinOffset, dolphinImage);
		GUI.Label ( Rect(x, y + height* 0 + gapSize*0, width, height), "Hello there, Rabbit the Hermit!");
		GUI.Label ( Rect(x, y + height* 1 + gapSize*0, width, height), "I know of your intentions and I'm here to help you.");
		GUI.Label ( Rect(x, y + height* 2 + gapSize*0, width, height), "Take this phone should you need any more help later.");
		
		GUI.Label ( Rect(x, y + height* 3 + gapSize*1, width, height), "These are your goals:");
		
		GUI.Label ( Rect(x, y + height* 4 + gapSize*1, width, height), "Main goal: defeat Wolf the Evil Mastermind Snob and take his magic carrot.");
		GUI.Label ( Rect(x, y + height* 5 + gapSize*1, width, height), "Main goal: defeat at least one of Wolf's mercenaries, Mole or Bear.");
		GUI.Label ( Rect(x, y + height* 6 + gapSize*1, width, height), "Extra goal: defeat Bear the Legendary Fist");
		GUI.Label ( Rect(x, y + height* 7 + gapSize*1, width, height), "Extra goal: defeat Mole the Restless");
		
		GUI.Label ( Rect(x, y + height* 8 + gapSize*2, width, height), "Controls:");
		GUI.Label ( Rect(x, y + height* 9 + gapSize*2, width, height), "WASD or Arrow Keys – movement");
		GUI.Label ( Rect(x, y + height*10 + gapSize*2, width, height), "SPACE – jump");
		GUI.Label ( Rect(x, y + height*11 + gapSize*2, width, height), "Mouse click + mouse movement - camera rotation");
	}
		
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
	
	if(onBossPlatform && boss != null) {
		var bossStatus = boss.GetComponent(ThirdPersonStatus);
		var scaleVertical = Screen.height / nativeVerticalResolution;
		var scaleHorizontal = Screen.width / 1920.0;
		enemyHealthLeft = parseFloat(bossStatus.health) / bossStatus.maxHealth;
		GUI.Label( Rect (500, 100, (scaledResolutionWidth-1000)*enemyHealthLeft,60*scaleVertical),"","healthBar");
		GUI.Label( Rect (500 + ((scaledResolutionWidth-1000)*enemyHealthLeft), 100, (scaledResolutionWidth-1000)*(1-enemyHealthLeft),60*scaleVertical),"","healthBarEmpty");
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