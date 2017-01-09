let stage;
let playerScore, completeRate, missCombo, perfectCombo, goodCombo;
let hitPadUp, hitPadDown, hitPadLeft, hitPadRight;
let circleUp, circleDown, circleLeft, circleRight;
let circleRadius = 50, hitPadRadius = 60;
let heldKeys = {};
let center = { 'x' : 500, 'y' : 300};
let interval = 1000;
let list = [];
let index = 0;

var song = [];
var worker = new Worker('worker.js');
var songSelected = 0;
var songContent;
var MainView = new createjs.Container();

var totalHit = 0;
//Final score page
var finalScoreText;
var finalScoreValue;
var completeRateText;
var completeRateValue;
var playAgainButton;
var FinalView = new createjs.Container();

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

class Song {
	constructor(songNumber, songName, songSource, songPartName, songPartSource, songContent) {
		this.songNumber = songNumber;
		this.songName = songName;
		this.songSource = songSource;
		this.songPartName = songPartName;
		this.songPartSource = songPartSource;
		createjs.Sound.registerSound(this.songSource, this.songName);
		createjs.Sound.registerSound(this.songPartSource, this.songPartName);
		this.songContent = songContent;
	}
	create() {
		var song_tmp = new createjs.Shape();
		song_tmp.alpha = 0.5;
		song_tmp.graphics.beginFill("#FFCCFF").drawRect(window.innerWidth-260, 50 + this.songNumber*100, 310 ,80);
		var song_text_tmp = new createjs.Text(this.songName, '35px Arial', '#CC66CC');
		song_text_tmp.x = window.innerWidth-240;
		song_text_tmp.y = 90-song_text_tmp.getMeasuredHeight()/2 + this.songNumber*100;
		song_tmp.addEventListener("mouseover", function() {
			createjs.Tween.get(song_tmp).to({x:-50}, 200);
		});
		song_tmp.addEventListener("mouseout", function() {
			createjs.Tween.get(song_tmp).to({x:0}, 200);
		});
		song_tmp.on("click", function(event){
			songSelected = this.songNumber;
			createjs.Sound.stop();
            createjs.Sound.play(this.songPartName);
        }, this);
		return [song_tmp, song_text_tmp];
	}
}

function readTextFile(file) {
	var rawFile = new XMLHttpRequest();
	rawFile.open("GET", file, false);
	rawFile.onreadystatechange = function ()
	{
		if(rawFile.readyState === 4)
		{
			if(rawFile.status === 200 || rawFile.status == 0)
			{
				var allText = rawFile.responseText;
				songContent = allText.split("\n");
			}
		}
	}
	rawFile.send(null);
}

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

		diff_tmp.addEventListener("mouseover", function() {
			createjs.Tween.get(diff_tmp).to({y:-40}, 200);
		});
		diff_tmp.addEventListener("mouseout", function() {
			createjs.Tween.get(diff_tmp).to({y:0}, 200);
		});
		return [diff_tmp, diff_text_tmp]
	}
}

worker.onmessage = function(e) {
	if( e.data == "end" ) {
		createjs.Sound.stop();
		stage.removeChild(MainView);
		addFinalScoreView();
	}
	else if ( e.data == "show" ) {
		stage.removeChild(circleUp);
		circleUp = null;
		circleUp = new createjs.Shape();
		circleUp.graphics.beginFill("Crimson").drawCircle(0, 0, 50);
		circleUp.x = center.x;
		circleUp.y = center.y;
		createjs.Tween.get(circleUp).to({y: -100}, interval);
		stage.addChild(circleUp);
	}
}

