import { almacenTareas } from "../../clases/AlmacenTareas";
// @ts-ignore
const inquirer = require("inquirer");
// @ts-ignore
import * as promptSync from "prompt-sync";
import * as fs from "fs";
import { moverPapelera, quitarPapelera, vaciarPapelera } from "../Reportes";
import { obtener_path } from "../funciones_sistema";
const prompt = promptSync();


export async function menuPapelera(){
    console.table(almacenTareas.getTareas.filter(t => t.papelera == true),["id", "titulo", "estado", "vencimiento"]);
    let op:string = await seleccion()
    switch(op){
        case"1":
            almacenTareas.setTareas = vaciarPapelera(almacenTareas.getTareas)
        break;

        case "2":
            const idTarea:string = prompt("Ingrese el ID >") || "-1";

            const tareasActuales = almacenTareas.getTareas;
            const nuevoArray = quitarPapelera(idTarea,tareasActuales);
            
            almacenTareas.setTareas = nuevoArray;
            fs.writeFileSync(obtener_path(), JSON.stringify(almacenTareas.getTareas,null, 2));
        break;

        default:
            return
        break;
    }
}



export function menuMoverAPalera(){
    console.table(almacenTareas.getTareas.filter(t => t.papelera == false),["id", "titulo", "estado", "vencimiento"]);
    const idTarea:string = prompt("Ingrese el ID > ") || "-1";

    const tareasActuales = almacenTareas.getTareas;
    const nuevoArray = moverPapelera(idTarea,tareasActuales);

    almacenTareas.setTareas = nuevoArray;
    fs.writeFileSync(obtener_path(), JSON.stringify(almacenTareas.getTareas,null, 2));
}



async function seleccion() {
  const {opcion} = await inquirer.prompt([
    {
      type: "list",
      name: "opcion",
      message: "> Elige una opción:",
      choices: [
      { name: "Vaciar    ", value: "1" },
      { name: "Restaurar ", value: "2" },
      { name: "Volver ", value: "0" },
      ]
    }
  ]);
  return opcion;
}
