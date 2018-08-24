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
            $("#p-nombre").text(respuesta.nombre_usuario+" "+respuesta.apellido_usuario);
            $("#h2-nombre").text(respuesta.nombre_usuario+" "+respuesta.apellido_usuario);
            $("#p-usuario").text(respuesta.username);
            $("#p-correo").text(respuesta.correo);
            $("#p-puesto").text(respuesta.puesto);
            $("#p-puesto").text(respuesta.puesto);
            $("#p2-puesto").text(respuesta.puesto);
            $("#p-descripcion").text(respuesta.descripcion_personal);
		}
    });
}