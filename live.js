
import { db } from "./firebase-config.js";
import { doc, onSnapshot }
from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const display=document.getElementById("winnerDisplay");

onSnapshot(doc(db,"winners","latest"),(docSnap)=>{
 if(docSnap.exists()){
   display.innerText="TAHNIAH! "+(docSnap.data().serial || "");
 }
});
