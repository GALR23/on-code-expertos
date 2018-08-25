$(document).ready(function(){
	//Esta funcion se ejecuta cuando la página esta lista
	$.ajax({
        url:"/sesion",
        data:"",
        method:"GET",
        dataType:"json",
        success:function(respuesta){
            $("#usuario-hidden").val(respuesta.codigo);
            console.log(respuesta.codigo);
        },
        error:function(){
            console.log("algo anda mal");
        }
    });

    datosUsuario();
});


function datosUsuario (){
    $.ajax({
        url: "/obtener-info-usuario",
        method:"POST",
        dataType:"json",
        data: '',
        success:function(respuesta){
			console.log(respuesta);
            $("#nombre-usuario").html(respuesta.nombre_usuario+" "+respuesta.apellido_usuario);
            $("#h2-nombre").text(respuesta.nombre_usuario+" "+respuesta.apellido_usuario);
            $("#p2-puesto").text(respuesta.puesto);
            $("#side-puesto").text(respuesta.puesto);


            $("#txt-nombre").val(respuesta.nombre_usuario);
            $("#txt-apellido").val( respuesta.apellido_usuario);
            $("#txt-usuario").val( respuesta.username);
            $("#txt-correo").val( respuesta.correo);
            $("#txt-puesto").val( respuesta.puesto);
            $("#p-descripcion").text(respuesta.descripcion_personal);
		}
    });
}

$("#btn-actualizar").click(function(){
	//alert("Enviar mensaje: " + $("#txta-mensaje").val());
    if( $("#txt-nombre").val() != '' && $("#txt-apellido").val() != '' && $("#txt-correo").val() != '' &&  $("#txt-usuario").val() != '' && $("#txt-puesto").val() != '' && $("#p-descripcion").val() != ''){
        
        var parametros = "nombre="+$("#txt-nombre").val() + "&" + 
                        "apellido="+$("#txt-apellido").val() + "&"+
                        "correo="+$("#txt-correo").val() + "&"+
                        "username="+$("#txt-usuario").val() + "&"+
                        "puesto="+$("#txt-puesto").val() + "&"+
                        "descripcion="+$("#p-descripcion").val() ;
        $.ajax({
            url:"/actualizar-usuario",
            method:"POST",
            data:parametros,
            dataType:"json",
            success:function(response){
                console.log(response);
                window.location ="perfil.html"
            }
        });
    }else{
        console.log("campos vacios");
        alert("Existen campos vacios, porfavor llena todos los campos");
       // $('#campos-vacios').modal();
    }
    
	
});