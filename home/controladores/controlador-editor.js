$(document).ready(function(){
	//Esta funcion se ejecuta cuando la página esta lista
	$.ajax({
        url:"/codigo-fuente",
        dataType:"json",
        success:function(respuesta){
            $("#h3-nombre").text(respuesta[0].nombre_archivo+"."+respuesta[0].extension_archivo);
            console.log(respuesta);
            console.log(respuesta[0].contenido_archivo);
            var editor = ace.edit("editor");
            var modo = "ace/mode/" + respuesta[0].extension_archivo;
            console.log(modo);
            editor.setTheme("ace/theme/tomorrow_night_blue");
            editor.session.setMode(modo); //"ace/mode/javascript"
            editor.setValue(respuesta[0].contenido_archivo);
	        //editor.getSession().setTabSize(2);
        }
    });

    datosUsuario();
});

$("#btn-guardar").click(function(){
	//alert("Enviar mensaje: " + $("#txta-mensaje").val());
    var editor = ace.edit("editor");    
    var parametros = "contenidoArchivo="+ editor.getValue();
                          
        $.ajax({
            url:"/guardar-archivo",
            method:"POST",
            data:parametros,
            dataType:"json",
            success:function(response){
                console.log("Entro al success");
                console.log(response);
                location.reload();
            }
        });
	
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
            $("#side-puesto").text(respuesta.puesto);
		}
    });
}