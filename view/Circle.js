
class GameManager {
    constructor(width, height, radius) {
        let que = [];
        var hitPadList = { 0:[75, height/2], 1:[width/2, 75], 2:[width-95, height/2], 3:[width/2, height-95] };
    }

    check() {
        let flg = false;
        let ptr = que[0];
        let pad = hitPadList[ptr.mode];
        if( abs(ptr.x - pad.x) < radius && abs(ptr.y - pad.y) < radius ){
            // do something
            flg = true;
        }
        return flg;
    }

    pop() {
        que.shift();
    }

    getHitPadList() {
        return hitPadList;
    }
    push(mode) {
      var tmp;
        switch (mode) {
            case "left":
    			       tmp = { x: 0, y:0, r:50, mode:0};
    			break;
            case "up":
                tmp = { x: 0, y:0, r:50, mode:1};
    			// tmp.graphics.beginFill("Crimson").drawCircle(0, 0, 50);
    			break;
            case "right":
                tmp = { x: 0, y:0, r:50, mode:2};
                break;
            case "down":
    			tmp = { x: 0, y:0, r:50, mode:3};
    			break;
    	}
        que.push(tmp);
    }

}
