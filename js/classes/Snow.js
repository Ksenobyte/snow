class Snow extends AccelerablePoint
{
    // texture;
    // scale; //AxA pixels
    // delta;
    // limits;
    // rotate;
    // currentAngle;
    // decreaseFactor
    // weight

    constructor(texture, x, y, scale) {
        let delta = scale / 2;
        let weight = getRandomArbitrary(15, 90);
        super(x + delta, y + delta, weight/scale, { xAxis: getRandomArbitrary(-2, 2), zAxis: 0 });
        this.texture = texture;
        this.weight = weight;
        this.scale = scale;
        this.delta = delta;
        this.limits = {
            bottom: window.innerHeight + window.innerHeight/4,
            left: 0 - window.innerWidth/6,
            right: window.innerWidth + window.innerWidth/6
        }
        this.rotate = getRandomArbitrary(-3, 3);
        this.currentAngle = 0;
        this.decreaseFactor = getRandomArbitrary(0.005, 0.06);
    }

    getAngle() {
        this.currentAngle += this.rotate;
        return this.currentAngle;
    }

    getPosition() {
        let pos = super.getPosition();

        return {
            x: pos.x - this.delta,
            y: pos.y - this.delta
        }
    }

    getRealPosition() {
        return super.getPosition()
    }

    moveBy(x, y) {
        super.moveBy(x, y)
        this.scale -= this.decreaseFactor;
        this.delta = this.scale / 2;
        this.accelY = this.weight / this.scale
        if (this.y > this.limits.bottom || this.x > this.limits.right || this.x < this.limits.left || this.scale <= 0) {
            this.x = getRandomArbitrary(0, window.innerWidth);
            this.y = getRandomArbitrary(-200, -10);
            this.wind = { xAxis: getRandomArbitrary(-2, 2), zAxis: 0 };
            this.scale = getRandomArbitrary(20, 30);
            this.accelY = getRandomArbitrary(15, 90) / this.scale;
        }
    }

    getDrawData() {
        
        return {
            texture: this.texture,
            point: -this.delta,
            size: this.scale
        }
    }

}