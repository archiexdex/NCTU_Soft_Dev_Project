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

//Start page
var bg;
var start_button;
var title;
var maker;
var TitleView = new createjs.Container();

//Select page
var rank;
var rank_name;
var rank_list;
var SelectView = new createjs.Container();


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

function init() {
	stage = new createjs.Stage("demoCanvas");
	stage.canvas.width = window.innerWidth-20;
	stage.canvas.height = window.innerHeight-20;

	stage.mouseEventsEnabled = true;
	stage.enableMouseOver();

	bg = new createjs.Bitmap("bg.jpg");
	bg.scaleX=1.35;
	bg.scaleY=1.2;

	stage.addChild(bg);

	createjs.Ticker.setFPS(bpm*4);
	createjs.Ticker.addEventListener("tick", stage);
	addTitleView();
}

// Function

function addTitleView(){

	title = new createjs.Text('Musix', 'bold 120px Arial', '#0099CC');
	title.x=window.innerWidth/2-title.getMeasuredWidth()/2;
	title.y=window.innerHeight/2-220;
	start_button = new createjs.Text('Start', 'bold 60px Arial', '#0099CC');
	start_button.x=window.innerWidth/2-start_button.getMeasuredWidth()/2;
	start_button.y=window.innerHeight/2;

	maker = new createjs.Text('Made by  賴奕融 楊信之 吳斌', '20px Arial', '#3399CC');
	maker.x=window.innerWidth/2-maker.getMeasuredWidth()/2;
	maker.y=window.innerHeight/2+160;

	TitleView.addChild(start_button, title,maker);
	stage.addChild(TitleView);

	start_button.addEventListener("click",tweenTitleView);
}

function tweenTitleView(){
    // Start Game
    createjs.Tween.get(TitleView).to({y:-700}, 300).call(selectPage);
		// createjs.Ticker.addEventListener("tick", song);
}

function selectPage(){
	//rank rectangle and name
	rank = new createjs.Shape();
	rank.alpha=0.5;
	rank.graphics.beginFill("#FFFFCC").drawRect(60, 60, 200 ,370);

	rank_name =  new createjs.Text('Rank', '35px Arial', '#FFFF99');
	rank_name.x = 160 -rank_name.getMeasuredWidth()/2;
	rank_name.y = 90;

	//rank list tmp;

	var rank_list_1=rankText('Jack',1);
	var rank_list_2=rankText('Nicolas',2);
	var rank_list_3=rankText('Carol',3);
	var rank_list_4=rankText('Nina',4);
	var rank_list_5=rankText('Kathy',5);

	SelectView.addChild(rank,rank_name,rank_list_1,rank_list_2,rank_list_3,rank_list_4,rank_list_5);

	//difficulty select

	var diff_easy = diff(0);
	var diff_middle = diff(1);
	var diff_hard = diff(2);
	var diff_hell = diff(3);

	var diff_easy_text = diff_text('EASY',0);
	var diff_middle_text = diff_text('MIDDLE',1);
	var diff_hard_text = diff_text('HARD',2);
	var diff_hell_text = diff_text('HELL',3);

	diff_easy.addEventListener("mouseover", function() {
    createjs.Tween.get(diff_easy).to({y:-40}, 200);
		createjs.Tween.get(diff_middle).to({y:0}, 200);
		createjs.Tween.get(diff_hard).to({y:0}, 200);
		createjs.Tween.get(diff_hell).to({y:0}, 200);
});

	diff_middle.addEventListener("mouseover", function() {
    createjs.Tween.get(diff_easy).to({y:0}, 200);
		createjs.Tween.get(diff_middle).to({y:-40}, 200);
		createjs.Tween.get(diff_hard).to({y:0}, 200);
		createjs.Tween.get(diff_hell).to({y:0}, 200);
});

	diff_hard.addEventListener("mouseover", function() {
    createjs.Tween.get(diff_easy).to({y:0}, 200);
		createjs.Tween.get(diff_middle).to({y:0}, 200);
		createjs.Tween.get(diff_hard).to({y:-40}, 200);
		createjs.Tween.get(diff_hell).to({y:0}, 200);
});

	diff_hell.addEventListener("mouseover", function() {
	    createjs.Tween.get(diff_easy).to({y:0}, 200);
			createjs.Tween.get(diff_middle).to({y:0}, 200);
			createjs.Tween.get(diff_hard).to({y:0}, 200);
			createjs.Tween.get(diff_hell).to({y:-40}, 200);
	});

	//song select

	var song_0=song(0);
	var song_1=song(1);
	var song_2=song(2);
	var song_3=song(3);

	var song_0_text=song_text('Love Forever',0);
	var song_1_text=song_text('One Dream',1);
	var song_2_text=song_text('Lean on',2);
	var song_3_text=song_text('Hellhold',3);

	song_0.addEventListener("mouseover", function() {
    createjs.Tween.get(song_0).to({x:-50}, 200);
		createjs.Tween.get(song_1).to({x:0}, 200);
		createjs.Tween.get(song_2).to({x:0}, 200);
		createjs.Tween.get(song_3).to({x:0}, 200);
});

	song_1.addEventListener("mouseover", function() {
    createjs.Tween.get(song_0).to({x:0}, 200);
		createjs.Tween.get(song_1).to({x:-50}, 200);
		createjs.Tween.get(song_2).to({x:0}, 200);
		createjs.Tween.get(song_3).to({x:0}, 200);
});

	song_2.addEventListener("mouseover", function() {
    createjs.Tween.get(song_0).to({x:0}, 200);
		createjs.Tween.get(song_1).to({x:0}, 200);
		createjs.Tween.get(song_2).to({x:-50}, 200);
		createjs.Tween.get(song_3).to({x:0}, 200);
});

	song_3.addEventListener("mouseover", function() {
	    createjs.Tween.get(song_0).to({x:0}, 200);
			createjs.Tween.get(song_1).to({x:0}, 200);
			createjs.Tween.get(song_2).to({x:0}, 200);
			createjs.Tween.get(song_3).to({x:-50}, 200);
	});

	//Play button

	var play = new createjs.Shape();
	play.alpha=0.5;
	play.graphics.beginFill("#99FFFF").drawCircle(window.innerWidth/2, window.innerHeight/2-150, 100);

  var play_text = new createjs.Text('PLAY','bold 65px Arial','#FF0000');
	play_text.x=window.innerWidth/2-play_text.getMeasuredWidth()/2;
	play_text.y=window.innerHeight/2-150-play_text.getMeasuredHeight()/2;
	play_text.shadow = new createjs.Shadow("#f44295", 0, 5, 10);
	SelectView.addChild(play_text,play,diff_easy,diff_middle,diff_hard,diff_hell,diff_easy_text,diff_middle_text,diff_hard_text,diff_hell_text,song_0,song_1,song_2,song_3,song_0_text,song_1_text,song_2_text,song_3_text);

	stage.addChild(SelectView);

	play.addEventListener("click",tweenSelecePage);

}

