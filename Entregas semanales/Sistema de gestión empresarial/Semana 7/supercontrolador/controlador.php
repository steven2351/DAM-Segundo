<?php 
class Supercontrolador{
    function formulario($tabla){
        include "config.php";
        echo '<form action="?" method="POST">';
        echo '<input type="hidden" name="clave" value="procesaformulario">';
        echo '<input type="hidden" name="tabla" value="'.$tabla.'">';
        $mysqli = new mysqli($mydbserver, $mydbuser, $mydbpassword, $mydb);
        //Luego quiero ver las columnas
        $consulta = "SHOW FULL COLUMNS FROM " .$tabla;
        $resultado = $mysqli->query($consulta);
        while($fila = $resultado->fetch_assoc()){
            
            if(json_decode($fila["Comment"])->visible == "true"){
                preg_match('#\((.*?)\)#',$fila["Type"], $match);
                echo '
                    <div class="campo">
                        <h3>'.json_decode($fila["Comment"])->titulo.'</h3>
                        <p>'.json_decode($fila["Comment"])->descripcion.' - Caracteres mínimo '.json_decode($fila["Comment"])->min.' máximo '.$match[1].'</p>
                ';
                if($fila["Null"] == "NO"){echo "<p>* Este campo es requerido</p>";}             
                if(json_decode($fila["Comment"])->deshabilitado == "true"){echo "<p>* Este campo está deshabilitado ya que lo rellena automáticamente el sistema</p>";}             
                echo '
                    <div class="contienecampo">
                    <table><tr><td wodth="80%">
                    <input type="'.json_decode($fila["Comment"])->tipodato.'" name="'.$fila["Field"].'" id="'.$fila["Field"].'"
                ';
                    if($fila["Null"] == "NO"){echo " required ";}
                    if(json_decode($fila["Comment"])->deshabilitado == "true"){echo " readonly ";}
                    preg_match('#\((.*?)\)#',$fila["Type"], $match);
                    echo '
                        maxlength = "'.$match[1].'" 
                        minlength = "'.json_decode($fila["Comment"])->min.'"
                        placeholder = "'.json_decode($fila["Comment"])->placeholder.'"
                        ';
                        if(isset(json_decode($fila["Comment"])->parametroget)){
                            echo ' value = "'.$_GET[json_decode($fila["Comment"])->parametroget].'"';
                        }
                    echo'
                    
                        >
                        </td><td width="20%">
                        <div class="tipocampo"><i class="'.json_decode($fila["Comment"])->icono.'"></i></div>
                        </td></tr></table>
                        </div>
                        <div class="clearfix"></div>
                    </div>

                ';
            }
        }
        echo '<input type="submit">
        
            </form>';
        $mysqli->close();
    }
    function procesaformulario(){
        // Vamos a analizar qué es lo que viene antes de meterlo
        foreach($_REQUEST as $nombre_campo => $valor){
            if(preg_match('~\b(delete|drop|truncate)\b~i',$nombre_campo)){
                $volcado = implode(",", $_REQUEST).",".$_SERVER["REMOTE_ADDR"].",".$_SERVER["HTTP_USER_AGENT"]."\n";
                $myfile = fopen("volcado.txt", "a");
                fwrite($myfile, $volcado);
                die("detenido");
            }
            if(preg_match('~\b(delete|drop|truncate)\b~i',$valor)){
                $volcado = implode(",", $_REQUEST).",".$_SERVER["REMOTE_ADDR"].",".$_SERVER["HTTP_USER_AGENT"]."\n";
                $myfile = fopen("volcado.txt", "a");
                fwrite($myfile, $volcado);
                die("detenido");
            }
        }
        
        include "config.php";
        $listadocolumnas = "";
        $listadovalores = "";
        foreach($_POST as $nombre_campo => $valor){
            //echo "campo ".$nombre_campo." valor ".$valor."<br>";
            if($nombre_campo != 'tabla' && $nombre_campo != 'clave'){
                $listadocolumnas .= ",".$nombre_campo."";
                $listadovalores .= ",'".$valor."'";
            }
        }
        
        ///////
        /*
        $cabeceras = 'From: noreply@gmail.com' . "\r\n" . 'Reply-To: noreply@gmail.com' . "\r\n" . 'X-Mailer: PHP/' . phpversion();
        $cabeceras .= 'MIME-Version: 1.0' . "\r\n";
        $cabeceras .= 'Content-Type: text/html; charset=iso-8859-1' . "\r\n";
        $mensaje = "<h1>Has enviado un formulario al sistema de entregas</h1><br><p>A continuación te mostramos un comprobante de los campos que has enviado al formulario</p><br>";
        foreach($_POST as $nombre_campo => $valor){
            if($nombre_campo != 'tabla' && $nombre_campo != 'clave'){
                $mensaje .= "".ucfirst($nombre_campo).": <b>".$valor."</b><br>";
            }
        }
        
        $menseje .= "<br><p>Puedes consultar tus entregas previamente realizadas haciendo click:";
        $menseje .= "<a href='https://localhost/supercontrolador/informe.php?clave'".codifica($_POST['email'])."'>AQUI</a></p>";
        $menseje .= "<p style='color:red;'>IMPORTANTE: Este enlace contiene una clave con tu identificación - no compartas este correo electrónico con nadie<br>";
        
        mail(
            $_POST['email'],
            "Formulario enviado",
            $mensaje,
            $cabeceras
        );
        */
        ///////
        
        $mysqli = new mysqli($mydbserver, $mydbuser, $mydbpassword, $mydb);
        $consulta = "INSERT INTO ".$_POST['tabla']." (Identificador".$listadocolumnas.") VALUES (NULL".$listadovalores.")";
        //echo $consulta;
        $mysqli->query($consulta);
        include "registro.php";
        echo ' <br><p>Puedes consultar tus entregas previamente realizadas haciendo click:';
        echo ' <a href="informe.php?clave='.codifica($_POST['email']).'">AQUI</a></p>';
        echo '<p>IMPORTANTE: Este enlace contiene una clave con tu identificación - no compartas este correo electrónico con nadie</p><br>';
        echo '
            <div class="notice">
                <h1>Registro guardado correctamente</h1>
                <p>Registro guardado se ha guardado correctamente en la aplicación. Redirigiendo en 6 segundos</p>
                <meta http-equiv="refresh" content="2; url=formulario.php?idcurso='.$_POST['asignatura'].'" />
            </div>
        ';
    }
}
?>
