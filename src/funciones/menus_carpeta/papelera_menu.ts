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
    almacenTareas.getTareas.filter(t => t.papelera == true).length  > 0 ? console.table(almacenTareas.getTareas.filter(t => t.papelera == true),["id", "titulo", "estado", "vencimiento"]) : console.log("Papelera vacia")
    let op:string = await seleccion()
    switch(op){
        case"1":
          almacenTareas.setTareas = vaciarPapelera(almacenTareas.getTareas)
          console.log("✅ Papelera Vaciada!! ");
        break;

        case "2":
          console.log("[ENTER] Cancelar")
          const idTarea:string = prompt("Ingrese el ID>") || "-1";

          const tareasActuales = almacenTareas.getTareas;
          const nuevoArray = quitarPapelera(idTarea,tareasActuales);

          if(nuevoArray === null){
            console.log("❌ No se encontró una tarea con ese ID");
            prompt("volver [ENTER] > ");
            return;
          }

          almacenTareas.setTareas = nuevoArray;
          fs.writeFileSync(obtener_path(), JSON.stringify(almacenTareas.getTareas,null, 2));
          console.log("✅ Tarea restaurada! -> ♻");
          prompt("voler [ENTER] > ");
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

    if(nuevoArray === null){
      console.log("❌ No se encontró una tarea con ese ID");
      prompt("volver [ENTER] > ");
      return;
    }

    almacenTareas.setTareas = nuevoArray;
    fs.writeFileSync(obtener_path(), JSON.stringify(almacenTareas.getTareas,null, 2));
    console.log(`✅ Tarea a la pepelera!! -> 🚮 `);
}



async function seleccion() {
  const {opcion} = await inquirer.prompt([
    {
      type: "list",
      name: "opcion",
      message: "> Elige una opción:",
      choices: [
      { name: "Vaciar (Eliminar Permanentemente) ", value: "1" },
      { name: "Restaurar ", value: "2" },
      { name: "Volver ", value: "0" },
      ]
    }
  ]);
  return opcion;
}
