<?php

    $cabeceras = 'From: svs@gmail.com' . "\r\n" . 'Reply-To: svs@gmail.com' . "\r\n" . 'X-Mailer: PHP/' . phpversion();
    $cabeceras .= 'MIME-Version: 1.0' . "\r\n";
    $cabeceras .= 'Content-Type: text/html; charset=iso-8859-1' . "\r\n";

    mail(
        "svs@gmail.com",
        "Este es el asunto del mensaje",
        "<h1>Titulo</h1><p>Este es el cuerpo del mensaje</p>",
        $cabeceras
    );

?>