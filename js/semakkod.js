function rekodGPS(kod){

if(!navigator.geolocation){
return;
}

navigator.geolocation.getCurrentPosition(function(pos){

const lat = pos.coords.latitude;
const lng = pos.coords.longitude;

fetch(
CONFIG.API_URL +
"?gps=1&kod="+kod+
"&lat="+lat+
"&lng="+lng
);

});

}






const data = await fetchKodSiri(kod);

if(!data.success){

resultBox.innerHTML="❌ Kod tidak sah";

return;

}

// rekod GPS pengguna
rekodGPS(kod);
