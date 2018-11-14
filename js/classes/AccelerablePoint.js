class AccelerablePoint extends Point 
{
    // accelY;
    // wind; //{ xAxis zAxis }
    // globalWind

    constructor(x, y, accelY = 1, wind = { xAxis: 0, zAxis:0 }) {
        super(x, y);
        this.accelY = accelY; 
        this.wind = wind;
        this.globalWind = 1;
        
    }

    setAccelY(accelY) {
        this.accelY = accelY;
    }

    setWind({xAxis, zAxis}) {
        this.wind = {
            xAxis,
            zAxis
        };
    }

    getWind() {
        return this.wind;
    }

    getWindZ() {
        return this.wind.zAxis;
    }

    applyWindX(val) {
        this.wind.xAxis += val;
    }

    setGlobalWind(val) {
        if (val< 0.4 || val > 0.4) {
            this.globalWind = val;
        }
    }

    normalizedWind() {
        return {
            xAxis: this.wind.xAxis + 1,
            zAxis: this.wind.zAxis + 1,
        }
    }

    moveBy(x, y){
        super.moveBy(x * this.normalizedWind().xAxis * this.globalWind, y * this.accelY );
    }
}