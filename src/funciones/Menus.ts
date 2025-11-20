// solo funciones para los menus
import { AlmacenTareas } from "../clases/AlmacenTareas";
// @ts-ignore
import * as promptSync from "prompt-sync";

export function menu_principal(){
    let op:string | null;
    do {
    
        console.log("------------------");
        console.log("[1]-Ver tareas");
        console.log("[2]-Nueva tarea");
        console.log("[3]-Editar");
        console.log("[4]-Buscar");
        console.log("[5]-Eliminar");
        console.log("[0]-Salir");
        console.log("------------------");
        op = prompt("Elige una opcion: ");
        
        switch (op){

            case "1":
            break;

            case "2":
            break;

            case "3":
            break;

            case "4":
            break;

            case "5":
            break;

            case "0":
            break;

        }
    } while (op != "0");
}