/* Matrix */
var cnvs = document.getElementById('matrix');
var cntxt = cnvs.getContext('2d');
var char = '田由甲申甴电甶男甸甹町画甼甽甾甿畀畁畂畃畄畅畆畇畈畉畊畋界畍畎畏畐畑ॐ';
char = char.split('');
var font_size = 18;

function resizeCanvas() {
    cnvs.width = window.innerWidth;
    setTimeout(function() {
        cnvs.height = window.innerHeight;
    }, 0);
};
window.onresize = resizeCanvas();
resizeCanvas();

var columns = cnvs.width/font_size;
var drops = [];
for(var x=0;x<columns;x++){
    drops[x]=1;
}

function draw(){  
    cntxt.fillStyle = 'rgba(0,0,0,0.05)';
    cntxt.fillRect(0,0,cnvs.width,cnvs.height);
    cntxt.fillStyle = '#ff000a';
    cntxt.font = font_size + 'px helvetica';
    for(var i=0;i<drops.length;i++){
        var txt = char[Math.floor(Math.random()*char.length)];
        cntxt.fillText(txt,i*font_size, drops[i]*font_size);    
        if(drops[i]*font_size>cnvs.height&&Math.random()>0.975){
            drops[i] = 0; // back to the top!   
        }
        drops[i]++;
    }
}
setInterval(draw, 30);

/* Battery */
try {
    navigator.getBattery().then(battery => {
        changeBattery(battery.level, battery.charging);
        battery.onlevelchange = () => changeBattery(battery.level, battery.charging);
        battery.onchargingchange = () => changeBattery(battery.level, battery.charging);
    });
} 
catch(e) {
    console.warn('Your browser does not support getting battery info!');
}
function changeBattery(percentage, charging) {
    percentage = (percentage * 100).toFixed() + '%';
    document.querySelector('.flow').style.height = percentage;
    document.querySelector('.amount').innerHTML = percentage;
    let color = null;
    if (percentage <= 10) color = 'red';
    else if (percentage <= 20) color = 'orange';
    document.querySelector('.flow').style.backgroundColor = color;
    document.querySelector('.amount').style.color = color;
    if (charging) document.querySelector('.flow').classList.add('charging');
    else document.querySelector('.flow').classList.remove('charging');
}

/* Typing */
var typingShuffle = function(id) {
  return document.getElementById(id);
};
var inc = 0;
var out = 0;
var str = "You have been hacked by me";
var chars = 'AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz';
var t;
var anim = function() {
    inc++;
    if (inc % 7 === 0 && out < str.length) {
        typingShuffle('anim').appendChild(document.createTextNode(str[out]));
        out++;
    } else if (out >= str.length) {
        typingShuffle('shuffle').innerHTML = '';
        removeInterval(t);
    }
    typingShuffle('shuffle').innerHTML =
    chars[Math.floor(Math.random() * chars.length)];
};
t = setInterval(anim, 30);
typingShuffle('anim').innerHTML = '';
