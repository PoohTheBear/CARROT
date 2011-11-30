@script ExecuteInEditMode()

var gSkin: GUISkin;

var background: Texture2D;

private var isLoading = false;

function OnGUI () {

	if(gSkin)
		GUI.skin = gSkin;
	else
		Debug.Log("StarMenuGUI: Skin Object missing!");
		
	var backgroundStyle : GUIStyle = new GUIStyle();
	backgroundStyle.normal.background = background;
	GUI.Label( Rect((Screen.width - (Screen.height*2))*0.75,0,Screen.height*2, Screen.height),"",backgroundStyle);

	GUI.Label( Rect((Screen.width/2)-200,50,400,100),"Codename C.A.R.R.O.T.","mainMenuTitle");

	if(GUI.Button( Rect((Screen.width/2)-70,Screen.height-180,140,50),"Play")) {
		isLoading = true;
		Application.LoadLevel("Game");
	}
	
	if(GUI.Button( Rect((Screen.width/2)-70,Screen.height-120,140,50),"Credits")) {
		Application.LoadLevel("Credits");
	}
	
	var isWebPlayer = (Application.platform == RuntimePlatform.OSXWebPlayer ||
			Application.platform == RuntimePlatform.WindowsWebPlayer);
	if (!isWebPlayer)
	{
		if (GUI.Button( Rect( (Screen.width/2)-70, Screen.height - 60, 140, 50), "Quit"))
		Application.Quit();
	}
	
	if (isLoading)
		GUI.Label ( Rect( (Screen.width/2)-200, (Screen.height / 2) - 60, 400, 70),
			"Loading...", "mainMenuTitle");
}