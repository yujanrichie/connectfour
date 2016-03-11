
function GameDisk(x, y) {
        this.x = x;
        this.y = y;
        this.width = BOARD_DISK_WIDTH;
        this.height = BOARD_DISK_HEIGHT;
		this.value = DISK_NONE;
		this.imageInfo = null;
		this.init();
}

GameDisk.prototype.init = function () {
	this.imageInfo = new Image();
	this.imageInfo.src = "images/empty_unit.png";
}

GameDisk.prototype.getValue = function () {
	return this.value;
}

GameDisk.prototype.updateDisk = function (value) {
        this.value = value;
		
		switch (this.value) {
			case DISK_RED:
				this.imageInfo.src = "images/red_disk.png";
				break;
				
			case DISK_YELLOW:
				this.imageInfo.src = "images/yellow_disk.png";
				break;
				
			default:
				this.imageInfo.src = "images/empty_unit.png";
				break;
		}
}

GameDisk.prototype.render = function (ctx) {
        if (this.imageInfo != null) {
                ctx.drawImage(this.imageInfo,
                        0, 0, this.imageInfo.width, this.imageInfo.height,
                        this.x, this.y, this.width, this.height);
        }
}
