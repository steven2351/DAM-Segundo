<html>
    <head>
        <style>
            body{
                background:white;
            }
            form{
                width:300px;
                height:300px;
                padding:20px;
                margin:auto;
                background:white; 
                box-shadow:0px 20px 20px rgba(0,0,0,0.3);
                border-radius:10px; 
            }
            input{
                width:100%;
                margin-top:10px;
                margin-bottom:10px;
                background:aliceblue; 
                border:0px;
                padding-top:5px;
                padding-bottom:5px; 
            }
        </style>
    </head>
    <body>
        <form action="login.php" method="POST">
            <input type="text" name="usuario">
            <input type="password" name="clave">
            <input type="submit">
        </form>
    </body>
</html>