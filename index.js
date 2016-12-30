let stage;
let playerScore;
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

	viewSetting();


	// for (var i = 0; i < 10; i++){
	// 	list.push();
	// }
	
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
	hitPadUp.y = 60;
	hitPadUp.alpha = 0.5;
	stage.addChild(hitPadUp);

	hitPadDown = new createjs.Shape();
	hitPadDown.graphics.beginFill("Pink").drawCircle(0, 0, 60);
	hitPadDown.x = 500;
	hitPadDown.y = 540;
	hitPadDown.alpha = 0.5;
	stage.addChild(hitPadDown);

	hitPadLeft = new createjs.Shape();
	hitPadLeft.graphics.beginFill("Pink").drawCircle(0, 0, 60);
	hitPadLeft.x = 60;
	hitPadLeft.y = 300;
	hitPadLeft.alpha = 0.5;
	stage.addChild(hitPadLeft);

	hitPadRight = new createjs.Shape();
	hitPadRight.graphics.beginFill("Pink").drawCircle(0, 0, 60);
	hitPadRight.x = 940;
	hitPadRight.y = 300;
	hitPadRight.alpha = 0.5;
	stage.addChild(hitPadRight);
}

// Key Setting
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
