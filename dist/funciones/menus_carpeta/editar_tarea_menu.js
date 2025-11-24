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
//@ts-ignore
const inquirer = require("inquirer");
const prompt = promptSync();
async function menuEditarTarea() {
    console.clear();
    console.log("EDITAR TAREA".padEnd(50, "="));
    // Buscar tarea
    let tareaAEditar = await menuSelectTarea(AlmacenTareas_js_1.almacenTareas.getTareas);
    if (!tareaAEditar)
        return;
    const id = tareaAEditar.id;
    menuCambiarValores(tareaAEditar, id);
    console.log("\nTarea editada exitosamente!");
    prompt("Presione Enter para continuar...");
}
function menuCambiarValores(tareaAEditar, id) {
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
    // pasa nuevos valores a la funcion
    const datosArray = { titulo, descripcion, dificultad, estado, vencimiento };
    tareaAEditar = (0, Reportes_js_1.crearCambios)(tareaAEditar, datosArray);
    const index = AlmacenTareas_js_1.almacenTareas.getTareas.findIndex(t => t.id == id);
    AlmacenTareas_js_1.almacenTareas.getTareas[index] = tareaAEditar;
    fs.writeFileSync((0, funciones_sistema_js_1.obtener_path)(), JSON.stringify(AlmacenTareas_js_1.almacenTareas.getTareas, null, 2));
}
async function menuSelectTarea(tareas) {
    const { opcion } = await inquirer.prompt([
        {
            type: "list",
            name: "opcion",
            message: "> Elige una Tarea",
            choices: tareas.map((t) => ({
                name: `ID ${t.id} | ${t.titulo} | ${t.estado}`,
                value: t
            }))
        }
    ]);
    let tareaSelect = opcion;
    return tareaSelect;
}
