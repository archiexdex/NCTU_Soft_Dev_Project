let stage;
let playerScore, completeRate, missCombo, perfectCombo, goodCombo;
// let GM = new GameManager('Circle.js');
let hitPadList = [];
let circleWay = { 0:"left", 1:"right", 2:"up", 3:"down" };
let circleRadius = 50, hitPadRadius = 60;
let heldKeys = {};
let center = { 'x' : window.innerWidth/2, 'y' : window.innerHeight/2};
let interval = 1000;
let queue = [];
let LV = 4;
let nowCombo = 0;
let maxCombo = 0;
let nowComboText;
let maxComboText;
let maxComboValue;
let finalRank;

var song = [];
var worker = new Worker('./model/worker.js');
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

setInterval("checkQueue()", 100);
function checkQueue() {
	for (let i = 0 ; i < queue.length ; i++) {
		if ( checkEdge(queue[i]) ) {
			nowComboText.text = 0;
			stage.removeChild(queue[i]);
			queue.shift();
		}
	}
}

worker.onmessage = function(e) {

	if( e.data == "end" ) {
		createjs.Sound.stop();
		stage.removeChild(MainView);
		addFinalScoreView();
	}
	else {

		let tmp = 0 , node = 0;
		let xd = parseInt(e.data) % LV;
		switch(xd) {
		case 2:
			console.log("up");
			tmp = new createjs.Shape();
			tmp.graphics.beginFill("Crimson").drawCircle(0, 0, 50);
			tmp.alpha=0.5;
			tmp.x = center.x;
			tmp.y = center.y;console.log(window.innerHeight/2);
			createjs.Tween.get(tmp).to({y: center.y - window.innerHeight/2 - 100}, interval);
			stage.addChild(tmp);
			node = { circle: tmp, mode:1};
			queue.push(node);

			break;
		case 3:
			console.log("down");
			tmp = new createjs.Shape();
			tmp.graphics.beginFill("Yellow").drawCircle(0, 0, 50);
			tmp.alpha=0.5;
			tmp.x = center.x;
			tmp.y = center.y;
			createjs.Tween.get(tmp).to({y: center.y + window.innerHeight/2 + 100 }, interval);
			stage.addChild(tmp);
			node = { circle: tmp, mode:3};
			queue.push(node);

			break;
		case 0:
			console.log("left");
			tmp = new createjs.Shape();
			tmp.graphics.beginFill("Green").drawCircle(0, 0, 50);
			tmp.alpha=0.5;
			tmp.x = center.x;
			tmp.y = center.y;
			createjs.Tween.get(tmp).to({x: center.x - window.innerWidth/2 - 100}, interval);
			stage.addChild(tmp);
			node = { circle: tmp, mode:0};
			queue.push(node);
			break;
		case 1:
			console.log("right");
			tmp = new createjs.Shape();
			tmp.graphics.beginFill("Blue").drawCircle(0, 0, 50);
			tmp.alpha=0.5;
			tmp.x = center.x;
			tmp.y = center.y;
			createjs.Tween.get(tmp).to({x: center.x + window.innerWidth/2 + 100}, interval);
			stage.addChild(tmp);
			node = { circle: tmp, mode:2};
			queue.push(node);
			break;
		}

	}
}

function checkEdge(node) {
	if ( node == undefined ){
		return false;
	}
	let mode = node.mode;
	let flg = false;
	mode = mode % LV;
	switch (mode) {
		case 0:
			if ( node.circle.x < 0 ) {
				return true;
			}
			break;
		case 2:
			if ( node.circle.y < 0 ) {
				return true;
			}
			break;
		case 1:
			if ( node.circle.x > window.innerWidth ) {
				return true;
			}
			break;
		case 3:
			if ( node.circle.y > window.innerHeight ) {
				return true;
			}
			break;
	}

	return
}

