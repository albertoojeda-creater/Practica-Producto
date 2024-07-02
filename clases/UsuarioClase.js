class Usuario{
    constructor(usuario){
        this.id=usuario.idusuario,
        this.nombre=usuario.nombre,
        this.celular=usuario.celular,
        this.correo=usuario.correo
    }
    set id(id){
        this._id=id;
    }
    set nombre(nombre){
        var regexNombre = /^[A-ZÁÉÍÓÚÑ'][a-záéíóúñ']{1,}([ ][A-ZÁÉÍÓÚÑ'][a-záéíóúñ']{1,}){0,}$/;
        if (regexNombre.test(nombre)){
            this._nombre=nombre;
        }
    }
    set celular(celular){
        var regexCelular = /^\d{10}$/;
        if (regexCelular.test(celular)){
            this._celular=celular;
        }
    }
    set correo(correo){
        var regexCorreo = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (regexCorreo.test(correo)){
            this._correo=correo;
        }

    }

    get id(){
        return this._id;
    }
    get nombre(){
        return this._nombre;
    }
    get celular(){
        return this._celular;
    }
    get correo(){
        return this._correo;
    }
    get obtenerDatos(){
        return{
            idusuario:this.id,
            nombre:this.nombre,
            celular:this.celular,
            correo:this.correo
        }
    }
}

module.exports=Usuario;