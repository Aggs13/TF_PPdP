import { almacenTareas } from "../../clases/AlmacenTareas";
// @ts-ignore
import * as promptSync from "prompt-sync";
import * as fs from "fs";
import { moverPapelera, quitarPapelera } from "../Reportes";
import { obtener_path } from "../funciones_sistema";
const prompt = promptSync();


export function menuMoverQuitarPapelera(accion:boolean){

    if(accion){
        
        console.table(almacenTareas.getTareas.filter(t => t.papelera == false),["id", "titulo", "estado", "vencimiento"]);
        const idTarea:string = prompt("Ingrese el ID > ") || "-1";

        const tareasActuales = almacenTareas.getTareas;
        const nuevoArray = moverPapelera(idTarea,tareasActuales);

        almacenTareas.setTareas = nuevoArray;
        fs.writeFileSync(obtener_path(), JSON.stringify(almacenTareas.getTareas,null, 2));

    }else{
        
        console.table(almacenTareas.getTareas.filter(t => t.papelera == true),["id", "titulo", "estado", "vencimiento"]);
        const idTarea:string = prompt("Ingrese el ID >") || "-1";

        const tareasActuales = almacenTareas.getTareas;
        const nuevoArray = quitarPapelera(idTarea,tareasActuales);
        
        almacenTareas.setTareas = nuevoArray;
        fs.writeFileSync(obtener_path(), JSON.stringify(almacenTareas.getTareas,null, 2));

    }
}