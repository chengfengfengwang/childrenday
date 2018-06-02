"use strict";
var audio = document.querySelector('#audio');
        var line = document.querySelector('.line');
        document.querySelector('.play').addEventListener('click',function(){
            line.classList.toggle('hide');
            if(line.classList.contains('hide')){
                audio.play()
            }else{
                audio.pause()
            }
        })


//random functions
function rndint(x, y) {
    return Math.floor(x + (y - x + 1) * Math.random());
}
function rndfloat(x, y) {
    return x + (y - x) * Math.random();
}

// return GET
function getGET() {
    var url = location.hash.toString();
    if (!url) return {};
    url = url.substring(1);
    if (!url) return {};

    var u = url.split("&");
    var get = {};
    for (var i in u) {
        var j = u[i].split("=");
        get[j[0]] = decodeURI(j[1]);
    }
    return get;
}

//return default DOM
function DOM_p() {
    var p = document.createElement("p");
    return p;
}
function DOM_i(char, speed) {
    var i = document.createElement("i");
    i.style.display = 'inline-block';
    i.style.opacity = 0;
    i.style.transform = "\n        translate(" + rndint(-500, 500) + "%," + rndint(-500, 500) + "%)\n        scale(" + rndfloat(0, 2) + ")\n        rotate3d(" + Math.random() + ", " + Math.random() + ", " + Math.random() + ", " + rndint(-180, 180) + "deg)\n    ";
    i.innerText = char;

    switch (speed) {
        case 'fast':
            i.style.transition = rndint(400, 600) + "ms " + rndint(0, 150) + "ms";
            break;
        case 'normal':default:
            i.style.transition = rndint(1000, 2000) + "ms " + rndint(0, 300) + "ms";
            break;
        case 'slow':
            i.style.transition = rndint(2000, 4000) + "ms " + rndint(0, 500) + "ms";
    }

    return i;
}

//////////////////////////////////////////////////

// 1. init DOM
//const GET = getGET();
var GET = { 0: "stay      foolish", 1: "stay      curious", 2: "节日快乐!", time2: "8000" };
var ps = [];
var settings = {
    time: 5000,
    size: 5,
    speed: 'normal'
};

for (var key in GET) {
    if (parseInt(key) == key) ps[key] = GET[key];else settings[key] = GET[key];
}

if (!ps.length) {
    ps = ['尽然没有设定显示内容 >.<', 'https://github.com/h2y/wordsdance'];
    settings.size = 3;
}

var DOM_stage = document.getElementById('stage'),
    body_width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
    body_height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
ps = ps.map(function (str, i) {
    var p = DOM_p();

    var chars = str.split('');

    chars = chars.map(function (char) {
        var dom = DOM_i(char, settings.speed),
            size = settings['size' + i] || settings.size;
        dom.style.fontSize = size + 'rem';

        p.appendChild(dom);
        return dom;
    });

    DOM_stage.appendChild(p);

    return chars;
});

//2.animate
//  a.hide p_now  b.p_now++  c.p_now show  d.interval
var p_now = -1;
animate();
function animate() {
    //a
    if (p_now != -1) {
        ps[p_now].map(function (i) {
            i.style.transform = "\n                translate(" + rndint(-500, 500) + "%," + rndint(-500, 500) + "%)\n                scale(" + rndfloat(0, 2) + ")\n                rotate3d(" + Math.random() + ", " + Math.random() + ", " + Math.random() + ", " + rndint(-180, 180) + "deg)\n            ";
            i.style.opacity = 0;
        });
    }

    //b
    do {
        if (++p_now >= ps.length) p_now = 0;
    } while (!ps[p_now]);

    //c
    ps[p_now].map(function (i) {
        i.style.opacity = 1;
        i.style.transform = 'none';
    });

    //背景变色
    document.body.style.backgroundColor = "hsl(" + rndint(0, 359) + ",40%,40%)";

    //d
    var delay = settings['time' + p_now] || settings.time;
    setTimeout(animate, delay);
}

document.title = 'happy childrens day!';
