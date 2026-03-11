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
