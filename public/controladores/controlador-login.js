
$("#boton-login").click(function(){
    $.ajax({
        url:"/login",
        data:"correo="+$("#correo-login").val()+"&contrasena="+$("#contrasena-login").val(),
        method:"POST",
        dataType:"json",
        success:function(respuesta){
            if (respuesta.estatus ==0 ){
                //alert("Credenciales correctas");    
                window.location.href ="inicio.html";
            }
            else{
                alert("Credenciales incorrectas");
            
            }
            console.log(respuesta);

        }
        
           
    });
});