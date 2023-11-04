<div id="contienearticulos">
<?php 
    $mysqli = new  mysqli("localhost", "talk", "talk", "talk");
    $consulta = "SELECT * FROM blog";
    $resultado = $mysqli->query($consulta);
    while($fila = $resultado->fetch_assoc()){
        echo '
        <div class="articuloblog">
            <h4>'.$fila['titulo'].'</h4>
            <p>'.$fila['contenido'].'</p>
        </div>
        ';
    }
?>
</div>
<aside>
    Contenido adicional del blog
</aside>