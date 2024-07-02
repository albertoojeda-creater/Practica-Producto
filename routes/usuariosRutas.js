const ruta = require("express").Router();
const UsuarioClase = require("../clases/UsuarioClase");
const UsuarioBD = require("../bd/UsuarioBD");

ruta.get("/",(req,res)=>{
    res.render("bienvenida");
});

ruta.get("/mostrarUsuario",async(req,res)=>{
    const usuariobd = new UsuarioBD();
    var usuarios=await usuariobd.mostrarUsuario();
    var usuariosCorrectos=[];
    usuarios.forEach(usuario=>{
        const usuario1 = new UsuarioClase(usuario);
        if(usuario1.nombre!=undefined && usuario1.celular!=undefined && usuario1.correo!=undefined){
            usuariosCorrectos.push(usuario1.obtenerDatos);
        }
    });
    console.log(usuarios);
    res.render("mostrarUsuarios",{usuariosCorrectos});
});

ruta.get("/agregarUsuario",(req,res)=>{
    res.render("formulario");
});

ruta.post("/agregarUsuario",(req,res)=>{
    console.log(req.body);
    const usuario1 = new UsuarioClase(req.body);
    if(usuario1.nombre!=undefined && usuario1.celular!=undefined && usuario1.correo!=undefined){
        const usuariobd = new UsuarioBD();
        usuariobd.nuevoUsuario(usuario1.obtenerDatos);
        res.render("mostrarDatos", usuario1.obtenerDatos);   
    }
    else{
        res.render("Error");
    }
});

ruta.get("/editarUsuario/:idusuario",async(req, res)=>{
    const usuariosbd = new UsuarioBD();
    const [[usuario]]=await usuariosbd.buscarUsuPorId(req.params.idusuario);
    //console.log(usuario);
    res.render("editarUsuario",usuario);
});

ruta.post("/editarUsuario",async(req, res)=>{
    const usuariobd = new UsuarioBD();
    const usuario1 = new UsuarioClase(req.body);
    if(usuario1.nombre!=undefined && usuario1.celular!=undefined && usuario1.correo!=undefined){
        await usuariobd.editarUsuario(req.body);
        res.redirect("/mostrarUsuario");
    }
    else{
        res.render("Error");
    }
});

ruta.get("/borrarUsuario/:idusuario",async(req, res)=>{
    const usuariobd = new UsuarioBD();
    await usuariobd.borrarUsuario(req.params.idusuario);
    res.redirect("/mostrarUsuario");
});

module.exports=ruta;