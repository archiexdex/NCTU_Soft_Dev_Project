var measure = 1;
var beat = -1;
var workerResult;
var bpm;
var songLength;
var songContent;
var interval;
onmessage = function(e) {
	bpm = e.data[0];
	songLength = e.data[1];
	songContent = e.data[2];
	console.log(bpm);
	console.log(songLength);
	console.log(songContent);
	songContent = songContent.split(",");
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
			workerResult = "show";
			postMessage(workerResult);
		}
	}, interval);
	function stopFunction() {
		clearInterval(beatGenerator);
	}
}