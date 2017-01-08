var songLength = 91;
var songContent = [30,32,34,35,40,42,44,45,50,52,54,55,56,60,62,64,70,72,74,75,80,82,84,85,90,92,94,95,96,100,102,104,110,112,114,120,124,130,132,134,140,150,152,154,160,164,170,172,174,180,190,192,194,200,204,210,212,214,220,224,230,232,234,240,244,250,252,254,260,270,274,280,282,284,290,294,300,302,304,310,314,320,322,324,330,332,334,340,350,352,354,360,362,364,370,374,380,382,384,390,392,394,400,402,404,410,414,420,422,424,430,440,450,460,464,470,472,474,480,482,484,490,492,494,500,504,510,550,560,570,580,590,600,610,620,630,634,640,650,670,672,674,680,682,684,690,694,700,702,704,710,712,714,720,722,724,730,734,740,742,744,750,760,770,780,784,790,792,794,800,802,804,810,812,814,820,824,830,870,872,874,880,884,890,892,894,900,904,910];
var measure = 1;
var beat = -1;
var workerResult;

onmessage = function(e) {
	var beatGenerator = setInterval(function(){
		if( measure > songLength ) {
			workerResult = "end";
			postMessage(workerResult);
			stopFunction();
		}
		beat++;
		if(beat==8) {
			beat = 0;
			measure++;
		}
		if( (Math.floor(songContent[0]/10)+3 == measure) && (songContent[0]%10 == beat) ) {
			console.log(measure + " "+ beat);
			songContent.shift();
			workerResult = "show";
			postMessage(workerResult);
		}
	}, 200);
	function stopFunction() {
		clearInterval(beatGenerator);
	}
}