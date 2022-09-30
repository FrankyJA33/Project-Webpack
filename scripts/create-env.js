const fs = require('fs'); 

fs.writeFileSync('./.env',`API=${process.env.API}\n`) //crea un nuevo archivo si el archivo especificado no existe
// fs.writeFileSync( file, data, options )
//file: Es una string, Buffer, URL o un entero de descripción de archivo que denota la ruta del archivo donde debe escribirse.
//datos: es una string, búfer, TypedArray o DataView que se escribirá en el archivo.