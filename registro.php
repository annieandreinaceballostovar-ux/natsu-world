<?php
<?php
/**
 * NATSU WORLD - PROCESAMIENTO DE REGISTRO
 * Actualización: 30 de marzo de 2026
 * Creadora: Annie Andreina
 */

// 1. Usamos require_once para asegurar que el archivo sea obligatorio
require_once 'config.php';

// 2. Verificamos la petición POST
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    
    // 3. Limpieza con trim() para evitar espacios accidentales en blanco
    // Útil si el teclado del Redmi A5 añade un espacio al final del nombre
    $nombre   = mysqli_real_escape_string($conn, trim($_POST['nombre']));
    $usuario  = mysqli_real_escape_string($conn, trim($_POST['usuario']));
    $telefono = mysqli_real_escape_string($conn, trim($_POST['telefono']));
    $pais     = mysqli_real_escape_string($conn, trim($_POST['pais']));

    // 4. Validación de campos vacíos (Seguridad extra)
    if (empty($nombre) || empty($usuario)) {
        echo "<b style='color:#fd6698; font-family:Quicksand;'>🌸 ¡Ops! El nombre y el usuario son obligatorios.</b>";
    } else {
        
        // 5. Verificación de Usuario Duplicado
        $buscarUsuario = "SELECT id FROM usuarios WHERE usuario = '$usuario' LIMIT 1";
        $resultadoBusqueda = mysqli_query($conn, $buscarUsuario);

        if (mysqli_num_rows($resultadoBusqueda) > 0) {
            echo "<b style='color:#fd6698; font-family:Quicksand;'>¡Ups! El usuario '$usuario' ya existe. Prueba con otro más kawaii. 🎀</b>";
        } else {
            // 6. Inserción de datos
            $sql = "INSERT INTO usuarios (nombre_completo, usuario, telefono, pais, fecha_registro) 
                    VALUES ('$nombre', '$usuario', '$telefono', '$pais', NOW())";

            if (mysqli_query($conn, $sql)) {
                // Estilo de éxito Natsu World
                echo "<div style='background:#B5EAD7; padding:15px; border-radius:15px; font-family:Quicksand; color:#444; text-align:center;'>
                        🌟 ¡Felicidades! <b>$nombre</b> ya es parte oficial de Natsu World. 🧸
                      </div>";
            } else {
                // Error técnico (Solo para ti en consola o log)
                error_log("Error en registro: " . mysqli_error($conn));
                echo "Hubo un error al guardar. Inténtalo más tarde. ✨";
            }
        }
    }
}

// 7. Cierre de conexión
mysqli_close($conn);
?>