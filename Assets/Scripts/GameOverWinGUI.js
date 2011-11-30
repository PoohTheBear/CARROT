@script ExecuteInEditMode()

var gSkin: GUISkin;
var background: Texture2D;

function OnGUI() {
	
	if(gSkin)
		GUI.skin = gSkin;
	else
		Debug.Log("GameOverWinGUI: Skin Object missing!");
		
	var backgroundStyle : GUIStyle = new GUIStyle();
	backgroundStyle.normal.background = background;
	GUI.Label( Rect((Screen.width - (Screen.height*2))*0.75,0,Screen.height*2, Screen.height),"",backgroundStyle);
	
	GUI.Label ( Rect( (Screen.width / 2) - 150, (Screen.height / 2) - 40, 300, 100), "Congratulations!", "mainMenuTitle");
	
	if(Input.anyKeyDown)
		Application.LoadLevel("StartMenu");
}