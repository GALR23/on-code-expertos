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
    cargarDocumentos();
    //cargarCarpetas();
    //setInterval(cargarDocumentos, 15000); para que actualice los archivos en caso de que se cree uno nuevo
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



function cargarDocumentos(){
    $.ajax({
        url:"/obtener-archivos-carpeta",
        method:"POST",
		dataType:"json",
		success:function(respuesta){
            console.log(respuesta);
           // $("#div-documentos").html("");
			for(var i=0; i<respuesta.length; i++){
                    if(respuesta[i].extension_archivo=="css"){
                    $("#div-documentos").append(
                        `<div width="130px" class="col-xl-2 col-lg-2 col-md-6 col-sm-12 col-12" ondblclick="seleccionarArchivo(${respuesta[i].codigo_archivo});">
                        <img class="iconos" src="iconos/css.png" width="128px" alt="">
                        <p class="iconos">${respuesta[i].nombre_archivo}</p>
                        </div>`
                    );
                 } else if (respuesta[i].extension_archivo=="javascript"){
                    $("#div-documentos").append(
                        `<div width="130px" class="col-xl-2 col-lg-2 col-md-6 col-sm-12 col-12" ondblclick="seleccionarArchivo(${respuesta[i].codigo_archivo});">
                        <img class="iconos" src="iconos/js.png" width="128px" alt="">
                        <p class="iconos">${respuesta[i].nombre_archivo}</p>
                        </div>`
                    );
                }
                else if (respuesta[i].extension_archivo=="html"){
                    $("#div-documentos").append(
                        `<div width="130px" class="col-xl-2 col-lg-2 col-md-6 col-sm-12 col-12" ondblclick="seleccionarArchivo(${respuesta[i].codigo_archivo});">
                        <img class="iconos" src="iconos/html.png" width="128px" alt="">
                        <p class="iconos">${respuesta[i].nombre_archivo}</p>
                        </div>`
                    );
                }
                else if (respuesta[i].extension_archivo=="c"){
                    $("#div-documentos").append(
                        `<div width="130px" class="col-xl-2 col-lg-2 col-md-6 col-sm-12 col-12" ondblclick="seleccionarArchivo(${respuesta[i].codigo_archivo});">
                        <img class="iconos" src="iconos/c.png" width="128px" alt="">
                        <p class="iconos">${respuesta[i].nombre_archivo}</p>
                        </div>`
                    );
                }
                else if (respuesta[i].extension_archivo=="cchar"){
                    $("#div-documentos").append(
                        `<div width="130px" class="col-xl-2 col-lg-2 col-md-6 col-sm-12 col-12" ondblclick="seleccionarArchivo(${respuesta[i].codigo_archivo});">
                        <img class="iconos" src="iconos/cchar.png" width="128px" alt="">
                        <p class="iconos">${respuesta[i].nombre_archivo}</p>
                        </div>`
                    );
                }
                else if (respuesta[i].extension_archivo=="cplus"){
                    $("#div-documentos").append(
                        `<div width="130px" class="col-xl-2 col-lg-2 col-md-6 col-sm-12 col-12" ondblclick="seleccionarArchivo(${respuesta[i].codigo_archivo});">
                        <img class="iconos" src="iconos/cplus.png" width="128px" alt="">
                        <p class="iconos">${respuesta[i].nombre_archivo}</p>
                        </div>`
                    );
                }
                else if (respuesta[i].extension_archivo=="java"){
                    $("#div-documentos").append(
                        `<div width="130px" class="col-xl-2 col-lg-2 col-md-6 col-sm-12 col-12" ondblclick="seleccionarArchivo(${respuesta[i].codigo_archivo});">
                        <img class="iconos" src="iconos/java.png" width="128px" alt="">
                        <p class="iconos">${respuesta[i].nombre_archivo}</p>
                        </div>`
                    );
                }
                else if (respuesta[i].extension_archivo=="json"){
                    $("#div-documentos").append(
                        `<div width="130px" class="col-xl-2 col-lg-2 col-md-6 col-sm-12 col-12" ondblclick="seleccionarArchivo(${respuesta[i].codigo_archivo});">
                        <img class="iconos" src="iconos/jason.png" width="128px" alt="">
                        <p class="iconos">${respuesta[i].nombre_archivo}</p>
                        </div>`
                    );
                }
                else if (respuesta[i].extension_archivo=="perl"){
                    $("#div-documentos").append(
                        `<div width="130px" class="col-xl-2 col-lg-2 col-md-6 col-sm-12 col-12" ondblclick="seleccionarArchivo(${respuesta[i].codigo_archivo});">
                        <img class="iconos" src="iconos/perl.png" width="128px" alt="">
                        <p class="iconos">${respuesta[i].nombre_archivo}</p>
                        </div>`
                    );
                }
                else if (respuesta[i].extension_archivo=="php"){
                    $("#div-documentos").append(
                        `<div width="130px" class="col-xl-2 col-lg-2 col-md-6 col-sm-12 col-12" ondblclick="seleccionarArchivo(${respuesta[i].codigo_archivo});">
                        <img class="iconos" src="iconos/php.png" width="128px" alt="">
                        <p class="iconos">${respuesta[i].nombre_archivo}</p>
                        </div>`
                    );
                }
                else if (respuesta[i].extension_archivo=="python"){
                    $("#div-documentos").append(
                        `<div width="130px" class="col-xl-2 col-lg-2 col-md-6 col-sm-12 col-12" ondblclick="seleccionarArchivo(${respuesta[i].codigo_archivo});">
                        <img class="iconos" src="iconos/python.png" width="128px" alt="">
                        <p class="iconos">${respuesta[i].nombre_archivo}</p>
                        </div>`
                    );
                }
                else if (respuesta[i].extension_archivo=="ruby"){
                    $("#div-documentos").append(
                        `<div width="130px" class="col-xl-2 col-lg-2 col-md-6 col-sm-12 col-12" ondblclick="seleccionarArchivo(${respuesta[i].codigo_archivo});">
                        <img class="iconos" src="iconos/ruby.png" width="128px" alt="">
                        <p class="iconos">${respuesta[i].nombre_archivo}</p>
                        </div>`
                    );
                }
                else if (respuesta[i].extension_archivo=="sql"){
                    $("#div-documentos").append(
                        `<div width="130px" class="col-xl-2 col-lg-2 col-md-6 col-sm-12 col-12" ondblclick="seleccionarArchivo(${respuesta[i].codigo_archivo});">
                        <img class="iconos" src="iconos/sql.png" width="128px" alt="">
                        <p class="iconos">${respuesta[i].nombre_archivo}</p>
                        </div>`
                    );
                }
                else if (respuesta[i].extension_archivo=="txt"){
                    $("#div-documentos").append(
                        `<div width="130px" class="col-xl-2 col-lg-2 col-md-6 col-sm-12 col-12" ondblclick="seleccionarArchivo(${respuesta[i].codigo_archivo});">
                        <img class="iconos" src="iconos/txt.png" width="128px" alt="">
                        <p class="iconos">${respuesta[i].nombre_archivo}</p>
                        </div>`
                    );
                }
			}
		}
    });
    

    $.ajax({
        url:"/obtener-carpetas-carpetas",
        method:"POST",
		dataType:"json",
		success:function(respuesta){
            console.log(respuesta);
			for(var i=0; i<respuesta.length; i++){
                $("#div-documentos").append(
                    `<div width="130px" class="col-xl-2 col-lg-2 col-md-6 col-sm-12 col-12" ondblclick="seleccionarCarpeta(${respuesta[i].codigo_carpeta});">
                    <img class="iconos" src="iconos/carpeta.png" width="128px" alt="">
                    <p class="iconos">${respuesta[i].nombre_carpeta}</p>
                    </div>`
                );
                    
			}
		}
	});
    
    $.ajax({
        url:"/obtener-nombre-carpeta",
        method:"POST",
		dataType:"json",
		success:function(respuesta){
            console.log(respuesta);
            $("#Nombre-carpeta").text(respuesta.nombre_carpeta);
		}
	});
	

}

