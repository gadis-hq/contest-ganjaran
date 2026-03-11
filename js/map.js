var map = L.map('map').setView([4.5,102],6);

L.tileLayer(
'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
).addTo(map);

fetch(CONFIG.API_URL + "?heatmap=1")

.then(r=>r.json())

.then(data=>{

let points=[];

data.forEach(p=>{
points.push([p.lat,p.lng,p.weight]);
});

L.heatLayer(points,{
radius:30,
blur:25
}).addTo(map);

});


fetch(CONFIG.API_URL + "?map=heat")

.then(r=>r.json())

.then(data=>{

data.forEach(p=>{

let marker = L.marker([p.lat,p.lng]).addTo(map);

marker.bindPopup(
`🎉 ${p.nama}<br>${p.hadiah}<br>${p.negeri}`
);

if(p.status=="TELAH DITEBUS"){

marker._icon.classList.add("blink");

}

});

});

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
