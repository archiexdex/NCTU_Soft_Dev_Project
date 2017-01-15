class ComboEffect {
	constructor(comboText) {
		var tmp = new createjs.Text(comboText, 'bold 100px Arial', '#FF00FF');
		tmp.x = window.innerWidth/2-tmp.getMeasuredWidth()/2;
		tmp.y = window.innerHeight/2-tmp.getMeasuredHeight()/2;
		return tmp;
	}
}
