function loadNegeriStats(){

fetch(CONFIG.API_URL + "?negeri=1")

.then(r=>r.json())

.then(data=>{

let html="";

for(let negeri in data){

html += `
<div class="stateBox">
${negeri}<br>
<b>${data[negeri]}</b>
</div>
`;

}

document.getElementById("negeriStats").innerHTML=html;

});

}

setInterval(loadNegeriStats,6000);

loadNegeriStats();
