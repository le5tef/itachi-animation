//variables

var startPos = 0;
var isPlaying = false;
var currentMode = false;
var allowScroll = false;
var wrapper = document.getElementsByClassName("wrapper")[0];
var leftSide = document.getElementsByClassName("left")[0];
var rightSide = document.getElementsByClassName("right")[0];
var circles = document.getElementsByClassName('circles')[0];
var clouds = document.getElementsByClassName('clouds')[0];
var width = window.innerWidth;
var circleScale = 1;
var crowsTransition = 750;
var crowsSpeed = width / 400;
var cloudSpeed = width / 1000;
var cloudTransition = 500;
var cloudDelay = cloudTransition * 0.7;
var crowsCount = 30;
var circlesCount = 40;
var cloudsCount = 6;
var crowsDelay = crowsTransition * 0.7;
var crowSize = 200;

//main script

const main = (event) => {
    if (!isPlaying) {
        let triggered = false;
        if (event.deltaY > 0 && !currentMode) {
            animation(1);
            currentMode = true;
            triggered = true;

        }
        if (event.deltaY < 0 && currentMode && window.pageYOffset < 100) {
            animation(0);
            currentMode = false;
            allowScroll = false;
            currentOffset = window.pageYOffset
            triggered = true
        }
        if (triggered) {
            isPlaying = true;
            setTimeout(() => {
                isPlaying = false;
                if (currentMode) {
                    allowScroll = true;
                }
            }, 2000)
        }
    }

}

//clouds creating

function createClouds() {
    for (let i = 0; i < cloudsCount; i++) {
        var cloud = document.createElement("img")
        cloud.style.zIndex = '0'
        cloud.classList.add('cloud')
        cloud.src = './assets/cloud2.png'
        var rndTop = Math.round(Math.random() * 30 + 30)
        var rndScale = Math.random()
        cloud.style.transform = 'scale(' + rndScale + ')'
        cloud.style.top = rndTop + '%'
        var side
        if (i >= cloudsCount / 2) {
            side = 'right'
            cloud.style.left = '100%'
            // cloud.classList.add('cloud-right')
        }
        else {
            side = 'left'
            cloud.style.left = '-500px'
            // cloud.classList.add('cloud-left')
        }
        cloudsAnimation(side, cloud)
        clouds.appendChild(cloud)
    }
}

// clouds animation

function cloudsAnimation(side, cloud) {

    // let refreshIntervalId
    // let randomDelay = Math.round(Math.random() * 1500)
    // setTimeout(() => {
    //     refreshIntervalId = setInterval(() => {
    //         cloudsMovement(cloud, (side == 'right' ? -1 : 1) * cloudSpeed)
    //     }, 1);
    // }, cloudDelay + randomDelay)
    // setTimeout(() => {
    //     clearInterval(refreshIntervalId);

    // }, (cloudDelay) * 2.5 + randomDelay)

}

// clouds speed

function cloudsMovement(cloud, speed) {
    cloud.style.left = parseFloat(cloud.style.left) + speed + 'px';
}

// scroll to top before page loads

window.addEventListener("beforeunload", function (event) {
    window.scroll(0, 0);
});

// stop scrolling before end of animation

window.onscroll = function (event) {
    if (!allowScroll) {
        window.scroll(0, 0);

    }
}

// event on scroll for start main script

window.addEventListener('wheel', main)

// move crows per 1 tick

function crowsMovement(crow, speed) {
    crow.style.left = parseFloat(crow.style.left) + speed + 'px';
}

// set bloodmoon at back

function setBack(val) {
    document.getElementsByClassName('moon')[0].style.backgroundImage = val ? "url(./assets/moon.png)" : "url(./assets/bloodmoon.png)";
}

// set itachi image

function setItachi(val) {
    document.getElementsByClassName('itachi')[0].src = val ? './assets/noitachi.png' : './assets/shadowItachi.png';
}

// nu tut ponyatno

