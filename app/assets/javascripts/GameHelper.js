function GameHelper(cols, rows, list, disk) {
     this.cols = cols;
	 this.rows = rows;
	 this.prev = 0;
	 this.current = disk;
	 this.next = 0;
	 this.diskList = list;
}

/*
 * Return true if Board is complete, no more empty units
 */
GameHelper.prototype.isBoardComplete = function () {
	var isComplete = true;
	
	for (var i = 0; i < this.diskList.length; i++) {
		if (DISK_NONE == this.diskList[i].getValue()) {
			isComplete = false;
		}
	}
	
	return isComplete;
}

/*
 * Return true if Board has any connections
 */
GameHelper.prototype.isConnect = function () {
	var isConnect = false;
	isConnect |= this.isHorizontalConnect();
	isConnect |= this.isVerticalConnect();
	isConnect |= this.isDiagonalConnect();
	isConnect |= this.isAntiDiagonalConnect();
	
	return isConnect;
}

/*
 * Return true if Board has any connections made horizontally
 */
GameHelper.prototype.isHorizontalConnect = function () {
	var isConnect = false;
	var connectCount = 1;

	connectCount = this.checkRight(connectCount);
	connectCount = this.checkLeft(connectCount);
	
	if (connectCount >= CONNECT_COUNT) {
		isConnect = true;
	}
	return isConnect;
}

/*
 * Check current disk and disks at the right
 */
GameHelper.prototype.checkRight = function (count) {
	var connectCount = count;
	//set index and column counters (0-based)
	var i = this.current;
	var col = this.current % this.cols;
	
	while (col < (this.cols - 1)) {//check to the right
		if (this.diskList[i].getValue() != 
			this.diskList[i + 1].getValue()) {
			break;//end checking
		}
		//current and right value are same
		col++;
		i++;
		connectCount++;
	}
	return connectCount;
}

/*
 * Check current disk and disks at the left
 */
GameHelper.prototype.checkLeft = function (count) {
	var connectCount = count;
	//set index and column counters (0-based)
	var i = this.current;
	var col = this.current % this.cols;
	
	while (col > 0) {//check to the left
		if (this.diskList[i].getValue() != 
			this.diskList[i - 1].getValue()) {
			break;//end checking
		}
		//current and left value are same
		col--;
		i--;
		connectCount++;
	}
	return connectCount;
}

/*
 * Return true if Board has any connections made vertically
 */
GameHelper.prototype.isVerticalConnect = function () {
	var isConnect = false;
	var connectCount = 1;

	connectCount = this.checkTop(connectCount);
	connectCount = this.checkBottom(connectCount);
	
	if (connectCount >= CONNECT_COUNT) {
		isConnect = true;
	}
	return isConnect;
}

/*
 * Check current disk and disks at the top
 */
GameHelper.prototype.checkTop = function (count) {
	var connectCount = count;
	//set index and column counters (0-based)
	var i = this.current;
	this.prev = i - this.cols;
	
	while (this.prev >= 0) {//check to the top
		if (this.diskList[i].getValue() != 
			this.diskList[this.prev].getValue()) {
			break;//end checking
		}
		//current and top value are same
		i = this.prev;
		this.prev -= this.cols;
		connectCount++;
	}
	return connectCount;
}

/*
 * Check current disk and disks at the bottom
 */
GameHelper.prototype.checkBottom = function (count) {
	var connectCount = count;
	//set index and column counters (0-based)
	var i = this.current;
	this.next = i + this.cols;

	while (this.next < this.diskList.length) {//check to the bottom
		if (this.diskList[i].getValue() != 
			this.diskList[this.next].getValue()) {
			break;//end checking
		}
		//current and bottom value are same
		i = this.next;
		this.next += this.cols;
		connectCount++;
	}
	return connectCount;
}

/*
 * Return true if Board has any connections made on a diagonal
 * (top-left to bottom-right)
 */
GameHelper.prototype.isDiagonalConnect = function () {
	var isConnect = false;
	var connectCount = 1;

	connectCount = this.checkTopLeft(connectCount);
	connectCount = this.checkBottomRight(connectCount);
	
	if (connectCount >= CONNECT_COUNT) {
		isConnect = true;
	}
	return isConnect;
}

/*
 * Check current disk and disks at the top left
 */
GameHelper.prototype.checkTopLeft = function (count) {
	var connectCount = count;
	var col = this.current % this.cols;
	var i = this.current;
	this.prev = i - (this.cols + 1);
	
	
	while ((this.prev >= 0) && (col > 0)) {//check to the top left
		if (this.diskList[i].getValue() != 
			this.diskList[this.prev].getValue()) {
			break;//end checking
		}
		//current and top left value are same
		i = this.prev;
		this.prev -= this.cols + 1;
		col--;
		connectCount++;
	}
	return connectCount;
}

/*
 * Check current disk and disks at the bottom right
 */
GameHelper.prototype.checkBottomRight = function (count) {
	var connectCount = count;
	var col = this.current % this.cols;
	var i = this.current;
	this.next = i + (this.cols + 1);

	while ((this.next < this.diskList.length) &&
			(col < (this.cols - 1))) {//check to the bottom right
		if (this.diskList[i].getValue() != 
			this.diskList[this.next].getValue()) {
			break;//end checking
		}
		//current and bottom right value are same
		i = this.next;
		this.next += this.cols + 1;
		col++;
		connectCount++;
	}
	return connectCount;
}

/*
 * Return true if Board has any connections made on an antidiagonal
 * (top-right to bottom-left)
 */
GameHelper.prototype.isAntiDiagonalConnect = function () {
	var isConnect = false;
	var connectCount = 1;

	connectCount = this.checkTopRight(connectCount);
	connectCount = this.checkBottomLeft(connectCount);
	
	if (connectCount >= CONNECT_COUNT) {
		isConnect = true;
	}
	return isConnect;
}

/*
 * Check current disk and disks at the top right
 */
GameHelper.prototype.checkTopRight = function (count) {
	var connectCount = count;
	var col = this.current % this.cols;
	var i = this.current;
	this.prev = i - (this.cols - 1);
	
	
	while ((this.prev >= 0) && (col < (this.cols - 1))) {//check to the top right
		if (this.diskList[i].getValue() != 
			this.diskList[this.prev].getValue()) {
			break;//end checking
		}
		//current and top right value are same
		i = this.prev;
		this.prev -= this.cols - 1;
		col++;
		connectCount++;
	}
	return connectCount;
}

/*
 * Check current disk and disks at the bottom left
 */
GameHelper.prototype.checkBottomLeft = function (count) {
	var connectCount = count;
	var col = this.current % this.cols;
	var i = this.current;
	this.next = i + (this.cols - 1);

	while ((this.next < this.diskList.length) &&
			(col > 0)) {//check to the bottom left
		if (this.diskList[i].getValue() != 
			this.diskList[this.next].getValue()) {
			break;//end checking
		}
		//current and bottom left value are same
		i = this.next;
		this.next += this.cols - 1;
		col--;
		connectCount++;
	}
	return connectCount;
}