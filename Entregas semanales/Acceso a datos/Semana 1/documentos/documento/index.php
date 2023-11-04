<html>
    <head>
        <script src="https://code.jquery.com/jquery-3.7.1.js" integrity="sha256-eKhayi8LEQwp4NKxN+CfCh+3qOVUtJn3QNZ0TciWLP4="
        crossorigin="anonymous"></script>
        <link rel="Stylesheet" href="css/estilo.css">
        <script src="js/codigo.js"></script>
    </head>
    <body>
        <table border=0 width=100% height=100%>
            <tr height=20px id="menu">
                <td>
                    Menu
                </td>
            </tr>
            <tr height=20px id="nombredocumento">
                <td>
                    <input type="text" id="documentname" placeholder="Nombre del documento" value='<?php echo explode(".",$_GET['file'])[0] ?>'>
                </td>
            </tr>
            <tr height=50px id="herramientas">
                <td>
                    <button id="guardar">Guardar</button>
                    <select id="tipotexto">
                        <option value="p">Parrafo</option>
                        <option value="h1">h1</option>
                        <option value="h2">h2</option>
                        <option value="h3">h3</option>
                        <option value="h4">h4</option>
                        <option value="h5">h5</option>
                        <option value="h6">h6</option>
                        <option value="pre">Preformateado</option>
                    </select>
                    <select id="selectfont">
                        <option value="Arial">Arial</option>
                        <option value="Verdana">Verdana</option>
                        <option value="Tahoma">Tahoma</option>
                        <option value="Trebuchet MS">Trebuchet MS</option>
                        <option value="Times New Roman">Times New Roman</option>
                        <option value="Georgia">Georgia</option>
                        <option value="Garamond">Garamond</option>
                        <option value="Courier New">Courier New</option>
                        <option value="Brush Script MT">Brush Script MT</option>
                    </select>
                    <input type="number" id="fontsize" value="10">
                    <button id="bold">B</button>
                    <button id="cursive">I</button>
                    <button id="underline">U</button>
                    <input type="color" id="fontcolor">
                </td>
            </tr>
            <tr>
                <td id="fondopagina">
                    <div id="pagina" contenteditable="true">
                        <?php include "../vault/users/steven/".$_GET['file'] ?>
                    </div>
                </td>
            </tr>
        </table>
    </body>
</html>