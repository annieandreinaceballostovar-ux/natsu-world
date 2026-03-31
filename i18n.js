/**
 * NATSU WORLD - i18n.js 🌍
 * Sistema de traducción automática con persistencia
 */

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
        ajustes: 'Ajustes'
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
        ajustes: 'Settings'
    }
};

/**
 * Obtiene el idioma actual guardado o el del navegador
 */
function getLang() {
    let lang = localStorage.getItem('idioma') || navigator.language.slice(0, 2);
    return mensajes[lang] ? lang : 'es'; // Si el idioma no existe, por defecto español
}

/**
 * Traduce una clave específica (Uso manual)
 */
function traducir(key) {
    const lang = getLang();
    return mensajes[lang][key] || mensajes['es'][key] || key;
}

/**
 * Actualiza TODOS los elementos del HTML que tengan el atributo data-i18n
 */
function actualizarInterfaz() {
    const elementos = document.querySelectorAll('[data-i18n]');
    const lang = getLang();

    elementos.forEach(el => {
        const key = el.getAttribute('data-i18n');
        const traduccion = mensajes[lang][key] || mensajes['es'][key];

        if (traduccion) {
            // Si es un input, traducimos el placeholder
            if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                el.placeholder = traduccion;
            } else {
                el.textContent = traduccion;
            }
        }
    });

    // Actualiza el atributo lang del HTML para accesibilidad
    document.documentElement.lang = lang;
}

/**
 * Cambia el idioma y refresca la vista
 */
function cambiarIdioma(nuevoLang) {
    localStorage.setItem('idioma', nuevoLang);
    actualizarInterfaz();
}

// Ejecutar automáticamente cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', actualizarInterfaz);