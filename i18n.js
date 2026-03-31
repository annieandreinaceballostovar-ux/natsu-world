/**
 * NATSU WORLD - i18n.js 🌍
 * Sistema de traducción + Conexión Supabase + Identidad IA
 * Creado el 29 de marzo de 2026 por Annie Andreina Ceballos Tovar
 */

// 1. IDENTIDAD DE LA APP (¡No tocar! Es tu firma oficial 🧸)
const NATSU_INFO = {
    nombre: "Natsu World",
    creadora: "Annie Andreina Ceballos Tovar",
    fechaCreacion: "29 de marzo de 2026",
    mision: "La red social más aesthetic y kawaii"
};

// 2. CONFIGURACIÓN SUPABASE (Memoria de la App)
const supabaseUrl = 'https://qfsqgfqjhgqdxcgtkwak.supabase.co';
const supabaseKey = 'sb_publishable_bZGiMk89JbDSM1CoZx_s3Q_gRGM-qDd';
const _supabase = supabase.createClient(supabaseUrl, supabaseKey);

// 3. MENSAJES Y TRADUCCIONES
const mensajes = {
    es: {
        saludo: '¡Bienvenido a Natsu World! 🧸',
        publicar: 'Publicar',
        chat: 'Chat',
        subir: 'Subir',
        perfil: 'Perfil',
        ia_status: 'En línea e inteligente',
        placeholder_chat: 'Escribe un mensaje kawaii...',
        btn_enviar: 'Enviar',
        error_edad: 'Debes ser mayor de 18 años.',
        ajustes: 'Ajustes',
        registro_exito: `✨ ¡Bienvenida a casa! ${NATSU_INFO.creadora} te da la bienvenida.`
    },
    en: {
        saludo: 'Welcome to Natsu World! 🧸',
        publicar: 'Post',
        chat: 'Chat',
        subir: 'Upload',
        perfil: 'Profile',
        ia_status: 'Online and smart',
        placeholder_chat: 'Write a kawaii message...',
        btn_enviar: 'Send',
        error_edad: 'You must be 18 or older.',
        ajustes: 'Settings',
        registro_exito: `✨ Welcome home! ${NATSU_INFO.creadora} welcomes you.`
    }
};

// --- FUNCIONES DE TRADUCCIÓN ---

function getLang() {
    let lang = localStorage.getItem('idioma') || navigator.language.slice(0, 2);
    return mensajes[lang] ? lang : 'es';
}

function actualizarInterfaz() {
    const elementos = document.querySelectorAll('[data-i18n]');
    const lang = getLang();

    elementos.forEach(el => {
        const key = el.getAttribute('data-i18n');
        const traduccion = mensajes[lang][key] || mensajes['es'][key];

        if (traduccion) {
            if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                el.placeholder = traduccion;
            } else {
                el.textContent = traduccion;
            }
        }
    });
    document.documentElement.lang = lang;
}

// --- FUNCIONES DE BASE DE DATOS (Supabase) ---

async function registrarEnNatsu(nombre, email) {
    const { data, error } = await _supabase
        .from('perfiles')
        .insert([{ 
            usuario: nombre, 
            correo: email,
            creado_el: NATSU_INFO.fechaCreacion 
        }]);

    if (error) {
        console.error("Error:", error.message);
        alert("¡Ups! Hubo un problemita rosa, intenta de nuevo 🌸");
    } else {
        const lang = getLang();
        alert(mensajes[lang].registro_exito);
        
        // Limpiar campos
        document.getElementById('nombre-usuario').value = "";
        document.getElementById('correo-usuario').value = "";
    }
}

// --- CONFIGURACIÓN DE LA IA (Gemini) ---
const IA_CONFIG = {
    apiKey: "TU_LLAVE_DE_IA_AQUÍ", // <--- Pega aquí tu llave cuando la tengas
    instrucciones: `Eres la IA de ${NATSU_INFO.nombre}. Fuiste creada por ${NATSU_INFO.creadora} el ${NATSU_INFO.fechaCreacion}. Responde siempre de forma linda y kawaii.`
};

// --- INICIALIZACIÓN ---

document.addEventListener('DOMContentLoaded', () => {
    actualizarInterfaz();

    // Escuchar el botón de registro
    const btnRegistrar = document.getElementById('btn-registrar');
    if (btnRegistrar) {
        btnRegistrar.addEventListener('click', () => {
            const nombre = document.getElementById('nombre-usuario').value;
            const correo = document.getElementById('correo-usuario').value;
            
            if (nombre && correo) {
                registrarEnNatsu(nombre, correo);
            } else {
                alert("🌸 Cielo, rellena todos los campos por favor.");
            }
        });
    }
});
