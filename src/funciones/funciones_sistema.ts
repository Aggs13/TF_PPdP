import path = require("path");
import { almacenTareas } from "../clases/AlmacenTareas";
import * as fs from "fs";
import { Tarea } from "../clases/Tarea";
//@ts-ignore
import * as inquirer from "inquirer";


// limpia pantalla
export function limpiarPantalla() {
    process.stdout.write('\x1Bc'); 
}


// obtiene la ubicacion del archivo .txt
export function obtenerPathArchivo() {
    return path.join(__dirname, "../../archivo_Tareas.txt");
}


// Carga las tareas en el array de tareas
export function cargarTareas(){
    // convierte lo del archivo txt en Json
    const cargadas = JSON.parse(fs.readFileSync(obtenerPathArchivo(),"utf-8"));
    for (const t of cargadas) {
       almacenTareas.agregar(t);
    }
    
}


// Menu para seleccionar tareas
export async function menuSelectTarea(tareas:Tarea[],papelera:boolean) {
    const opcionesTareas:Tarea[] =  tareas.filter(t=> t.papelera === papelera)
    const{opcion} = await inquirer.prompt([
    {
      type:"list",
      name:"opcion",
      message:"> Elige una Tarea",
      choices:[
        ...opcionesTareas.map((t)=>({
        name: `ID ${t.id} | ${t.titulo} | ${t.estado} | ${t.dificultad}`, value: t  
        })),
        { name: "Cancelar", value: -1 }
      ]

    }
  ]);

  if(opcion == -1 ) return
  let tareaSelect:Tarea = opcion
  return tareaSelect

}
