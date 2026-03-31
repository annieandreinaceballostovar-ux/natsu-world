// CONFIGURACIÓN NATSU WORLD
const SB_URL = 'https://zndmqivzxhzxhzxhzxhz.supabase.co'; 
const SB_KEY = 'sb_publishable_bZGiMk89JbDSM1CoZx_s3Q_gRGM-qDd'; 
const GEMINI_KEY = 'AIzaSyB0q8Vz58mvyL7dimo8FOpioPpcmPlyB8w'; 

const natsuDB = supabase.createClient(SB_URL, SB_KEY);
const CREADORA = "Annie Andreina Ceballos Tovar";

// 1. Inteligencia Artificial
async function hablarConGemini(msg) {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_KEY}`;
    const res = await fetch(url, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ contents: [{ parts: [{ text: `Eres Natsu IA, asistente de Natsu World. Creada por Annie Andreina Ceballos Tovar. Sé tierna y usa emojis. El usuario dice: ${msg}` }] }] })
    });
    const json = await res.json();
    return json.candidates[0].content.parts[0].text;
}

// 2. Chat Funcional
async function procesarChat() {
    const input = document.getElementById('msg_input');
    const box = document.getElementById('chat_box');
    if(!input.value) return;

    box.innerHTML += `<div style="background:var(--natsu-rosa); color:white; padding:10px; border-radius:15px; margin-bottom:10px; align-self:flex-end;">${input.value}</div>`;
    const resp = await hablarConGemini(input.value);
    box.innerHTML += `<div style="background:white; border:1px solid #ffb6c1; padding:10px; border-radius:15px; margin-bottom:10px;">${resp}</div>`;
    input.value = "";
    box.scrollTop = box.scrollHeight;
}

// 3. Vistas y Borrado
function loadView(v) {
    const area = document.getElementById('view_area');
    window.onclick = (v === 'clips') ? (e) => {
        const h = document.createElement("div"); h.innerHTML = "❤️"; h.className = "heart-float";
        h.style.left = e.clientX - 25 + "px"; h.style.top = e.clientY - 25 + "px";
        document.body.appendChild(h); setTimeout(() => h.remove(), 1000);
    } : null;

    if (v === 'clips') {
        area.innerHTML = `<div class="clips-view"><div class="clip-card"><video src="vid_clip_natsu.mp4" autoplay loop muted style="width:100%; height:100%; object-fit:cover;"></video><div class="clip-sidebar"><img src="img_icon_corazon.png" width="35"><img src="img_icon_coment.png" width="35"></div></div></div>`;
    } else if (v === 'chats') {
        area.innerHTML = `<div style="display:flex; flex-direction:column; height:100%;"><div id="chat_box" style="flex:1; overflow-y:auto; padding:15px; display:flex; flex-direction:column;"></div><div style="padding:10px; display:flex; gap:10px;"><input type="text" id="msg_input" style="flex:1; border-radius:20px; padding:10px;"><button onclick="procesarChat()">🚀</button></div></div>`;
    } else if (v === 'feed') {
        area.innerHTML = `<div class="post-card" id="p1"><button class="btn-del" onclick="document.getElementById('p1').remove()">🗑️</button><strong>${CREADORA}</strong><div class="frame-box"><img src="img_foto_post.jpg" style="width:100%; height:100%; object-fit:cover;"><img src="img_marco_natsu.png" class="frame-overlay"></div></div>`;
    } else if (v === 'profile') {
        area.innerHTML = `<div style="text-align:center;"><div style="height:100px; background:var(--natsu-rosa);"></div><img src="img_icon_perfil.png" width="100" style="border-radius:50%; margin-top:-50px; border:4px solid white;"><h2>${CREADORA}</h2><button onclick="document.documentElement.style.setProperty('--natsu-rosa', '#a2d2ff')">Celeste</button><button onclick="document.documentElement.style.setProperty('--natsu-rosa', '#fd6698')">Rosa</button></div>`;
    }
}

// 4. Acceso
function checkAccess() {
    const b = new Date(document.getElementById('in_birth').value);
    if ((new Date().getFullYear() - b.getFullYear()) < 18) { alert("Solo 18+ 🧸"); return; }
    document.getElementById('scr_login').style.display = 'none';
    document.getElementById('scr_app').classList.remove('hidden');
    loadView('feed');
}
