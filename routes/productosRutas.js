const ruta = require("express").Router();
const ProductoClase = require("../clases/ProductoClase");
const ProductoBD = require("../bd/ProductoBD");


ruta.get("/",(req,res)=>{
    res.render("bienvenida");
});

ruta.get("/mostrarProducto",async(req,res)=>{
    const productobd = new ProductoBD();
    var productos=await productobd.mostrarProducto();
    var productosCorrectos=[];
    productos.forEach(producto=>{
        const producto1 = new ProductoClase(producto);
        if(producto1.nombre!=undefined && producto1.descripcion!=undefined && producto1.costo!=undefined){
            productosCorrectos.push(producto1.obtenerDatos);
        }
    });
    //console.log(productos)
    res.render("mostrarProducto",{productosCorrectos});
});

ruta.get("/agregarProducto",(req,res)=>{
    res.render("formu");
});

ruta.post("/agregarProducto",(req,res)=>{
    console.log(req.body);
    const producto1 = new ProductoClase(req.body);
    if(producto1.nombre!=undefined && producto1.descripcion!=undefined && producto1.costo!=undefined){
        const productosbd = new ProductoBD();
        productosbd.nuevoProducto(producto1.obtenerDatos);
        res.render("mostrarDatosProd", producto1.obtenerDatos);   
    }
    else{
        res.render("Error");
    }
});

ruta.get("/editarProducto/:idproductos",async(req, res)=>{
    const productosbd = new ProductoBD();
    const [[producto]]=await productosbd.buscarProdPorId(req.params.idproductos);
    res.render("editarProducto",producto);
});

ruta.post("/editarProducto",async(req, res)=>{
    const productobd = new ProductoBD();
    const producto1 = new ProductoClase(req.body);
    if(producto1.nombre!=undefined && producto1.descripcion!=undefined && producto1.costo!=undefined){
        await productobd.editarProducto(req.body);
        res.redirect("/mostrarProducto");
    }
    else{
        res.render("Error");
    }
});

ruta.get("/borrarProducto/:idproductos",async(req, res)=>{
    const productobd = new ProductoBD();
    await productobd.borrarProducto(req.params.idproductos);
    res.redirect("/mostrarProducto");
});

module.exports=ruta;