function seleccionarArchivo(codigoArchivo){
	$.ajax({
		url:"/guardar-codigo-archivo",
		method:"POST",
		data:"codigo_archivo="+codigoArchivo,
		dataType:"json",
		success:function(respuesta){
			window.location.href = "editor.html";
			console.log(respuesta);
		}
	})
}

function seleccionarCarpeta(codigoCarpeta){
	$.ajax({
		url:"/guardar-codigo-carpeta",
		method:"POST",
		data:"codigo_carpeta="+codigoCarpeta,
		dataType:"json",
		success:function(respuesta){
			window.location.href = "carpeta.html";
			console.log(respuesta);
		}
	})
}


	


$("#crear-carpeta").click(function(){
	//alert("Enviar mensaje: " + $("#txta-mensaje").val());
    if( $("#nombre-carpeta").val() != '' ){
        var parametros = "nombreCarpeta="+$("#nombre-carpeta").val();
        $.ajax({
            url:"/crear-carpeta-carpeta",
            method:"POST",
            data:parametros,
            dataType:"json",
            success:function(response){
                if(response.estatus == 1){
                    //$('#cuenta-existente').modal();
                    alert("Ya existe una carpeta con ese nombre, porfavor escoge otro nombre");
                }else{
                    //$('#registro-exitoso').modal();
                   // alert("Carpeta creada con éxito.");
                   location.reload();
                    
                    
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

$("#crear-archivo").click(function(){
	//alert("Enviar mensaje: " + $("#txta-mensaje").val());
    if( $("#nombre-archivo").val() != '' ){
        var parametros = "nombreArchivo="+$("#nombre-archivo").val() + "&" + 
                          "extensionArchivo="+$("#select-extension").val() ;
        $.ajax({
            url:"/crear-archivo",
            method:"POST",
            data:parametros,
            dataType:"json",
            success:function(response){
                if(response.estatus == 1){
                    //$('#cuenta-existente').modal();
                    alert("Ya existe un archivo con ese nombre, porfavor escoge otro nombre");
                }else{
                    //$('#registro-exitoso').modal();
                   // alert("Carpeta creada con éxito.");
                   location.reload();
                    
                    
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