function init() {

	readTextFile("source/Seasons_of_Asia.txt");
	song[0] = new Song(0, "Seasons of Asia", "source/Seasons_of_Asia.mp3", "Seasons of Asia Part", "source/Seasons_of_Asia_Part.mp3", songContent);
	readTextFile("source/LOVE_War.txt");
	song[1] = new Song(1, "LOVE戦!!", "source/LOVE_War.mp3", "LOVE戦!! Part", "source/LOVE_War_Part.mp3", songContent);
	readTextFile("source/Natsumatsuri.txt");
	song[2] = new Song(2, "夏祭り", "source/Natsumatsuri.mp3", "Natsumatsuri Part", "source/Natsumatsuri_Part.mp3", songContent);

	song[3] = new Song(3, "To be continue", "", "", "", songContent);

	stage = new createjs.Stage("demoCanvas");
	stage.canvas.width = window.innerWidth-20;
	stage.canvas.height = window.innerHeight-20;

	stage.mouseEventsEnabled = true;
	stage.enableMouseOver();

	var bg_width;
	var bg_height;
	bg = new createjs.Bitmap("source/bg.jpg");
	var img = new Image();
	img.onload = function() {
		bg_width=this.width;
		bg_height=this.height;
		bg.scaleX=window.innerWidth/bg_width;
		bg.scaleY=window.innerHeight/bg_height;
	}
	img.src = 'source/bg.jpg';
	stage.addChild(bg);

	createjs.Ticker.setFPS(60);
	createjs.Ticker.addEventListener("tick", stage);
	addTitleView();
}

