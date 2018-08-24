
$("#registrar").click(function(){
	//alert("Enviar mensaje: " + $("#txta-mensaje").val());
    if( $("#nombre").val() != '' && $("#apellido").val() != '' && $("#correo").val() != '' &&  $("#username").val() != '' && $("#contrasena").val() != ''){
        var parametros = "nombre="+$("#nombre").val() + "&" + 
                        "apellido="+$("#apellido").val() + "&"+
                        "correo="+$("#correo").val() + "&"+
                        "username="+$("#username").val() + "&"+
                        "contrasena="+$("#contrasena").val();
        $.ajax({
            url:"/registrar-usuario",
            method:"POST",
            data:parametros,
            dataType:"json",
            success:function(response){
                if(response.estatus == 1){
                    //$('#cuenta-existente').modal();
                    alert("Ya existe un usuario con esa cuenta, porfavor verifica tus datos");
                }else{
                    //$('#registro-exitoso').modal();
                    alert("Registro Existoso, ¡Bienvenido a On-code!");
                    window.location ="../login.html";
                }
                console.log(response);
            }
        });
    }else{
        console.log("campos vacios");
        alert("Existen campos vacios, porfavor llena todos los campos");
       // $('#campos-vacios').modal();
    }
    
	
});

function crearCarpetaNuevoUsuario(codigoNuevoUsuario){
    $.ajax({
        url:"/carpeta-nuevo-usuario",
        method:"POST",
		dataType:"json",
		success:function(respuesta){
            console.log("Se creo la carpeta principal");
            console.log(respuesta);
		
		}
	});

}