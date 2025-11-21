import { validarDificultad,validarEstado,establecerVencimiento,nuevaTarea } from "../Reportes";
import { Tarea } from "../../clases/Tarea";
import { almacenTareas } from "../../clases/AlmacenTareas";
import { txt_path } from "../Menus";
import path = require("path");
import { path_txt } from "../Menus";

// @ts-ignore
import * as promptSync from "prompt-sync";
import * as fs from "fs";



export function menuNuevaTarea(id:number,edit:boolean){

    const newId:number = id;
    const titulo:string = prompt("Titulo: ") || `Tarea[${id}]`;
    const desc:string =  prompt("Descripcion: ")|| "" ;
    const creacion:string =  new Date().toLocaleDateString();
    const ultimaEdicion:string =  ""
    const { dificultad, estado, vencimiento } = validaciones();
    const papelera:boolean = false 

    const tarea:Tarea = nuevaTarea(newId,titulo,desc,estado,creacion,ultimaEdicion,vencimiento,dificultad,papelera);
    almacenTareas.agregar(tarea)
    fs.writeFileSync(txt_path, JSON.stringify(almacenTareas.getTareas,null, 2))

}


function validaciones(){

     // Validar dificultad
    console.log("[1] Facil [2] Normal [3] Dificil");
    const opcionDificultad:string = prompt("Dificultad: ") || "1";
    const dificultad = validarDificultad(opcionDificultad) || "Facil";

    // Validar estado
    console.log("[1] Pendiente","[2] En Proceso", "[3] Cancelado", "[4] Terminado");
    const opcionEstado = prompt("Estado: ") || "1"
    const estado = validarEstado(opcionEstado) || "Pendiente";

    // Validar Vencimiento
    console.log("En cuantos dias vence? ");
    const dias:string =  prompt("Dias: ") || "10";
    const vencimiento:string = establecerVencimiento(dias,new Date());

    return {dificultad, estado, vencimiento}
}

const txt:string = path.join(__dirname)
const prompt = promptSync();