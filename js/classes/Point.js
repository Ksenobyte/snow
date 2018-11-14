class Point 
{
    // x;
    // y;

    constructor(x,y) {
        this.x = x;
        this.y = y;
    }

    moveTo(x,y) {
        this.x = x;
        this.y = y;
    }

    moveBy(x, y) {
        this.x += x;
        this.y += y;
    }

    getPosition() {
        return {
            x: this.x,
            y: this.y
        }
    }
}