function crowsAnimation(pos, side, crow) {
    let refreshIntervalId
    let randomDelay = Math.round(Math.random() * 1000)
    setTimeout(() => {
        refreshIntervalId = setInterval(() => {
            crowsMovement(crow, (side == 'right' ? -1 : 1) * crowsSpeed)
        }, 1);
    }, + randomDelay)
    setTimeout(() => {
        clearInterval(refreshIntervalId);
        crow.style.left = (pos == 'center' ? -2 : -1) * crowSize + 'px';
    }, (crowsDelay) * 2.5 + randomDelay)
}
// change size of circles size per tick

function circleSizing(val) {

    circleScale *= val
    circles.style.transform = 'scale(' + val + ',' + val + ')'

}

// function for creating or set display flex to circles div

function circleCreating() {
    for (let i = 0; i < circlesCount; i++) {
        const circle = document.createElement("img");
        circle.src = './assets/circle.png'
        circle.classList.add('circle');
        circle.classList.add('circle-left');
        let rnd = Math.round(Math.random() * 400 + 10)
        circle.style.width = rnd
        circle.style.height = rnd
        circle.style.animationDuration = rnd * 10 + 'ms'
        circles.appendChild(circle)
    }
}

//

function animation(val) {
    if (!!val) {
        setBack(0)
        circleSizing(1)

        // deleting crows 
        leftSide.innerHTML = ''
        rightSide.innerHTML = ''
        // creating crows and setting for each other styles
        for (let i = 0; i < crowsCount * 2; i++) {
            const crow = document.createElement("img")
            let rnd = Math.round(Math.random() * 15) + 40
            crow.style.width = crowSize
            crow.style.height = crowSize
            crow.style.zIndex = 5
            crow.style.top = rnd + '%'
            crow.style.transform = 'translateY(-50%)'
            let side
            // setting sides 2 them
            if (i >= crowsCount) {
                side = 'right';
            }
            else {
                side = 'left'
            }
            crow.src = './assets/crows/crow' + (Math.floor((Math.random() * 3)) + 1) + '.png';
            crow.style.position = 'absolute';
            if (side === "right") {
                crow.style.left = width / 2 + 'px';
                crow.style.transform = ' scaleX(-1) translateY(-50%)';

                rightSide.appendChild(crow)
                crowsAnimation('sides', 'right', crow)

            }
            if (side === "left") {
                crow.style.left = -crowSize + 'px';
                leftSide.appendChild(crow)
                crowsAnimation('sides', 'left', crow)
            }
        }

        // starts animation and ends it for 1.75 delay
        setTimeout(() => {
            circleCreating()
            setTimeout(() => {
                circleSizing(3)
                setTimeout(() => {
                    circleSizing(0.5)
                    setTimeout(() => {
                        circles.innerHTML = ''
                    }, crowsDelay)
                }, crowsDelay / 2)
            }, crowsDelay / 3)
        }, crowsDelay * 1.5)
        setTimeout(() => {
            setItachi(0)
        }, crowsDelay * 2.25)

    }
    else {

        circleSizing(0.5)
        // creating crows for disappear animation
        for (let i = 0; i < crowsCount * 2; i++) {
            const crow = document.createElement("img")
            crow.style.width = crowSize
            crow.style.height = crowSize
            let rnd = Math.round(Math.random() * 15) + 40
            crow.style.top = rnd + '%'
            crow.style.transform = ''
            let side
            if (i >= crowsCount) {
                side = 'right';
            }
            else {
                side = 'left'
            }
            crow.src = './assets/crows/crow' + (Math.floor((Math.random() * 3)) + 1) + '.png';
            crow.style.position = 'absolute';
            if (side === "right") {
                crow.style.left = width / 2 + 'px';
                crow.style.transform = 'scaleX(-1) translateY(-50%) translateX(50%)';
                leftSide.appendChild(crow)
                crowsAnimation('center', 'right', crow)
            }
            if (side === "left") {
                crow.style.left = 0 + 'px';
                crow.style.transform = 'translateX(-50%) translateY(-50%)'
                rightSide.appendChild(crow)
                crowsAnimation('center', 'left', crow)
            }
        }
        circleCreating()
        setTimeout(() => {
            circleSizing(1000)
            setItachi(1)
            setBack(1)
            setTimeout(() => {
                circles.innerHTML = ''

                circleSizing(1)
            }, 500)
        }, crowsDelay * 2)
    }
}
// createClouds()

