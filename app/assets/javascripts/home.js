var CANVAS_WIDTH = 490;
var CANVAS_HEIGHT = 420;

var g_gameEngine = null;

window.onload = connect4Main;

function connect4Main() {
	var gameCanvas = document.getElementById('gameCanvas');
    gameCanvas.width = CANVAS_WIDTH;
    gameCanvas.height = CANVAS_HEIGHT;
	
	g_gameEngine = new GameEngine();
	g_gameEngine.init(gameCanvas, eventHandler);
	
	//gameCanvas.addEventListener('click', );
}

function eventHandler(evt) {
	g_gameEngine.handleEvent(evt);
}