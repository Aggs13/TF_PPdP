// solo funciones para los menus
import { nuevaTarea,validarDificultad,validarEstado,establecerVencimiento,agregarTareaArray } from "./Reportes";
// @ts-ignore
import * as promptSync from "prompt-sync";
import * as fs from "fs";
import path = require("path");
import {array_tareas } from "../clases/AlmacenTareas";
import { Tarea } from "../clases/Tarea";
import { menuNuevaTarea } from "./menus_carpeta/nueva_tarea_menu";
const prompt = promptSync();


const txt_path = obtener_path()
const cargadas = JSON.parse(fs.readFileSync(txt_path,"utf-8"));
array_tareas.push(...cargadas);

export function menu_principal(){
    let op:string | null;    

    do {
        limpiarPantalla()
        console.log()
        console.log("┌────────────────────┐");
        console.log("│ [1]-Ver tareas     │");
        console.log("│ [2]-Nueva tarea    │");
        console.log("│ [3]-Editar         │");
        console.log("│ [4]-Buscar         │");
        console.log("│ [5]-Eliminar       │");
        console.log("│ [0]-Salir          │");
        console.log("└────────────────────┘");
        op = prompt("Elige una opcion > ");
        
        switch (op){

            case "1":
                limpiarPantalla()
                console.table(array_tareas,["id", "titulo", "estado", "vencimiento"])
                prompt("voler [ENTER] > ");
            break;

            case "2":
                limpiarPantalla()
                const id:number = parseInt(crypto.randomUUID().slice(0, 4), 16);
                menuNuevaTarea(id,false);
            break;

            case "3":
                limpiarPantalla()
                prompt("voler [ENTER] > ");
            break;

            case "4":
                limpiarPantalla()
                prompt("voler [ENTER] > ");
            break;

            case "5":
                limpiarPantalla()
                prompt("voler [ENTER] > ");
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






// funciones generales

function obtener_path(){
    const txt:string = path.join(__dirname)
    const txt_path = path_txt(txt)
    return txt_path
}

export function path_txt(txt_path:string){
    const texto = path.join(txt_path,"../../archivo_Tareas.txt")
    return texto 
}
