class ConectarBD{
    constructor(){
        this.conexion=null;
        this.mysql=require("mysql2/promise");
    }
    async conectarMysql(){
        try {
            this.conexion=await this.mysql.createConnection({
                host:'bss2nnnlwdtotfhs5l2w-mysql.services.clever-cloud.com',
                user:'udepiakgkg49bhjk',
                password:'IEkRX54TGORZynybNvJ2',
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