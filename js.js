// 1. MEMORIA: Supabase
const supabaseUrl = 'https://qfsqgfqjhgqdxcgtkwak.supabase.co';
const supabaseKey = 'sb_publishable_bZGiMk89JbDSM1CoZx_s3Q_gRGM-qDd';
const _supabase = supabase.createClient(supabaseUrl, supabaseKey);

// 2. INTELIGENCIA: Google IA
const IA_KEY = "AIzaSyB0q8Vz58mvyL7dimo8FOpioPpcmPlyB8w"

// 3. SONIDO: Definimos el sonido de éxito (puedes cambiar el link por uno de Natsu)
const sonidoExito = new Audio('https://www.soundjay.com/misc/sounds/magic-chime-01.mp3');

// --- FUNCIÓN DE REGISTRO CON SONIDO ---
async function registrarNuevoUsuario(nombre, mail, foto) {
    const { data, error } = await _supabase
        .from('perfiles')
        .insert([{ 
            usuario: nombre, 
            correo: mail, 
            foto_url: foto 
        }]);

    if (error) {
        console.error('Error:', error.message);
    } else {
        // ¡Aquí suena la magia! 🎶
        sonidoExito.play(); 
        
        alert('¡Bienvenido a Natsu World! ✨ Tu perfil ha sido creado.');
        console.log('Usuario guardado y sonido reproducido.');
    }
}
