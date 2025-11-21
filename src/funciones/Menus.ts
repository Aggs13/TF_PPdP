// solo funciones para los menus
// @ts-ignore
import * as promptSync from "prompt-sync";
import * as fs from "fs";
// @ts-ignore
import inquirer from "inquirer";
import path = require("path");
import {almacenTareas  } from "../clases/AlmacenTareas";
import { Tarea } from "../clases/Tarea";
import { menuNuevaTarea } from "./menus_carpeta/nueva_tarea_menu";
import { moverPapelera, quitarPapelera } from "./Reportes";


export const txt_path = obtener_path()
const prompt = promptSync();
const cargadas = JSON.parse(fs.readFileSync(txt_path,"utf-8"));

for (const t of cargadas) {
    almacenTareas.agregar(t);
}

export async function menu_principal(){
    let op:string|null;    
    
    do {
        limpiarPantalla();
        op = await menu();
        
        switch (op){

            case "1":
                limpiarPantalla();
                const tareas = almacenTareas.getTareas.filter(t => t.papelera == false);
                console.table(tareas,["id", "titulo", "estado", "vencimiento"]);
                prompt("voler [ENTER] > ");
            break;

            case "2":
                limpiarPantalla();
                const id:number = parseInt(crypto.randomUUID().slice(0, 4), 16);
                menuNuevaTarea(id,false);
            break;

            case "3":
                limpiarPantalla();
                prompt("voler [ENTER] > ");
            break;

            case "4":
                limpiarPantalla();
                prompt("voler [ENTER] > ");
            break;

            case "5":
                limpiarPantalla();
                menuQuitarPapelera()
                prompt("voler [ENTER] > ");
            break;

            case "6":
                limpiarPantalla();
                menuMoverPapelera();
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


function menuMoverPapelera(){
    console.table(almacenTareas.getTareas.filter(t => t.papelera == false),["id", "titulo", "estado", "vencimiento"]);
    const idTarea:string = prompt("Ingrese el ID > ");

    const tareasActuales = almacenTareas.getTareas;
    const nuevoArray = moverPapelera(idTarea,tareasActuales);

    almacenTareas.setTareas = nuevoArray;
    fs.writeFileSync(txt_path, JSON.stringify(almacenTareas.getTareas,null, 2));
}


function menuQuitarPapelera(){
    console.table(almacenTareas.getTareas.filter(t => t.papelera == true),["id", "titulo", "estado", "vencimiento"]);
    const idTarea:string = prompt("Ingrese el ID >");

    const tareasActuales = almacenTareas.getTareas;
    const nuevoArray = quitarPapelera(idTarea,tareasActuales);

    almacenTareas.setTareas = nuevoArray;
    fs.writeFileSync(txt_path, JSON.stringify(almacenTareas.getTareas,null, 2));

}

// funciones generales
function limpiarPantalla() {
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

