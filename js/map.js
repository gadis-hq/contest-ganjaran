var map = L.map('map').setView([4.5,102],6);

L.tileLayer(
'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
).addTo(map);

fetch(CONFIG.API_URL + "?map=heat")

.then(r=>r.json())

.then(data=>{

let heatPoints=[];

data.forEach(p=>{

if(!p.lat || !p.lng) return;

heatPoints.push([
parseFloat(p.lat),
parseFloat(p.lng),
0.5
]);

// pin lokasi pemenang
L.marker([p.lat,p.lng])
.addTo(map)
.bindPopup(
`🎉 ${p.nama}<br>${p.hadiah}<br>${p.negeri}`
);

});

// heatmap layer
L.heatLayer(
heatPoints,
{
radius:25,
blur:20,
maxZoom:10
}
).addTo(map);

});
