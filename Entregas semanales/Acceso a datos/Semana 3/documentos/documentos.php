<?php session_start(); ?>
<html>
    <head>
        <script src="https://code.jquery.com/jquery-3.7.1.js" integrity="sha256-eKhayi8LEQwp4NKxN+CfCh+3qOVUtJn3QNZ0TciWLP4="
        crossorigin="anonymous"></script>
        <script>
            $(document).ready(function(){
                $("#carpetaactual").load("leecarpeta.php?user=<?php echo $_SESSION['user'] ?>")
                $(document).on("click",".item",function(){
                    if($(this).attr("filetype") == "html"){
                        window.location = "documento/index.php?file="+$(this).attr("filename")
                    }
                })
            })
        </script>
        <style>
            .item{
                width:300px;
                height:300px;
                padding:5px;
                margin:5px;
                border:1px solid black;
                border-radius:5px;
                float:left;
                position:relative;
                display:table-cell;
                text-align:center;
                vertical-align:middle;
            }
            #documentname{
                position:absolute;
                bottom:5px;
                width:100%;
                left:5px;
            }
            .iconfile,.iconfolder{
                width:100%;
                margin:auto;
            }
            .iconfile img,.iconfolder img{
                width:50%;
                margin:auto;
            }
        </style>
    </head>
    <body>
        <header>
            
        </header>
        <main>
            <h3>Listado de documentos</h3>
            <div id="carpetaactual">
            
            </div>
        </main>
        <footer>
            
        </footer>
    </body>
</html>