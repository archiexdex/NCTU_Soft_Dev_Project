let stage;
let playerScore, completeRate, missCombo, perfectCombo, goodCombo;
// let GM = new GameManager('Circle.js');
let hitPadList = [];
// let hitPadUp, hitPadDown, hitPadLeft, hitPadRight;
let circleWay = [];
let circleUp, circleDown, circleLeft, circleRight;
let circleRadius = 50, hitPadRadius = 60;
let heldKeys = {};
let center = { 'x' : window.innerWidth/2, 'y' : window.innerHeight/2};
let interval = 1000;
let queue = [];


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
	console.log("QQQQQQQWQWQWQWQ");
	for (let i = 0 ; i < queue.length ; i++) {
		if ( checkEdge(queue[i]) ) {
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
		switch(e.data) {
		case "0":
			console.log("up");
			// stage.removeChild(ptr);
			tmp = new createjs.Shape();
			tmp.graphics.beginFill("Crimson").drawCircle(0, 0, 50);
			tmp.alpha=0.5;
			tmp.x = center.x;
			tmp.y = center.y;console.log(window.innerHeight/2);console.log("@@@@");
			createjs.Tween.get(tmp).to({y: center.y - window.innerHeight/2 - 100}, interval);
			stage.addChild(tmp);
			node = { circle: tmp, mode:1};
			queue.push(node);
			// stage.removeChild(circleUp);
			// circleUp = null;
			// circleUp = new createjs.Shape();
			// circleUp.graphics.beginFill("Crimson").drawCircle(0, 0, 50);
			// circleUp.x = center.x;
			// circleUp.y = center.y;
			// createjs.Tween.get(circleUp).to({y: -100}, interval);
			// stage.addChild(circleUp);
			break;
		case "1":
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
		case "2":
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
		case "3":
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
	switch (mode) {
		case 0:
			if ( node.circle.x < 0 ) {
				return true;
			}
			break;
		case 1:
			if ( node.circle.y < 0 ) {
				return true;
			}
			break;
		case 2:
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

	song[3] = new Song(3, "Hellhold", "source/Seasons_of_Asia.mp3", "Seasons of Asia Part", "source/Seasons_of_Asia_Part.mp3", songContent);

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
	finalScoreText.x = window.innerWidth/2- finalScoreText.getMeasuredWidth();
	finalScoreText.y = 100;
	finalScoreValue = new createjs.Text(playerScore.text, 'bold 50px Arial', '#0099CC');
	finalScoreValue.x = window.innerWidth/2	+100;
	finalScoreValue.y = 100;
	completeRateText = new createjs.Text('Complete Rate', 'bold 50px Arial', '#0099CC');
	completeRateText.x = window.innerWidth/2- completeRateText.getMeasuredWidth();
	completeRateText.y = 300;
	completeRateValue = new createjs.Text(completeRate.text, 'bold 50px Arial', '#0099CC');
	completeRateValue.x = window.innerWidth/2+100;
	completeRateValue.y = 300;
	playAgainButton = new createjs.Text('Play Again', 'bold 50px Arial', '#0066CC');
	playAgainButton.x = window.innerWidth/2- playAgainButton.getMeasuredWidth()/2;
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

	diff[0][0].addEventListener("mouseover", function() {
		createjs.Tween.get(diff[0][0]).to({y:-40}, 200);
		for(var i=1;i<4;i++){
		createjs.Tween.get(diff[i][0]).to({y:0}, 200);
		}
	});

	diff[1][0].addEventListener("mouseover", function() {
		createjs.Tween.get(diff[1][0]).to({y:-40}, 200);
		createjs.Tween.get(diff[0][0]).to({y:0}, 200);
		for(var i=2;i<4;i++){
		createjs.Tween.get(diff[i][0]).to({y:0}, 200);
		}
	});

	diff[2][0].addEventListener("mouseover", function() {
		createjs.Tween.get(diff[2][0]).to({y:-40}, 200);
		for(var i=0;i<2;i++){
		createjs.Tween.get(diff[i][0]).to({y:0}, 200);
		}
		createjs.Tween.get(diff[3][0]).to({y:0}, 200);
	});

	diff[3][0].addEventListener("mouseover", function() {
		createjs.Tween.get(diff[3][0]).to({y:-40}, 200);
		for(var i=0;i<3;i++){
		createjs.Tween.get(diff[i][0]).to({y:0}, 200);
		}
	});

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
	for(i=0;i<diff.length;i++) {
		SelectView.addChild(diff[i][0], diff[i][1])
	}
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

	// circleUp=getCircle("up");
	// let node = { circle:getCircle("up"), mode:1};
	// queue.push(node);
	// circleDown=getCircle("down");
	// circleLeft=getCircle("left");
	// circleRight=getCircle("right");


	hitPadList[0] = new HitPad(75, window.innerHeight/2);
	hitPadList[1] = new HitPad(window.innerWidth/2, 75);
	hitPadList[2] = new HitPad(window.innerWidth-95, window.innerHeight/2);
	hitPadList[3] = new HitPad(window.innerWidth/2, window.innerHeight-95);

	// hitPadUp = new HitPad(window.innerWidth/2, 75);
	// hitPadDown = new HitPad(window.innerWidth/2, window.innerHeight-95);
	// hitPadLeft = new HitPad(75, window.innerHeight/2);
	// hitPadRight = new HitPad(window.innerWidth-95, window.innerHeight/2);

	playerScore = new createjs.Text('0', 'bold 20px Arial', '#A3FF24');
	playerScore.x = window.innerWidth/2- playerScore.getMeasuredWidth() -300;
	playerScore.y = 20;

	completeRate = new createjs.Text('0%', 'bold 20px Arial', '#A3FF24');
	completeRate.x = window.innerWidth/2+300;
	completeRate.y = 20;

	perfectCombo = new ComboEffect('Perfect');
	goodCombo = new ComboEffect('Good');
	missCombo = new ComboEffect('Miss');

	MainView.addChild(playerScore, completeRate);
	for (var i = 0; i < hitPadList.length; i++) {
		MainView.addChild(hitPadList[i]);
	}

	stage.addChild(MainView);

}

function removeComboEffect() {
	stage.removeChild(perfectCombo);
	stage.removeChild(goodCombo);
	stage.removeChild(missCombo);
}

function updateScore(hit) {
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

	removeComboEffect();

	var perfect = 20;
	var good = 40;
	if(coord == "x" ) {
		if(circle.x<=hitPad.x+perfect && circle.x>=hitPad.x-perfect) {
			stage.addChild(perfectCombo);
			createjs.Tween.get(perfectCombo).wait(500).call( removeComboEffect );
			updateScore("perfect");
			return true;
		}
		else if(circle.x<=hitPad.x+good && circle.x>=hitPad.x-good) {
			stage.addChild(goodCombo);
			createjs.Tween.get(goodCombo).wait(500).call( removeComboEffect );
			updateScore("good");
			return true;
		}
		else if(circle.x+circleRadius>=hitPad.x-hitPadRadius && circle.x-circleRadius<=hitPad.x+hitPadRadius) {	//normal
			updateScore("normal");
			return true;
		}
		else {	//miss
			stage.addChild(missCombo);
			createjs.Tween.get(missCombo).wait(500).call( removeComboEffect );
		}
	}
	else if(coord == "y" ) {
		if(circle.y<=hitPad.y+perfect && circle.y>=hitPad.y-perfect) {
			stage.addChild(perfectCombo);
			createjs.Tween.get(perfectCombo).wait(500).call( removeComboEffect );
			updateScore("perfect");
			return true;
		}
		else if(circle.y<=hitPad.y+good && circle.y>=hitPad.y-good) {
			stage.addChild(missCombo);
			createjs.Tween.get(missCombo).wait(500).call( removeComboEffect );
			updateScore("good");
			return true;
		}
		else if(circle.y+circleRadius>=hitPad.y-hitPadRadius && circle.y-circleRadius<=hitPad.y+hitPadRadius) {	//normal
			updateScore("normal");
			return true;
		}
		else {	//miss
			stage.addChild(goodCombo);
			createjs.Tween.get(goodCombo).wait(500).call( removeComboEffect );
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
	let ptr = e.keyCode - 37;
	hitPadList[ptr].shadow = null;
	if ( ptr % 2 ) {
		if ( queue[0] != undefined && comboEffect(queue[0].circle, hitPadList[ptr], "y") ) {
			stage.removeChild(queue[0].circle);
			queue.shift();
		}
	}
	else {
		if ( queue[0] != undefined && comboEffect(queue[0].circle, hitPadList[ptr], "x") ) {
			stage.removeChild(queue[0].circle);
			queue.shift();
		}
	}
	switch(e.keyCode) {
		// case 37:
		// 	console.log("left");
		// 	// hitPadList[0].shadow = null;
		// 	// comboEffect(circleLeft, hitPadList[0], "x")
		// 	/*if( comboEffect(circleLeft, hitPadLeft, "x") ) {
		// 		stage.removeChild(circleLeft);
		// 		circleLeft = null;
		// 	}*/
		// 	break;
		// case 38:
		// 	console.log("up");
		// 	// hitPadList[1].shadow = null;
		// 	// comboEffect(circleUp, hitPadList[1], "y");
		// 	// hitPadUp.shadow = null;
		// 	// comboEffect(circleUp, hitPadUp, "y");
		// 	/*if( comboEffect(circleUp, hitPadUp, "y") ) {
		// 		stage.removeChild(circleUp);
		// 		circleUp = null;
		// 	}*/
		// 	break;
		// case 39:
		// 	console.log("right");
		// 	// hitPadList[2].shadow = null;
		// 	// comboEffect(circleRight, hitPadList[2], "x");
		// 	/*if( comboEffect(circleRight, hitPadRight, "x") ) {
		// 		stage.removeChild(circleRight);
		// 		circleRight = null;
		// 	}*/
		// 	break;
		// case 40:
		// 	console.log("down");
		// 	// hitPadList[3].shadow = null;
		// 	// comboEffect(circleDown, hitPadList[3], "y");
		// 	/*if( comboEffect(circleDown, hitPadDown, "y") ) {
		// 		stage.removeChild(circleDown);
		// 		circleDown = null;
		// 	}*/
		// 	break;
	}
};

document.onkeyup = function(e) {
	delete heldKeys[e.keyCode];
	switch(e.keyCode) {
		case 37:
			hitPadList[0].shadow = new createjs.Shadow("#f44295", 0, 5, 10);
			break;
		case 38:
			hitPadList[1].shadow = new createjs.Shadow("#f44295", 0, 5, 10);
			break;
		case 39:
			hitPadList[2].shadow = new createjs.Shadow("#f44295", 0, 5, 10);
			break;
		case 40:
			hitPadList[3].shadow = new createjs.Shadow("#f44295", 0, 5, 10);
	}
};
