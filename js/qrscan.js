function startScanner(){

const scanner = new Html5Qrcode("reader");

scanner.start(
{facingMode:"environment"},
{
fps:10,
qrbox:250
},
(qrCodeMessage)=>{

window.location=
"semakkod.html?kod="+encodeURIComponent(qrCodeMessage);

}
);

}

startScanner();
