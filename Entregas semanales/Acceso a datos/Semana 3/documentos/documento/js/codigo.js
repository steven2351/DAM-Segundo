
$(document).ready(function(){
    $("#tipotexto").change(function(){
        $("#pagina").append("<"+$(this).val()+">"+$(this).val()+"</"+$(this).val()+">")
    })
    $("#selectfont").change(function(){
        $("#pagina").append("<span style='font-family:"+$(this).val()+"'>"+$(this).val()+"</span>")              
    })                    
    $("#fontsize").change(function(){
        $("#pagina").append("<span style='font-size:"+$(this).val()+"px'>"+$(this).val()+"</span>")
    })                   
    $("#fontcolor").change(function(){
        $("#pagina").append("<span style='color:"+$(this).val()+"'>"+$(this).val()+"</span>")
    })                   
    $("#alignleft").click(function(){
        $("#pagina").append("<div style='text-align:left'>Buenas esto es para probar si funciona las colocaciones para los textos y si funcionan me olvidare de tocar mas este texto, sino tendre que seguir mirando que es lo que falla</div>")
    })                   
    $("#alignright").click(function(){
        $("#pagina").append("<div style='text-align:right'>Buenas esto es para probar si funciona las colocaciones para los textos y si funcionan me olvidare de tocar mas este texto, sino tendre que seguir mirando que es lo que falla</div>")
    })                   
    $("#aligncenter").click(function(){
        $("#pagina").append("<div style='text-align:center'>Buenas esto es para probar si funciona las colocaciones para los textos y si funcionan me olvidare de tocar mas este texto, sino tendre que seguir mirando que es lo que falla</div>")
    })                   
    $("#alignjustify").click(function(){
        $("#pagina").append("<div style='text-align:justify'>Buenas esto es para probar si funciona las colocaciones para los textos y si funcionan me olvidare de tocar mas este texto, sino tendre que seguir mirando que es lo que falla</div>")
    })
    $("#bold").click(function(){
        $("#pagina").append("<span style='font-weight:bold'>Negrita</span>")
    })
    $("#cursive").click(function(){
        $("#pagina").append("<span style='font-style:italic'>Cursiva</span>")
    })
    $("#underline").click(function(){
        $("#pagina").append("<span style='text-decoration:underline'>Subrayado</span>")
    })
    $("#orderedlist").click(function(){
        $("#pagina").append("<ol><li></li><ol>")
    })
    $("#unorderedlist").click(function(){
        $("#pagina").append("<ul><li></li><ul>")
    })
    $("#guardar").click(function(){
        $.ajax({
            url: "guarda.php",
            data: {datos: $("#pagina").html(),nombredocumento:$("#documentname").val()},
            type: "POST",
            succes: function(result){
                console.log("ok"+result)
            }
        });
    })  
})