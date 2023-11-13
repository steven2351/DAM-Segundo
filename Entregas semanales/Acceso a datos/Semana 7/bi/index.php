<!doctype html>
<html lang="es">
    <head>
        <script src="https://code.jquery.com/jquery-3.7.1.js"
        integrity="sha256-eKhayi8LEQwp4NKxN+CfCh+3qOVUtJn3QNZ0TciWLP4="
        crossorigin="anonymous"></script>
        <script src="https://code.jquery.com/ui/1.13.1/jquery-ui.js" integrity="sha256-6XMVI0zB8cRzfZjqKcD01PBsAy3FlDASrlC8SxCpInY=" crossorigin="anonymous"></script>
        <script src="js/codigo.js"></script>
        <link rel="Stylesheet" href="https://code.jquery.com/ui/1.13.1/themes/smoothness/jquery-ui.css">
        <link rel="Stylesheet" href="css/estilo.css">
        <meta charset="utf-8">
    </head>
    <body>
        <div id="contenedor">
            <div id="formulario">
                <h3>1.-Selección de la tabla</h3>
                <div id="selecciontabla">
                    <p>Seleccionamos la tabla principal sobre la que hay que operar</p>
                    <select id="seleccionatabla">
                        <option>Selecciona una tabla</option>
                    </select>
                </div>
                <h3>2.-Selección de los campos que quieres ver en el informe</h3>
                <div id="seleccioncampos">
                    <p>Seleccionamos los campos que queremos que intervengan en nuestro informe</p>
                    <div id="seleccionacampos">

                    </div>
                </div>
                <h3>3.-Selección de los campos en base a los cuales ordenar</h3>
                <div id="seleccionordenar">
                    <p>Seleccionamos los campos que queremos ordenar</p>
                    <div id="seleccionaordenar">

                    </div>
                </div>
                <h3>4.-Selección de los alias por campo</h3>
                <div id="seleccionalias">
                    <p>Seleccionamos los nombres de columna que queremos que aparezcan (opcional)</p>
                    <table id="seleccionaalias" colpadding = 0 colspacing = 0 cellpadding = 0 cellspacing = 0 width=100%>

                    </table>
                </div>
                <h3>5.-Selección de las condiciones</h3>
                <div id="seleccioncondiciones">
                    <p>Introducimos condiciones para los campos que hemos seleccionado</p>
                    <table id="seleccionacondiciones" colpadding = 0 colspacing = 0 cellpadding = 0 cellspacing = 0 width=100%>

                    </table>
                </div>
                <h3>6.-Selección del límite</h3>
                <div id="seleccionlimite">
                    <p>Podemos limitar la cantidad de registros que nos proporciona el informe</p>
                    <div id="seleccionalimite">
                        <input type="number" id="limite">
                    </div>
                </div>
            </div>
            
            <div id="resultados">
                <div id="sql"></div>
                <div id="resultadostabla"></div>
                <div id="resultadosgrafica"></div>
            </div>
        </div>
    </body>
</html>