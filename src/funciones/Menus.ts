// solo funciones para los menus
import { nuevaTarea,validarDificultad,validarEstado,establecerVencimiento,agregarTareaArray } from "./ManejoTareas";
// @ts-ignore
import * as promptSync from "prompt-sync";
import * as fs from "fs";
import path = require("path");
import { Tarea } from "../clases/Tarea";
import { AlmacenTareas } from "../clases/AlmacenTareas";



const txt:string = path.join(__dirname)
const tareas_path = path_txt(txt)
const prompt = promptSync();

const almacenTareas = new AlmacenTareas;
let array_tareas = almacenTareas.list_tareas
array_tareas = JSON.parse(fs.readFileSync(tareas_path,"utf-8"))

export function menu_principal(){
    let op:string | null;    



    do {
        limpiarPantalla()
        console.log()
        console.log("------------------");
        console.log("[1]-Ver tareas");
        console.log("[2]-Nueva tarea");
        console.log("[3]-Editar");
        console.log("[4]-Buscar");
        console.log("[5]-Eliminar");
        console.log("[0]-Salir");
        console.log("------------------");
        op = prompt("Elige una opcion > ");
        
        switch (op){

            case "1":
                limpiarPantalla()
                const leerTarea = fs.readFileSync(tareas_path,"utf-8")
                console.log(leerTarea)
                prompt("voler [ENTER] > ");
            break;

            case "2":
                limpiarPantalla()
                const id:number = parseInt(crypto.randomUUID().slice(0, 4), 16);
                menuNuevaTarea(id,false);
            break;

            case "3":
                limpiarPantalla()
            break;

            case "4":
                limpiarPantalla()
            break;

            case "5":
                limpiarPantalla()
            break;

            case "0":
                limpiarPantalla()
            break;

        }
    } while (op != "0");
}

function limpiarPantalla() {
    process.stdout.write('\x1Bc'); 
}

export function path_txt(txt_path:string){
    const texto = path.join(txt_path,"../../archivo_Tareas.txt")
    return texto 
}



export function menuNuevaTarea(id:number,edit:boolean){

    const newId:number = id;
    const titulo:string = prompt("Titulo: ") || `Tarea[${id}]`;
    const desc:string =  prompt("Descripcion: ")|| "" ;
    const creacion:string =  new Date().toLocaleDateString();
    const ultimaEdicion:string =  ""

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

    const tarea = nuevaTarea(newId,titulo,desc,estado,creacion,ultimaEdicion,vencimiento,dificultad);

    array_tareas = agregarTareaArray(tarea,array_tareas)
    fs.writeFileSync(tareas_path,JSON.stringify(array_tareas, null, 2))
}
