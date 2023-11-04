<?php
session_start();
// Abro la conexión con la base de datos
    $enlace = mysqli_connect("localhost", "documentos", "documentos", "documentos");
// Le pido algo a la base de datos
    $peticion = "
    SELECT * FROM usuarios
    WHERE
    user = '".$_POST['user']."'
    AND
    password = '".$_POST['password']."'
    ";
    $resultado = mysqli_query($enlace,$peticion);

    $pasas = false;
    

    while($fila = $resultado->fetch_assoc()) {
        $pasas = true;
        $_SESSION['user'] = $fila['user'];
    }

    // Validamos
    if($pasas == true){
        echo 'Lo que has puesto es correcto';
        echo '<meta http-equiv="refresh"
        content="2.5; url=documentos.php">';
    }else{
        echo 'Lo que has puesto NO es correcto';
        echo '<meta http-equiv="refresh"
        content="2.5; url=index.php">';
    }

// Cierro los recursos que haya abierto
    mysqli_close($enlace);
?>