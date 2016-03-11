
function Connect4Board(cols, rows, width, height) {
     this.cols = cols;
	 this.rows = rows;
	 this.width = width;
	 this.height = height;
	 this.currentDisk = 0;
	 this.diskList = [];
}

/*
 * Initialize Connect 4 Board
 */
Connect4Board.prototype.init = function (ctx, img) {
	var index = 0;
	
	for (var row = 0; row < this.rows; row++) {
		for (var col = 0; col < this.cols; col++) {
			
			//get x and y coordinates
			var x = col * img.width;
			var y = row * img.height
			ctx.drawImage(img, x, y, img.width, img.height);
			
			//get new x and y for disks considering margins
			this.diskList[index] = new GameDisk(x + DISK_MARGIN_LEFT_RIGHT,
												y + DISK_MARGIN_TOP_BOTTOM);
			index++;
		}
	}
}

/*
 * Update disk in corresponding column
 */
 Connect4Board.prototype.update = function (col, value) {
	//start from bottom row of current column
	var i = ((GAME_BOARD_ROW - 1) * GAME_BOARD_COLUMN) + col;
	while (i >= 0) {
		//check if disk is empty
		if (DISK_NONE == this.diskList[i].getValue()) {
			this.diskList[i].updateDisk(value);
			this.currentDisk = i;
			break;
		}
		i -= this.cols;
	}
 }

/*
 * Draw full board with disks
 */
Connect4Board.prototype.render = function (ctx) {
	for (var i = 0; i < this.diskList.length; i++) {
		this.diskList[i].render(ctx);
	}
}

/*
 * Return list of Game Disks
 */
Connect4Board.prototype.getDiskList = function () {
	return this.diskList;
}

/*
 * Return current Game Disk
 */
Connect4Board.prototype.getCurrentDisk = function () {
	return this.currentDisk;
}





