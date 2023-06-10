const producto = require('../models/productos')
const xl = require('excel4node');
const path = require('path')
const fs = require('fs');


exports.descargarExcel = async(req, res) => {
    //configuramos el excel4node

    //creamos un nuevo documento
    const wb = new xl.Workbook();
    //definimos el nombre con el cual se descargara el archivo 
    const nombreArchivo = 'TablaProductos';
    //se define el nombre 
    var ws = wb.addWorksheet(nombreArchivo);

    //definimos estilos
    const columnaEstilo = wb.createStyle({
        font: {
            name: 'Arial',
            color: '#000000',
            size: 12,
            bold: true,
        }
    });

    const contenidoEstilo = wb.createStyle({
        font: {
            name: 'Arial',
            color: '#565656',
            size: 11,
        }
    });

    //definimos el nombre de las columnas
    ws.cell(1, 1).string('Categoria').style(columnaEstilo);
    ws.cell(1, 2).string('Nombre').style(columnaEstilo);
    ws.cell(1, 3).string('Descripcion').style(columnaEstilo);
    ws.cell(1, 4).string('Precio').style(columnaEstilo);

    //llamamos a la base de datos
    const listaProductos = await producto.find()

    // definimos un contador que empiece en 2 
    let fila = 2;

    //agregamos el contenido de la base de datos con un for o un forEach para llamar todos los datos 
    
    listaProductos.forEach(datoProducto => {
    ws.cell(fila, 1).string(datoProducto.referencia).style(contenidoEstilo);
    ws.cell(fila, 2).string(datoProducto.nombre).style(contenidoEstilo);
    ws.cell(fila, 3).string(datoProducto.descripcion).style(contenidoEstilo);
    ws.cell(fila, 4).number(datoProducto.precio).style(contenidoEstilo);
    
    fila = fila +1;
    });

    const rutaExcel = path.join(__dirname,'excel'+ nombreArchivo +'.xlsx');

    //escribir y guardar en el documento 
    //se le inclulle la ruta y una funcion 
    wb.write(rutaExcel, function(err,stars){

        //capturamos y mostramos en caso de un error
        if(err)console.log(err);
        //creamos una funcion que descargue el archibo y lo elimine 
        else{

            //guardamos el documento en la carpeta para excel para poder descargarla en el pc
                res.download(rutaExcel);
                
                console.log('documento descargado correctamente');

                //Eliminamos el documento de la carpeta excel
                fs.rm(rutaExcel, function(err){
                    if(err)console.log(err);
                    else console.log('Archivo descargado y borrado del servidor correctamente');
                });
                
        }
    });
}