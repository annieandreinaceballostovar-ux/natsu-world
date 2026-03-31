// 1. CONFIGURACIÓN DE MEMORIA (Supabase)
const supabaseUrl = 'https://qfsqgfqjhgqdxcgtkwak.supabase.co';
const supabaseKey = 'sb_publishable_bZGiMk89JbDSM1CoZx_s3Q_gRGM-qDd';
const _supabase = supabase.createClient(supabaseUrl, supabaseKey);

// 2. CONFIGURACIÓN DE INTELIGENCIA (IA Gemini)
// Pega tu llave de la IA entre las comillas de abajo
const IA_KEY = "AIzaSyB0q8Vz58mvyL7dimo8FOpioPpcmPlyB8w"; 

// 3. SONIDO DE BIENVENIDA
const sonidoExito = new Audio('https://www.soundjay.com/misc/sounds/magic-chime-01.mp3');

// --- FUNCIONES DE NATSU WORLD ---

// Función para guardar usuarios en la tabla 'perfiles'
async function registrarNuevoUsuario(nombre, mail, foto) {
    const { data, error } = await _supabase
        .from('perfiles')
        .insert([{ 
            usuario: nombre, 
            correo: mail, 
            foto_url: foto 
        }]);

    if (error) {
        console.error('Error al guardar:', error.message);
        alert("¡Oh no! Hubo un problema al guardar tu perfil. 🌸");
    } else {
        // Sonido y mensaje de éxito
        sonidoExito.play().catch(() => console.log("El sonido espera un clic."));
        alert(`¡Bienvenido a Natsu World, ${nombre}! ✨ Tu perfil ha sido creado.`);
        
        // Limpiamos los cuadritos del formulario
        document.getElementById('nombre-usuario').value = "";
        document.getElementById('correo-usuario').value = "";
    }
}

// Escuchar el clic del botón de registro que pusimos en el HTML
document.addEventListener('DOMContentLoaded', () => {
    const botonRegistro = document.getElementById('btn-registrar');
    
    if (botonRegistro) {
        botonRegistro.addEventListener('click', async () => {
            const nombre = document.getElementById('nombre-usuario').value;
            const correo = document.getElementById('correo-usuario').value;
            const fotoKawaii = "https://img.icons8.com/bubbles/100/000000/kawaii-cupcake.png";

            if (nombre === "" || correo === "") {
                alert("¡Cielo! Por favor escribe tu nombre y correo para unirte. 🌸");
                return;
            }

            await registrarNuevoUsuario(nombre, correo, fotoKawaii);
        });
    }
});