function init() {
	
	readTextFile("source/Seasons_of_Asia.txt");
	song[0] = new Song(0, "Seasons of Asia", "source/Seasons_of_Asia.mp3", "Seasons of Asia Part", "source/Seasons_of_Asia_Part.mp3", songContent);
	readTextFile("source/LOVE_War.txt");
	song[1] = new Song(1, "LOVE戦!!", "source/LOVE_War.mp3", "LOVE戦!! Part", "source/LOVE_War_Part.mp3", songContent);
	
	song[2] = new Song(2, "Lean on", "source/Seasons_of_Asia.mp3", "Seasons of Asia Part", "source/Seasons_of_Asia_Part.mp3", songContent);
	
	song[3] = new Song(3, "Hellhold", "source/Seasons_of_Asia.mp3", "Seasons of Asia Part", "source/Seasons_of_Asia_Part.mp3", songContent);
	
	
	stage = new createjs.Stage("demoCanvas");
	stage.canvas.width = window.innerWidth-20;
	stage.canvas.height = window.innerHeight-20;

	stage.mouseEventsEnabled = true;
	stage.enableMouseOver();

	var bg_width;
	var bg_height;
	bg = new createjs.Bitmap("bg.jpg");
	var img = new Image();
	img.onload = function() {
		bg_width=this.width;
		bg_height=this.height;
		bg.scaleX=window.innerWidth/bg_width;
		bg.scaleY=window.innerHeight/bg_height;
	}
	img.src = 'bg.jpg';
	stage.addChild(bg);

	createjs.Ticker.setFPS(60);
	createjs.Ticker.addEventListener("tick", stage);
	addTitleView();
}

function addFinalScoreView() {
	finalScoreText = new createjs.Text('Final Score', 'bold 50px Arial', '#0099CC');
	finalScoreText.x = 300;
	finalScoreText.y = 100;
	finalScoreValue = new createjs.Text(playerScore.text, 'bold 50px Arial', '#0099CC');
	finalScoreValue.x = 700;
	finalScoreValue.y = 100;
	completeRateText = new createjs.Text('Complete Rate', 'bold 50px Arial', '#0099CC');
	completeRateText.x = 200;
	completeRateText.y = 300;
	completeRateValue = new createjs.Text(completeRate.text, 'bold 50px Arial', '#0099CC');
	completeRateValue.x = 700;
	completeRateValue.y = 300;
	playAgainButton = new createjs.Text('Play Again', 'bold 50px Arial', '#0099CC');
	playAgainButton.x = 400;
	playAgainButton.y = 500;
	FinalView.addChild(finalScoreText, finalScoreValue, completeRateText, completeRateValue, playAgainButton);
	stage.addChild(FinalView);
	
	playAgainButton.on("click", function(event){
		stage.removeChild(FinalView);
		location.reload();
    }, this);

}

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

	start_button.on("click", function(event){
		 createjs.Tween.get(TitleView).to({y:-700}, 300).call(selectPage);
    }, this);
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

	var diff_easy = new Difficulty(0, 'EASY');
	var diff_middle = new Difficulty(1, 'MIDDLE');
	var diff_hard = new Difficulty(2, 'HARD');
	var diff_hell = new Difficulty(3, 'HELL');
	var diff = [];
	diff[0] = diff_easy.create();
	diff[1] = diff_middle.create();
	diff[2] = diff_hard.create();
	diff[3] = diff_hell.create();

	//song select

	var songObj = [];
	songObj[0] = song[0].create();
	songObj[1] = song[1].create();
	songObj[2] = song[2].create();
	songObj[3] = song[3].create();

	//Play button

	var play = new createjs.Shape();
	play.alpha=0.5;
	play.graphics.beginFill("#99FFFF").drawCircle(window.innerWidth/2, window.innerHeight/2-120, 100);

	var play_text = new createjs.Text('PLAY','bold 65px Arial','#FF0000');
	play_text.x=window.innerWidth/2-play_text.getMeasuredWidth()/2;
	play_text.y=window.innerHeight/2-120-play_text.getMeasuredHeight()/2;
	play_text.shadow = new createjs.Shadow("#f44295", 0, 5, 10);
	SelectView.addChild(play_text, play);
	for(var i=0;i<diff.length;i++) {
		SelectView.addChild(diff[i][0], diff[i][1])
	}
	for(var i=0;i<songObj.length;i++) {
		SelectView.addChild(songObj[i][0], songObj[i][1]);
	}
	stage.addChild(SelectView);

	play.addEventListener("click",tweenSelecePage);

}

function tweenSelecePage(){
    // Start Game
	createjs.Sound.stop();
    createjs.Tween.get(SelectView).to({y:-1000}, 0).call(viewSetting);
	stage.removeChild(SelectView);
	createjs.Sound.play(song[songSelected].songName);
	worker.postMessage(song[songSelected].songContent);
	
}

