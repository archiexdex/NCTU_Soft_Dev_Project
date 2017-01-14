var measure = 1;
var beat = -1;
var workerResult;
var bpm;
var songLength;
var songContent;
var interval;
var circleDirection;
onmessage = function(e) {
	bpm = e.data[0];
	songLength = e.data[1];
	songContent = e.data[2];
	songContent = songContent.split(",");
	console.log(songContent.length);
	circleDirection = e.data[3];
	circleDirection = circleDirection.split(",");
	console.log(circleDirection);
	interval = 60 / bpm * 1000 / 2
	console.log(interval);
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
			workerResult = circleDirection[0];
			circleDirection.shift();
			postMessage(workerResult);
		}
	}, interval);
	function stopFunction() {
		clearInterval(beatGenerator);
	}
}
