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
                <meta http-equiv="refresh" content="6; url=formulario.php?idcurso='.$_POST['asignatura'].'" />
            </div>
        ';
    }
    function leer($tabla){
        include "config.php";
        $mysqli = new mysqli($mydbserver, $mydbuser, $mydbpassword, $mydb);
        $consulta ="SHOW FULL COLUMNS FROM ".$tabla;
        $resultado = $mysqli->query($consulta);
        echo '<table>';
        echo '<tr>';
        $contadorcolumna = 0;
        while($fila = $resultado->fetch_assoc()){
            echo '<th>'.json_decode($fila["Comment"])->titulo.'</th>';
            $nombrecolumna[$contadorcolumna] = $fila["Field"];
            $contadorcolumna++;
        }
        echo '<th>Operaciones</th>';
        echo '</tr>';
        $consulta ="SHOW FULL COLUMNS FROM ".$tabla;
        $resultado = $mysqli->query($consulta);
        echo '<tr>';
        echo '<form action="?tabla='.$tabla.'&buscar=si" method="POST">';
        $contadorcolumna = 0;
        while($fila = $resultado->fetch_assoc()){
            echo '<th><input type="text" name="'.$fila["Field"].'" class="campobuscador"><i class="fas fa-search iconobusca"></i></th>';
            $comentarios[$contadorcolumna] = $fila["Comment"];
            $contadorcolumna++;
        }
        echo '<th><input type="submit" value="Busca" "></th>';
        echo '</form>';
        echo '</tr>';
        
        $consulta ="SELECT * FROM ".$tabla." ";
        if(isset($_GET['buscar'])){
            $consulta .= "WHERE ";
            foreach($_POST as $clave=>$valor){
                $consulta .= $clave." LIKE '%".$valor."%' AND ";
            }
            $consulta .= " true";
        }
        if(!isset($_GET['buscar'])){
            $consulta .=" LIMIT ".$_SESSION['elementosporpagina']." ";
            $consulta .=" OFFSET ".($_SESSION['elementosporpagina']*$_SESSION['pagina'])." ";
        }
        $resultado = $mysqli->query($consulta);
        while($fila = $resultado->fetch_assoc()){
            $identificador = "";
            echo '<tr>';
            $contadorcolumna = 0;
            foreach($fila as $nombre_campo => $valor){
                if($nombrecolumna[$contadorcolumna] == "Identificador"){$identificador = $valor;}
                if(json_decode($comentarios[$contadorcolumna])->FKtabla != ""){
                    $consulta2 = "SELECT ".json_decode($comentarios[$contadorcolumna])->FKmostrar." AS campo FROM ".json_decode($comentarios[$contadorcolumna])->FKtabla." WHERE ".json_decode($comentarios[$contadorcolumna])->FKclave." = '".$valor."'";
                    $resultado2 = $mysqli->query($consulta2);
                    echo '<td externo="si" tabla="'.$tabla.'" tablaexterna="'.json_decode($comentarios[$contadorcolumna])->FKtabla.'" claveexterna="'.json_decode($comentarios[$contadorcolumna])->FKclave.'"  identificador ="'.$identificador.'" columna="'.$nombrecolumna[$contadorcolumna].'" columnaexterna="'.json_decode($comentarios[$contadorcolumna])->FKmostrar.'">';
                    while($fila2 = $resultado2->fetch_assoc()){
                        echo '<b>'.$valor."</b> - ".$fila2['campo'].'';
                    }
                    echo '</td>';
                    
                }else{
                    echo '<td externo="no" class="'.$nombrecolumna[$contadorcolumna].'" columna="'.$nombrecolumna[$contadorcolumna].'" tabla="'.$tabla.'" identificador ="'.$identificador.'" ';
                    if(filter_var($valor, FILTER_VALIDATE_URL)){echo "urlsi";}
                    echo '">';
                    if(filter_var($valor, FILTER_VALIDATE_URL)){echo "<a href='".$valor."' target='_blank'> ";}
                    if(filter_var($valor, FILTER_VALIDATE_EMAIL)){echo "<a href='mailto:".$valor."' target='_blank'> ";}
                    echo $valor;
                    if(filter_var($valor, FILTER_VALIDATE_EMAIL)){echo "</a>";}
                    if(filter_var($valor, FILTER_VALIDATE_URL)){echo "</a>";}
                   
                    /*
                    if(filter_var($valor, FILTER_VALIDATE_URL)){
                    $url = $valor;
                    $parsed = $parse_url($url);
                    if($parsed['host'] == "www.youtube.com" || $parsed['host'] == "youtu.be"){
                            $parts = parse_url($fila['url']);
                            parse_str($parts['query'],$query);
                            $miparte = $query['v'];
                            echo '<iframe width="300" height="200" src="https://www.youtube.com/embed/'.$miparte.'" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>';
                        }
                    }
                    */
                    echo '</td>
                    ';
                }
                $contadorcolumna++;
            }
            echo '<td>';
            echo '<a href="?tabla='.$_GET['tabla'].'&update='.$fila['Identificador'].'"><i class="fa-solid fa-square-pen"></i></a>';
            echo '<a href="?tabla='.$_GET['tabla'].'&delete='.$fila['Identificador'].'"><i class="fa-solid fa-square-minus"></i></a>';
            echo '</td>';
            echo '</tr>';
        }
        echo '</table>';
        echo '<a href="?create='.$_GET['tabla'].'" id="create"><i class="fa-solid fa-square-plus"></i></a>';
        echo '<div class="paginacion">
            <a href="?tabla='.$_GET['tabla'].'&pagina=primera"><i class="fa-solid fa-circle-left"></i></a>
            <a href="?tabla='.$_GET['tabla'].'&pagina=anterior"><i class="fa-solid fa-chevron-circle-left"></i></a>
            <a href="?tabla='.$_GET['tabla'].'&pagina=siguiente"><i class="fa-solid fa-chevron-circle-right"></i></a>
            <a href="?tabla='.$_GET['tabla'].'&pagina=ultima"><i class="fa-solid fa-circle-right"></i></a>
        </div>';
    }
    function insertar($tabla){
        include "config.php";
        echo '<form action="?tabla='.$tabla.'" method="POST">';
        echo '<input type="hidden" name="clave" value="procesainsertar">';
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
    function procesainsertar(){
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
        
        $mysqli = new mysqli($mydbserver, $mydbuser, $mydbpassword, $mydb);
        $consulta = "INSERT INTO ".$_POST['tabla']." (Identificador".$listadocolumnas.") VALUES (NULL".$listadovalores.")";
        //echo $consulta;
        $mysqli->query($consulta);
        include "registro.php";
    }
    function delete($tabla,$identificador){        
        include "config.php";
        
        $mysqli = new mysqli($mydbserver, $mydbuser, $mydbpassword, $mydb);
        $consulta = "DELETE FROM ".$tabla." WHERE Identificador = ".$identificador." ";
        //echo $consulta;
        $mysqli->query($consulta);
        include "registro.php";
    }
    function update($tabla,$identificador){
        include "config.php";
        echo '<form action="?tabla='.$tabla.'" method="POST">';
        echo '<input type="hidden" name="clave" value="procesaupdate">';
        echo '<input type="hidden" name="tabla" value="'.$tabla.'">';
        echo '<input type="hidden" name="identificador" value="'.$identificador.'">';
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
                        // Me conecto a la base de datos y busco el valor //
                        $consulta2 = "SELECT * FROM ".$tabla." WHERE Identificador = ".$identificador." ";   
                        $resultado2 = $mysqli->query($consulta2);
                        while($fila2 = $resultado2->fetch_assoc()){
                            echo 'value = "'.$fila2[$fila["Field"]].'"';
                        }
                        // Me conecto a la base de datos y busco el valor //
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
    function procesaupdate($tabla,$identificador){
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
        $cadena = "";
        foreach($_POST as $nombre_campo => $valor){
            //echo "campo ".$nombre_campo." valor ".$valor."<br>";
            if($nombre_campo != 'tabla' && $nombre_campo != 'clave'){
                $cadena .= $nombre_campo."='".$valor."',";
            }
        }
        $cadena = substr($cadena, 0, -1);
        
        $mysqli = new mysqli($mydbserver, $mydbuser, $mydbpassword, $mydb);
        $consulta = "UPDATE ".$tabla." SET ".$cadena." WHERE Identificador = ".$identificador." ";
        //echo $consulta;
        $mysqli->query($consulta);
        include "registro.php";
    }
    
}

?>