function rankText(name,number){
	let rank_tmp =  new createjs.Text(number+'.'+name, '20px Arial', '#FFFF99');
	rank_tmp.x = 120;
	rank_tmp.y = 110 + 50*number;
	return rank_tmp;
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
/*
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
*/

	hitPadUp = new createjs.Shape();
	hitPadUp.graphics.beginFill("Pink").drawCircle(0, 0, 60);
	hitPadUp.x = 500;
	hitPadUp.y = 70;
	hitPadUp.shadow = new createjs.Shadow("#f44295", 0, 5, 10);

	hitPadDown = new createjs.Shape();
	hitPadDown.graphics.beginFill("Pink").drawCircle(0, 0, 60);
	hitPadDown.x = 500;
	hitPadDown.y = 530;
	hitPadDown.shadow = new createjs.Shadow("#f44295", 0, 5, 10);

	hitPadLeft = new createjs.Shape();
	hitPadLeft.graphics.beginFill("Pink").drawCircle(0, 0, 60);
	hitPadLeft.x = 70;
	hitPadLeft.y = 300;
	hitPadLeft.shadow = new createjs.Shadow("#f44295", 0, 5, 10);

	hitPadRight = new createjs.Shape();
	hitPadRight.graphics.beginFill("Pink").drawCircle(0, 0, 60);
	hitPadRight.x = 930;
	hitPadRight.y = 300;
	hitPadRight.shadow = new createjs.Shadow("#f44295", 0, 5, 10);

	playerScore = new createjs.Text('0', 'bold 20px Arial', '#A3FF24');
	playerScore.x = 200;
	playerScore.y = 20;

	completeRate = new createjs.Text('0%', 'bold 20px Arial', '#A3FF24');
	completeRate.x = 800;
	completeRate.y = 20;

	perfectCombo = new createjs.Text('Perfect', 'bold 50px Arial', '#A3FF24');
	perfectCombo.x = 400;
	perfectCombo.y = 200;

	goodCombo = new createjs.Text('Good', 'bold 50px Arial', '#A3FF24');
	goodCombo.x = 400;
	goodCombo.y = 200;

	missCombo = new createjs.Text('Miss', 'bold 50px Arial', '#A3FF24');
	missCombo.x = 400;
	missCombo.y = 200;
	
	MainView.addChild(hitPadUp, hitPadDown, hitPadLeft, hitPadRight, playerScore, completeRate);
	stage.addChild(MainView);

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
function updataScore(hit) {
	if(hit=="perfect") {
		playerScore.text = parseInt(playerScore.text + 3);
	}
	else if(hit=="good") {
		playerScore.text = parseInt(playerScore.text + 2);
	}
	else if(hit=="normal") {
		playerScore.text = parseInt(playerScore.text + 1);
	}
	totalHit++;
	completeRate.text = Math.floor((totalHit/songContent[2].split(",").length)*10000)/100 + "%";
}
function comboEffect(circle, hitPad, coord) {
	var perfect = 20;
	var good = 40;
	if(coord=="x") {
		if(circle.x<=hitPad.x+perfect && circle.x>=hitPad.x-perfect) {
			stage.addChild(perfectCombo);
			createjs.Tween.get(perfectCombo).wait(500).call( removePerfectCombo );
			updataScore("perfect");
			return true;
		}
		else if(circle.x<=hitPad.x+good && circle.x>=hitPad.x-good) {
			stage.addChild(goodCombo);
			createjs.Tween.get(goodCombo).wait(500).call( removeGoodCombo );
			updataScore("good");
			return true;
		}
		else if(circle.x+circleRadius>=hitPad.x-hitPadRadius && circle.x-circleRadius<=hitPad.x+hitPadRadius) {	//normal
			updataScore("normal");
			return true;
		}
		else {	//miss
			stage.addChild(missCombo);
			createjs.Tween.get(missCombo).wait(500).call( removeMissCombo );
		}
	}
	else if(coord=="y") {
		if(circle.y<=hitPad.y+perfect && circle.y>=hitPad.y-perfect) {
			stage.addChild(perfectCombo);
			createjs.Tween.get(perfectCombo).wait(500).call( removePerfectCombo );
			updataScore("perfect");
			return true;
		}
		else if(circle.y<=hitPad.y+good && circle.y>=hitPad.y-good) {
			stage.addChild(missCombo);
			createjs.Tween.get(missCombo).wait(500).call( removeMissCombo );
			updataScore("good");
			return true;
		}
		else if(circle.y+circleRadius>=hitPad.y-hitPadRadius && circle.y-circleRadius<=hitPad.y+hitPadRadius) {	//normal
			updataScore("normal");
			return true;
		}
		else {	//miss
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
