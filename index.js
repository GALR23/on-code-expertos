var express  = require("express");
var bodyParser = require("body-parser");
var session = require("express-session");
var mysql = require("mysql");
var cookieParser = require("cookie-parser");
var app = express();

var credenciales = {
    user:"root",
    password:"",
    port:"3306",
    host:"localhost",
    database:"bd_oncode"
};

app.use(cookieParser());
app.use(express.static("public")); //Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(session({secret:"ASDFE$%#%",resave:true, saveUninitialized:true}));

var oncode = express.static("home");

app.use(
    function(peticion,respuesta,next){
        if (peticion.session.codigoUsuario){
            //Significa que el usuario si esta logueado
                oncode(peticion,respuesta,next);
        }
        else
            return next();
    }
);
app.post("/login", function(peticion, respuesta){
    var conexion = mysql.createConnection(credenciales);
    conexion.query("SELECT codigo_usuario, nombre_usuario, correo FROM tbl_usuarios WHERE correo=? and contrasena=?",
        [peticion.body.correo, peticion.body.contrasena],
        function(err, data, fields){
                if (data.length>0){
                    peticion.session.codigoUsuario = data[0].codigo_usuario;
                    respuesta.cookie("carpeta", 0);
                    data[0].estatus = 0;
                    respuesta.send(data[0]); 
                }else{
                    respuesta.send({estatus:1, mensaje: "Login fallido"}); 
                }
            	
         }
    ); 
});

app.get("/logout",function(peticion, respuesta){
    peticion.session.destroy();
    respuesta.clearCookie("codigo");
    respuesta.redirect("login.html");
	//respuesta.send("Sesion eliminada");
});

app.get("/sesion",function(peticion, respuesta){
    respuesta.send({codigo:peticion.session.codigoUsuario});
	//respuesta.send("Sesion eliminada");
});

app.get("/obtener-sesion", function(peticion, respuesta){
    respuesta.send("Valor de la variable de sesion almacenado: " + peticion.session.codigoUsuario);
 });
         
app.post("/registrar-usuario", function(request, response){
    var conexion = mysql.createConnection(credenciales);
    var sql_insertar = 'INSERT INTO tbl_usuarios (NOMBRE_USUARIO, APELLIDO_USUARIO, CORREO, USERNAME, CONTRASENA) VALUES (?,?,?,?,?)';
    var sql_consultar = 'SELECT * FROM tbl_usuarios where correo = ?';
    
    conexion.query(sql_consultar,[request.body.correo],function (err, data, fields) { 
        if(data.length>0){
            response.send({estatus:1, mensaje:"Ya hay una cuenta con este correo."});
        }else{
            conexion.query(
                sql_insertar,
                [request.body.nombre, request.body.apellido, request.body.correo, request.body.username, request.body.contrasena],
                function(err, result){
                    if (err) throw err;
                    request.session.correo = request.body.correo;
                    response.send(result);
                    
                }
            );
        }
     });    
});


app.post("/obtener-archivos", function(request, response){
    var conexion = mysql.createConnection(credenciales);
    var sql = `SELECT * FROM tbl_archivos  WHERE codigo_usuario = ?`;
    var archivos = [];
    conexion.query(sql, [request.session.codigoUsuario])
    .on("result", function(resultado){
        archivos.push(resultado);
    })
    .on("end",function(){
        response.send(archivos);
    });   
});

app.post("/obtener-archivos-carpeta", function(request, response){
    var conexion = mysql.createConnection(credenciales);
    var sql = `SELECT a.codigo_archivo, b.nombre_archivo, b.contenido_archivo, b.extension_archivo FROM tbl_archivos_x_carpetas a INNER JOIN tbl_archivos b ON a.codigo_archivo = b.codigo_archivo WHERE codigo_carpeta = ?`;
    var archivos = [];
    conexion.query(sql, [request.cookies.carpeta])
    .on("result", function(resultado){
        archivos.push(resultado);
    })
    .on("end",function(){
        response.send(archivos);
    });   
});

app.post("/obtener-carpetas-carpetas", function(request, response){
    var conexion = mysql.createConnection(credenciales);
    var sql = `SELECT * FROM tbl_carpetas  WHERE codigo_carpeta_padre = ?`;
    var carpetas = [];
    conexion.query(sql, [request.cookies.carpeta])
    .on("result", function(resultado){
        carpetas.push(resultado);
    })
    .on("end",function(){
        response.send(carpetas);
    });   
});

app.post("/obtener-info-usuario", function(request, response){
    var conexion = mysql.createConnection(credenciales);
    var sql = `SELECT * FROM tbl_usuarios  WHERE codigo_usuario = ?`;
    var usuario = [];
    conexion.query(sql, [request.session.codigoUsuario])
    .on("result", function(resultado){
        usuario.push(resultado);
    })
    .on("end",function(){
        response.send(usuario[0]);
    });   
});

app.post("/obtener-nombre-carpeta", function(request, response){
    var conexion = mysql.createConnection(credenciales);
    var sql = `SELECT * FROM tbl_carpetas  WHERE codigo_carpeta = ?`;
    var carpetas = [];
    conexion.query(sql, [request.cookies.carpeta])
    .on("result", function(resultado){
        carpetas.push(resultado);
    })
    .on("end",function(){
        response.send(carpetas[0]);
    });   
});

