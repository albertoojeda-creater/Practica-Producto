const ConectarBD = require("./ConexionBD");

class ProductoBD extends ConectarBD{
    constructor(){
        super();
    }
    async nuevoProducto(productos){
        const sql="INSERT INTO productos values(null,'"+productos.nombre+"','"+productos.descripcion+"','"+productos.costo+"');";
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

    async mostrarProducto() {
        const sql = "SELECT * FROM productos";
        try {
            await this.conectarMysql();
            const [productos] = await this.conexion.execute(sql);
            await this.cerrarConexion();
            console.log("Productos recuperados correctamente:", productos);
            return productos;
        } catch (error) {
            console.error("Error al recuperar los productos:", error);
            console.error(sql);
        }
    }

    async buscarProdPorId(idProductos){
        const sql="SELECT * FROM productos WHERE idproductos="+idProductos;
        try {
            await this.conectarMysql();
            const producto=await this.conexion.execute(sql);
            console.log("Producto recuperados");
            await this.cerrarConexion();
            return producto;
        } catch (error) {
            console.error("Error al recuperar el producto"+error);
            console.error(sql);
        }
       
    }

    async editarProducto(productos){
        const sql2=`UPDATE productos SET nombre="${productos.nombre}", 
        descripcion="${productos.descripcion}", 
        costo="${productos.costo}" 
        where idproductos=${productos.idproductos}`;
        try {
            await this.conectarMysql();
            const producto=await this.conexion.execute(sql2);
            console.log("Producto editado");
            await this.cerrarConexion();
        } catch (error) {
            console.error("Error al recuperar el producto"+error);
            console.error(sql2);
        }
       
    }

    async borrarProducto(idProducto) {
        const sql = "DELETE FROM productos WHERE idproductos ="+idProducto;
        try {
            await this.conectarMysql();
            const resultado = await this.conexion.execute(sql, [idProducto]);
            await this.cerrarConexion();
            console.log(`Producto con id ${idProducto} borrado correctamente`);
            return resultado; // Puedes devolver el resultado si lo necesitas en tu aplicación
        } catch (error) {
            console.error("Error al borrar el producto:", error);
            console.error(sql);
        }
    }
}

module.exports=ProductoBD;