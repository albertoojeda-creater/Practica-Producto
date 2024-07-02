class ConectarBD{
    constructor(){
        this.conexion=null;
        this.mysql=require("mysql2/promise");
    }
    async conectarMysql(){
        try {
            this.conexion=await this.mysql.createConnection({
                host:'127.0.0.1',
                user:'root',
                password:'',
                database:'tiendaut',
                port:'3306'
            });
            console.log("Conexion creada a MySql");
        } catch (error) {
            console.error("Error al crear la conexion"+error);
        }
    }

    async cerrarConexion(){
        if (this.conexion!=null) {
            try {
                await this.conexion.end();
                console.log("Conexion cerrada de MySql");
            } catch (error) {
                console.error("Error al cerrar la conexion "+error);
            }
        }
    }
}

module.exports=ConectarBD;