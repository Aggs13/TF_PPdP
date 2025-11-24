// src/funciones/menus_carpeta/editar_tarea_menu.ts
import { almacenTareas } from "../../clases/AlmacenTareas.js";
import { Tarea } from "../../clases/Tarea.js";
import { validarDificultad, validarEstado, establecerVencimiento } from "../Reportes.js";
// @ts-ignore
import * as promptSync from "prompt-sync";
import * as fs from "fs";
import { obtener_path } from "../funciones_sistema.js";

const prompt = promptSync();

export function menuEditarTarea() {
  console.clear();
  console.log("EDITAR TAREA");

  // Buscar tarea
  const criterio = prompt("Buscar por (1) ID o (2) Título? ");
  let tareaAEditar: Tarea | undefined;

  if (criterio === "1") {
    const id = Number(prompt("Ingrese ID de la tarea: "));
    tareaAEditar = almacenTareas.getTareas.find(t => t.id === id && !t.papelera);
  } else {
      const texto = prompt("Ingrese título (o parte del título): ").toLowerCase();
      const coincidencias = almacenTareas.getTareas.filter(
        t => t.titulo.toLowerCase().includes(texto) && !t.papelera
    );

    if (coincidencias.length === 0) {
      console.log("No se encontraron tareas activas");
      prompt("Presione Enter...");
      return;
    }
    if (coincidencias.length > 1) {
      console.log("\nCoincidencias encontradas:");
      coincidencias.forEach(t => console.log(`  ${t.id} → ${t.titulo}`));
      const id = Number(prompt("Ingrese el ID exacto: "));
      tareaAEditar = coincidencias.find(t => t.id === id);
    } else {
      tareaAEditar = coincidencias[0];
    }
  }

  if (!tareaAEditar) {
    console.log("Tarea no encontrada o está en la papelera");
    prompt("\nPresione Enter...");
    return;
  }

  console.log(`\nEditando tarea #${tareaAEditar.id} - ${tareaAEditar.titulo}`);
  console.log("Deje en blanco para mantener el valor actual\n");

  const titulo = prompt(`Título [${tareaAEditar.titulo}]: `) || tareaAEditar.titulo;
  const desc = prompt(`Descripción [${tareaAEditar.descripcion}]: `) || tareaAEditar.descripcion;

  console.log("[1] Facil [2] Normal [3] Dificil");
  const opcionDificultad = prompt(`Dificultad actual [${tareaAEditar.dificultad}] → opción: `) || "0";
  const dificultad = opcionDificultad === "0" ? tareaAEditar.dificultad : (validarDificultad(opcionDificultad) || tareaAEditar.dificultad);

  console.log("[1] Pendiente [2] En Proceso [3] Cancelado [4] Terminado");
  const opcionEstado = prompt(`Estado actual [${tareaAEditar.estado}] → opción: `) || "0";
  const estado = opcionEstado === "0" ? tareaAEditar.estado : (validarEstado(opcionEstado) || tareaAEditar.estado);

  console.log(`Vencimiento actual: ${tareaAEditar.vencimiento || "sin fecha"}`);
  const dias = prompt("¿En cuántos días vence ahora? (vacío = mantener): ");
  const vencimiento = dias.trim() === "" ? tareaAEditar.vencimiento : establecerVencimiento(dias, new Date());

  // Actualizacion Tarea
  tareaAEditar.titulo = titulo.trim();
  tareaAEditar.descripcion = desc.trim();
  tareaAEditar.dificultad = dificultad;
  tareaAEditar.estado = estado;
  tareaAEditar.vencimiento = vencimiento;
  tareaAEditar.ultima_Edicion = new Date().toLocaleDateString("es-AR");


  fs.writeFileSync(obtener_path(), JSON.stringify(almacenTareas.getTareas, null, 2));

  console.log("\nTarea editada exitosamente!");
  prompt("Presione Enter para continuar...");
}