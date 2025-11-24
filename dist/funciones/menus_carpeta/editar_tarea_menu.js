"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.menuEditarTarea = menuEditarTarea;
// src/funciones/menus_carpeta/editar_tarea_menu.ts
const AlmacenTareas_js_1 = require("../../clases/AlmacenTareas.js");
const Reportes_js_1 = require("../Reportes.js");
// @ts-ignore
const promptSync = require("prompt-sync");
const fs = require("fs");
const funciones_sistema_js_1 = require("../funciones_sistema.js");
const prompt = promptSync();
function menuEditarTarea() {
    console.clear();
    console.log("EDITAR TAREA".padEnd(50, "="));
    // Buscar tarea
    const criterio = prompt("Buscar por (1) ID o (2) Título? ");
    let tareaAEditar;
    if (criterio === "1") {
        const id = Number(prompt("Ingrese ID de la tarea: "));
        tareaAEditar = (0, Reportes_js_1.buscarID)(id)[0];
    }
    if (criterio == "2") {
        const texto = prompt("Ingrese título (o parte del título): ").toLowerCase();
        const coincidencias = (0, Reportes_js_1.buscarTareaTitulo)(texto);
        if (coincidencias.length === 0) {
            console.log("No se encontraron tareas");
            prompt("Presione Enter...");
            return;
        }
        if (coincidencias.length > 1) {
            console.log("\nCoincidencias encontradas:");
            coincidencias.forEach(t => console.log(`${t.id} → ${t.titulo}`));
            const id = Number(prompt("Ingrese el ID exacto: "));
            tareaAEditar = (0, Reportes_js_1.SelccionarConicidencia)(coincidencias, id);
        }
        else {
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
    const descripcion = prompt(`Descripción [${tareaAEditar.descripcion}]: `) || tareaAEditar.descripcion;
    console.log("[1] Facil [2] Normal [3] Dificil");
    const opcionDificultad = prompt(`Dificultad actual [${tareaAEditar.dificultad}] → opción: `) || "0";
    const dificultad = opcionDificultad === "0" ? tareaAEditar.dificultad : ((0, Reportes_js_1.validarDificultad)(opcionDificultad) || tareaAEditar.dificultad);
    console.log("[1] Pendiente [2] En Proceso [3] Cancelado [4] Terminado");
    const opcionEstado = prompt(`Estado actual [${tareaAEditar.estado}] → opción: `) || "0";
    const estado = opcionEstado === "0" ? tareaAEditar.estado : ((0, Reportes_js_1.validarEstado)(opcionEstado) || tareaAEditar.estado);
    console.log(`Vencimiento actual: ${tareaAEditar.vencimiento || "sin fecha"}`);
    const dias = prompt("¿En cuántos días vence ahora? (vacío = mantener): ");
    const vencimiento = dias.trim() === "" ? tareaAEditar.vencimiento : (0, Reportes_js_1.establecerVencimiento)(dias, new Date());
    // nuevos valores de tarea
    const id = tareaAEditar.id;
    const datosArray = { id, titulo, descripcion, dificultad, estado, vencimiento };
    tareaAEditar = (0, Reportes_js_1.crearCambios)(tareaAEditar, datosArray);
    const index = AlmacenTareas_js_1.almacenTareas.getTareas.findIndex(t => t.id == id);
    AlmacenTareas_js_1.almacenTareas.getTareas[index] = tareaAEditar;
    fs.writeFileSync((0, funciones_sistema_js_1.obtener_path)(), JSON.stringify(AlmacenTareas_js_1.almacenTareas.getTareas, null, 2));
    console.log("\nTarea editada exitosamente!");
    prompt("Presione Enter para continuar...");
}
