let stage;
let playerScore, perfectCombo, goodCombo;
let hitPadUp, hitPadDown, hitPadLeft, hitPadRight;
let circleUp, circleDown, circleLeft, circleRight;
let circleRadius = 50, hitPadRadius = 60;
let heldKeys = {};
let center = { 'x' : 500, 'y' : 300};
let interval = 1000;
let list = [];
let index = 0;

function init() {
	stage = new createjs.Stage("demoCanvas");

	playerScore = new createjs.Text('0', 'bold 20px Arial', '#A3FF24');
	playerScore.x = 211;
	playerScore.y = 20;
	stage.addChild(playerScore);

	perfectCombo = new createjs.Text('Perfect', 'bold 50px Arial', '#A3FF24');
	perfectCombo.x = 400;
	perfectCombo.y = 200;
	
	goodCombo = new createjs.Text('Good', 'bold 50px Arial', '#A3FF24');
	goodCombo.x = 400;
	goodCombo.y = 200;
	
	
	
	viewSetting();

	circleUp = getCircle("up");
	circleDown = getCircle("down");
	circleLeft = getCircle("left");
	circleRight = getCircle("right");
	stage.addChild(circleUp);
	stage.addChild(circleDown);
	stage.addChild(circleLeft);
	stage.addChild(circleRight);

	createjs.Tween.get(circleUp, {loop: true})
	  .to({y: -100}, interval);
	createjs.Tween.get(circleDown, {loop: true})
	  .to({y: 700}, interval);
	createjs.Tween.get(circleLeft, {loop: true})
	  .to({x: -100}, interval);
	createjs.Tween.get(circleRight, {loop: true})
	  .to({x: 1100}, interval);
	createjs.Ticker.setFPS(60);
	createjs.Ticker.addEventListener("tick", stage);

};



// Function
function getCircle(mode) {
	let tmp = new createjs.Shape();
	switch (mode) {
		case "up":
			tmp.graphics.beginFill("Crimson").drawCircle(0, 0, 50);
			break;
		case "down":
			tmp.graphics.beginFill("Yellow").drawCircle(0, 0, 50);
			break;
		case "left":
			tmp.graphics.beginFill("Green").drawCircle(0, 0, 50);
			break;
		case "right":
			tmp.graphics.beginFill("Blue").drawCircle(0, 0, 50);
			break;
	}
	tmp.x = center.x;
	tmp.y = center.y;
	return tmp;
}