app.post("/obtener-carpetas", function(request, response){
    var conexion = mysql.createConnection(credenciales);
    var sql = `SELECT * FROM tbl_carpetas  WHERE codigo_usuario = ?`;
    var carpetas = [];
    conexion.query(sql, [request.session.codigoUsuario])
    .on("result", function(resultado){
        carpetas.push(resultado);
    })
    .on("end",function(){
        response.send(carpetas);
    });   
});
         
app.post("/crear-carpeta", function(request, response){
    var conexion = mysql.createConnection(credenciales);
    var sql_insertar = 'INSERT INTO tbl_carpetas (codigo_usuario, nombre_carpeta) VALUES (?,?)';
    var sql_consultar = 'SELECT * FROM tbl_carpetas where codigo_usuario = ? and nombre_carpeta = ?';
    
    conexion.query(sql_consultar,[request.session.codigoUsuario, request.body.nombreCarpeta ],function (err, data, fields) { 
        if(data.length>0){
            response.send({estatus:1, mensaje:"Ya hay una carpeta con ese nombre."});
        }else{
            conexion.query(
                sql_insertar,
                [request.session.codigoUsuario, request.body.nombreCarpeta],
                function(err, result){
                    if (err) throw err;
                    response.send(result);
                    
                }
            );
        }
     });    
});

app.post("/crear-carpeta-carpeta", function(request, response){
    var conexion = mysql.createConnection(credenciales);
    var sql_insertar = 'INSERT INTO tbl_carpetas (codigo_usuario, nombre_carpeta, codigo_carpeta_padre) VALUES (?,?,?)';
    var sql_consultar = 'SELECT * FROM tbl_carpetas where codigo_usuario = ? and nombre_carpeta = ? and codigo_carpeta_padre = ?';
    
    conexion.query(sql_consultar,[request.session.codigoUsuario, request.body.nombreCarpeta, request.cookies.carpeta ],function (err, data, fields) { 
        if(data.length>0){
            response.send({estatus:1, mensaje:"Ya hay una carpeta con ese nombre."});
        }else{
            conexion.query(
                sql_insertar,
                [request.session.codigoUsuario, request.body.nombreCarpeta, request.cookies.carpeta],
                function(err, result){
                    if (err) throw err;
                    response.send(result);
                    
                }
            );
        }
     });    
});

app.post("/crear-archivo", function(request, response){
    var conexion = mysql.createConnection(credenciales);
    var sql_insertar = 'INSERT INTO tbl_archivos (codigo_usuario, nombre_archivo, extension_archivo) VALUES (?,?,?)';
    var sql_consultar = 'SELECT * FROM tbl_archivos where codigo_usuario = ? and nombre_archivo = ?';
    
    conexion.query(sql_consultar,[request.session.codigoUsuario, request.body.nombreArchivo ],function (err, data, fields) { 
        if(data.length>0){
            response.send({estatus:1, mensaje:"Ya hay un archivo con ese nombre."});
        }else{
            conexion.query(
                sql_insertar,
                [request.session.codigoUsuario, request.body.nombreArchivo, request.body.extensionArchivo],
                function(err, result){
                    if (err) throw err;
                    response.send(result);
                    
                }
            );
        }
     });    
});

app.post("/guardar-archivo", function(request, response){
    var conexion = mysql.createConnection(credenciales);
    var sql = `UPDATE tbl_archivos SET contenido_archivo = ? WHERE codigo_archivo = ?`;
    
    conexion.query(sql,[request.body.contenidoArchivo, request.cookies.codigo ] ,
         function(err, result){
            if (err) throw err;
                response.send(result);
                    
        }
    );
    
});

app.post("/actualizar-usuario", function(request, response){
    var conexion = mysql.createConnection(credenciales);
    var sql = `UPDATE tbl_usuarios SET nombre_usuario=?, apellido_usuario=?, correo=?, username=? , puesto=?, descripcion_personal = ? WHERE codigo_usuario = ?`;
    
    conexion.query(sql,[request.body.nombre,request.body.apellido,request.body.correo, request.body.username,request.body.puesto, request.body.descripcion,request.session.codigoUsuario] ,
         function(err, result){
            if (err) throw err;
                response.send(result);
                    
        }
    );
    
});


app.get("/codigo-fuente", function(request, response){
    var conexion = mysql.createConnection(credenciales);
    var sql = `Select * from tbl_archivos where codigo_archivo=?`;
    var codigo = [];
    conexion.query(sql, [request.cookies.codigo])
    .on("result", function(resultado){
        codigo.push(resultado);
    })
    .on("end",function(){
        response.send(codigo);
    });   
});

app.post("/guardar-codigo-archivo", function(peticion, respuesta){
    respuesta.cookie("codigo", peticion.body.codigo_archivo);
    respuesta.send({mensaje:"Se guardo la cookie"});
});

app.post("/guardar-codigo-carpeta", function(peticion, respuesta){
    respuesta.cookie("carpeta", peticion.body.codigo_carpeta);
    respuesta.send({mensaje:"Se guardo la cookie"});
});

app.get("/eliminar-cookie-archivo",function(peticion, respuesta){
    respuesta.clearCookie("codigo");
    respuesta.redirect("editor.html");
	//respuesta.send("Sesion eliminada");
});
            
            app.listen(3000);
            console.log("Servidor iniciado");
            ////////////////////////////////////////