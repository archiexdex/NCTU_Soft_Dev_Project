var songLength = 91;
var songContent = [60,62,64,65,70,72,74,75,80,82,84,85,86,90,92,94,100,102,104,105,110,112,114,115,120,122,124,125,126,130,132,134,140,142,144,150,154,160,162,164,170,180,182,184,190,194,200,202,204,210,220,222,224,230,234,240,242,244,250,254,260,262,264,270,274,280,282,284,290,300,304,310,312,314,320,324,330,332,334,340,344,350,352,354,360,362,364,370,380,382,384,390,392,394,400,404,410,412,414,420,422,424,430,432,434,440,444,450,452,454,460,470,480,490,494,500,502,504,510,512,514,520,522,524,530,534,540,580,590,600,610,620,630,640,650,660,664,670,680,700,702,704,710,712,714,720,724,730,732,734,740,742,744,750,752,754,760,764,770,772,774,780,790,800,810,814,820,822,824,830,832,834,840,842,844,850,854,860,900,902,904,910,914,920,922,924,930,934,940];
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
		if( (Math.floor(songContent[0]/10) == measure) && (songContent[0]%10 == beat) ) {
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