function tweenSelecePage(){
    // Start Game
    createjs.Tween.get(SelectView).to({y:-1000}, 0).call(viewSetting);
		createjs.Ticker.addEventListener("tick", song);
}

function rankText(name,number){
	let rank_tmp =  new createjs.Text(number+'.'+name, '20px Arial', '#FFFF99');
	rank_tmp.x = 120;
	rank_tmp.y = 110 + 50*number;
	return rank_tmp;
}

function diff(number){
	var diff_tmp = new createjs.Shape();
	diff_tmp.alpha=0.7;
	diff_tmp.graphics.beginFill("#CCFFCC").drawRoundRectComplex(350+130*number, window.innerHeight-210, 100 ,250,45,45,0,0);
	return diff_tmp;
}

function diff_text(name,number){
	var diff_text_tmp = new createjs.Text(name, '35px Arial', '#CCCCCC');
	diff_text_tmp.rotation = 270;
	diff_text_tmp.x=400+130*number-diff_text_tmp.getMeasuredHeight()/2;
	diff_text_tmp.y=window.innerHeight-50;
	return diff_text_tmp;
}

function song(number){
	var song_tmp = new createjs.Shape();
	song_tmp.alpha=0.5;
	song_tmp.graphics.beginFill("#FFCCFF").drawRect(window.innerWidth-260, 50+number*100, 310 ,80);
	return song_tmp;
}

function song_text(name,number){
	var song_text_tmp = new createjs.Text(name, '35px Arial', '#CC66CC');
	song_text_tmp.x=window.innerWidth-240;
	song_text_tmp.y=90-song_text_tmp.getMeasuredHeight()/2+number*100;
	return song_text_tmp;
}

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

	circleUp=getCircle("up");
	circleDown=getCircle("down");
	circleLeft=getCircle("left");
	circleRight=getCircle("right");

	stage.addChild(circleUp);
	//stage.addChild(circleDown);
	//stage.addChild(circleLeft);
	//stage.addChild(circleRight);

	createjs.Tween.get(circleUp, {loop: true})
		.to({y: -100}, interval);
	createjs.Tween.get(circleDown, {loop: true})
		.to({y: 700}, interval);
	createjs.Tween.get(circleLeft, {loop: true})
		.to({x: -100}, interval);
	createjs.Tween.get(circleRight, {loop: true})
		.to({x: 1100}, interval);


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
