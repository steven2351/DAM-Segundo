
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
    $("#bold").click(function(){
        $("#pagina").append("<span style='font-weight:bold'>Negrita</span>")
    })
    $("#cursive").click(function(){
        $("#pagina").append("<span style='font-style:italic'>Cursiva</span>")
    })
    $("#underline").click(function(){
        $("#pagina").append("<span style='text-decoration:underline'>Subrayado</span>")
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