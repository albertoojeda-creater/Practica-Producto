class Producto {
    constructor(producto) {
        this.id = producto.idproductos;
        this.nombre = producto.nombre;
        this.descripcion = producto.descripcion;
        this.costo = producto.costo;
    }

    set descripcion(descripcion) {
        var regexDesc = /^[A-ZÁÉÍÓÚÑ][a-záéíóúñ'’-]*( [A-ZÁÉÍÓÚÑ][a-záéíóúñ'’-]*)*$/;
        if (regexDesc.test(descripcion)) {
            this._descripcion = descripcion;
        } else {
            this._descripcion = undefined;
        }
    }

    get descripcion() {
        return this._descripcion;
    }

    set nombre(nombre) {
        var regexNombre = /^[A-ZÁÉÍÓÚÑ0-9][a-záéíóúñ0-9']*( [A-ZÁÉÍÓÚÑ0-9][a-záéíóúñ0-9']*)*$/;
        if (regexNombre.test(nombre)) {
            this._nombre = nombre;
        } else {
            this._nombre = undefined;
        }
    }

    get nombre() {
        return this._nombre;
    }

    set costo(costo) {
        var regexCosto = /^[0-9]+(\.[0-9]+)?$/;
        if (regexCosto.test(costo)) {
            this._costo = costo;
        } else {
            this._costo = undefined;
        }
    }

    get costo() {
        return this._costo;
    }

    get obtenerDatos() {
        return {
            idproductos: this.id,
            nombre: this.nombre,
            descripcion: this.descripcion,
            costo: this.costo
        };
    }
}

module.exports = Producto;