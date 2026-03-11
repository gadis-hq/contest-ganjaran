// ===============================
// CONFIG
// ===============================
const CONFIG = {
    API_URL: "https://script.google.com/macros/s/AKfycbxrj7bxTtpqjuEEWsTvzyN6nOfqucjwAYYpcKmfgwucU93LRxqt7Dg1X0GIr9eD0L4b/exec"
};

// ===============================
// SEMAK KOD
// ===============================
async function semakKod() {
    const kod = document.getElementById("kodInput").value.trim().toUpperCase();
    const resultBox = document.getElementById("result");
    const btnSijil = document.getElementById("btnSijil");

    if (!kod) {
        resultBox.innerHTML = "<span style='color:red;'>Sila masukkan kod.</span>";
        if (btnSijil) btnSijil.style.display = "none";
        return;
    }

    resultBox.innerHTML = "<em class='loading'>⏳ Sedang semak...</em>";
    if (btnSijil) btnSijil.style.display = "none";

    try {
        // ambil data dari API
        const response = await fetch(`${CONFIG.API_URL}?kod=${encodeURIComponent(kod)}`);
        if (!response.ok) throw new Error("HTTP Error " + response.status);
        const data = await response.json();

        if (!data.success) {
            resultBox.innerHTML = `<div style="color:red;">❌ ${data.message || "Kod tidak sah."}</div>`;
            return;
        }

        // ===============================
        // Rekod GPS pengguna
        // ===============================
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(pos => {
                const lat = pos.coords.latitude;
                const lng = pos.coords.longitude;
                rekodGPS(kod, lat, lng);
            }, err => {
                console.warn("GPS gagal: ", err);
            });
        }

        // ===============================
        // Animasi confetti jika kod sah
        // ===============================
        if (data.status_kod.includes("SAH") && typeof confetti === "function") {
            confetti({
                particleCount: 120,
                spread: 70,
                origin: { y: 0.6 },
                colors: ['#ff99cc','#d4af37','#fff0f5']
            });
        }

        // ===============================
        // Paparan hasil semakan penuh
        // ===============================
        const warna = data.color || "orange";

        resultBox.innerHTML = `
            <div class="resultCard">
                <h3 style="color:${warna};">${data.tajuk}</h3>
                <p><strong>Kod Siri:</strong> ${data.kod_siri}</p>
                <p><strong>Nama:</strong> ${data.nama}</p>
                <p><strong>Hadiah:</strong> ${data.hadiah}</p>
                <p><strong>Status Kod:</strong> ${data.status_kod}</p>
                <p><strong>Produk:</strong> ${data.produk || "-"}</p>
                <p><strong>Harga:</strong> ${data.harga || "-"}</p>
                <p><strong>No. Telefon:</strong> ${data.telefon || "-"}</p>
                <p><strong>No IC:</strong> ${data.ic || "-"}</p>
                <p><strong>Status Penebusan:</strong> ${data.status_penebusan}</p>
                <p><strong>Disahkan Oleh:</strong> ${data.disahkan}</p>
                <p><strong>Tarikh:</strong> ${data.tarikh ? new Date(data.tarikh).toLocaleDateString('ms-MY') : "-"}</p>
                <p><strong>Lokasi:</strong> ${data.lokasi || "-"}</p>
            </div>
        `;

        // ===============================
        // Papar butang sijil jika ada
        // ===============================
        if (btnSijil && data.sijil_url) {
            btnSijil.href = data.sijil_url;
            btnSijil.style.display = "inline-block";
        }

        // ===============================
        // Kemas kini ticker pemenang
        // ===============================
        if (typeof kemasKiniTicker === "function") {
            kemasKiniTicker(data);
        }

    } catch (error) {
        console.error("FETCH ERROR:", error);
        resultBox.innerHTML = "<div style='color:red;'>❌ Ralat sambungan server.</div>";
    }
}

// ===============================
// Rekod GPS pengguna ke Apps Script
// ===============================
function rekodGPS(kod, lat, lng) {
    fetch(`${CONFIG.API_URL}?gps=1&kod=${encodeURIComponent(kod)}&lat=${lat}&lng=${lng}`)
    .then(res => res.json())
    .then(data => console.log("GPS direkod:", data))
    .catch(err => console.warn("Gagal rekod GPS:", err));
}

// ===============================
// Scan QR Kamera
// ===============================
function startScanner() {
    const qrReader = document.getElementById("qr-reader");
    qrReader.style.display = "block";

    const html5QrCode = new Html5Qrcode("qr-reader");
    html5QrCode.start(
        { facingMode: "environment" },
        {
            fps: 10,
            qrbox: 250
        },
        (decodedText) => {
            document.getElementById("kodInput").value = decodedText;
            semakKod();
            html5QrCode.stop();
            qrReader.style.display = "none";
        },
        (errorMessage) => {
            // optional: console.warn(`QR error: ${errorMessage}`);
        }
    );
}


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