function addFinalScoreView() {
	finalScoreText = new createjs.Text('Final Score', 'bold 50px Arial', '#0099CC');
	finalScoreText.x = window.innerWidth/2 - finalScoreText.getMeasuredWidth();
	finalScoreText.y = 100;
	finalScoreValue = new createjs.Text(playerScore.text, 'bold 50px Arial', '#0099CC');
	finalScoreValue.x = window.innerWidth/2	+ 100;
	finalScoreValue.y = 100;
	
	completeRateText = new createjs.Text('Complete Rate', 'bold 50px Arial', '#0099CC');
	completeRateText.x = window.innerWidth/2 - completeRateText.getMeasuredWidth();
	completeRateText.y = 250;
	completeRateValue = new createjs.Text(completeRate.text, 'bold 50px Arial', '#0099CC');
	completeRateValue.x = window.innerWidth/2 + 100;
	completeRateValue.y = 250;
	
	playAgainButton = new createjs.Text('Play Again', 'bold 50px Arial', '#0066CC');
	playAgainButton.x = window.innerWidth/2 - playAgainButton.getMeasuredWidth()/2;
	playAgainButton.y = 550;
	
	maxComboText = new createjs.Text('Max Combo', 'bold 50px Arial', '#0099CC');
	maxComboText.x = window.innerWidth/2 - maxComboText.getMeasuredWidth();
	maxComboText.y = 400;
	maxComboValue = new createjs.Text(maxCombo, 'bold 50px Arial', '#0099CC');
	maxComboValue.x = window.innerWidth/2 + 100;
	maxComboValue.y = 400;
	
	var fullScore = song[songSelected].songContent[3].split(",").length * 3;
	var finalRankText;
	if( parseInt(playerScore.text) / fullScore > 0.8 ) {
		finalRankText = "SS";
	}
	else if( parseInt(playerScore.text) / fullScore > 0.7 ) {
		finalRankText = "S";
	}
	else if( parseInt(playerScore.text) / fullScore > 0.6 ) {
		finalRankText = "A";
	}
	else if( parseInt(playerScore.text) / fullScore > 0.5 ) {
		finalRankText = "B";
	}
	else if( parseInt(playerScore.text) / fullScore > 0.4 ) {
		finalRankText = "C";
	}
	else {
		finalRankText = "F";
	}
	finalRank = new createjs.Text(finalRankText, 'bold 500px Arial', '#ff0000');
	finalRank.alpha = 0.7;
	finalRank.x = window.innerWidth/2 - 50;
	finalRank.y = -300;
	
	FinalView.addChild(finalScoreText, finalScoreValue, completeRateText, completeRateValue, maxComboText, maxComboValue, playAgainButton, finalRank);
	stage.addChild(FinalView);
	
	createjs.Tween.get(finalRank).to({y:window.innerHeight/2 - finalRank.getMeasuredHeight()/2}, 1000);
	
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

	var rank_list_1=rankText('TO',1);
	var rank_list_2=rankText('BE',2);
	var rank_list_3=rankText('CONTINUED',3);
	var rank_list_4=rankText('XD',4);
	var rank_list_5=rankText('QAQ',5);

	SelectView.addChild(rank,rank_name,rank_list_1,rank_list_2,rank_list_3,rank_list_4,rank_list_5);

	//difficulty select

	var diff_easy = new Difficulty(0, 'EASY');
	var diff_middle = new Difficulty(1, 'MIDDLE');
	var diff_hard = new Difficulty(2, 'HARD');
	var diff_hell = new Difficulty(3, 'HELL');
	var diff = [];
	diff[0] = diff_easy.create();
	diff[1] = diff_middle.create();

	diff[0][0].addEventListener("mouseover", function() {
		createjs.Tween.get(diff[0][0]).to({y:-40}, 200);
		createjs.Tween.get(diff[1][0]).to({y:0}, 200);
	});

	diff[0][0].on("click", function(){
		LV = 2;
	}, this);

	diff[1][0].addEventListener("mouseover", function() {
		createjs.Tween.get(diff[0][0]).to({y:0}, 200);
		createjs.Tween.get(diff[1][0]).to({y:-40}, 200);
	});

	diff[1][0].on("click", function(){
		LV = 4;
	}, this);

	//song select

	var songObj = [];
	songObj[0] = song[0].create();
	songObj[1] = song[1].create();
	songObj[2] = song[2].create();
	songObj[3] = song[3].create();

	songObj[0][0].addEventListener("mouseover", function() {
		createjs.Tween.get(songObj[0][0]).to({x:-50}, 200);
		if(songObj[0][1].getMeasuredWidth()>240){
			var text_move = songObj[0][1].getMeasuredWidth()-210;
			createjs.Tween.get(songObj[0][1]).to({x:window.innerWidth-240-text_move}, 200);
		}
		else{
			createjs.Tween.get(songObj[0][1]).to({x:window.innerWidth-290}, 200);
		}
		for(var i=1;i<4;i++){
			createjs.Tween.get(songObj[i][0]).to({x:0}, 200);
			createjs.Tween.get(songObj[i][1]).to({x:window.innerWidth-240}, 200);
		}
	});

	songObj[1][0].addEventListener("mouseover", function() {
		createjs.Tween.get(songObj[1][0]).to({x:-50}, 200);
		if(songObj[1][1].getMeasuredWidth()>240){
			var text_move = songObj[1][1].getMeasuredWidth()-210;
			createjs.Tween.get(songObj[1][1]).to({x:window.innerWidth-240-text_move}, 200);
		}
		else{
			createjs.Tween.get(songObj[1][1]).to({x:window.innerWidth-290}, 200);
		}
		createjs.Tween.get(songObj[0][0]).to({x:0}, 200);
		createjs.Tween.get(songObj[0][1]).to({x:window.innerWidth-240}, 200);
		for(var i=2;i<4;i++){
			createjs.Tween.get(songObj[i][0]).to({x:0}, 200);
			createjs.Tween.get(songObj[i][1]).to({x:window.innerWidth-240}, 200);
		}
	});

	songObj[2][0].addEventListener("mouseover", function() {
		createjs.Tween.get(songObj[2][0]).to({x:-50}, 200);
		if(songObj[2][1].getMeasuredWidth()>240){
			var text_move = songObj[2][1].getMeasuredWidth()-210;
			createjs.Tween.get(songObj[2][1]).to({x:window.innerWidth-240-text_move}, 200);
		}
		else{
			createjs.Tween.get(songObj[2][1]).to({x:window.innerWidth-290}, 200);
		}
		createjs.Tween.get(songObj[3][0]).to({x:0}, 200);
		createjs.Tween.get(songObj[3][1]).to({x:window.innerWidth-240}, 200);
		for(var i=0;i<2;i++){
			createjs.Tween.get(songObj[i][0]).to({x:0}, 200);
			createjs.Tween.get(songObj[i][1]).to({x:window.innerWidth-240}, 200);
		}
	});

	songObj[3][0].addEventListener("mouseover", function() {
		createjs.Tween.get(songObj[3][0]).to({x:-50}, 200);
		if(songObj[3][1].getMeasuredWidth()>240){
			var text_move = songObj[3][1].getMeasuredWidth()-210;
			createjs.Tween.get(songObj[3][1]).to({x:window.innerWidth-240-text_move}, 200);
		}
		else{
			createjs.Tween.get(songObj[3][1]).to({x:window.innerWidth-290}, 200);
		}
		for(var i=0;i<3;i++){
			createjs.Tween.get(songObj[i][0]).to({x:0}, 200);
			createjs.Tween.get(songObj[i][1]).to({x:window.innerWidth-240}, 200);
		}
	});

	//Play button

	var play = new createjs.Shape();
	play.alpha=0.5;
	play.graphics.beginFill("#99FFFF").drawCircle(window.innerWidth/2, window.innerHeight/2-120, 100);

	var play_text = new createjs.Text('PLAY','bold 65px Arial','#FF0000');
	play_text.x=window.innerWidth/2-play_text.getMeasuredWidth()/2;
	play_text.y=window.innerHeight/2-120-play_text.getMeasuredHeight()/2;
	play_text.shadow = new createjs.Shadow("#f44295", 0, 5, 10);
	SelectView.addChild(play_text, play);
	var i;
	SelectView.addChild(diff[0][0], diff[0][1]);
	SelectView.addChild(diff[1][0], diff[1][1]);
	for(i=0;i<songObj.length;i++) {
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

	if ( LV == 2){
		hitPadList[0] = new HitPad(75, window.innerHeight/2);
		hitPadList[2] = undefined;
		hitPadList[1] = new HitPad(window.innerWidth-95, window.innerHeight/2);
		hitPadList[3] = undefined;
	}
	else {
		hitPadList[0] = new HitPad(75, window.innerHeight/2);
		hitPadList[2] = new HitPad(window.innerWidth/2, 75);
		hitPadList[1] = new HitPad(window.innerWidth-95, window.innerHeight/2);
		hitPadList[3] = new HitPad(window.innerWidth/2, window.innerHeight-95);
	}


	playerScore = new createjs.Text('0', 'bold 50px Arial', '#4B0082');
	playerScore.x = window.innerWidth/2- playerScore.getMeasuredWidth() -250;
	playerScore.y = 20;

	completeRate = new createjs.Text('0%', 'bold 40px Arial', '#A3FF24');
	completeRate.x = window.innerWidth/2+240;
	completeRate.y = 20;

	nowComboText = new createjs.Text('0', 'bold 100px Arial', '#A3FF24');
	nowComboText.x = window.innerWidth/2 - 100;
	nowComboText.y = window.innerHeight/2 - 50;
	
	perfectCombo = new ComboEffect('Perfect');
	goodCombo = new ComboEffect('Good');
	xdCombo = new ComboEffect('XD');
	missCombo = new ComboEffect('Miss');

	MainView.addChild(playerScore, completeRate, nowComboText);
	for (var i = 0; i < hitPadList.length; i++) {
		MainView.addChild(hitPadList[i]);
	}

	stage.addChild(MainView);

}

function removeComboEffect() {
	stage.removeChild(perfectCombo);
	stage.removeChild(goodCombo);
	stage.removeChild(xdCombo);
	stage.removeChild(missCombo);
}

function updateScore(hit) {
	if(hit=="perfect") {
		playerScore.text = parseInt(playerScore.text + 3);
	}
	else if(hit=="good") {
		playerScore.text = parseInt(playerScore.text + 2);
	}
	else if(hit=="xd") {
		playerScore.text = parseInt(playerScore.text + 1);
	}
	totalHit++;
	completeRate.text = Math.floor((totalHit/song[songSelected].songContent[3].split(",").length)*10000)/100 + "%";
	
	nowComboText.text = parseInt(nowComboText.text + 1);
	if( maxCombo < parseInt(nowComboText.text) ) {
		maxCombo = parseInt(nowComboText.text);
	}
}
function comboEffect(circle, hitPad, coord) {

	removeComboEffect();

	var perfect = 25;
	var good = 45;
	if(coord == "x" ) {
		if( hitPad.x == 75 ) {
			perfectCombo.x = hitPad.x - 40;
			perfectCombo.y = hitPad.y + 70;
			goodCombo.x = hitPad.x - 40;
			goodCombo.y = hitPad.y + 70;
			xdCombo.x = hitPad.x - 40;
			xdCombo.y = hitPad.y + 70;
			missCombo.x = hitPad.x - 40;
			missCombo.y = hitPad.y + 70;
		}
		else {
			perfectCombo.x = hitPad.x - 70;
			perfectCombo.y = hitPad.y + 70;
			goodCombo.x = hitPad.x - 70;
			goodCombo.y = hitPad.y + 70;
			xdCombo.x = hitPad.x - 70;
			xdCombo.y = hitPad.y + 70;
			missCombo.x = hitPad.x - 70;
			missCombo.y = hitPad.y + 70;
		}
		if ( Math.abs(circle.x - hitPad.x) <= perfect ){
			stage.addChild(perfectCombo);
			createjs.Tween.get(perfectCombo).wait(500).call( removeComboEffect );
			updateScore("perfect");
			return true;
		}
		else if( Math.abs(circle.x - hitPad.x) <= good) {
			
			stage.addChild(goodCombo);
			createjs.Tween.get(goodCombo).wait(500).call( removeComboEffect );
			updateScore("good");
			return true;
		}
		else if(circle.x+circleRadius>=hitPad.x-hitPadRadius && circle.x-circleRadius<=hitPad.x+hitPadRadius) {	//normal
			
			stage.addChild(xdCombo);
			createjs.Tween.get(xdCombo).wait(500).call( removeComboEffect );
			updateScore("xd");
			return true;
		}
		else {	//miss
			nowComboText.text = 0;
			stage.addChild(missCombo);
			createjs.Tween.get(missCombo).wait(500).call( removeComboEffect );
			// return true;
		}
	}
	else if(coord == "y" ) {
		if( hitPad.y == 75 ) {
			perfectCombo.x = hitPad.x - 40;
			perfectCombo.y = hitPad.y + 70;
			goodCombo.x = hitPad.x - 40;
			goodCombo.y = hitPad.y + 70;
			xdCombo.x = hitPad.x - 40;
			xdCombo.y = hitPad.y + 70;
			missCombo.x = hitPad.x - 40;
			missCombo.y = hitPad.y + 70;
		}
		else {
			perfectCombo.x = hitPad.x - 40;
			perfectCombo.y = hitPad.y - 100;
			goodCombo.x = hitPad.x - 40;
			goodCombo.y = hitPad.y - 100;
			xdCombo.x = hitPad.x - 40;
			xdCombo.y = hitPad.y - 100;
			missCombo.x = hitPad.x - 40;
			missCombo.y = hitPad.y - 100;
		}
		if ( Math.abs(circle.y - hitPad.y) <= perfect ){
			stage.addChild(perfectCombo);
			createjs.Tween.get(perfectCombo).wait(500).call( removeComboEffect );
			updateScore("perfect");
			return true;
		}
		else if( Math.abs(circle.y - hitPad.y) <= good) {
			stage.addChild(goodCombo);
			createjs.Tween.get(goodCombo).wait(500).call( removeComboEffect );
			updateScore("good");
			return true;
		}
		else if(circle.y+circleRadius>=hitPad.y-hitPadRadius && circle.y-circleRadius<=hitPad.y+hitPadRadius) {	//normal
			stage.addChild(xdCombo);
			updateScore("xd");
			createjs.Tween.get(xdCombo).wait(500).call( removeComboEffect );
			return true;
		}
		else {	//miss
			nowComboText.text = 0;
			stage.addChild(missCombo);
			createjs.Tween.get(missCombo).wait(500).call( removeComboEffect );
			// return true;
		}
	}
	return false;
}

// Key Setting
document.onkeydown = function(e) {
	if (heldKeys[e.keyCode] == true) {
		return;
	}
	heldKeys[e.keyCode] = true;
	switch(e.keyCode) {
		case 37:
			hitPadList[0].shadow = null;
			if ( queue[0] != undefined && comboEffect(queue[0].circle, hitPadList[0], "x") ) {
				stage.removeChild(queue[0].circle);
				queue.shift();
			}
			break;
		case 38:
			hitPadList[2].shadow = null;
			if ( queue[0] != undefined && comboEffect(queue[0].circle, hitPadList[2], "y") ) {
				stage.removeChild(queue[0].circle);
				queue.shift();
			}
			break;
		case 39:
			hitPadList[1].shadow = null;
			if ( queue[0] != undefined && comboEffect(queue[0].circle, hitPadList[1], "x") ) {
				stage.removeChild(queue[0].circle);
				queue.shift();
			}
			break;
		case 40:
			hitPadList[3].shadow = null;
			if ( queue[0] != undefined && comboEffect(queue[0].circle, hitPadList[3], "y") ) {
				stage.removeChild(queue[0].circle);
				queue.shift();
			}
	}

};

document.onkeyup = function(e) {
	delete heldKeys[e.keyCode];
	switch(e.keyCode) {
		case 37:
			hitPadList[0].shadow = new createjs.Shadow("#f44295", 0, 5, 10);
			break;
		case 38:
			hitPadList[2].shadow = new createjs.Shadow("#f44295", 0, 5, 10);
			break;
		case 39:
			hitPadList[1].shadow = new createjs.Shadow("#f44295", 0, 5, 10);
			break;
		case 40:
			hitPadList[3].shadow = new createjs.Shadow("#f44295", 0, 5, 10);
	}
};
