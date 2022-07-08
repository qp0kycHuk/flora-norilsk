import getSupportedEvents, { support } from './functions/getSupportedEvents';

function swipe(el, settings) {

    var settings = Object.assign({}, {
        minDist: 60,
        maxDist: 120,
        maxTime: 700,
        minTime: 50
    }, settings);


    if (settings.maxTime < settings.minTime) settings.maxTime = settings.minTime + 500;
    if (settings.maxTime < 100 || settings.minTime < 50) {
        settings.maxTime = 700;
        settings.minTime = 50;
    }


    let dir
    let dist
    let startTarget
    let endTarget
    let isMouse = false
    let isMouseDown = false
    let startX = 0
    let distX = 0
    let startY = 0
    let distY = 0
    let startTime = 0

    const events = getSupportedEvents();

    if ((support.pointer && !support.touch) || events.type === "mouse") isMouse = true;

    el.addEventListener(events.start, checkStart);


    function eventsUnify(e) {
        return e.changedTouches ? e.changedTouches[0] : e;
    };

    function checkStart(e) {
        var event = eventsUnify(e);
        if (support.touch && typeof e.touches !== "undefined" && e.touches.length !== 1) return;
        dir = "none";
        dist = 0;
        startX = event.pageX;
        startY = event.pageY;
        distX = 0
        distY = 0
        startTarget = e.target;
        startTime = new Date().getTime();
        if (isMouse) isMouseDown = true;

        el.addEventListener(events.move, checkMove);
        el.addEventListener(events.end, checkEnd);
    };


    function checkMove(e) {
        if (isMouse && !isMouseDown) return;
        var event = eventsUnify(e);

        distX = event.pageX - startX;
        distY = event.pageY - startY;

        if (Math.abs(distX) > Math.abs(distY)) dir = (distX < 0) ? "left" : "right";
        else dir = (distY < 0) ? "up" : "down";

        dist = (dir === "left" || dir === "right") ? Math.abs(distX) : Math.abs(distY);

        var endTime = new Date().getTime();
        var time = endTime - startTime;

        var swipeEvent = new CustomEvent("swipemove", {
            bubbles: true,
            cancelable: true,
            detail: {
                full: e,
                dir: dir,
                dist: dist,
                distX,
                distY,
                time: time,
                startX: startX,
                startY: startY,
                startTarget: startTarget,
                endTarget: endTarget
            }
        });
        el.dispatchEvent(swipeEvent);

    };


    function checkEnd(e) {
        if (isMouse && !isMouseDown) {
            isMouseDown = false;

            return;
        }
        el.removeEventListener(events.move, checkMove);

        endTarget = e.target;
        var endTime = new Date().getTime();
        var time = endTime - startTime;

        dist = (dir === "left" || dir === "right") ? Math.abs(distX) : Math.abs(distY);


        var swipeEvent = new CustomEvent("swipeend", {
            bubbles: true,
            cancelable: true,
            detail: {
                full: e,
                dir: dir,
                dist: dist,
                distX,
                distY,
                time: time,
                startX: startX,
                startY: startY,
                startTarget: startTarget,
                endTarget: endTarget
            }
        });
        el.dispatchEvent(swipeEvent);


    };
};

const init = () => {
    swipe(document);

}


export default { init }