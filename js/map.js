var map = L.map('map').setView([4.5,102],6);

L.tileLayer(
'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
).addTo(map);

fetch(CONFIG.API_URL + "?map=heat")

.then(r=>r.json())

.then(data=>{

data.forEach(p=>{

L.circle([p.lat,p.lng],{

radius:20000,
color:"#ff3385"

})
.addTo(map)
.bindPopup(
`🎉 ${p.hadiah}<br>${p.negeri}`
);

});

});
