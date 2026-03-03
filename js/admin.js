
import { auth, db } from "./firebase-config.js";
import { signInWithEmailAndPassword, signOut }
from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { collection, getDocs, setDoc, doc }
from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

window.login = async function(){
 const email=document.getElementById("email").value;
 const password=document.getElementById("password").value;
 await signInWithEmailAndPassword(auth,email,password);
 alert("Login berjaya");
}

window.logout = async function(){
 await signOut(auth);
 alert("Logout berjaya");
}

window.drawWinner = async function(){
 const snapshot=await getDocs(collection(db,"codes"));
 let eligible=[];
 snapshot.forEach(d=>{
  const data=d.data();
  if(data.redeemed===true) eligible.push(data);
 });
 if(eligible.length===0){alert("Tiada layak");return;}
 const winner=eligible[Math.floor(Math.random()*eligible.length)];
 await setDoc(doc(db,"winners","latest"),winner);
 alert("Pemenang dipilih!");
}

import { onSnapshot, collection } 
from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const ctx = document.getElementById('statsChart').getContext('2d');
let chart;

function initChart(count){
  chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: [new Date().toLocaleTimeString()],
      datasets: [{
        label: 'Jumlah Tebusan',
        data: [count],
        borderColor: '#d4af37',
        tension: 0.4
      }]
    }
  });
}

onSnapshot(collection(db,"redemptions"), (snapshot)=>{
  const count = snapshot.size;
  if(!chart){
    initChart(count);
  } else {
    chart.data.labels.push(new Date().toLocaleTimeString());
    chart.data.datasets[0].data.push(count);
    chart.update();
  }
});
