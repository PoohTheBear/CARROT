@script ExecuteInEditMode()

var background: Texture2D;
var gSkin: GUISkin;
var scrollSpeed = 1.0;
private var t = 0.0;

function OnGUI() {

	if(gSkin)
		GUI.skin = gSkin;
	else
		Debug.Log("CreditsGUI: Skin Object missing!");
		
	var backgroundStyle : GUIStyle = new GUIStyle();
	backgroundStyle.normal.background = background;
	GUI.Label( Rect((Screen.width - (Screen.height*2))*0.75,0,Screen.height*2, Screen.height),"",backgroundStyle);
		
	t += Time.deltaTime;
	
	var x = (Screen.width / 2);
	var y = Screen.height - (t*scrollSpeed);
		
	GUI.Label ( Rect(x - 150, y + 20, 300, 50), "Credits", "mainMenuTitle");
	
	GUI.Label ( Rect(x - 150, y + 170, 300, 50), "Programming", "mainMenuTitle");
	GUI.Label ( Rect(x - 150, y + 230, 300, 30), "Gintaras Jakimavičius", "mainMenuInfo");
	GUI.Label ( Rect(x - 150, y + 270, 300, 30), "Justinas Jucevičius", "mainMenuInfo");
	
	GUI.Label ( Rect(x - 150, y + 400, 300, 50), "Music", "mainMenuTitle");
	GUI.Label ( Rect(x - 150, y + 460, 300, 30), "Girvydas Bartkus", "mainMenuInfo");
	GUI.Label ( Rect(x - 150, y + 500, 300, 30), "Lukas Bendikas", "mainMenuInfo");
	GUI.Label ( Rect(x - 150, y + 540, 300, 30), "http://soundbible.com", "mainMenuInfo");
	
	GUI.Label ( Rect(x - 150, y + 670, 300, 50), "Graphics", "mainMenuTitle");
	GUI.Label ( Rect(x - 150, y + 730, 300, 30), "Justinas Jucevičius", "mainMenuInfo");
	GUI.Label ( Rect(x - 150, y + 770, 300, 30), "Unity Store", "mainMenuInfo");
	GUI.Label ( Rect(x - 150, y + 810, 300, 30), "http://archive3d.net", "mainMenuInfo");
	GUI.Label ( Rect(x - 150, y + 850, 300, 30), "http://www.turbosquid.com", "mainMenuInfo");
	GUI.Label ( Rect(x - 150, y + 890, 300, 30), "http://artist-3d.com", "mainMenuInfo");
	GUI.Label ( Rect(x - 150, y + 930, 300, 30), "http://www.3dxtras.com", "mainMenuInfo");
	GUI.Label ( Rect(x - 150, y + 970, 300, 30), "http://thefree3dmodels.com", "mainMenuInfo");
	GUI.Label ( Rect(x - 150, y + 1010, 300, 30), "http://www.3dtotal.com", "mainMenuInfo");
	
	GUI.Label ( Rect(x - 150, y + 1140, 300, 50), "Idea", "mainMenuTitle");
	GUI.Label ( Rect(x - 150, y + 1200, 300, 30), "Girvydas Bartkus", "mainMenuInfo");
	GUI.Label ( Rect(x - 150, y + 1240, 300, 30), "Lukas Bendikas", "mainMenuInfo");
		
	if(Input.anyKeyDown || (y + 1240 + 30) < 0)
		Application.LoadLevel("StartMenu");		
}