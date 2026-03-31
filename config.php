<?php
/**
 * NATSU WORLD - NÚCLEO DE CONEXIÓN PROFESIONAL 🧸
 * Creadora: Annie Andreina Ceballos Tovar
 * Actualización: 30 de marzo de 2026
 */

// 1. Configuración de seguridad (No mostrar errores al usuario final)
error_reporting(E_ALL);
ini_set('display_errors', 0); // Cámbialo a 1 solo si estás arreglando un fallo

// 2. Credenciales Maestras
// Nota: En InfinityFree, el host suele empezar por 'sqlXXX.infinityfree.com'
$servername = "sql312.infinityfree.com";
$username   = "if0_41482637";
$password   = "TU_PASSWORD_AQUÍ"; // Tu clave real de MySQL
$dbname     = "if0_41482637_natsu_db";

// 3. Intento de Conexión
$conn = mysqli_connect($servername, $username, $password, $dbname);

// 4. Verificación con Estilo Profesional
if (!$conn) {
    // Registramos el error internamente (opcional) pero al usuario le damos un mensaje lindo
    error_log("Error de conexión: " . mysqli_connect_error());
    
    // Matamos el proceso con un mensaje estético
    die("<div style='font-family:Quicksand,sans-serif; text-align:center; padding:50px; color:#FFB7B2;'>
            <h2>¡Ops! Natsu World está descansando 🧸</h2>
            <p>Estamos conectando los corazones de la base de datos. Intenta de nuevo en un momento.</p>
         </div>");
}

// 5. Soporte total para Emojis y caracteres especiales (Acentos, Ñ)
mysqli_set_charset($conn, "utf8mb4");

/**
 * CONSEJO PRO DE SEGURIDAD:
 * Para evitar ataques de Inyección SQL en tus otros archivos, 
 * usa siempre 'mysqli_real_escape_string' o sentencias preparadas.
 */

// Si llegamos aquí, la conexión es un éxito total. ✨
?>