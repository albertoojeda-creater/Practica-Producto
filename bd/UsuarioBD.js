const ConectarBD = require("./ConexionBD");

class UsuarioBD extends ConectarBD{
    constructor(){
        super();
    }
    async nuevoUsuario(usuario){
        const sql="INSERT INTO usuarios values(null,'"+usuario.nombre+"','"+usuario.celular+"','"+usuario.correo+"');";
        try {
            await this.conectarMysql();
            await this.conexion.execute(sql);
            await this.cerrarConexion();
            console.log("Dato insertado correctamente");
        } catch (error) {
            console.error("Error al ingresar el dato"+error);
            console.error(sql);
        }
    }

    async mostrarUsuario(){
        const sql="SELECT * FROM usuarios";
        var usuariosBD;
        try {
            await this.conectarMysql();
            [usuariosBD]= await this.conexion.execute(sql);
            console.log("Usuarios recuperados");
            //console.log(usuariosBD);
            await this.cerrarConexion();
            return usuariosBD;
        } catch (error) {
            console.error("Error al recuperar los datos de usuario "+error);
            console.error(sql);
        }
    }

    async buscarUsuPorId(idUsuario){
        const sql="SELECT * FROM usuarios WHERE idusuario="+idUsuario;
        try {
            await this.conectarMysql();
            const usuario=await this.conexion.execute(sql);
            console.log("Usuarios recuperados");
            await this.cerrarConexion();
            return usuario;
        } catch (error) {
            console.error("Error al recuperar el usuario"+error);
            console.error(sql);
        }
       
    }

    async editarUsuario(usuario){
        //const sql="UPDATE usuarios SET nombre='"+usuario.nombre+"', celular='"+usuario.celular+"', correo='"+usuario.correo+"';";
        const sql2=`UPDATE usuarios SET nombre="${usuario.nombre}", 
        celular="${usuario.celular}", 
        correo="${usuario.correo}" 
        where idusuario=${usuario.idusuario}`;
        try {
            await this.conectarMysql();
            const usuario=await this.conexion.execute(sql2);
            console.log("Usuarios editado");
            await this.cerrarConexion();
        } catch (error) {
            console.error("Error al recuperar el usuario"+error);
            console.error(sql2);
        }
       
    }

    async borrarUsuario(idusuario){
        const sql="DELETE FROM usuarios WHERE idusuario="+idusuario;
        try {
            await this.conectarMysql();
            const usuario=await this.conexion.execute(sql);
            console.log("Usuarios borrado");
            await this.cerrarConexion();
        } catch (error) {
            console.error("Error al recuperar el usuario"+error);
            console.error(sql);
        }
       
    }
}

module.exports=UsuarioBD;