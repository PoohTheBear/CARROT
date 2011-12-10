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
var t = 0.0;
var background : Texture2D;

var gSkin: GUISkin;

private var playerHealthInfo : ThirdPersonStatus;
private var playerPowerupsInfo : ThirdPersonController;
private var timeScale;
private var enemyHealthLeft = 0.0;
private var pause = false;
private var showHelp = false;
private var showHelpGoals = false;
private var showHelpEnemies = false;
private var showHelpEnemyWolf = false;
private var showHelpEnemyBear = false;
private var showHelpEnemyMole = false;
private var showHelpPowers = false;
private var showHelpPowerStrength = false;
private var showHelpPowerJump = false;

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
	var healthCount = playerHealthInfo.health;
	var liveCount = playerHealthInfo.lives;
	var showTutorials = playerPowerupsInfo.showTutorials;
	pause = playerPowerupsInfo.pause;
	showHelp = playerPowerupsInfo.showHelp;
	
	if(!showHelp) {
		showHelpGoals = false;
		showHelpEnemies = false;
		showHelpEnemyWolf = false;
		showHelpEnemyBear = false;
		showHelpEnemyMole = false;
		showHelpPowers = false;
		showHelpPowerStrength = false;
		showHelpPowerJump = false;
	}

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
		
	var x;
	var y;
	var width;
	var height;
	var gapSize;
	if (showTutorials) {
		t += Time.deltaTime;
		x = dolphinOffset.x + dolphinImage.width;
		y = Screen.height - t*scrollSpeed;
		width = scaledResolutionWidth - dolphinImage.width  - dolphinOffset.x * 2;
		height = 100;
		gapSize = 50;
		DrawImageTopAligned(dolphinOffset, dolphinImage);
		GUI.Label ( Rect(x, y + height* 0 + gapSize*0, width, height), "Hello there, Rabbit the Hermit!");
		GUI.Label ( Rect(x, y + height* 1 + gapSize*0, width, height), "I know of your intentions and I'm here to help you.");
		GUI.Label ( Rect(x, y + height* 2 + gapSize*0, width, height), "Take this phone should you need any more help later.");
		
		GUI.Label ( Rect(x, y + height* 3 + gapSize*1, width, height), "These are your goals:");
		
		GUI.Label ( Rect(x, y + height* 4 + gapSize*1, width, height), "Main goal: defeat Wolf the Evil Mastermind.");
		GUI.Label ( Rect(x, y + height* 5 + gapSize*1, width, height), "Main goal: defeat at least one of Wolf's mercenaries.");
		GUI.Label ( Rect(x, y + height* 6 + gapSize*1, width, height), "Extra goal: defeat Bear the Legendary Fist");
		GUI.Label ( Rect(x, y + height* 7 + gapSize*1, width, height), "Extra goal: defeat Mole the Restless");
		
		GUI.Label ( Rect(x, y + height* 8 + gapSize*2, width, height), "Controls:");
		GUI.Label ( Rect(x, y + height* 9 + gapSize*2, width, height), "WASD or Arrow Keys – movement");
		GUI.Label ( Rect(x, y + height*10 + gapSize*2, width, height), "SPACE – jump");
		GUI.Label ( Rect(x, y + height*11 + gapSize*2, width, height), "H – call me");
		GUI.Label ( Rect(x, y + height*12 + gapSize*2, width, height), "Mouse click + mouse movement - camera rotation");
		if(y+height*12+gapSize*2+height < 0) {
			playerPowerupsInfo.showTutorials = false;
			t = 0;
		}
	}
	if (showHelp) {
		x = dolphinOffset.x;
		y = dolphinOffset.y;
		width = scaledResolutionWidth - dolphinOffset.x * 2;
		height = 100;
		gapSize = 50;
		DrawImageTopAligned(dolphinOffset, dolphinImage);
		if(!showHelpGoals && !showHelpEnemies && !showHelpPowers) {
			GUI.Label ( Rect(x + dolphinImage.width, y + height* 0 + gapSize*0, width - dolphinImage.width, height), "Hello there, Rabbit the Hermit!");
			GUI.Label ( Rect(x + dolphinImage.width, y + height* 1 + gapSize*0, width - dolphinImage.width, height), "What would you like to know more about?");
			if(GUI.Button ( Rect(x, y + height* 0 + gapSize*0 + dolphinImage.height, width, height), "Goals")) {
				showHelpGoals = true;
			}
			if(GUI.Button ( Rect(x, y + height* 1 + gapSize*0 + dolphinImage.height, width, height), "Enemies")) {
				showHelpEnemies = true;
			}
			if(GUI.Button ( Rect(x, y + height* 2 + gapSize*0 + dolphinImage.height, width, height), "Special powers")) {
				showHelpPowers = true;
			}
			if(GUI.Button ( Rect(x, y + height* 3 + gapSize*0 + dolphinImage.height, width, height), "Nothing, sorry for calling you")) {
				playerPowerupsInfo.showHelp = false;
			}
		} else if (showHelpGoals) {
			GUI.Label ( Rect(x + dolphinImage.width, y + height* 0 + gapSize*0, width, height), "Your goals are:");
		
			GUI.Label ( Rect(x, y + height* 0 + gapSize*0 + dolphinImage.height, width, height), "Main goal: defeat Wolf the Evil Mastermind.");
			GUI.Label ( Rect(x, y + height* 1 + gapSize*0 + dolphinImage.height, width, height), "Main goal: defeat at least one of Wolf's mercenaries.");
			GUI.Label ( Rect(x, y + height* 2 + gapSize*0 + dolphinImage.height, width, height), "Extra goal: defeat Bear the Legendary Fist");
			GUI.Label ( Rect(x, y + height* 3 + gapSize*0 + dolphinImage.height, width, height), "Extra goal: defeat Mole the Restless");
			if(GUI.Button ( Rect(x, y + height* 4 + gapSize*1 + dolphinImage.height, width, height), "I want to know more about something else")) {
				showHelpGoals = false;
			}
		} else if (showHelpEnemies) {
			if(!showHelpEnemyWolf && !showHelpEnemyBear && !showHelpEnemyMole) {
				GUI.Label ( Rect(x + dolphinImage.width, y + height* 0 + gapSize*0, width, height), "Which enemy would you like to know more about?");
			
				if(GUI.Button ( Rect(x, y + height* 0 + gapSize*0 + dolphinImage.height, width, height), "Wolf the Evil Mastermind")) {
					showHelpEnemyWolf = true;
				}
				if(GUI.Button ( Rect(x, y + height* 1 + gapSize*0 + dolphinImage.height, width, height), "Bear the Legendary Fist")) {
					showHelpEnemyBear = true;
				}
				if(GUI.Button ( Rect(x, y + height* 2 + gapSize*0 + dolphinImage.height, width, height), "Mole the Restless")) {
					showHelpEnemyMole = true;
				}
				if(GUI.Button ( Rect(x, y + height* 3 + gapSize*1 + dolphinImage.height, width, height), "I want to know more about something else")) {
					showHelpEnemies = false;
				}
			} else if (showHelpEnemyWolf) {
				GUI.Label ( Rect(x + dolphinImage.width, y + height* 0 + gapSize*0, width, height), "Here's what you should know about Wolf the Evil Mastermind:");
		
				GUI.Label ( Rect(x, y + height* 0 + gapSize*0 + dolphinImage.height, width, height), "How to get to him: go through Mole or Bear");
				GUI.Label ( Rect(x, y + height* 1 + gapSize*0 + dolphinImage.height, width, height), "Weakness: pride");
				GUI.Label ( Rect(x, y + height* 2 + gapSize*0 + dolphinImage.height, width, height), "Item held: magic carrot");
				GUI.Label ( Rect(x, y + height* 3 + gapSize*0 + dolphinImage.height, width, height), "How to defeat him: jump on his head while he's posing or trapped");
				if(GUI.Button ( Rect(x, y + height* 4 + gapSize*1 + dolphinImage.height, width, height), "I want to know more about another enemy")) {
					showHelpEnemyWolf = false;
				}
			} else if (showHelpEnemyBear) {
				GUI.Label ( Rect(x + dolphinImage.width, y + height* 0 + gapSize*0, width, height), "Here's what you should know about Bear the Legendary Fist:");
		
				GUI.Label ( Rect(x, y + height* 0 + gapSize*0 + dolphinImage.height, width, height), "How to get to him: go through the mountains");
				GUI.Label ( Rect(x, y + height* 1 + gapSize*0 + dolphinImage.height, width, height), "Weakness: honey");
				GUI.Label ( Rect(x, y + height* 2 + gapSize*0 + dolphinImage.height, width, height), "Item held: spinach");
				GUI.Label ( Rect(x, y + height* 3 + gapSize*0 + dolphinImage.height, width, height), "How to defeat him: lure bees to his honey");
				if(GUI.Button ( Rect(x, y + height* 4 + gapSize*1 + dolphinImage.height, width, height), "I want to know more about another enemy")) {
					showHelpEnemyBear = false;
				}
			} else if (showHelpEnemyMole) {
				GUI.Label ( Rect(x + dolphinImage.width, y + height* 0 + gapSize*0, width, height), "Here's what you should know about Mole the Restless:");
		
				GUI.Label ( Rect(x, y + height* 0 + gapSize*0 + dolphinImage.height, width, height), "How to get to him: go through floating platforms");
				GUI.Label ( Rect(x, y + height* 1 + gapSize*0 + dolphinImage.height, width, height), "Weakness: daylight");
				GUI.Label ( Rect(x, y + height* 2 + gapSize*0 + dolphinImage.height, width, height), "Item held: brocolli");
				GUI.Label ( Rect(x, y + height* 3 + gapSize*0 + dolphinImage.height, width, height), "How to defeat him: jump on his head while he's dizzy");
				if(GUI.Button ( Rect(x, y + height* 4 + gapSize*1 + dolphinImage.height, width, height), "I want to know more about another enemy")) {
					showHelpEnemyMole = false;
				}
			}
		} else if (showHelpPowers) {
			if(!showHelpPowerStrength && !showHelpPowerJump) {
				GUI.Label ( Rect(x + dolphinImage.width, y + height* 0 + gapSize*0, width, height), "Which special power would you like to know more about?");
			
				if(GUI.Button ( Rect(x, y + height* 0 + gapSize*0 + dolphinImage.height, width, height), "Strength")) {
					showHelpPowerStrength = true;
				}
				if(GUI.Button ( Rect(x, y + height* 1 + gapSize*0 + dolphinImage.height, width, height), "Double Jump")) {
					showHelpPowerJump = true;
				}
				if(GUI.Button ( Rect(x, y + height* 2 + gapSize*1 + dolphinImage.height, width, height), "I want to know more about something else")) {
					showHelpPowers = false;
				}
			} else if (showHelpPowerStrength) {
				GUI.Label ( Rect(x + dolphinImage.width, y + height* 0 + gapSize*0, width, height), "Here's what you should know special power Strength:");
		
				GUI.Label ( Rect(x, y + height* 0 + gapSize*0 + dolphinImage.height, width, height), "How to get it: eat a can of spinach");
				GUI.Label ( Rect(x, y + height* 1 + gapSize*0 + dolphinImage.height, width, height), "What does it give: ability to push boulders");
				if(GUI.Button ( Rect(x, y + height* 2 + gapSize*1 + dolphinImage.height, width, height), "I want to know more about another special power")) {
					showHelpPowerStrength = false;
				}
			} else if (showHelpPowerJump) {
				GUI.Label ( Rect(x + dolphinImage.width, y + height* 0 + gapSize*0, width, height), "Here's what you should know special power Double Jump:");
		
				GUI.Label ( Rect(x, y + height* 0 + gapSize*0 + dolphinImage.height, width, height), "How to get it: eat a brocolli");
				GUI.Label ( Rect(x, y + height* 1 + gapSize*0 + dolphinImage.height, width, height), "What does it give: ability to jump higher");
				if(GUI.Button ( Rect(x, y + height* 2 + gapSize*1 + dolphinImage.height, width, height), "I want to know more about another special power")) {
					showHelpPowerJump = false;
				}
			}
		}
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