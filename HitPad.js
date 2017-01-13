class HitPad {
	constructor(x, y) {
		var tmp = new createjs.Shape();
		tmp.graphics.beginFill("Pink").drawCircle(0, 0, 60);
		tmp.x = x;
		tmp.y = y;
		tmp.shadow = new createjs.Shadow("#f44295", 0, 5, 10);
		return tmp;
	}
}
