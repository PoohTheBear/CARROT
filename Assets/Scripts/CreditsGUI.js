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
		
	GUI.Label ( Rect( (Screen.width / 2) - 150, (Screen.height / 2) - 40 - (t*scrollSpeed), 300, 100), "Credits!", "mainMenuTitle");
		
	if(Input.anyKeyDown)
		Application.LoadLevel("StartMenu");		
}