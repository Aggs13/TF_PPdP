// src/funciones/menus_carpeta/editar_tarea_menu.ts
import { almacenTareas } from "../../clases/AlmacenTareas.js";
import { Tarea } from "../../clases/Tarea.js";
import { validarDificultad, validarEstado, establecerVencimiento, buscarTareaTitulo, buscarID, crearCambios, SelccionarConicidencia } from "../Reportes.js";
// @ts-ignore
import * as promptSync from "prompt-sync";
import * as fs from "fs";
import { obtener_path } from "../funciones_sistema.js";

const prompt = promptSync();

export function menuEditarTarea() {
  console.clear();
  console.log("EDITAR TAREA".padEnd(50, "="));

  // Buscar tarea
  const criterio:string = prompt("Buscar por (1) ID o (2) Título? ");
  let tareaAEditar: Tarea | undefined;

  switch (criterio){
    case "1":
      const id = Number(prompt("Ingrese ID de la tarea: "));
      tareaAEditar = buscarID(id)[0];
    break;

    case "2":
      tareaAEditar = menuEditPorNombre(tareaAEditar)
    break;
  }
    
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



  // nuevos valores de tarea
  const id:number = tareaAEditar.id
  const datosArray = {id,titulo,descripcion,dificultad,estado,vencimiento}
  tareaAEditar = crearCambios(tareaAEditar,datosArray)

  const index = almacenTareas.getTareas.findIndex(t=> t.id == id)
  almacenTareas.getTareas[index] = tareaAEditar

  fs.writeFileSync(obtener_path(), JSON.stringify(almacenTareas.getTareas, null, 2));

  console.log("\nTarea editada exitosamente!");
  prompt("Presione Enter para continuar...");
}







function menuEditPorNombre(tareaAEditar:Tarea|undefined){
  const texto = prompt("Ingrese título (o parte del título): ");
    const coincidencias = buscarTareaTitulo(texto)

    if (!tareaAEditar || coincidencias.length === 0) {
      console.log("Tarea no encontrada o está en la papelera");
      prompt("\nPresione Enter...");
      return;
    }

    if (coincidencias.length > 1) {
      console.log("\nCoincidencias encontradas:");
      coincidencias.forEach(t => console.log(`${t.id} → ${t.titulo}`));
      const id = Number(prompt("Ingrese el ID exacto: "));
      return tareaAEditar = SelccionarConicidencia(coincidencias,id);
    } else {

      return tareaAEditar = coincidencias[0];
    }
} 
