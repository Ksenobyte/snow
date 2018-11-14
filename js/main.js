let animArray = [];
let windDirection = 0;
let windValue = 0;
let clickData = null;
function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

function init() {
    let canvas = document.getElementById("snow");

    let screenParams = document.documentElement.getBoundingClientRect();
    canvas.width = screenParams.width;
    canvas.height = screenParams.height;
    let ctx = canvas.getContext('2d');
    let snow = new Image();
    
    snow.addEventListener('load', () => {
        fillSnow();
        let anime = new animation();
        anime.start();
    }, false)
    snow.src = "src/img/s.png";

    canvas.addEventListener('mousemove', e => {
        windDirection = (0.5 - e.clientX / screenParams.width)*2;
    })

    canvas.addEventListener('click', e => {
        clickData = {
            x: e.clientX,
            y: e.clientY
        };
    })
        
    let oneAngle = Math.PI / 360

    function draw() {
        ctx.clearRect(0, 0, screenParams.width, screenParams.height);
        if (windDirection > windValue && windValue < 1) {
            windValue += 0.004;
        } else if ( windDirection < windValue && windValue > -1 ) {
            windValue -= 0.004;
        }
        let i = 0;
        for (const el of animArray) {
            if (clickData) {
                let oldPoint = el.getRealPosition();
                if (Math.abs(oldPoint.x - clickData.x) < el.delta && Math.abs(oldPoint.y - clickData.y) < el.delta) {
                    animArray.push(new Snow(snow, oldPoint.x, oldPoint.y, el.scale / 1.2));
                    animArray.push(new Snow(snow, oldPoint.x, oldPoint.y, el.scale / 1.2));
                    animArray.splice(i, 1);
                    clickData = null;
                    continue;
                }

            }
            el.setGlobalWind(windValue);
            el.moveBy(1, 1);
            let point = el.getRealPosition();
            ctx.save();
            ctx.translate(point.x, point.y);
            ctx.rotate(el.getAngle() * oneAngle);
            const data = el.getDrawData();
            ctx.drawImage(data.texture, data.point, data.point, data.size, data.size);
            ctx.restore();
            i++;
        }
        clickData = null;
        
    }



    function animation() {
        let _ = this;
        let holder;
        this.start = function () {
            draw();
            holder = window.requestAnimationFrame(_.start);
        }

        function stop() {
            cancelAnimationFrame(holder);
        }
    }

    function fillSnow() {
        for(let i = 0; i< 250; i++) {
            animArray.push(new Snow(snow, getRandomArbitrary(0, screenParams.width), getRandomArbitrary(-200, screenParams.height), getRandomArbitrary(20, 30)));
        }
    }


}

document.addEventListener('DOMContentLoaded', init);



