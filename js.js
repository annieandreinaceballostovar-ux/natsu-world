// 1. TU LLAVE (Mantenemos tu configuración)
const MI_LLAVE = "AIzaSyB0q8Vz58mvyL7dimo8FOpioPpcmPlyB8w"; 

// 2. FUNCIÓN PARA ENTRAR (Optimizada para móviles)
function enterApp(isMajor) {
    const modal = document.getElementById('age-modal');
    
    if (isMajor) {
        if (modal) {
            // Animación suave de salida
            modal.style.transition = "opacity 0.6s ease, visibility 0.6s";
            modal.style.opacity = "0";
            modal.style.visibility = "hidden";

            // Guardamos en el teléfono que ya aceptó (Local Storage)
            localStorage.setItem('natsu_world_verified', 'true');
            
            // Sonido de bienvenida
            playNotificacion();
            
            console.log("¡Bienvenida a Natsu World, Annie! 🎀");
            
            // Limpieza del DOM después de la animación
            setTimeout(() => {
                modal.style.display = "none";
            }, 600);
        }
    } else {
        // Si dice que no, lo enviamos a Google
        window.location.href = "https://www.google.com";
    }
}

// 3. CONTROL DE AUDIOS (Con manejo de errores para Vercel)
function playNotificacion() {
    const audio = new Audio('assets/sounds/notificacion.m4a');
    audio.play().catch(error => {
        console.warn("El audio no pudo reproducirse (revisa la ruta o mayúsculas):", error);
    });
}

// 4. VERIFICACIÓN AL CARGAR (Para que no salga el modal siempre)
document.addEventListener("DOMContentLoaded", () => {
    const modal = document.getElementById('age-modal');
    const yaVerifico = localStorage.getItem('natsu_world_verified');

    if (yaVerifico === 'true' && modal) {
        modal.style.display = "none";
    }
});