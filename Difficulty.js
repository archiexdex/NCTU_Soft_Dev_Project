class Difficulty {
	constructor(diffNumber, diffText) {
		this.diffNumber = diffNumber;
		this.diffText = diffText;
	}
	create() {
		var diff_tmp = new createjs.Shape();
		diff_tmp.alpha=0.7;
		diff_tmp.graphics.beginFill("#CCFFCC").drawRoundRectComplex(window.innerWidth/2-245+130*this.diffNumber, window.innerHeight-210, 100 ,250,45,45,0,0);
		var diff_text_tmp = new createjs.Text(this.diffText, '35px Arial', '#CCCCCC');
		diff_text_tmp.rotation = 270;
		diff_text_tmp.x=window.innerWidth/2-195+130*this.diffNumber-diff_text_tmp.getMeasuredHeight()/2;
		diff_text_tmp.y=window.innerHeight-50;

		return [diff_tmp, diff_text_tmp]
	}
}
