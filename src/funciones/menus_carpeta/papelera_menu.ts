import { almacenTareas } from "../../clases/AlmacenTareas";
// @ts-ignore
const inquirer = require("inquirer");
// @ts-ignore
import * as promptSync from "prompt-sync";
import * as fs from "fs";
import { buscarID, moverPapelera, quitarPapelera, vaciarPapelera } from "../Reportes";
import { menuSelectTarea, obtenerPathArchivo } from "../funciones_sistema";
import { Tarea } from "../../clases/Tarea";
const prompt = promptSync();


export async function menuPapelera(){
    almacenTareas.getTareas.filter(t => t.papelera == true).length  > 0 ? console.table(almacenTareas.getTareas.filter(t => t.papelera == true),["id", "titulo", "estado", "vencimiento"]) : console.log("Papelera vacia")
    let op:string = await seleccion()
    switch(op){
        case"1":
          almacenTareas.setTareas = vaciarPapelera(almacenTareas.getTareas)
          fs.writeFileSync(obtenerPathArchivo(), JSON.stringify(almacenTareas.getTareas,null, 2));
          console.log("✅ Papelera Vaciada!! ");
        break;

        case "2":
          

          const tarea:Tarea|undefined = await menuSelectTarea(almacenTareas.getTareas,true)
          if(!tarea) return

          const nuevoArray = quitarPapelera(tarea,almacenTareas.getTareas)
          almacenTareas.setTareas = nuevoArray;

          fs.writeFileSync(obtenerPathArchivo(), JSON.stringify(almacenTareas.getTareas,null, 2));
          console.log("✅ Tarea restaurada! -> ♻");
          prompt("voler [ENTER] > ");
          
        break;
        default:
            return
        break;
    }
}



export async function menuMoverAPalera(){
  console.log("Selecciones una tarea")
  const tareaSelec:Tarea|undefined =  await menuSelectTarea(almacenTareas.getTareas,false)

  if (!tareaSelec) return;

  const tareasActuales = almacenTareas.getTareas;
  const nuevoArray = moverPapelera(tareaSelec,tareasActuales);

  almacenTareas.setTareas = nuevoArray;
  fs.writeFileSync(obtenerPathArchivo(), JSON.stringify(almacenTareas.getTareas,null, 2));
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


