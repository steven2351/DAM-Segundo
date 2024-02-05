<?php

    include "config.php";
    $mysqli = new mysqli($mydbserver, $mydbuser, $mydbpassword, $mydb);
    $url =  "//{$_SERVER['HTTP_HOST']}{$_SERVER['REQUEST_URI']}";
    $escaped_url = htmlspecialchars( $url, ENT_QUOTES, 'UTF-8' );
        
    $cadena = "";
    foreach($_REQUEST as $nombre_campo => $valor){$cadena .= $nombre_campo.":".$valor." | ";}
        
    $consulta = "INSERT INTO registros VALUES (NULL,'".date('U')."','".$url."','".$_SERVER['REMOTE_ADDR']."','".$_SERVER["HTTP_USER_AGENT"]."','".$cadena."')";
    $mysqli->query($consulta);

?>