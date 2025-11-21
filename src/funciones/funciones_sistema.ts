import path = require("path");
import { almacenTareas } from "../clases/AlmacenTareas";
import * as fs from "fs";

export function limpiarPantalla() {
    process.stdout.write('\x1Bc'); 
}

export function obtener_path(){
    const txt:string = path.join(__dirname);
    const txt_path = path_txt(txt);
    return txt_path;
}

export function path_txt(txt_path:string){
    const texto = path.join(txt_path,"../../archivo_Tareas.txt");
    return texto;
}


export function cargarTareas(){

    const cargadas = JSON.parse(fs.readFileSync(obtener_path(),"utf-8"));
    
    for (const t of cargadas) {
       almacenTareas.agregar(t);
    }
    
}