function viewSetting() {
	hitPadUp = new createjs.Shape();
	hitPadUp.graphics.beginFill("Pink").drawCircle(0, 0, 60);
	hitPadUp.x = 500;
	hitPadUp.y = 70;
	hitPadUp.shadow = new createjs.Shadow("#f44295", 0, 5, 10);
	stage.addChild(hitPadUp);

	hitPadDown = new createjs.Shape();
	hitPadDown.graphics.beginFill("Pink").drawCircle(0, 0, 60);
	hitPadDown.x = 500;
	hitPadDown.y = 530;
	hitPadDown.shadow = new createjs.Shadow("#f44295", 0, 5, 10);
	stage.addChild(hitPadDown);

	hitPadLeft = new createjs.Shape();
	hitPadLeft.graphics.beginFill("Pink").drawCircle(0, 0, 60);
	hitPadLeft.x = 70;
	hitPadLeft.y = 300;
	hitPadLeft.shadow = new createjs.Shadow("#f44295", 0, 5, 10);
	stage.addChild(hitPadLeft);

	hitPadRight = new createjs.Shape();
	hitPadRight.graphics.beginFill("Pink").drawCircle(0, 0, 60);
	hitPadRight.x = 930;
	hitPadRight.y = 300;
	hitPadRight.shadow = new createjs.Shadow("#f44295", 0, 5, 10);
	stage.addChild(hitPadRight);
}
function removePerfectCombo() {
	stage.removeChild(perfectCombo);
}
function removeGoodCombo() {
	stage.removeChild(goodCombo);
}
function comboEffect(circle, hitPad, coord) {
	var perfect = 20;
	var good = 40;
	if(coord=="x") {
		if(circle.x<=hitPad.x+perfect && circle.x>=hitPad.x-perfect) {
			console.log("perfect");
			stage.addChild(perfectCombo);
			createjs.Tween.get(perfectCombo).wait(500).call( removePerfectCombo );
			playerScore.text = parseInt(playerScore.text + 1);
			return true;
		}
		else if(circle.x<=hitPad.x+good && circle.x>=hitPad.x-good) {
			console.log("good");
			stage.addChild(goodCombo);
			createjs.Tween.get(goodCombo).wait(500).call( removeGoodCombo );
			playerScore.text = parseInt(playerScore.text + 1);
			return true;
		}
		else if(circle.x+circleRadius>=hitPad.x-hitPadRadius && circle.x-circleRadius<=hitPad.x+hitPadRadius) {	//normal
			playerScore.text = parseInt(playerScore.text + 1);
			return true;
		}
	}
	else if(coord=="y") {
		if(circle.y<=hitPad.y+perfect && circle.y>=hitPad.y-perfect) {
			console.log("perfect");
			stage.addChild(perfectCombo);
			createjs.Tween.get(perfectCombo).wait(500).call( removePerfectCombo );
			playerScore.text = parseInt(playerScore.text + 1);
			return true;
		}
		else if(circle.y<=hitPad.y+good && circle.y>=hitPad.y-good) {
			console.log("good");
			stage.addChild(goodCombo);
			createjs.Tween.get(goodCombo).wait(500).call( removeGoodCombo );
			playerScore.text = parseInt(playerScore.text + 1);
			return true;
		}
		else if(circle.y+circleRadius>=hitPad.y-hitPadRadius && circle.y-circleRadius<=hitPad.y+hitPadRadius) {	//normal
			playerScore.text = parseInt(playerScore.text + 1);
			return true;
		}
	}
	return false;
}

// Key Setting
document.onkeydown = function(e) {
	//console.log(heldKeys[e.keyCode]);
	if (heldKeys[e.keyCode] == true) {
		return;
	}
	heldKeys[e.keyCode] = true;
	switch(e.keyCode) {
		case 37:
			console.log("left");
			hitPadLeft.shadow = null;
			comboEffect(circleLeft, hitPadLeft, "x")
			/*if( comboEffect(circleLeft, hitPadLeft, "x") ) {
				stage.removeChild(circleLeft);
				circleLeft = null;
			}*/
			break;
		case 38:
			console.log("up");
			hitPadUp.shadow = null;
			comboEffect(circleUp, hitPadUp, "y");
			/*if( comboEffect(circleUp, hitPadUp, "y") ) {
				stage.removeChild(circleUp);
				circleUp = null;
			}*/
			break;
		case 39:
			console.log("right");
			hitPadRight.shadow = null;
			comboEffect(circleRight, hitPadRight, "x");
			/*if( comboEffect(circleRight, hitPadRight, "x") ) {
				stage.removeChild(circleRight);
				circleRight = null;
			}*/
			break;
		case 40:
			console.log("down");
			hitPadDown.shadow = null;
			comboEffect(circleDown, hitPadDown, "y");
			/*if( comboEffect(circleDown, hitPadDown, "y") ) {
				stage.removeChild(circleDown);
				circleDown = null;
			}*/
			break;
	}
};

document.onkeyup = function(e) {
	//console.log(heldKeys[e.keyCode]);
	delete heldKeys[e.keyCode];
	switch(e.keyCode) {
		case 37:
			hitPadLeft.shadow = new createjs.Shadow("#f44295", 0, 5, 10);
			break;
		case 38:
			hitPadUp.shadow = new createjs.Shadow("#f44295", 0, 5, 10);
			break;
		case 39:
			hitPadRight.shadow = new createjs.Shadow("#f44295", 0, 5, 10);
			break;
		case 40:
			hitPadDown.shadow = new createjs.Shadow("#f44295", 0, 5, 10);
	}
};
