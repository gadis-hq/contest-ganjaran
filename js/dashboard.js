function animateNumber(el,end){

let start=0;

const step=()=>{

start+=Math.ceil(end/40);

if(start>end) start=end;

el.innerText=start.toLocaleString();

if(start<end) requestAnimationFrame(step);

};

step();

}

function loadDashboard(){

fetch(CONFIG.API_URL + "?dashboard=1")

.then(r=>r.json())

.then(data=>{

animateNumber(
document.getElementById("totalKod"),
data.total_kod
);

animateNumber(
document.getElementById("totalTebus"),
data.total_tebus
);

animateNumber(
document.getElementById("totalBelum"),
data.total_belum
);

});

}

setInterval(loadDashboard,5000);

loadDashboard();


function loadTicker(){

fetch(CONFIG.API_URL + "?ticker=1")

.then(r=>r.json())

.then(data=>{

let text="";

data.forEach(p=>{

text += `🎉 ${p.nama} menang ${p.hadiah} dari ${p.negeri} • `;

});

document.getElementById("tickerText").innerText=text;

});

}

loadTicker();


function loadLiveCounter(){

fetch(CONFIG.API_URL + "?counter=1")

.then(r=>r.json())

.then(data=>{

animateNumber(
document.getElementById("totalSemakan"),
data.total
);

});

}

setInterval(loadLiveCounter,4000);

loadLiveCounter();


function loadRealtime(){

fetch(CONFIG.API_URL + "?analytics=1")

.then(r=>r.json())

.then(data=>{

animateNumber(
document.getElementById("liveCounter"),
data.semakan
);

});

}

setInterval(loadRealtime,3000);

loadRealtime();


function loadCounter(){

fetch(CONFIG.API_URL + "?counter=1")

.then(res => res.json())

.then(data => {

document.getElementById("liveCounter").innerText = data.total;

});

}

setInterval(loadCounter,3000);

loadCounter();
