// solo menu principal
// @ts-ignore
import * as promptSync from "prompt-sync";
import * as fs from "fs";
// @ts-ignore
import * as inquirer from "inquirer";
import path = require("path");
import {almacenTareas  } from "../clases/AlmacenTareas";
import { menuNuevaTarea } from "./menus_carpeta/nueva_tarea_menu";
import { cargarTareas, limpiarPantalla, obtener_path } from "./funciones_sistema";
import { menuMoverAPalera, menuPapelera } from "./menus_carpeta/papelera_menu";
import { moverPapelera, quitarPapelera } from "./Reportes";
import { buscarTarea } from "./menus_carpeta/buscar_tarea_menu";


export const txt_path = obtener_path()
const prompt = promptSync();


cargarTareas();
export async function menu_principal(){
    let op:string;    
    
    do {
        limpiarPantalla();
         op = await menu();
        
        switch (op){

            case "1":
                limpiarPantalla();
                console.log("TAREAS")
                const tareas = almacenTareas.getTareas.filter(t => t.papelera == false);
                console.table(tareas,["id", "titulo", "estado", "vencimiento"]);
                prompt("voler [ENTER] > ");
            break;

            case "2":
                limpiarPantalla();
                console.log("NUEVA TAREA")
                const id:number = parseInt(crypto.randomUUID().slice(0, 4), 16);
                menuNuevaTarea(id,false);
            break;

            case "3":
                limpiarPantalla();
                console.log("EDITAR")
                prompt("voler [ENTER] > ");
            break;

            case "4":
                limpiarPantalla();
                await buscarTarea();
                prompt("voler [ENTER] > ");
            break;

            case "5":
                limpiarPantalla();
                console.log("PAPELERA")
                await menuPapelera()
                prompt("voler [ENTER] > ");
            break;

            case "6":
                limpiarPantalla();
                console.log("ELIMINAR")
                menuMoverAPalera()
                prompt("voler [ENTER] > ");
            break;

            case "0":
                limpiarPantalla();
            break;

        }
    } while (op != "0");
}


async function menu() {
  const {opcion} = await inquirer.prompt([
    {
      type: "list",
      name: "opcion",
      message: "> Elige una opción:",
      choices: [
      { name: "Ver tareas  ", value: "1" },
      { name: "Nueva tarea ", value: "2" },
      { name: "Editar      ", value: "3" },
      { name: "Buscar      ", value: "4" },
      { name: "Papelera    ", value: "5" },
      { name: "Eliminar    ", value: "6" },
      { name: "Salir       ", value: "0"}
      ]
    }
  ]);
  return opcion;
}