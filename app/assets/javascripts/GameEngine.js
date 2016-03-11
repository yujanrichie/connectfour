
//CONSTANTS
var GAME_BOARD_WIDTH = 490;
var GAME_BOARD_HEIGHT = 420;
var GAME_BOARD_COLUMN = 7;
var GAME_BOARD_ROW = 6;

var BOARD_DISK_WIDTH = 50;
var BOARD_DISK_HEIGHT = 50;

var BOARD_UNIT_WIDTH = 70;
var BOARD_UNIT_HEIGHT = 70;

var DISK_MARGIN_LEFT_RIGHT = 10;
var DISK_MARGIN_TOP_BOTTOM = 10;

var BOARD_DISK_WIDTH = 50;
var BOARD_DISK_HEIGHT = 50;

var DISK_NONE = 0;
var DISK_RED = 1;
var DISK_YELLOW = 2;

var PLAYER_RED = DISK_RED;
var PLAYER_YELLOW = DISK_YELLOW

var CONNECT_COUNT = 4;

var GAME_STATE_START = 0;
var GAME_STATE_END = 1;


//Global Variables
var g_boardUnitImage = null;
var g_redWinnerImage = null;
var g_yellowWinnerImage = null;
var g_noWinnerImage = null;

function GameEngine() {
        this.eventHandler = null;
		this.gameBoard = null;
		this.gameContext = null;
		this.gameCanvas = null;
		this.gameState = 0;
		this.player = 0;
}

GameEngine.prototype.init = function (gameCanvas, eventHandler) {
	this.eventHandler = eventHandler;
	this.gameContext = gameCanvas.getContext('2d');
	this.player = PLAYER_RED;
	this.gameState = GAME_STATE_START
	
	g_boardUnitImage = new Image();
	g_boardUnitImage.src = "images/board_unit.png";
	
	g_redWinnerImage = new Image();
	g_redWinnerImage.src = "images/winner_red.png";
	
	g_yellowWinnerImage = new Image();
	g_yellowWinnerImage.src = "images/winner_yellow.png";
	
	g_noWinnerImage = new Image();
	g_noWinnerImage.src = "images/winner_none.png";
	
	this.gameBoard = new Connect4Board(GAME_BOARD_COLUMN, GAME_BOARD_ROW, 
						GAME_BOARD_WIDTH, GAME_BOARD_HEIGHT);
	
	//make sure image is loaded first before display
	
	g_boardUnitImage.addEventListener('load', this.eventHandler);
	gameCanvas.addEventListener('click', this.eventHandler);
	window.addEventListener('keydown', this.eventHandler);
}

GameEngine.prototype.switchPlayer = function () {
	if (PLAYER_RED == this.player) {
		this.player = PLAYER_YELLOW;
	}
	else {
		this.player = PLAYER_RED;
	}
}

GameEngine.prototype.handleEvent = function (evt) {
	var bounds = evt.target.getBoundingClientRect();
	if (('load' == evt.type) && (GAME_STATE_START == this.gameState)) { //onLoad
		this.gameBoard.init(this.gameContext, g_boardUnitImage);
	}
	else if (('click' == evt.type) && (GAME_STATE_START == this.gameState)) {//onClick
		//get mouse click location relative to window offset main object location
		var clickX = evt.clientX - bounds.left;
		var clickY = evt.clientY - bounds.top;
		
		//get column and row value based on a grid 
		// 00 01 02 03 04 05 06
		// 07 08 09 10 11 12 13
		// 14 15 16 17 18 19 20
		// 21 22 23 24 25 26 27
		// 28 29 30 31 32 33 34
		// 35 36 37 38 39 40 41 
		var col = Math.floor(clickX / g_boardUnitImage.width);
		//var row = Math.floor(clickY / g_boardUnitImage.height);

		this.gameBoard.update(col, this.player);
		this.gameBoard.render(this.gameContext);
		this.checkGame();
	}
	else if (('keydown' == evt.type) && (GAME_STATE_END == this.gameState)) {
		//game has end, reset
		this.resetGame();
	}
}

/*
 * Check Game Status
 */
GameEngine.prototype.checkGame = function () {
	var gameHelper = new GameHelper(GAME_BOARD_COLUMN, GAME_BOARD_ROW, 
			this.gameBoard.getDiskList(), this.gameBoard.getCurrentDisk());
	
	if (true == gameHelper.isConnect()) {
		//game has a winner
		this.finishGame();
	}
	else if (true == gameHelper.isBoardComplete()) {
		//game has no winner and board is now full
		this.gameState = GAME_STATE_END;
		this.gameContext.drawImage(g_noWinnerImage,
					(GAME_BOARD_WIDTH / 2) - (g_noWinnerImage.width / 2), 
					(GAME_BOARD_HEIGHT / 2) - (g_noWinnerImage.height / 2));
	}
	else {
		this.switchPlayer();
	}
}

GameEngine.prototype.finishGame = function () {
	var winnerImage;
	if (PLAYER_RED == this.player) {
		//alert("Red Player WINS!");
		winnerImage = g_redWinnerImage;
	}
	else {
		//alert("Yellow Player WINS!");
		winnerImage = g_yellowWinnerImage;
	}
	this.gameState = GAME_STATE_END;
	this.gameContext.drawImage(winnerImage,
					(GAME_BOARD_WIDTH / 2) - (winnerImage.width / 2), 
					(GAME_BOARD_HEIGHT / 2) - (winnerImage.height / 2));
}

GameEngine.prototype.resetGame = function () {
	this.player = PLAYER_RED;
	this.gameState = GAME_STATE_START
	this.gameBoard = null;
	this.gameBoard = new Connect4Board(GAME_BOARD_COLUMN, GAME_BOARD_ROW, 
						GAME_BOARD_WIDTH, GAME_BOARD_HEIGHT);
	this.gameBoard.init(this.gameContext, g_boardUnitImage);
}
