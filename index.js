var stage;
var playerScore;
var hitPadUp, hitPadDown, hitPadLeft, hitPadRight;
var circleUp, circleDown, circleLeft, circleRight;
var circleRadius = 50;
var hitPadRadius = 60;
var heldKeys = {};

function init() {
	var interval = 1000;
	playerScore = new createjs.Text('0', 'bold 20px Arial', '#A3FF24');
	playerScore.x = 211;
	playerScore.y = 20;
	stage = new createjs.Stage("demoCanvas");

	hitPadUp = new createjs.Shape();
	hitPadUp.graphics.beginFill("Pink").drawCircle(0, 0, 60);
	hitPadUp.x = 500;
	hitPadUp.y = 60;
	hitPadUp.alpha = 0.5;
	hitPadDown = new createjs.Shape();
	hitPadDown.graphics.beginFill("Pink").drawCircle(0, 0, 60);
	hitPadDown.x = 500;
	hitPadDown.y = 540;
	hitPadUp.alpha = 0.5;
	hitPadLeft = new createjs.Shape();
	hitPadLeft.graphics.beginFill("Pink").drawCircle(0, 0, 60);
	hitPadLeft.x = 60;
	hitPadLeft.y = 300;
	hitPadUp.alpha = 0.5;
	hitPadRight = new createjs.Shape();
	hitPadRight.graphics.beginFill("Pink").drawCircle(0, 0, 60);
	hitPadRight.x = 940;
	hitPadRight.y = 300;
	hitPadUp.alpha = 0.5;

	circleUp = new createjs.Shape();
	circleUp.graphics.beginFill("Crimson").drawCircle(0, 0, 50);
	circleUp.x = 500;
	circleUp.y = 300;
	circleDown = new createjs.Shape();
	circleDown.graphics.beginFill("Yellow").drawCircle(0, 0, 50);
	circleDown.x = 500;
	circleDown.y = 300;
	circleLeft = new createjs.Shape();
	circleLeft.graphics.beginFill("Green").drawCircle(0, 0, 50);
	circleLeft.x = 500;
	circleLeft.y = 300;
	circleRight = new createjs.Shape();
	circleRight.graphics.beginFill("Blue").drawCircle(0, 0, 50);
	circleRight.x = 500;
	circleRight.y = 300;

	stage.addChild(playerScore);
	stage.addChild(hitPadUp);
	stage.addChild(hitPadDown);
	stage.addChild(hitPadLeft);
	stage.addChild(hitPadRight);
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

document.onkeydown = function(e) {
	console.log(heldKeys[e.keyCode]);
	if (heldKeys[e.keyCode] == true) {
		return;
	}
	heldKeys[e.keyCode] = true;
	switch(e.keyCode) {
		case 37:
			console.log("left");
			if(circleLeft.x+circleRadius>=hitPadLeft.x-hitPadRadius && circleLeft.x-circleRadius<=hitPadLeft.x+hitPadRadius) {
				playerScore.text = parseInt(playerScore.text + 1);
				stage.removeChild(circleLeft);
				circleLeft = null;
			}
			break;
		case 38:
			console.log("up");
			if(circleUp.y+circleRadius>=hitPadUp.y-hitPadRadius && circleUp.y-circleRadius<=hitPadUp.y+hitPadRadius) {
				playerScore.text = parseInt(playerScore.text + 1);
				stage.removeChild(circleUp);
				circleUp = null;
			}
			break;
		case 39:
			console.log("right");
			if(circleRight.x+circleRadius>=hitPadRight.x-hitPadRadius && circleRight.x-circleRadius<=hitPadRight.x+hitPadRadius) {
				playerScore.text = parseInt(playerScore.text + 1);
				stage.removeChild(circleRight);
				circleRight = null;
			}
			break;
		case 40:
			console.log("down");
			if(circleDown.y+circleRadius>=hitPadDown.y-hitPadRadius && circleDown.x-circleRadius<=hitPadDown.x+hitPadRadius) {
				playerScore.text = parseInt(playerScore.text + 1);
				stage.removeChild(circleDown);
				circleDown = null;
			}
	}
};

document.onkeyup = function(e) {
	console.log(heldKeys[e.keyCode]);
	delete heldKeys[e.keyCode];
};