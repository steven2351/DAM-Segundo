<?php session_start(); 
include "../config.php"; 
include "../controlador.php"; 
$mysqli = new mysqli($mydbserver, $mydbuser, $mydbpassword, $mydb);
$miformulario = new Supercontrolador();
?>
<html>
    <head>
        <script src="https://kit.fontawesome.com/49de1db798.js" crossorigin="anonymous"></script>
        <style>
            /* Estilos Generales */
                body,html{background:rgb(220,220,220);font-family:sans-serif;padding:0px;margin:0px;height:100%;overflow:hidden;}
            /* Estilos Del Formulario De Login */
                #formulariologin{width:200px;height:200px;background:white;padding:30px;margin:auto;border-radius:20px;text-align:center;}
                #formulariologin input{width:100%;padding-top:10px;padding-bottom:10px;border:0px;margin-top:10px;outline:none;background:rgb(240,240,240);border-radius:5px;}
                #formulariologin input[type="text"],#formulariologin input[type="password"]{box-shadow:0px 4px 8px rgba(0,0,0,0.3) inset;}
                #formulariologin input[type="submit"]{box-shadow:0px 4px 8px rgba(0,0,0,0.3);}
                .notice{position:absolute;top:0px;width:400px;background:red;color:white;height:20px;left:50%;margin-left:-200px;padding:10px;text-align:center;}
            /* Estilos Del Panel De Control */
                aside{width:20%;float:left;height:100%;box-shadow:-20px 0px 20px rgba(0,0,0,0.3) inset;}
                section{width:80%;float:right;height:100%;}
                #contienemenu{padding:10px;}
                #contienemenu ul{list-style-type:none;padding:0px;margin:0px;}
                #contienemenu ul li{padding:10px;margin:0px;border-bottom:1px solid grey;}
                #contienemenu ul li a{color:inherit;text-decoration:none;}
                #contienecontenido{padding:10px;background:white;height:100%;overflow-y:scroll;}
                #contienecontenido table{width:100%;text-align:left;}
                #contienecontenido table a{padding:5px;color: inherit;text-decoration:none;}
                #contienecontenido table a i{font-size:20px;}
                #create{color:inherit;text-decoration:none;font-size:80px;position:absolute;bottom:10px;right:10px;}
            /* Estilos Del Formulario */
                #formulario{width:50%;background:white;margin:auto;padding:20px;border-radius:10px;text-align:center;}
                #formulario h1{color:rgb(100,100,100);font-size: 20px;padding:0px;margin:0px;margin-bottom:20px;}
                #formulario h3{text-align:left;margin:0px;padding:0px;}
                #formulario p{text-align:left;font-size:10px;}
                .campo input{padding:5px;background:rgb(230,230,230);border:none;margin:4px;width:95%;clear:both;}
                .campo{margin-bottom:20px;}
                .campo label{font-size:2em;padding:0px;margin:0px;}
                .campo p{font-size:0.6em;padding:0px;margin:0px;}
                #formulario input[type="submit"]{border:none;padding:10px;width:200px;margin:auto;}
                input{transition:all 1s;}
                input:focus{outline:none;background:white;}
                .contienecampo input{float:left;
                    width:97%;
                    margin-right:0px;
                    height:20px;
                    box-shadow:0px 4px 8px rgba(0,0,0,0.1) inset;}
                .contienecampo .tipocampo{float:right;
                    width:100%;
                    background:rgb(200,200,200);
                    height:30px;
                    line-height:30px;
                    border-radius:0px 5px 5px 0px;}
                .clearfix{clear:both;}
                .contienecampo table{width:100%;}
            /* Estilos De los tipos */
                .email{filter:blur(4px)}
                .urlsi{color:blue;text-decoration:underline;}
        </style>
    </head>
    <body>
        <?php 
            if(isset($_POST['usuario']) && !isset($_SESSION['usuario'])){
               include "../config.php";
                $mysqli = new mysqli($mydbserver,$mydbuser,$mydbpassword,$mydb);
                $consulta = "SELECT * FROM usuarios WHERE usuario = '".$_POST['usuario']."' AND contrasena = '".$_POST['contrasena']."' ";
                $resultado = $mysqli->query($consulta);
                $pasas = "no";
                while($fila = $resultado->fetch_assoc()){
                    $pasas = "si";
                    $_SESSION['usuario'] = $fila['usuario'];
                }
                if($pasas == "si"){}else{
                    echo '<div class="notice">Intento de acceso denegado</div>';
                }
            }
        ?>
        <?php 
            if(isset($_SESSION['usuario'])){
                echo '
                    <aside>
                        <div id="contienemenu"><ul>';
                        $consulta = "SHOW TABLES";
                        $resultado = $mysqli->query($consulta);
                        while($fila = $resultado->fetch_array()){
                            echo '<li><a href="?tabla='.$fila[0].'">'.$fila[0].'</a></li>';
                        }
                        echo '</ul>
                        </div>
                    </aside>
                    <section>
                        <div id="contienecontenido">
                        ';
                            if(isset($_GET['delete'])){$miformulario->delete($_GET['tabla'],$_GET['delete']);}
                            if(isset($_GET['update'])){echo '<div id="formulario">';$miformulario->update($_GET['tabla'],$_GET['update']);echo '</div>';}
                            if($_POST['clave'] == "procesainsertar"){$miformulario->procesainsertar();}
                            if($_POST['clave'] == "procesaupdate"){$miformulario->procesaupdate($_POST['tabla'],$_POST['identificador']);}
                            if(isset($_GET['tabla'])){$miformulario->leer($_GET['tabla']);}
                            if(isset($_GET['create'])){echo '<div id="formulario">';$miformulario->insertar($_GET['create']);echo '</div>';}
                            
                        echo '
                        </div>
                    </section>
                    ';
            }else{
                echo '
                    <form action="?" method="POST" id="formulariologin">
                        <img src="https://jocarsa.com/favicon.ico">
                        <input type="text" name="usuario" placeholder="Usuario">
                        <input type="password" name="contrasena" placeholder="Contraseña">
                        <input type="submit">
                    </form>
                ';
                    
            }
        
        ?>
    </body>
</html>