// src/funciones/menus_carpeta/editar_tarea_menu.ts
import { almacenTareas } from "../../clases/AlmacenTareas.js";
import { Tarea } from "../../clases/Tarea.js";
import { validarDificultad, validarEstado, establecerVencimiento, buscarTareaTitulo, buscarID, crearCambios, selccionarConicidencia } from "../Reportes.js";
// @ts-ignore
import * as promptSync from "prompt-sync";
import * as fs from "fs";
import { obtener_path } from "../funciones_sistema.js";
//@ts-ignore
import * as inquirer from "inquirer";

const prompt = promptSync();

export async function menuEditarTarea() {
  console.clear();
  console.log("EDITAR TAREA".padEnd(50, "="));

  // Buscar tarea

  let tareaAEditar:Tarea = await menuSelectTarea(almacenTareas.getTareas)

  if(!tareaAEditar) return

    const id:number = tareaAEditar.id
    menuCambiarValores(tareaAEditar,id)
    console.log("\nTarea editada exitosamente!");
    prompt("Presione Enter para continuar...");
  }


function menuCambiarValores(tareaAEditar:Tarea,id:number){

  console.log(`\nEditando tarea #${tareaAEditar.id} - ${tareaAEditar.titulo}`);
  console.log("Deje en blanco para mantener el valor actual\n");

  const titulo = prompt(`Título [${tareaAEditar.titulo}]: `) || tareaAEditar.titulo;
  const descripcion = prompt(`Descripción [${tareaAEditar.descripcion}]: `) || tareaAEditar.descripcion;

  console.log("[1] Facil [2] Normal [3] Dificil");
  const opcionDificultad = prompt(`Dificultad actual [${tareaAEditar.dificultad}] → opción: `) || "0";
  const dificultad = opcionDificultad === "0" ? tareaAEditar.dificultad : (validarDificultad(opcionDificultad) || tareaAEditar.dificultad);

  console.log("[1] Pendiente [2] En Proceso [3] Cancelado [4] Terminado");
  const opcionEstado = prompt(`Estado actual [${tareaAEditar.estado}] → opción: `) || "0";
  const estado = opcionEstado === "0" ? tareaAEditar.estado : (validarEstado(opcionEstado) || tareaAEditar.estado);

  console.log(`Vencimiento actual: ${tareaAEditar.vencimiento || "sin fecha"}`);
  const dias = prompt("¿En cuántos días vence ahora? (vacío = mantener): ");
  const vencimiento = dias.trim() === "" ? tareaAEditar.vencimiento : establecerVencimiento(dias, new Date());


  // pasa nuevos valores a la funcion
  const datosArray = {titulo,descripcion,dificultad,estado,vencimiento}
  tareaAEditar = crearCambios(tareaAEditar,datosArray)

  const index = almacenTareas.getTareas.findIndex(t=> t.id == id)
  almacenTareas.getTareas[index] = tareaAEditar

  fs.writeFileSync(obtener_path(), JSON.stringify(almacenTareas.getTareas, null, 2));

}


async function menuSelectTarea(tareas:Tarea[]) {

  const{opcion} = await inquirer.prompt([
    {
      type:"list",
      name:"opcion",
      message:"> Elige una Tarea",
      choices:tareas.map((t)=>({
        name: `ID ${t.id} | ${t.titulo} | ${t.estado}`,
        value: t 
      }))
    }
  ]);
  let tareaSelect:Tarea = opcion
  return tareaSelect

}