// 1. DICCIONARIO DE IDIOMAS (i18n)
const i18n_natsu = {
    es: { 
        bienvenida: "¡Bienvenida a Natsu World! 🧸", 
        error_edad: "Debes ser mayor de 18 años para entrar.",
        placeholder_chat: "Escríbele algo a Natsu IA...",
        btn_entrar: "Entrar al Mundo ✨"
    },
    en: { 
        bienvenida: "Welcome to Natsu World! 🧸", 
        error_edad: "You must be 18+ years old to enter.",
        placeholder_chat: "Write something to Natsu IA...",
        btn_entrar: "Enter the World ✨"
    },
    ko: { 
        bienvenida: "나츠 월드에 오신 것을 환영합니다! 🧸", 
        error_edad: "18세 이상이어야 합니다.",
        placeholder_chat: "나츠 AI에게 메시지를 보내세요...",
        btn_entrar: "세계에 들어가기 ✨"
    }
};

// 2. FUNCIÓN PARA CAMBIAR IDIOMA (Detectar y Guardar)
function detectarIdioma() {
    // Obtenemos el idioma seleccionado del <select>
    const lang = document.getElementById('login-pais').value;
    
    // Lo guardamos en la memoria del celular para que no se borre
    localStorage.setItem('natsu_lang', lang);
    
    // Cambiamos los textos en la pantalla de inicio
    const textos = i18n_natsu[lang];
    document.getElementById('txt_welcome').textContent = textos.bienvenida;
    document.getElementById('btn_acceder').textContent = textos.btn_entrar;
}

// 3. VALIDACIÓN DE ACCESO 18+
function validarAcceso() {
    const fechaInput = document.getElementById('login-fecha').value;
    if (!fechaInput) return alert("Por favor, pon tu fecha de nacimiento 🎀");

    const fechaNac = new Date(fechaInput);
    const hoy = new Date();
    let edad = hoy.getFullYear() - fechaNac.getFullYear();
    
    // Ajuste por si aún no ha cumplido años este mes
    const m = hoy.getMonth() - fechaNac.getMonth();
    if (m < 0 || (m === 0 && hoy.getDate() < fechaNac.getDate())) {
        edad--;
    }

    const idiomaActual = localStorage.getItem('natsu_lang') || 'es';

    if (edad < 18) {
        alert(i18n_natsu[idiomaActual].error_edad);
    } else {
        // Si es mayor de 18, entramos a la App
        document.getElementById('scr_login').style.display = 'none';
        document.getElementById('scr_app').classList.remove('hidden');
        mostrarSeccion('feed'); // Empieza en el Feed
    }
}
