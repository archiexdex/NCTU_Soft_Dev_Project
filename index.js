let stage;
let currentCombo, maxCombo, missCombo, perfectCombo, goodCombo;
let hitPadUp, hitPadDown, hitPadLeft, hitPadRight;
let circleUp, circleDown, circleLeft, circleRight;
let circleRadius = 50, hitPadRadius = 60;
let heldKeys = {};
let center = { 'x' : 500, 'y' : 300};
let interval = 1000;
let list = [];
let index = 0;

var beatPoint = 0;
var beat = 0;
var measure = 1;
var bpm = 150;
var songLength = 91;
var songContent = [30,32,34,35,40,42,44,45,50,52,54,55,56,60,62,64,70,72,74,75,80,82,84,85,90,92,94,95,96,100,102,104,110,112,114,120,124,130,132,134,140,150,152,154,160,164,170,172,174,180,190,192,194,200,204,210,212,214,220,224,230,232,234,240,244,250,252,254,260,270,274,280,282,284,290,294,300,302,304,310,314,320,322,324,330,332,334,340,350,352,354,360,362,364,370,374,380,382,384,390,392,394,400,402,404,410,414,420,422,424,430,440,450,460,464,470,472,474,480,482,484,490,492,494,500,504,510,550,560,570,580,590,600,610,620,630,634,640,650,670,672,674,680,682,684,690,694,700,702,704,710,712,714,720,722,724,730,734,740,742,744,750,760,770,780,784,790,792,794,800,802,804,810,812,814,820,824,830,870,872,874,880,884,890,892,894,900,904,910];
	

function init() {
	stage = new createjs.Stage("demoCanvas");
	
	currentCombo = new createjs.Text('0', 'bold 20px Arial', '#A3FF24');
	currentCombo.x = 200;
	currentCombo.y = 20;
	stage.addChild(currentCombo);
	maxCombo = new createjs.Text('0', 'bold 20px Arial', '#A3FF24');
	maxCombo.x = 800;
	maxCombo.y = 20;
	stage.addChild(maxCombo);

	perfectCombo = new createjs.Text('Perfect', 'bold 50px Arial', '#A3FF24');
	perfectCombo.x = 400;
	perfectCombo.y = 200;
	
	goodCombo = new createjs.Text('Good', 'bold 50px Arial', '#A3FF24');
	goodCombo.x = 400;
	goodCombo.y = 200;
	
	missCombo = new createjs.Text('Miss', 'bold 50px Arial', '#A3FF24');
	missCombo.x = 400;
	missCombo.y = 200;
	
	
	viewSetting();

	circleUp = getCircle("up");
	circleDown = getCircle("down");
	circleLeft = getCircle("left");
	circleRight = getCircle("right");
	//stage.addChild(circleUp);
	//stage.addChild(circleDown);
	//stage.addChild(circleLeft);
	//stage.addChild(circleRight);

	createjs.Tween.get(circleUp, {loop: false})
	  .to({y: -100}, interval);
	createjs.Tween.get(circleDown, {loop: true})
	  .to({y: 700}, interval);
	createjs.Tween.get(circleLeft, {loop: true})
	  .to({x: -100}, interval);
	createjs.Tween.get(circleRight, {loop: true})
	  .to({x: 1100}, interval);
	createjs.Ticker.setFPS(bpm*4);
	
	createjs.Ticker.addEventListener("tick", stage);
	createjs.Ticker.addEventListener("tick", song);
};

function song() {
	beatPoint++;
	if(beatPoint==75) {	//beatPoint
		beatPoint = 0;
		beat++;
		if(beat==8) { 
			beat = 0;
			measure++;
		}
		console.log("measure: "+measure+"beat: "+beat);
		if( (Math.floor(songContent[0]/10) == measure) && (songContent[0]%10 == beat) ) {	//show circle
			songContent.shift();
			console.log("inside");
			console.log("measure: "+measure+"beat: "+beat);
			console.log("inside");
			stage.removeChild(circleUp);
			circleUp = null;
			circleUp = new createjs.Shape();
			circleUp.graphics.beginFill("Crimson").drawCircle(0, 0, 50);
			circleUp.x = center.x;
			circleUp.y = center.y;
			createjs.Tween.get(circleUp, {loop: false})
	  .to({y: -100}, interval);
	  stage.addChild(circleUp);
		}
	}
}

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
function removeMissCombo() {
	stage.removeChild(missCombo);
}
function updataScore() {
	currentCombo.text = parseInt(currentCombo.text + 1);
	if( parseInt(currentCombo.text) > parseInt(maxCombo.text) )
		maxCombo.text = currentCombo.text;
}
function comboEffect(circle, hitPad, coord) {
	var perfect = 20;
	var good = 40;
	if(coord=="x") {
		if(circle.x<=hitPad.x+perfect && circle.x>=hitPad.x-perfect) {
			console.log("perfect");
			stage.addChild(perfectCombo);
			createjs.Tween.get(perfectCombo).wait(500).call( removePerfectCombo );
			updataScore();
			return true;
		}
		else if(circle.x<=hitPad.x+good && circle.x>=hitPad.x-good) {
			console.log("good");
			stage.addChild(goodCombo);
			createjs.Tween.get(goodCombo).wait(500).call( removeGoodCombo );
			updataScore();
			return true;
		}
		else if(circle.x+circleRadius>=hitPad.x-hitPadRadius && circle.x-circleRadius<=hitPad.x+hitPadRadius) {	//normal
			updataScore();
			return true;
		}
		else {	//miss
			currentCombo.text = '0';
			stage.addChild(missCombo);
			createjs.Tween.get(missCombo).wait(500).call( removeMissCombo );
		}
	}
	else if(coord=="y") {
		if(circle.y<=hitPad.y+perfect && circle.y>=hitPad.y-perfect) {
			console.log("perfect");
			stage.addChild(perfectCombo);
			createjs.Tween.get(perfectCombo).wait(500).call( removePerfectCombo );
			updataScore();
			return true;
		}
		else if(circle.y<=hitPad.y+good && circle.y>=hitPad.y-good) {
			console.log("good");
			stage.addChild(missCombo);
			createjs.Tween.get(missCombo).wait(500).call( removeMissCombo );
			updataScore();
			return true;
		}
		else if(circle.y+circleRadius>=hitPad.y-hitPadRadius && circle.y-circleRadius<=hitPad.y+hitPadRadius) {	//normal
			updataScore();
			return true;
		}
		else {	//miss
			currentCombo.text = '0';
			stage.addChild(goodCombo);
			createjs.Tween.get(goodCombo).wait(500).call( removeGoodCombo );
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
