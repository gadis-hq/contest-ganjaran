async function loadTicker(){

const res = await fetch(CONFIG.API_URL + "?ticker=1");
const data = await res.json();

let text="";

data.forEach(p => {

text += `🎉 ${p.nama} dari ${p.negeri} memenangi ${p.hadiah}  •  `;

});

document.getElementById("tickerText").innerHTML = text;

}

loadTicker();
setInterval(loadTicker,15000);
