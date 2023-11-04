<html>
    <head>
        <style>
            form{
                padding:20px;
                margin:auto;
                margin-top:200px;
                width:200px;
                box-shadow:0px 10px 20px black;
                border-radius:15px;
            }
            input{
                width:100%;
                padding-top:10px;
                padding-bottom:10px;
                margin-bottom:10px;
                margin-top:10px
            }
        </style>
    </head>
    <body>
        <form action="login.php" method="POST">
            <input type="text" name="user">    
            <input type="password" name="password">    
            <input type="submit">    
        </form>
    </body>
</html>