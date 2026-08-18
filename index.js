import { initializeApp } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-app.js";
import { getAnalytics, logEvent } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-analytics.js";
import { getDatabase, ref, onValue, set, runTransaction } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyCrMLfSNOiKR8IrU0d6CkUrMofj4WKoI_c",
  authDomain: "lucky-creations-crochet.firebaseapp.com",
  databaseURL: "https://lucky-creations-crochet-default-rtdb.firebaseio.com/",
  projectId: "lucky-creations-crochet",
  storageBucket: "lucky-creations-crochet.firebasestorage.app",
  messagingSenderId: "527493766952",
  appId: "1:527493766952:web:5dac9fff5448633075ba1d",
  measurementId: "G-YLZF9540JL"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

//For syncing in real-time
onValue(ref(db, "crochet_stats"), (snapshot) => {
  const data = snapshot.val();
  document.getElementById("home-visits").innerText = data.home_visits || 0;

  document.getElementById("tricolour-visits").innerText = data.tricolour_visits || 0;
  document.getElementById("rakhis-visits").innerText = data.rakhis_visits || 0;
  document.getElementById("keychains-visits").innerText = data.keychains_visits || 0;
  document.getElementById("scrunchies-visits").innerText = data.scrunchies_visits || 0;
  document.getElementById("earrings-visits").innerText = data.earrings_visits || 0;
  document.getElementById("centerpieces-visits").innerText = data.centerpieces_visits || 0;
  document.getElementById("doilies-visits").innerText = data.doilies_visits || 0;
  document.getElementById("mini-visits").innerText = data.mini_visits || 0;
  document.getElementById("phone-visits").innerText = data.phone_visits || 0;
  document.getElementById("good-visits").innerText = data.good_visits || 0;
  document.getElementById("tie-visits").innerText = data.tie_visits || 0;
  document.getElementById("coaster-visits").innerText = data.coaster_visits || 0;
  document.getElementById("handkerchiefs-visits").innerText = data.handkerchiefs_visits || 0;
});

// Reset button logic
document.getElementById("reset-crochet-stats").addEventListener("click", () => {
  set(ref(db, "crochet_stats"), {
    home_visits: 0,

    tricolour_visits: 0,
    rakhis_visits: 0,
    keychains_visits: 0,
    scrunchies_visits: 0,
    earrings_visits: 0,
    centerpieces_visits: 0,
    doilies_visits: 0,
    mini_visits: 0,
    phone_visits: 0,
    good_visits: 0,
    tie_visits: 0,
    coaster_visits: 0,
    handkerchiefs_visits: 0,
  });
});

// Defines a function to attach increase and decrease buttons to a counter without repitition
function attachCounter(id, path) {
  document.getElementById(`decrease-${id}`).addEventListener("click", () => {
    runTransaction(ref(db, `crochet_stats/${path}`), n => Math.max((n || 0) - 1, 0));
  });
  document.getElementById(`increase-${id}`).addEventListener("click", () => {
    runTransaction(ref(db, `crochet_stats/${path}`), n => Math.max((n || 0) + 1, 0));
  });
}

// Calling the function for each category
attachCounter("home-visits", "home_visits");

attachCounter("tricolour-visits", "tricolour_visits");
attachCounter("rakhis-visits", "rakhis_visits");
attachCounter("keychains-visits", "keychains_visits");
attachCounter("scrunchies-visits", "scrunchies_visits");
attachCounter("earrings-visits", "earrings_visits");
attachCounter("centerpieces-visits", "centerpieces_visits");
attachCounter("doilies-visits", "doilies_visits");
attachCounter("mini-visits", "mini_visits");
attachCounter("phone-visits", "phone_visits");
attachCounter("good-visits", "good_visits");
attachCounter("tie-visits", "tie_visits");
attachCounter("coaster-visits", "coaster_visits");
attachCounter("handkerchiefs-visits", "handkerchiefs_visits");
