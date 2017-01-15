class Song {
	constructor(songNumber, songName, songSource, songPartName, songPartSource, songContent) {
		if (  songSource == "" ) {
			return;
		}
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

		song_tmp.on("click", function(event){
			songSelected = this.songNumber;
			createjs.Sound.stop();
			createjs.Sound.play(this.songPartName);
		}, this);
		return [song_tmp, song_text_tmp];
	}
}
