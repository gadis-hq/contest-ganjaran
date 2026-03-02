
import { db } from "./firebase-config.js";
import { doc, getDoc }
from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

window.verifyCode=async function(){
 const serial=document.getElementById("serialInput").value.trim();
 const ref=doc(db,"codes",serial);
 const snap=await getDoc(ref);
 if(!snap.exists()){result.innerText="Kod tidak sah";return;}
 if(snap.data().redeemed===true){result.innerText="Sudah ditebus";}
 else{result.innerText="Kod sah dan layak!";}
}
